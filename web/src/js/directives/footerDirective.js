(function(angular) {
    angular.module('music.footerDirective', [])
        .directive('myFooter', function() {
            return {
                template: '<div class="aw-footer-wrap">' +
                    '<div class="aw-footer">' +
                    ' Copyright © 2016, All Rights Reserved</span>' +
                    '   <span class="hidden-xs">Powered By <a href="http://www.itcast.cn" target="blank">ITcast</a></span>' +
                    '</div>' +
                    '</div>',

            }
        })
})(angular);
