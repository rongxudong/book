"use strict";angular.module("bookApp",["ngAnimate","ngRoute","ngSanitize","ui.bootstrap","LocalStorageModule"]).config(["$routeProvider",function(a){a.when("/user",{templateUrl:"./views/user/user.html",controller:"UserCtrl"}).when("/main",{templateUrl:"./views/main/main.html",controller:"MainCtrl"}).otherwise({redirectTo:"/main"})}]).config(["$compileProvider",function(a){a.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|javascript):/)}]).run(["sessionService","$rootScope",function(a,b){a.checkLogin(),b.$on("$routeChangeSuccess",function(a,b){})}]),angular.module("bookApp").filter("filterPicker",["$filter",function(a){return function(b,c){return c?a(c)(b):b}}]),angular.module("bookApp").factory("ajaxService",["$q","$http","$log","msgService","loadingService","rootDataService","$modalStack",function(a,b,c,d,e,f,g){var h={post:"POST",patch:"PATCH",get:"GET",del:"DELETE",put:"PUT"},i=f.data("ROOT_loginData");return{request:b,setRequest:function(a){this.request=a},send:function(b,f){var j=this;e.show(!f);var k=a.defer();b.ids&&b.ids.forEach(function(a,c){b.url=b.url.replace("{"+c+"}",a)});var l=h[b.method]||"GET";return b.url+=".json?_method="+l,b.method="GET"===l?"GET":"POST","GET"!==b.method&&(b.headers={contentType:"application/json; charset=utf-8"}),j.request(b).success(function(a,b,e,f){var h=a.stat;switch(h){case"OK":k.resolve(a.data),!a.silent&&a.successMsg&&d.success(a.successMsg);break;case"LOGIN_TIMEOUT":i.set("isLogin",!1),g.dismissAll("cancel"),d.warn("登陆超时,请重新登陆"),k.reject(a);break;default:if(!a.silent){var j=a.errors&&a.errors.length&&a.errors||"系统异常：未知原因";d.error(j),c.error(j)}k.reject(a)}}).error(function(a,b,e,f){c.log("请求失败："+a),d.error("请求失败："+a),k.reject(a,b,e,f)})["finally"](function(){e.show(!1)}),k.promise}}}]),angular.module("bookApp").factory("dialogService",["$modal",function(a){var b={templateUrl:"",controller:"DialogComplexBoxCtrl",size:"lg",backdrop:"static",onComplete:angular.noop};return{confirm:function(b,c){a.open({templateUrl:"./views/_widgets/dialog/confirm.html",controller:"DialogConfirmCtrl",size:"md",backdrop:"static",resolve:{msg:function(){return b}}}).result.then(c)},complexBox:function(c){var d=angular.extend({},b,c);d.resolve={onComplete:function(){return d.onComplete}},a.open(d)}}}]).controller("DialogConfirmCtrl",["$scope","$modalInstance","msg",function(a,b,c){a.msg=c,a.ok=function(){b.close()},a.cancel=function(){b.dismiss("cancel")}}]).controller("DialogComplexBoxCtrl",["$scope","$modalInstance","onComplete",function(a,b,c){c(a,b),a.cancel=function(){b.dismiss("cancel")}}]),angular.module("bookApp").factory("rootDataService",["$rootScope",function(a){var b=function(){};b.prototype={get:function(a){return this[a]},set:function(a,b){return this[a]=b,this}};var c=function(c){angular.forEach(c,function(c){a[c]=new b})};return c(["ROOT_loginData","ROOT_loadingStatData","ROOT_messageData"]),{data:function(b){return a[b]},addWatcher:function(b,c){a.$watch(b,c)}}}]).factory("globalDataService",function(){var a={upload:{url:"/upload",imgTypes:[".jpg",".jpeg",".gif",".bmp",".png"]},menu:[{children:[{children:[],href:"#/main",name:"我的主页"},{children:[{children:[],href:"#/myinfo/personal1",name:"个人信息1"},{children:[],href:"#/myinfo/personal2",name:"个人信息2"}],href:"",name:"个人信息"}],name:"菜单示例"},{children:[{children:[],href:"#/user",name:"用户管理"},{children:[],href:"#/submenu2",name:"子菜单2"}],name:"demo菜单组"}]};return{get:function(b){return a[b]},set:function(b,c){a[b]=c}}}),angular.module("bookApp").factory("loadingService",["rootDataService",function(a){var b=a.data("ROOT_loadingStatData");return{show:function(a){a=angular.isUndefined(a)?!0:a,b.set("showLoading",a)}}}]),angular.module("bookApp").factory("msgService",["rootDataService","$timeout",function(a,b){var c,d=a.data("ROOT_messageData"),e={info:2,success:2,warning:3,danger:5,error:5},f=function(){b.cancel(c),c=0};return{alert:function(a,g){f(),g=g||"info","error"===g&&(g="danger"),a=angular.isArray(a)?a:[{msg:a}],d.set("globalMsg",{messages:a,type:g,show:!0}),c=b(function(){d.set("globalMsg",{messages:"",type:"",show:!1})},1e3*e[g])},success:function(a){this.alert(a,"success")},error:function(a){this.alert(a,"danger")},info:function(a){this.alert(a,"info")},warn:function(a){this.alert(a,"warning")}}}]),angular.module("bookApp").factory("resourcePool",["resourceService",function(a){var b=a.create;return{session:b("/session"),user:b("/user/{id}")}}]),angular.module("bookApp").factory("resourceService",["ajaxService",function(a){function b(b,m,n,o){function p(a){e(this,f(a))}function q(a,c,d){d=d||{};var f=e({},m,a,c),g=b;return b.indexOf("{")>-1&&(g=b.replace(k,function(a,b){var c=f[b]||d[b]||"";if(c+="","@"===c.charAt(0)){var e=c.substr(1);c=d[e]||""}return delete f[b],c})),g=g.replace(/\/{2,}/g,"/").replace(/\/$/,""),{url:g,params:f}}var o=e({},l,o||{});return n=e({},j,n),d(n,function(b,e){var f=/^(POST|PUT|PATCH)$/i.test(b.method);p[e]=function(j,k,l,m){var n,r,s,t={};switch(arguments.length){case 4:s=m,r=l;case 3:case 2:if(!h(k)){t=j,n=k,r=l;break}if(h(j)){r=j,s=k;break}r=k,s=l;case 1:h(j)?r=j:f?n=j:t=j;break;case 0:break;default:throw i("badargs","Expected up to 4 arguments [params, data, success, error], got {0} arguments",arguments.length)}var u=q(b.params,t,n);u.method=b.method,f&&(u.data=n);var v=a.send(u);return v.then(function(a){if(b.isArray){var f=[],h=a.collection;if(!g(h))throw i(u.url+"返回值解析错误","方法{0}配置为array类型，服务器返回data.collection为: {1}",e,a.collection);o.createResource?d(h,function(a){f.push(new p(a))}):f=h,(r||c)(f,a)}else{var j=a.model||{},f=o.createResource?new p(j):j;(r||c)(f)}},function(a){(s||c)(a)}),v},p.prototype["$"+e]=function(a,b,c){h(a)&&(c=b,b=a,a={}),p[e].call(this,a,this,b,c)}}),e(p.prototype,{copy:function(){var a=this,b={},c=Object.getOwnPropertyNames(this);return c.forEach(function(c){0!==c.indexOf("$$")&&(g(a[c])?b[c]=f(a[c]):b[c]=a[c])}),new p(b)},isEqualById:function(a){return this.id===a.id},isInArrayById:function(a){var b=this.id,c=!1;return a.some(function(a){return b===a.id?(c=!0,!0):void 0}),c},removeFormArrayById:function(a){var b=this.id,c=-1;a.some(function(a,d){return b===a.id?(c=d,!0):void 0}),c>-1&&a.splice(c,1)}}),p}var c=angular.noop,d=angular.forEach,e=angular.extend,f=angular.copy,g=angular.isArray,h=angular.isFunction,i=angular.$$minErr("rf-resource"),j={get:{method:"get"},query:{method:"get",isArray:!0,params:{currentPage:1}},"new":{method:"post"},update:{method:"patch"},save:{method:"put"},"delete":{method:"del"}},k=/{([^{]+)}/g,l={primaryKey:"id",createResource:!0};return{create:b}}]),angular.module("bookApp").factory("sessionService",["rootDataService","resourcePool",function(a,b){var c=b.session,d=a.data("ROOT_loginData"),e={checkLogin:function(){c.get(function(a){d.set("isLogin",a.isLogin),d.set("loginUser",a.loginUser||{})})},setLoginStatus:function(a,b){d.set("isLogin",a),d.set("loginUser",b||{})},logout:function(){c["delete"](function(){d.set("isLogin",!1),d.set("loginUser",{})})},setLoginUser:function(a){d.set("loginUser",a)}};return d.set("logout",e.logout),e}]),angular.module("bookApp").factory("templateService",["$http","$templateCache",function(a,b){return{get:function(c){return a.get(c,{cache:b})}}}]),angular.module("bookApp").factory("utilService",function(){var a=(angular.extend,angular.isFunction);return{extractMapData:function(a,b,c){var d={};return b=b||"value",c=c||"label",angular.forEach(a,function(a){var e=a[b];d[e]=a[c]}),d},extractSelectList:function(a,b,c){var d=[];return angular.forEach(a,function(a){var e={};e.value=a[c],e.label=a[b],d.push(e)}),d},extractCheckBoxData:function(a,b){var c={};return b=b||"value",angular.forEach(a,function(a){var d=a[b];c[d]=!0}),c},extractCheckedData:function(a,b){var c=[];return b=b||"value",angular.forEach(a,function(a,d){if(a){var e={};e[b]=d,c.push(e)}}),c},resultVal:function(b,c){var d=[].slice.call(arguments,2);return a(b)?b.apply(c,d):b}}}),angular.module("bookApp").factory("validationMsgService",["$log",function(a){function b(b,d){var f=c[b]||"";return f?f=f.replace(e,function(a){return d}):(a.error(b+"校验信息未找到，请检查！"),f)}var c={required:"不能为空",email:"格式不正确",url:"格式不正确",number:"只能为数字",minlength:"长度不能小于{0}",maxlength:"长度不能大于{0}"},d=/^ng-/,e=/\{\d+\}/g;return{add:function(b,d){return c[b]?void a.error(b+"已存在!"):void(c[b]=d)},format:function(a,c){var e=a.rules||(a.rules={}),f=a.messages||(a.messages={});f[c]&&(e[c]=!0),angular.forEach(e,function(a,c){c=d.test(c)?c.substr(3):c,f[c]||(f[c]=b(c,a))})},getMsg:b}}]),angular.module("bookApp").directive("fillMsg",["validationMsgService",function(a){return{restrict:"A",scope:{fillMsg:"@",msgArgs:"@"},link:function(b,c,d){if(!c.text()){var e=a.getMsg(b.fillMsg,b.msgArgs);c.text(e)}}}}]),angular.module("bookApp").directive("modalWindow",["$compile","$modalStack",function(a,b){return{restrict:"EA",link:function(c,d,e){d.append('<span class="vertical-alignment-helper"></span>');var f=a('<button type="button" class="close" ng-click="closeBtnCancel()">×</button>')(c);d.find(".modal-content").prepend(f),c.closeBtnCancel=function(){b.getTop().key.dismiss("cancel")}}}}]),angular.module("bookApp").run(["validationMsgService",function(a){a.add("mobile","格式不正确")}]).directive("mobile",function(){return{restrict:"A",require:"ngModel",link:function(a,b,c,d){var e=/^(1[3|4|5|7|8])[0-9]{9}$/;a.$watch(c.ngModel,function(a){d.$setValidity("mobile",d.$error.required||e.test(a))})}}}),angular.module("bookApp").directive("vdatagrid",["$q","utilService",function(a,b){var c=angular.extend;angular.isFunction;return{restrict:"E",replace:!0,template:'<div class="data-grid" ng-transclude></div>',transclude:!0,require:["vdatagrid"],scope:{options:"="},controller:["$scope",function(d){function e(){return b.resultVal(j)}d.Resource=d.options.Resource;var f,g,h,i,j,k=d.options,l=this,m=a.defer();l.communication={getSearchParams:function(){return i},search:function(){var a=c({},i,e());d.Resource.query(a,function(a,b){g.gridData.resources=a,h&&(h.totalItems=b.totalCount)})},setTopScope:function(a){f=a,i=a.searchParams,j=a.otherParams,m.resolve()},isSearchInLocal:function(){return!!k.searchInLocal},setTableScope:function(a){g=a,m.promise.then(function(){l.communication.isSearchInLocal()?f.$watch("searchParams[options.searchGroup.input.paramKey]",function(a){g.keyword=a}):g.keyword=function(a){return a}})},setPaginationScope:function(a){h=a}}}],link:function(a,b,c,d,e){}}}]).directive("gridApi",function(){return{restrict:"A",require:"vdatagrid",link:function(a,b,c,d){var e=c.gridApi;a[e]={};var f=d.communication;angular.extend(a[e],{getSearchParams:f.getSearchParams,search:f.search})}}}).directive("gridTop",function(){return{restrict:"E",replace:!0,templateUrl:"./views/_widgets/vdatagrid/grid-top.html",require:["^vdatagrid"],scope:{options:"="},controller:["$scope",function(a){a.btnsGroup=a.options.btnsGroup,a.searchGroup=a.options.searchGroup,a.filterGroup=a.options.filterGroup,a.otherParams=a.options.otherParams}],link:function(a,b,c,d,e){a.searchParams={};var f=d[0].communication;f.setTopScope(a),a.doSearch=function(){f.search()},f.isSearchInLocal()||(a.inputKeyup=function(b){13===b.keyCode&&a.doSearch()})}}}).directive("gridTable",function(){return{restrict:"E",replace:!0,templateUrl:"./views/_widgets/vdatagrid/grid-table.html",transclude:!0,require:["^vdatagrid"],scope:{options:"=",gridData:"="},controller:["$scope",function(a){a.cols=a.options.cols,a.operation=a.options.operation,a.rowClass=a.options.rowClass,a.beforeItemRender=a.options.beforeItemRender}],link:function(a,b,c,d,e){var f=d[0].communication;f.setTableScope(a),f.search()}}}).directive("gridOperation",["$compile","templateService",function(a,b){return{restrict:"E",replace:!1,require:["^gridTable"],scope:{resource:"=",rcIndex:"=resourceIndex",options:"="},controller:["$scope",function(a){a.actions=a.options.actions,a.btnPerm=a.options.btnPerm}],link:function(c,d,e,f,g){var h=b.get(c.options.templateUrl);h.success(function(b){d.append(a(b)(c))})}}}]).directive("gridPagination",function(){return{restrict:"E",replace:!1,template:'<pagination class="mrg0 pull-right" total-items="totalItems" previous-text="&lt;&lt;" next-text="&gt;&gt;" ng-model="currentPage" ng-change="pageChanged(currentPage)"></pagination>',require:["^vdatagrid"],scope:{},controller:["$scope",function(a){}],link:function(a,b,c,d,e){var f=d[0].communication;f.setPaginationScope(a),a.pageChanged=function(a){var b=f.getSearchParams();b.currentPage=a,f.search()}}}}),angular.module("bookApp").directive("vform",["$q","$compile","$interpolate","vformGetTemplate",function(a,b,c,d){var e=d("vform"),f=d("vbtns");return{restrict:"EA",replace:!0,template:"<div></div>",scope:{fields:"=",formBtns:"=",modelObj:"=",api:"=",topTplDefer:"=",bottomTplDefer:"="},controller:["$scope","$element","$parse",function(a,b,c){a.api&&angular.extend(a.api,{getFormObj:function(){return a.vForm},showError:function(){a.vForm.showError=!0}}),a.onSubmit=function(){a.vForm.showError=!0}}],link:function(c,d,g){a.all([e,c.topTplDefer,c.bottomTplDefer,f]).then(function(a){function e(e){var f=angular.element(a[0].data);if(a[1]&&a[1].data){var g=angular.element(a[1].data);f.prepend(g)}if(a[2]&&a[2].data){var h=angular.element(a[2].data);f.append(h)}if(c.formBtns&&a[3]&&a[3].data){var i=angular.element(a[3].data);f.append(i)}var j=c.formElement=b(f)(c);d.empty().append(j)}c.$watch("fields",e)})}}}]).directive("vfield",["$q","$compile","$interpolate","vformGetTemplate","validationMsgService","templateService",function(a,b,c,d,e,f){var g=["vfield","text","password","email","number","select","radio","checkbox"],h={},i=d.multiple(g);i.then(function(a){angular.forEach(g,function(b,c){h[b]=a[c].data})});var j=angular.$$minErr("rf-vfield");return{restrict:"EA",replace:!1,scope:{options:"=",formObj:"=",modelValue:"="},link:function(d,k,l){var m=d.options,n=-1===g.indexOf(m.type);if(n&&!m.templateUrl)throw j("templateUrl missing","vform组件filed配置出错，type为{0}，不是内置控件，但没有提供模板url",m.type);var o=n&&f.get(m.templateUrl);a.all([o,i]).then(function(a){var f=angular.element(h.vfield);k.append(f);var g=h[m.type]||a[0].data;if(!g)throw j("template missing","template 获取失败！");n||(g=c(g,!1)({options:m}));var i=angular.element(g);m.bindScope&&m.bindScope(d),k.find(".form-control-wrapper").prepend(i),m.validators&&m.validators.rules&&(k.find("select,input").attr(m.validators.rules),e.format(m.validators,m.type)),k.replaceWith(b(k.contents())(d))})}}}]).factory("vformGetTemplate",["$q","templateService",function(a,b){var c=function(a){return a="./views/_widgets/vform/"+a+".html",b.get(a)};return c.multiple=function(b){var d=[];return angular.forEach(b,function(a){d.push(c(a))}),a.all(d)},c}]),angular.module("bookApp").controller("LoginCtrl",["$scope","resourcePool","sessionService",function(a,b,c){var d=b.session;a.submit=function(){d["new"]({username:a.user.username,password:a.user.password},function(b){c.setLoginStatus(!0,b.loginUser),a.loginError=""},function(){c.setLoginStatus(!1),a.loginError="用户名/密码不正确"})}}]),angular.module("bookApp").controller("SideMenuCtrl",["$scope","$location","$window","localStorageService","resourcePool","globalDataService",function(a,b,c,d,e,f){a.menus=f.get("menu");var g=d.get("menuItemOpened");a.menuOpened=g||new Array(a.menus.length),a.isActive=function(c,d){var e=c.href==="#"+b.path();return!a.isActive.done&&e&&(d?d.isExpand=!0:c.isExpand=!0,a.isActive.done=!0),e},a.menuHeadClick=function(b){a.menus.forEach(function(c,d){a.menuOpened[d]=b===d?!a.menuOpened[d]:!1})},angular.element(c).on("beforeunload",function(){d.set("menuItemOpened",a.menuOpened)})}]),angular.module("bookApp").controller("UserCtrl",["$scope","resourcePool","dialogService","msgService","rootDataService",function(a,b,c,d,e){var f=b.user,g=function(a,b){c.complexBox({templateUrl:"./views/user/user-dialog.html",onComplete:function(c,d){c.isEdit=!!a,c.user=a?a.copy():{},c.formAPI={},c.formFields=[{key:"loginName",type:"text",label:"用户名",validators:{rules:{"ng-required":!0}}},{key:"password",type:"password",label:"密码",validators:{rules:{"ng-required":!0}}},{key:"repassword",type:"password",label:"确认密码",validators:{rules:{"ng-required":!0}}},{key:"name",type:"text",label:"姓名",validators:{rules:{"ng-required":!0}}},{key:"mobile",type:"text",label:"手机",validators:{rules:{"ng-required":!0,mobile:!0},messages:{mobile:"格式不正确（校验信息若不指定，则使用默认值，大部分情况使用默认值即可）"}}},{key:"email",type:"email",label:"邮箱",validators:{rules:{"ng-required":!0}}}],c.isEdit&&c.formFields.splice(0,3),c.ok=function(){var a=c.formAPI.getFormObj();a.showError=!0,a.$invalid||(c.isEdit?c.user.$update(function(){d.close(),b&&b(c.user)}):f["new"](c.user,function(a){d.close(),b&&b(a)}))}}})};a.gridData={resources:[]},a.datagridOptions={grid:{Resource:f},gridTop:{btnsGroup:[{href:"javascript:void(0)",text:"新增",action:function(){g(null,function(b){a.gridData.resources.unshift(b),d.success("新增成功")})}}],searchGroup:{input:{paramKey:"keyword",placeholder:"关键字"},btn:{text:"搜索"}}},gridTable:{cols:[{text:"账号",property:"loginName"},{text:"姓名",property:"name"},{text:"手机",property:"mobile"},{text:"邮件",property:"email"}],rowClass:function(a){return 1==a.dataStatus?"":"text-muted"},operation:{templateUrl:"./views/user/user-ops.html",actions:{modify:function(b,c){g(b,function(b){a.gridData.resources[c]=b,d.success("修改成功")})},del:function(b,e){c.confirm("确定删除吗？",function(){b.$delete(function(){a.gridData.resources.splice(e,1),d.success("删除成功")})})}}}}}}]),angular.module("bookApp").controller("MainCtrl",["$scope",function(a){}]),angular.module("bookApp").run(["$templateCache",function(a){a.put("./views/_common/login.html",'<div class="login-wrapper" ng-controller="LoginCtrl"><div class="login-box"><form class="login-form" name="loginForm" ng-submit="submit()"><h3>用户登录</h3><div class="alert alert-danger ellipsis login-err" ng-show="loginError">{{loginError}}</div><div class="form-group"><span class="glyphicon glyphicon-user"></span> <input type="text" class="form-control" name="username" placeholder="请输入用户名" ng-model="user.username" required></div><div class="form-group"><span class="glyphicon glyphicon-lock"></span> <input type="password" class="form-control" name="password" ng-model="user.password" placeholder="请输入密码" required></div><button class="btn btn-primary btn-block login-btn" ng-disabled="!loginForm.$valid">登 录</button></form></div></div>'),a.put("./views/_common/side-menu.html",'<div class="panel-group menu" ng-controller="SideMenuCtrl"><div class="panel panel-default" ng-repeat="menu in menus"><div class="panel-heading" ng-click="menuHeadClick($index)"><h4 class="panel-title">{{menu.name}}</h4></div><div class="panel-collapse collapse in" collapse="!menuOpened[$index]"><div class="panel-body"><ul class="nav nav-pills nav-stacked"><li ng-repeat="item in menu.children" ng-class="{active: isActive(item)}"><a ng-href="{{(item.children && item.children.length) ? \'\' : item.href}}" ng-click="item.isExpand = !item.isExpand">{{item.name}} <span ng-if="item.children"><i ng-hide="!!item.isExpand" class="fa fa-caret-right"></i><i ng-show="!!item.isExpand" class="fa fa-caret-down"></i></span></a><ul ng-if="item.children" ng-show="!!item.isExpand" class="nav nav-pills nav-stacked"><li ng-repeat="childItem in item.children" ng-class="{active: isActive(childItem,item)}"><a ng-href="{{childItem.href}}">{{childItem.name}}</a></li></ul></li></ul></div></div></div></div>'),a.put("./views/_widgets/dialog/confirm.html",'<div class="modal-header"><h3 class="modal-title">确认窗口</h3></div><div class="modal-body">{{msg}}</div><div class="modal-footer"><button type="button" class="btn btn-default" ng-click="cancel()">取消</button> <button type="button" class="btn btn-primary" ng-click="ok()">确定</button></div>'),a.put("./views/_widgets/vdatagrid/grid-table.html",'<div class="datagrid-result mrgb10"><table class="table table-bordered table-hover"><thead><tr><td>序列</td><td ng-repeat="col in cols">{{col.text}}</td><td ng-if="operation">操作</td></tr></thead><tbody><tr ng-repeat="rcItem in gridData.resources | filter:keyword" ng-init="beforeItemRender(rcItem)" class="{{rowClass(rcItem)}}"><td>{{$index + 1}}</td><td ng-repeat="col in cols">{{rcItem[col.property] | filterPicker:col.formatter}}</td><td ng-if="operation"><grid-operation resource="rcItem" resource-index="$index" options="operation"></grid-operation></td></tr></tbody></table></div>'),a.put("./views/_widgets/vdatagrid/grid-top.html",'<div class="top-operation"><div ng-if="btnsGroup" class="btn-group pull-right"><a ng-repeat="btn in btnsGroup" class="btn btn-default" href="{{btn.href}}" ng-click="btn.action()">{{btn.text}}</a></div><div ng-if="searchGroup" class="form-inline search-group clearfix"><div ng-if="searchGroup.input" class="form-group"><input type="text" ng-model="searchParams[searchGroup.input.paramKey]" class="form-control" placeholder="{{searchGroup.input.placeholder}}" ng-keyup="inputKeyup($event)"></div><div ng-if="searchGroup.select" class="form-group"><select class="form-control" ng-model="searchParams[searchGroup.select.paramKey]" ng-options="item.value as item.label for item in searchGroup.select.selectList" ng-change="doSearch()"><option value="">-请选择-</option></select></div><button ng-if="searchGroup.btn" class="btn btn-default" type="button" ng-click="doSearch()">{{searchGroup.btn.text}}</button></div><div ng-if="filterGroup" class="filter-group form-horizontal"><div ng-repeat="filter in filterGroup" class="form-group"><label class="col-xs-2 control-label">{{filter.label}}</label><div class="col-xs-10"><label ng-repeat="item in filter.dataList" class="radio-inline"><input type="radio" ng-model="searchParams[filter.paramKey]" name="{{filter.paramKey}}" value="{{item.value}}" ng-change="doSearch()"> {{item.label}}</label></div></div></div></div>'),a.put("./views/_widgets/vform/checkbox.html",'<label ng-repeat="option in options.dataList" class="checkbox-inline"><input type="checkbox" ng-model="$parent.modelValue[option.value]" ng-value="option.value" name="{{options.key}}"> <span ng-bind="option.label"></span></label>'),a.put("./views/_widgets/vform/email.html",'<input type="email" class="form-control" ng-model="modelValue" name="{{options.key}}" placeholder="{{!options.placeholder ? options.label : (options.placeholder === \'none\' ? \'\' : options.placeholder)}}">'),a.put("./views/_widgets/vform/number.html",'<input type="number" class="form-control" ng-model="modelValue" name="{{options.key}}" placeholder="{{!options.placeholder ? options.label : (options.placeholder === \'none\' ? \'\' : options.placeholder)}}">'),a.put("./views/_widgets/vform/password.html",'<input type="password" class="form-control" ng-model="modelValue" name="{{options.key}}" placeholder="{{!options.placeholder ? options.label : (options.placeholder === \'none\' ? \'\' : options.placeholder)}}">'),a.put("./views/_widgets/vform/radio.html",'<label ng-repeat="option in options.dataList" class="radio-inline"><input type="radio" ng-model="$parent.modelValue" name="{{options.key}}" ng-value="option.value"> <span ng-bind="option.label"></span></label>'),a.put("./views/_widgets/vform/select.html",'<select ng-model="modelValue" class="form-control" name="{{options.key}}" ng-options="option.value as option.label for option in options.dataList"><option ng-if="!options.noEmptyOption" value="">-请选择-</option></select>'),a.put("./views/_widgets/vform/text.html",'<input type="text" class="form-control" ng-model="modelValue" name="{{options.key}}" placeholder="{{!options.placeholder ? options.label : (options.placeholder === \'none\' ? \'\' : options.placeholder)}}">'),a.put("./views/_widgets/vform/vbtns.html",'<div class="form-group"><div class="col-sm-offset-2 col-sm-10"><button ng-repeat="btn in formBtns" ng-if="!btn.btnPerm" type="{{btn.type}}" class="btn btn-{{btn.style}}" ng-click="btn.action()">{{btn.text}}</button></div></div>'),a.put("./views/_widgets/vform/vfield.html",'<div ng-class="{\'form-group\':true,\'has-error\':formObj.showError && formObj[options.key].$invalid}"><label class="col-sm-2 control-label">{{options.label}}</label><div class="col-sm-10 form-control-wrapper"><div ng-repeat="(ruleName,message) in options.validators.messages" ng-show="formObj.showError && formObj[options.key].$error[ruleName]" class="validate-error"><span class="glyphicon glyphicon-remove"></span> {{options.label}}{{message}}</div></div></div>'),a.put("./views/_widgets/vform/vform.html",'<form class="form-horizontal" ng-submit="onSubmit()" name="vForm" novalidate><vfield ng-repeat="fieldOptions in fields" form-obj="vForm" options="fieldOptions" model-value="modelObj[fieldOptions.key]"></vfield></form>'),a.put("./views/main/main.html",'<div class="jumbotron"><h1>\'Allo, \'Allo!</h1><p class="lead"><img src="images/yeoman.ab5291d8.png" alt="I\'m Yeoman"><br></p><p><a class="btn btn-lg btn-success" ng-href="#">Splendid!<span class="glyphicon glyphicon-ok"></span></a></p><p>this is the <strong style="font-size: 50px;color:#428bca">main</strong> view. to be continued...</p></div>'),a.put("./views/user/user-dialog.html",'<div class="modal-header"><h3 class="modal-title">{{isEdit ? \'修改\' : \'新增\'}}用户</h3></div><div class="modal-body"><vform fields="formFields" model-obj="user" api="formAPI"></vform></div><div class="modal-footer"><button type="button" class="btn btn-default" ng-click="cancel()">取消</button> <button type="button" class="btn btn-primary" ng-click="ok()">确定</button></div>'),a.put("./views/user/user-ops.html",'<button class="btn btn-default btn-xs" ng-click="actions.modify(resource,rcIndex)">修改</button> <button class="btn btn-danger btn-xs" ng-click="actions.del(resource,rcIndex)">删除</button>'),a.put("./views/user/user.html",'<vdatagrid options="datagridOptions.grid"><grid-top options="datagridOptions.gridTop"></grid-top><grid-table options="datagridOptions.gridTable" grid-data="gridData"></grid-table><grid-pagination></grid-pagination></vdatagrid>')}]);