//以下代码都需要被引入和声明依赖
(function(angular) {
    angular.module('music.login', [])
        .controller('loginController', ['$scope', '$http', 'host', '$state', 'userService', function($scope, $http, host, $state, userService) {
            //初始化data
            $scope.data = {};
            //挂载登录提交函数
            $scope.doLogin = function(data) {
                //1:验证表单数据是否为空
                if (!data.username || data.username.trim() === '') {
                    return $scope.msg = '用户名不能为空';
                }
                if (!data.password || data.password.trim() === '') {
                    return $scope.msg = '密码不能为空';
                }
                //2:将数据发送到后台 /api/login, 请求方式是:post/ ok!
                $http.post(host.login.url, data, host.login.handler)
                    .then(function(res) {
                        //3:成功-> 跳转到list页面  失败->  给予提示，清空数据
                        if (res.data.code === '001') {

                            //保存权限
                            userService.setPermissions(res.data.permissions);
                            //接受token res.data.token,保存到客户端add/edit/delete
                            userService.setToken(res.data.token);
                            //设置用户名称，作为头部显示
                            userService.setName(data.username);
                            //成功临时跳转到注册页面
                            $state.go('music.list');
                        } else {
                            $scope.msg = res.data.msg;
                        }
                    }, function(err) {
                        console.log(err);
                    })

            }
        }])
})(angular);
