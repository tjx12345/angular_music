(function(angular) {
    angular.module('music.list', [])
        .controller('listController', ['$scope', '$http', 'host', function($scope, $http, host) {
            $http.get(host.list.url, host.list.handler)
                .then(function(res) {
                    $scope.musics = res.data.musics;
                }, function(err) {
                    console.log(err);
                })


            //挂载音乐播放按钮的点击事件函数
            $scope.play = function(music) {
                //触发滚动歌词指令的更新
                $scope.fileObj = {
                    file: music.file,
                    filelrc: music.filelrc
                }


            }

            //删除功能
            $scope.del = function(id, index) {
                if (confirm('确定要删除吗')) {
                    //发起请求
                    $http.delete(host.delete.url + id, host.delete.handler)
                        .then(function(res) {
                            if (res.data.code === '001') {
                                //删除元素
                                $scope.musics.splice(index, 1);
                            } else {
                                alert(res.data.msg);
                            }
                        }, function(err) {
                            console.log(err);
                        })
                }
            }


        }])
})(angular);
