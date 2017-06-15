(function(angular) {
    //

    // 主模块
    angular.module('music', [
        'MyAwesomePartials', //模板缓存
        'ui.router',
        'music.hostConfig', //全局url配置
        'music.router', //前端路由列表
        'music.register', //注册
        'music.checkpwdDirective', //密码强度指令
        'music.login', //登录
        'music.httpFactory', //拦截器的具体操作
        'music.list', //音乐列表
        'music.scrollLrcDirective', //滚动歌词指令
        'music.footerDirective', //底部组件
        'music.headerDirective', //头部组件
        'music.userService', //操作用户数据
        'music.logout', //退出
        'music.add', //添加音乐
        'music.edit', //编辑音乐
    ]).
    config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.headers.post = {
            'content-type': 'application/x-www-form-urlencoded'
        };
        $httpProvider.defaults.transformRequest = function(data) {
            var tmp = '';
            for (var key in data) {
                tmp += key + '=' + data[key] + '&'
            }
            //去除&
            return tmp.substr(0, tmp.length - 1);
        };
        //配置每次请求，如果有自定义的头token，通过拦截器自动加入到请求头中
        $httpProvider.interceptors.push('httpFactory');

    }])


})(angular);
