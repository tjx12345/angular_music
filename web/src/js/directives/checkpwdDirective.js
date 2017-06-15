(function(angular) {
    angular.module('music.checkpwdDirective', [])
        .directive('checkPwd', function() {
            return {
                templateUrl: '/views/checkPwd.html',
                scope: {
                    pwd: '@',
                    // =表示 双向数据绑定,如果外部直接给pwd="data.pwd",当你们修改，相互影响
                    // @表示 单向数据绑定,如果外部修改，影响内部，内部修改不影响外部
                },
                link: function(scope, element, attrs) {
                    scope.pwd = '';
                    scope.$watch('pwd', function(newV, oldV) {
                        // console.log(element.children());
                        var level = scope.checkPwdLevel(newV);
                        //获取DOM中的div们
                        var divs = element.children().children();

                        //声明三个颜色
                        var colors = ['yellowgreen', 'skyblue', 'hotpink'];
                        for (var i = colors.length - 1; i >= 0; i--) { //清空颜色
                            divs[i].style.backgroundColor = '';
                        }

                        for (var i = 0; i < level; i++) {
                            divs[i].style.backgroundColor = colors[i];
                        }

                    });


                    scope.checkPwdLevel = function(str) {
                        //低: 只有数字
                        var regex1 = /[0-9]/;
                        //中: 包含字符串
                        var regex2 = /[a-zA-Z]/;
                        //高: 包含特殊符号
                        var regex3 = /[~!@#$%^&*()]/;
                        var level = 0;

                        if (regex1.test(str)) level++;
                        if (regex2.test(str)) level++;
                        if (regex3.test(str)) level++;

                        return level;

                    }
                }
            }
        })
})(angular);
