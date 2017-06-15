(function(angular) {
    angular.module('music.userService', [])
        .service('userService', ['$window', function($window) {
            this.name = $window.sessionStorage.getItem('username'); //初始化等于sessionStorage
            this.token = $window.sessionStorage.getItem('token');

            //给个空串判断，防止用户从头到尾就没有permissions
            this.permissions = $window.sessionStorage.getItem('permissions') || '';

            if ($window.sessionStorage.getItem('permissions') == 'undefined') {
                this.permissions = '';
            }


            this.setName = function(name) { //登录的时候设置ABC，退出的时候设置''
                this.name = name;
                //将其存储到sessionStoage中
                $window.sessionStorage.setItem('username', name);
            }
            this.setToken = function(token) {
                this.token = token;
                //将其存储到sessionStoage中
                $window.sessionStorage.setItem('token', token);
            }
            this.setPermissions = function(permissions) {
                    this.permissions = permissions;
                    if ($window.sessionStorage.getItem('permissions') == 'undefined') {
                        this.permissions = '';
                    }
                    $window.sessionStorage.setItem('permissions', JSON.stringify(permissions));
                }
                //判断当前的url是否存在与权限集合中
            this.hasPermissions = function(url) {
                return this.permissions.indexOf(url) != -1;
            }
        }])
})(angular);
