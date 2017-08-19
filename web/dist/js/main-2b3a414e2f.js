!function(e){e.module("music",["MyAwesomePartials","ui.router","music.hostConfig","music.router","music.register","music.checkpwdDirective","music.login","music.httpFactory","music.list","music.scrollLrcDirective","music.footerDirective","music.headerDirective","music.userService","music.logout","music.add","music.edit"]).config(["$httpProvider",function(e){e.defaults.headers.post={"content-type":"application/x-www-form-urlencoded"},e.defaults.transformRequest=function(e){var t="";for(var n in e)t+=n+"="+e[n]+"&";return t.substr(0,t.length-1)},e.interceptors.push("httpFactory")}])}(angular),function(e){e.module("music.register",[]).controller("registerController",["$scope","$http","host","$state",function(e,t,n,i){e.checkUsername=function(i){console.log(n),i&&""!==i.trim()&&t.post(n.checkusername.url,{username:i},n.checkusername.handler).then(function(t){"001"===t.data.code?e.msg=t.data.msg:e.msg=t.data.msg},function(e){console.log(e)})},e.doRegister=function(){t.post(n.register.url,e.data,n.register.handler).then(function(t){"001"===t.data.code?i.go("login"):(e.data={},alert(t.data.msg))},function(e){console.log(e)})}}])}(angular),function(e){e.module("music.login",[]).controller("loginController",["$scope","$http","host","$state","userService",function(e,t,n,i,r){e.data={},e.doLogin=function(o){return o.username&&""!==o.username.trim()?o.password&&""!==o.password.trim()?void t.post(n.login.url,o,n.login.handler).then(function(t){"001"===t.data.code?(r.setPermissions(t.data.permissions),r.setToken(t.data.token),r.setName(o.username),i.go("music.list")):e.msg=t.data.msg},function(e){console.log(e)}):e.msg="密码不能为空":e.msg="用户名不能为空"}}])}(angular),function(e){e.module("music.list",[]).controller("listController",["$scope","$http","host",function(e,t,n){t.get(n.list.url,n.list.handler).then(function(t){e.musics=t.data.musics},function(e){console.log(e)}),e.play=function(t){e.fileObj={file:t.file,filelrc:t.filelrc}},e.del=function(i,r){confirm("确定要删除吗")&&t["delete"](n["delete"].url+i,n["delete"].handler).then(function(t){"001"===t.data.code?e.musics.splice(r,1):alert(t.data.msg)},function(e){console.log(e)})}}])}(angular),function(e){e.module("music.logout",[]).controller("logoutController",["$scope","userService","$timeout","$state",function(e,t,n,i){e.msg="尊敬的 "+t.name+",您正在退出，请稍后..",t.setName(""),t.setToken(""),t.setPermissions(""),n(function(){i.go("login")},2e3)}])}(angular),function(e){e.module("music.add",[]).controller("addMusicController",["$scope","$http","host","$state",function(e,t,n,i){e.data={},e.doUpload=function(e){var r=new FormData;r.append("title",e.title),r.append("time",e.time),r.append("singer",e.singer),r.append("file",$("#file").get(0).files[0]),r.append("filelrc",$("#filelrc").get(0).files[0]),t.post(n.upload.url,r,n.upload.handler).then(function(e){"001"===e.data.code&&i.go("music.list")},function(e){console.log(e)})}}])}(angular),function(e){e.module("music.edit",[]).controller("editMusicController",["$scope","$http","host","$state",function(e,t,n,i){var r=i.params.id;t.jsonp(n.jsonp.url+r,n.jsonp.handler).then(function(t){"001"===t.data.code?e.music=t.data.music:alert(t.data.msg)},function(e){console.log(e)}),e.doSave=function(r){var o=new FormData;o.append("_id",e.music._id),o.append("title",r.title),o.append("time",r.time),o.append("singer",r.singer),o.append("file",$("#file").get(0).files[0]),o.append("filelrc",$("#filelrc").get(0).files[0]),t.put(n.update.url,o,n.update.handler).then(function(e){"001"===e.data.code?i.go("music.list"):alert(e.data.msg)},function(e){console.log(e)})}}])}(angular),function(e){e.module("music.checkpwdDirective",[]).directive("checkPwd",function(){return{templateUrl:"/views/checkPwd.html",scope:{pwd:"@"},link:function(e,t,n){e.pwd="",e.$watch("pwd",function(n,i){for(var r=e.checkPwdLevel(n),o=t.children().children(),s=["yellowgreen","skyblue","hotpink"],l=s.length-1;l>=0;l--)o[l].style.backgroundColor="";for(var l=0;l<r;l++)o[l].style.backgroundColor=s[l]}),e.checkPwdLevel=function(e){var t=/[0-9]/,n=/[a-zA-Z]/,i=/[~!@#$%^&*()]/,r=0;return t.test(e)&&r++,n.test(e)&&r++,i.test(e)&&r++,r}}}})}(angular),function(e){e.module("music.scrollLrcDirective",[]).directive("scrollLrc",["$http","host",function(e,t){return{templateUrl:"/views/scrollLrc.html",scope:{file:"@"},link:function(n,i,r){var o=i.children().children()[0];i.children().children()[2];n.createLrcDom=function(e){var t="";for(var n in e)t+="<p time="+n+">"+e[n]+"</p>";o.innerHTML=t},n.parseLrc=function(e){for(var t={},n=/\[(\d{2})\:(\d{2})\.(\d{1,2})\](.*)/,i=e.split("\n"),r=0;r<i.length;r++){var o=i[r],s=n.exec(o);if(s){var l=s[1],a=s[2],c=(s[3],s[4]),u=60*l+(a-0);t[u]=c}}return t},n.scroll=function(e,t){if(t[e]){$lrc=$(o),$p=$lrc.find("p[time="+e+"]");var n=$lrc.offset().top-$p.offset().top;$p.addClass("hl").siblings().removeClass("hl"),$lrc.animate({top:n},"slow")}},n.$watch("file",function(i,r){if(i!==r){var o=JSON.parse(i);e.get(o.filelrc,t.filelrc.handler).then(function(e){var t=n.parseLrc(e.data);n.createLrcDom(t),$("#audio").off("timeupdate"),$("#audio").on("timeupdate",function(e){var i=Math.round(e.target.currentTime);n.scroll(i,t)}),n.audioSrc=o.file},function(e){console.log(e)})}})}}}])}(angular),function(e){e.module("music.footerDirective",[]).directive("myFooter",function(){return{template:'<div class="aw-footer-wrap"><div class="aw-footer"> Copyright © 2016, All Rights Reserved</span>   <span class="hidden-xs">Powered By <a href="http://www.itcast.cn" target="blank">ITcast</a></span></div></div>'}})}(angular),function(e){e.module("music.headerDirective",[]).directive("myHeader",["userService",function(e){return{templateUrl:"/views/header.html",link:function(t,n){t.us=e,t.$watch("us.name",function(e,n){t.name=e})}}}])}(angular),function(e){e.module("music.httpFactory",[]).factory("httpFactory",["$window","host",function(e,t){return{request:function(t){var n=e.sessionStorage.getItem("token");return n&&(t.headers.mytoken=n),t},response:function(e){return e}}}])}(angular),function(e){e.module("music.userService",[]).service("userService",["$window",function(e){this.name=e.sessionStorage.getItem("username"),this.token=e.sessionStorage.getItem("token"),this.permissions=e.sessionStorage.getItem("permissions")||"","undefined"==e.sessionStorage.getItem("permissions")&&(this.permissions=""),this.setName=function(t){this.name=t,e.sessionStorage.setItem("username",t)},this.setToken=function(t){this.token=t,e.sessionStorage.setItem("token",t)},this.setPermissions=function(t){this.permissions=t,"undefined"==e.sessionStorage.getItem("permissions")&&(this.permissions=""),e.sessionStorage.setItem("permissions",JSON.stringify(t))},this.hasPermissions=function(e){return this.permissions.indexOf(e)!=-1}}])}(angular),function(e){e.module("music.router",[]).config(["$stateProvider","$urlRouterProvider","$transitionsProvider","$sceDelegateProvider","Whitelist",function(e,t,n,i,r){i.resourceUrlWhitelist(r),n.onStart({to:"music.**"},function(e){var t=e.injector().get("userService");return t.hasPermissions(e.to().url)}),t.otherwise("login"),e.state("register",{url:"/register",templateUrl:"/views/register.html",controller:"registerController"}).state("login",{url:"/login",templateUrl:"/views/login.html",controller:"loginController"}).state("music",{url:"/music",templateUrl:"/views/music.html"}).state("music.list",{url:"/list",templateUrl:"/views/list.html",controller:"listController"}).state("logout",{url:"/logout",templateUrl:"/views/logout.html",controller:"logoutController"}).state("music.add",{url:"/add",templateUrl:"/views/add.html",controller:"addMusicController"}).state("music.edit",{url:"/edit?id",templateUrl:"/views/edit.html",controller:"editMusicController"})}])}(angular),function(e){var t="http://127.0.0.1:12345";e.module("music.hostConfig",[]).constant("host",{checkusername:{url:t+"/api/check/username",handler:{}},register:{url:t+"/api/register",handler:{withCredentials:!0}},login:{url:t+"/api/login",handler:{}},list:{url:t+"/api/music/list",handler:{}},"delete":{url:t+"/api/music/delete?id=",handler:{}},jsonp:{url:t+"/myjsonp/music/",handler:{}},update:{url:t+"/api/music/update",handler:{headers:{"content-type":void 0},transformRequest:function(e){return e}}},upload:{url:t+"/api/music/upload",handler:{headers:{"content-type":void 0},transformRequest:function(e){return e}}},filelrc:{url:"",handler:{transformResponse:function(e){return e}}}}).constant("Whitelist",[t+"/**","self"])}(angular);