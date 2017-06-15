(function(angular) {
    angular.module('music.logout', [])
        .controller('logoutController', ['$scope', 'userService', '$timeout', '$state', function($scope, userService, $timeout, $state) {
            $scope.msg = '尊敬的 ' + userService.name + ',您正在退出，请稍后..';
            userService.setName(''); //设置头的显示名称
            userService.setToken(''); //清空token
            userService.setPermissions(''); //清空权限
            $timeout(function() {
                //跳转到登录页
                $state.go('login');
            }, 2000)
        }]);
})(angular);
