(function(module) {
try {
  module = angular.module('MyAwesomePartials');
} catch (e) {
  module = angular.module('MyAwesomePartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/views/add.html',
    '<div class="container">\n' +
    '    <div class="page-header">\n' +
    '        <h1><a ui-sref="music.list">我的音乐</a><small>--添加音乐</small><h1>\n' +
    '        </h1></h1></div>\n' +
    '    </div>\n' +
    '    <div class="container">\n' +
    '        <form ng-submit="doUpload(data)">\n' +
    '            <div class="form-group">\n' +
    '                <label for="">歌曲标题</label>\n' +
    '                <input type="text" name="title" class="form-control" placeholder="请输入歌曲标题" ng-model="data.title">\n' +
    '            </div>\n' +
    '            <div class="form-group">\n' +
    '                <label for="">歌曲时长</label>\n' +
    '                <input type="text" name="time" class="form-control" placeholder="请输入歌曲时长" ng-model="data.time">\n' +
    '            </div>\n' +
    '            <div class="form-group">\n' +
    '                <label for="">歌手</label>\n' +
    '                <input type="text" name="singer" class="form-control" placeholder="请输入歌手姓名" ng-model="data.singer">\n' +
    '            </div>\n' +
    '            <div class="form-group">\n' +
    '                <label for="">歌曲文件</label>\n' +
    '                <input type="file" name="file" id="file">\n' +
    '                <p class="help-block">请上传歌曲文件.</p>\n' +
    '            </div>\n' +
    '             <div class="form-group">\n' +
    '                <label for="">歌词文件</label>\n' +
    '                <input type="file" name="filelrc" id="filelrc">\n' +
    '                <p class="help-block">请上传歌词文件.</p>\n' +
    '            </div>\n' +
    '            <button type="submit" class="btn btn-success">点击添加</button>\n' +
    '        </form>\n' +
    '    </div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('MyAwesomePartials');
} catch (e) {
  module = angular.module('MyAwesomePartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/views/checkPwd.html',
    '<style type="text/css">\n' +
    '.box {\n' +
    '    height: 30px;\n' +
    '    width: 30px;\n' +
    '    display: inline-block;\n' +
    '}\n' +
    '</style>\n' +
    '密码强度:\n' +
    '<div>\n' +
    '    <div class="box"></div>\n' +
    '    <div class="box"></div>\n' +
    '    <div class="box"></div>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('MyAwesomePartials');
} catch (e) {
  module = angular.module('MyAwesomePartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/views/edit.html',
    '<div class="container">\n' +
    '    <div class="page-header">\n' +
    '        <h1><a ui-sref="music.list">我的音乐</a><small>--编辑音乐</small><h1>\n' +
    '        </h1></h1></div>\n' +
    '    </div>\n' +
    '    <div class="container">\n' +
    '        <form ng-submit="doSave(music)">\n' +
    '            <div class="form-group">\n' +
    '                <label for="">歌曲标题</label>\n' +
    '                <input type="text" name="title" class="form-control" placeholder="请输入歌曲标题" ng-model="music.title">\n' +
    '            </div>\n' +
    '            <div class="form-group">\n' +
    '                <label for="">歌曲时长</label>\n' +
    '                <input type="text" name="time" class="form-control" placeholder="请输入歌曲时长" ng-model="music.time">\n' +
    '            </div>\n' +
    '            <div class="form-group">\n' +
    '                <label for="">歌手</label>\n' +
    '                <input type="text" name="singer" class="form-control" placeholder="请输入歌手姓名" ng-model="music.singer">\n' +
    '            </div>\n' +
    '            <div class="form-group">\n' +
    '                <label for="">歌曲文件</label>\n' +
    '                <input type="file" name="file" ng-model="music.file" id="file">\n' +
    '                <p class="help-block">请上传歌曲文件.</p>\n' +
    '            </div>\n' +
    '            <div class="form-group">\n' +
    '                <label for="">歌词文件</label>\n' +
    '                <input type="file" name="filelrc" ng-model="music.filelrc" id="filelrc">\n' +
    '                <p class="help-block">请上传歌词文件.</p>\n' +
    '            </div>\n' +
    '            <button type="submit" class="btn btn-success">完成编辑</button>\n' +
    '\n' +
    '        </form>\n' +
    '    </div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('MyAwesomePartials');
} catch (e) {
  module = angular.module('MyAwesomePartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/views/header.html',
    '<div class="aw-top-menu-wrap">\n' +
    '    <div class="container">\n' +
    '        <!-- 用户栏 -->\n' +
    '        <div class="aw-user-nav">\n' +
    '            <div ng-show="name">\n' +
    '                <a href="" class="aw-user-nav-dropdown"> {{name}},您好!</a>\n' +
    '                <div class="aw-dropdown dropdown-list pull-right">\n' +
    '                    <ul class="aw-dropdown-list">\n' +
    '                        <li><a ui-sref="logout"><i class="icon icon-logout"></i> 退出</a></li>\n' +
    '                    </ul>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <!-- 登陆&注册栏 -->\n' +
    '            <span ng-hide="name">\n' +
    '                <a ui-sref="register" class="register btn btn-normal btn-success">注册</a>\n' +
    '                <a ui-sref="login" class="login btn btn-normal btn-primary">登录</a>\n' +
    '            </span>\n' +
    '            <!-- end 登陆&注册栏 -->\n' +
    '        </div>\n' +
    '        <!-- end 用户栏 -->\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('MyAwesomePartials');
} catch (e) {
  module = angular.module('MyAwesomePartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/views/list.html',
    '<div class="container">\n' +
    '    <div class="page-header">\n' +
    '        <h1>首页--<small>我的音乐</small></h1>\n' +
    '    </div>\n' +
    '    <a class="btn btn-success" ui-sref="music.add">添加音乐</a>\n' +
    '</div>\n' +
    '<div class="container">\n' +
    '    <div class="row">\n' +
    '        <div class="col-md-8">\n' +
    '            <table class="table table-striped table-hover">\n' +
    '                <thead>\n' +
    '                    <th>歌曲标题</th>\n' +
    '                    <th>时长</th>\n' +
    '                    <th>歌手</th>\n' +
    '                    <th>编辑</th>\n' +
    '                    <th>删除</th>\n' +
    '                    <th>播放</th>\n' +
    '                </thead>\n' +
    '                <tbody class="list_container" id="list_container">\n' +
    '                    <tr ng-repeat="music in musics track by music._id">\n' +
    '                        <td>{{music.title}}</td>\n' +
    '                        <td>{{music.singer}}</td>\n' +
    '                        <td>{{music.time}}</td>\n' +
    '                        <td><a href="#!/music/edit?id={{music._id}}">编辑</a></td>\n' +
    '                        <td><a class="del" href="" ng-click="del(music._id,$index)">删除</a></td>\n' +
    '                        <td><span style="cursor:pointer" class="glyphicon glyphicon-play-circle ply" file="{{music.file}}" filelrc="{{music.filelrc}}" ng-click="play(music)"></span></td>\n' +
    '                    </tr>\n' +
    '                </tbody>\n' +
    '            </table>\n' +
    '        </div>\n' +
    '        <div class="col-md-4">\n' +
    '            <div scroll-lrc file="{{fileObj}}"></div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('MyAwesomePartials');
} catch (e) {
  module = angular.module('MyAwesomePartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/views/login.html',
    '<div id="wrapper">\n' +
    '    <div class="aw-login-box">\n' +
    '        <div class="mod-body clearfix">\n' +
    '            <div class="content pull-left">\n' +
    '                <h1 class="logo"><a href=""></a></h1>\n' +
    '                <h2><strong style="color:red">{{msg}}</strong></h2>\n' +
    '                <form ng-submit="doLogin(data)">\n' +
    '                    <ul>\n' +
    '                        <li>\n' +
    '                            <input type="text" id="aw-login-user-name" class="form-control" placeholder="用户名" name="username" ng-model="data.username">\n' +
    '                        </li>\n' +
    '                        <li>\n' +
    '                            <input type="password" id="aw-login-user-password" class="form-control" placeholder="密码" name="password" ng-model="data.password">\n' +
    '                        </li>\n' +
    '                        <li>\n' +
    '                            <br>\n' +
    '                            <div>\n' +
    '                                <div id="captcha2">\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                            <br>\n' +
    '                            <p id="notice2" class="hide">请先完成验证</p>\n' +
    '                        </li>\n' +
    '                        <li class="alert alert-danger hide error_message">\n' +
    '                            <i class="icon icon-delete"></i> <em></em>\n' +
    '                        </li>\n' +
    '                        <li class="last">\n' +
    '                            <input type="submit" class="pull-right btn btn-large btn-primary" value="登录">\n' +
    '                            <label>\n' +
    '                                <input type="checkbox" name="remember_me"> 记住我 </label>\n' +
    '                            <a href="http://wenda.golaravel.com/account/find_password/">&nbsp;&nbsp;忘记密码</a>\n' +
    '                        </li>\n' +
    '                    </ul>\n' +
    '                </form>\n' +
    '            </div>\n' +
    '            <div class="side-bar pull-left">\n' +
    '                <img src="../img/a.png" style="width: 160px">\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="mod-footer">\n' +
    '            <span>还没有账号?</span>&nbsp;&nbsp;\n' +
    '            <a ui-sref="register">立即注册</a>&nbsp;&nbsp;•&nbsp;&nbsp;\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('MyAwesomePartials');
} catch (e) {
  module = angular.module('MyAwesomePartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/views/logout.html',
    '<div class="container">\n' +
    '    <div class="info">\n' +
    '        <br> 提示信息：{{msg}}\n' +
    '        <br>\n' +
    '        <a ui-sref="login">点击跳转到登录</a>\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('MyAwesomePartials');
} catch (e) {
  module = angular.module('MyAwesomePartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/views/music.html',
    '<style type="text/css">\n' +
    '.mydiv {\n' +
    '    margin: 20 500;\n' +
    '    font-weight: bold;\n' +
    '    font-size: 30px;\n' +
    '    width: 100%;\n' +
    '}\n' +
    '</style>\n' +
    '<div class="mydiv">\n' +
    '    <strong style="color:hotpink">您好,欢迎来到音乐的世界</strong>\n' +
    '</div>\n' +
    '<!-- 音乐列表、添加音乐、编辑音乐、删除音乐 -->\n' +
    '<ui-view></ui-view>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('MyAwesomePartials');
} catch (e) {
  module = angular.module('MyAwesomePartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/views/register.html',
    '<script type="text/javascript">\n' +
    '</script>\n' +
    '<div class="aw-register-box">\n' +
    '    <div class="mod-head">\n' +
    '        <a href="/"></a>\n' +
    '        <h1>注册新用户</h1>\n' +
    '    </div>\n' +
    '    <div class="mod-body">\n' +
    '        <form class="aw-register-form" ng-submit="doRegister()">\n' +
    '            <ul>\n' +
    '                <li class="alert alert-danger hide error_message text-left">\n' +
    '                    <i class="icon icon-delete"></i> <em></em>\n' +
    '                </li>\n' +
    '                <li>\n' +
    '                    <input class="aw-register-name form-control" type="text" name="username" placeholder="用户名" ng-blur="checkUsername(data.username)" ng-model="data.username"> <strong style="color:red">{{msg}}</strong>\n' +
    '                </li>\n' +
    '                <li>\n' +
    '                    <input class="aw-register-email form-control" type="text" placeholder="邮箱" name="email" ng-model="data.email">\n' +
    '                </li>\n' +
    '                <li>\n' +
    '                    <input class="aw-register-pwd form-control" type="password" name="password" placeholder="密码" ng-model="data.password">\n' +
    '                </li>\n' +
    '                <!-- 自定义指令密码强度 -->\n' +
    '                <check-pwd pwd="{{data.password}}"></check-pwd>\n' +
    '                <hr>\n' +
    '                <li class="aw-register-verify">\n' +
    '                    <img class="pull-right" width="120" src="http://127.0.0.1:12345/public/getPic" onclick="this.src=\'http://127.0.0.1:12345/public/getPic?\'+Date.now()">\n' +
    '                    <input type="text" class="form-control" name="vcode" placeholder="验证码" ng-model="data.vcode">\n' +
    '                </li>\n' +
    '                <li class="last">\n' +
    '                    <label>\n' +
    '                        <input type="checkbox" checked="checked"> 我同意</label> <a href="javascript:;" class="aw-agreement-btn">用户协议</a>\n' +
    '                    <a href="/login" class="pull-right">已有账号?</a>\n' +
    '                    <div class="aw-regiter-agreement hide">\n' +
    '                        <div class="aw-register-agreement-txt" id="register_agreement"></div>\n' +
    '                    </div>\n' +
    '                </li>\n' +
    '                <li class="clearfix">\n' +
    '                    <button type="submit" class="btn btn-large btn-blue btn-block">\n' +
    '                        注册\n' +
    '                    </button>\n' +
    '                </li>\n' +
    '            </ul>\n' +
    '        </form>\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('MyAwesomePartials');
} catch (e) {
  module = angular.module('MyAwesomePartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/views/scrollLrc.html',
    '<style type="text/css">\n' +
    '#box {\n' +
    '    background-color: rgba(0, 0, 0, 0.1);\n' +
    '    width: 100%;\n' +
    '    height: 100px;\n' +
    '    position: absolute;\n' +
    '    overflow-y: auto;\n' +
    '}\n' +
    '\n' +
    '#lrc {\n' +
    '    text-align: center;\n' +
    '    position: inherit;\n' +
    '    margin-top: 30px;\n' +
    '    width: 100%;\n' +
    '}\n' +
    '\n' +
    '#ad {\n' +
    '    margin: 100px 0 0 0;\n' +
    '    width: 200px;\n' +
    '}\n' +
    '\n' +
    '.hl {\n' +
    '    background-color: red;\n' +
    '    font-weight: bold;\n' +
    '    font-size: 20px;\n' +
    '}\n' +
    '</style>\n' +
    '<div id="box" class="col-md-8">\n' +
    '    <div id="lrc">\n' +
    '    </div>\n' +
    '</div>\n' +
    '<div id="ad" class="col-md-4">\n' +
    '    <div>正在播放音乐:</div>\n' +
    '    <audio id="audio" autoplay src="{{audioSrc}}" controls="controls">\n' +
    '    </audio>\n' +
    '</div>\n' +
    '');
}]);
})();
