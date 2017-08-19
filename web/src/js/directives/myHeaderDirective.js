(function(angular) {
    angular.module('music.headerDirective', [])
        .directive('myHeader', ['userService', function(userService) {
            return {
                templateUrl: '/views/header.html',
                link: function(scope, ele) {
                    //监视一定需要是scope的属性
                    scope.us = userService;
                    scope.$watch('us.name', function(newV, oldV) {
                        scope.name = newV; //第一次的时候可能是空串，空串代表false
                    })
                }

            }
        }])
})(angular);
