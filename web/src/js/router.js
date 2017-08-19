(function(angular) {
    angular.module('music.router', [])
        .config(['$stateProvider', '$urlRouterProvider', '$transitionsProvider', '$sceDelegateProvider', 'Whitelist', function($stateProvider, $urlRouterProvider, $transitionsProvider, $sceDelegateProvider, Whitelist) {
            $sceDelegateProvider.resourceUrlWhitelist(Whitelist);
            $transitionsProvider.onStart({ to: 'music.**' }, function(s) {
                var userService = s.injector().get('userService');
                return userService.hasPermissions(s.to().url);
            });

            //默认进入login
            $urlRouterProvider.otherwise('login');
            $stateProvider.state('register', { //注册
                    url: '/register',
                    templateUrl: '/views/register.html',
                    controller: 'registerController',
                })
                .state('login', { //登录
                    url: '/login',
                    templateUrl: '/views/login.html',
                    controller: 'loginController',
                })
                .state('music', { //音乐父级路由
                    url: '/music',
                    templateUrl: '/views/music.html'
                })
                .state('music.list', { //音乐子集路由
                    url: '/list',
                    templateUrl: '/views/list.html',
                    controller: 'listController'
                })
                .state('logout', { //退出页面
                    url: '/logout',
                    templateUrl: '/views/logout.html',
                    controller: 'logoutController'
                })
                .state('music.add', { //添加音乐页面
                    url: '/add',
                    templateUrl: '/views/add.html',
                    controller: 'addMusicController'
                })
                .state('music.edit', { //编辑页面
                    url: '/edit?id',
                    templateUrl: '/views/edit.html',
                    controller: 'editMusicController'
                })

        }])
})(angular);
