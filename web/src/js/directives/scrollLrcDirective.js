(function(angular) {
    angular.module('music.scrollLrcDirective', [])
        .directive('scrollLrc', ['$http', 'host', function($http, host) {
            return {
                templateUrl: '/views/scrollLrc.html',
                scope: {
                    file: '@',
                    // =表示 双向数据绑定,如果外部直接给pwd="data.pwd",当你们修改，相互影响
                    // @表示 单向数据绑定,如果外部修改，影响内部，内部修改不影响外部
                },
                link: function(scope, element, attrs) {
                    var lrc = element.children().children()[0];
                    var audio = element.children().children()[2];
                    scope.createLrcDom = function(obj) {
                        var html = '';
                        for (var time in obj) {
                            //加上时间便于未来查找元素
                            html += '<p time=' + time + '>' + obj[time] + '</p>'
                        }

                        lrc.innerHTML = html;
                    }


                    //解析歌词对象
                    scope.parseLrc = function(lrcStr) {
                        var obj = {};
                        ///   /\[(\d{2})\:(\d{2})\.(\d{1,2})\](.*)/
                        var regex = /\[(\d{2})\:(\d{2})\.(\d{1,2})\](.*)/;
                        //以换行符为标识切割字符串
                        var lines = lrcStr.split('\n');
                        for (var i = 0; i < lines.length; i++) {
                            var line = lines[i];
                            var result = regex.exec(line);
                            if (!result) continue;
                            var minutes = result[1];
                            var seconds = result[2];
                            var hm = result[3];
                            var content = result[4];

                            var time = minutes * 60 + (seconds - 0); //1 或者5 或者7
                            obj[time] = content;
                        }
                        return obj;
                    }

                    //滚动歌词
                    scope.scroll = function(jumpPoint, obj) {
                        //如果当前的描述是不存在于歌词文件中，return
                        if (!obj[jumpPoint]) return;

                        $lrc = $(lrc);
                        //寻找元素
                        $p = $lrc.find('p[time=' + jumpPoint + ']');
                        //求高差距
                        var minusH = $lrc.offset().top - $p.offset().top;
                        //添加样式并且移除其他兄弟元素的样式
                        $p.addClass('hl').siblings().removeClass('hl');
                        //动画
                        $lrc.animate({
                            top: minusH
                        }, 'slow');
                    }



                    //发请求获取歌词数据，之后播放音乐 -> src =路径
                    scope.$watch('file', function(newV, oldV) {
                        //判断是否是页面刷新，初始值的情况
                        if (newV === oldV) return;
                        //将字符串转换成对象
                        var fileObj = JSON.parse(newV);

                        $http.get(fileObj.filelrc, host.filelrc.handler)
                            .then(function(res) {

                                var obj = scope.parseLrc(res.data);
                                scope.createLrcDom(obj);
                                //清除事件
                                $('#audio').off('timeupdate');
                                $('#audio').on('timeupdate', function(e) {
                                    // console.log(e.target.currentTime); -> 0.393108
                                    var s = Math.round(e.target.currentTime);
                                    scope.scroll(s, obj);
                                });

                                //让歌曲播放
                                scope.audioSrc = fileObj.file;


                            }, function(err) {
                                console.log(err);
                            })
                    });





                }
            }
        }])
})(angular);
