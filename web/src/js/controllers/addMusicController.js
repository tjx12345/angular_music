(function(angular) {
    angular.module('music.add', [])
        .controller('addMusicController', ['$scope', '$http', 'host', '$state', function($scope, $http, host, $state) {
            //$scope.data.xxx // undefined    
            $scope.data = {};

            //定义提交上传的函数
            $scope.doUpload = function(data) {

                //创建FormData对象
                var fd = new FormData();
                //歌名
                fd.append('title', data.title);
                //时长
                fd.append('time', data.time);
                //歌手
                fd.append('singer', data.singer);
                // // angular.element  也可以使用angular.element(DOM)  jqlite对象功能不强大，还需要先获取到DOM元素
                // $('file') 更为简单
                // document.document.getElementById('file') //直接获取DOM元素也能操作
                fd.append('file', $('#file').get(0).files[0]);
                fd.append('filelrc', $('#filelrc').get(0).files[0]);

                //restful中新增 用post请求
                $http.post(host.upload.url, fd, host.upload.handler)
                    .then(function(res) {
                        if (res.data.code === '001') {
                            //跳转
                            $state.go('music.list');
                        }

                    }, function(err) {
                        console.log(err);
                    })

            }

        }])
})(angular);
