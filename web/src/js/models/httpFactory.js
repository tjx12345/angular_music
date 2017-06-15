(function(angular) {
    angular.module('music.httpFactory', [])
        .factory('httpFactory', ['$window', 'host', function($window, host) {
            return {
                request: function(config) {

                    // {
                    //     url: host + '/api/register', //注册
                    //     handler: {
                    //         withCredentials: true //允许携带证书->cookie
                    //     }
                    // }
                    //{ 
                    //             checkusername: {
                    //                url: host + '/api/check/username', //验证用户名的url
                    //                handler: { //请求方式

                    //                }
                    //            }
                    //             }

                    // for (var urlname in host) {
                    //     var urlObj = host[urlname];
                    //     for (var urlObjKey in urlObj) {
                    //         if (urlObjKey === 'url') {
                    //             //如果匹配url
                    //             if (config.url === urlObj[urlObjKey]) {
                    //                 //获取到其配置请求头
                    //                 var handlerObj = urlObj['handler']; //{headers:{} ,xxx:xxx}
                    //                 for (var key in handlerObj) {
                    //                     if (key === 'headers') {
                    //                         //header的头
                    //                         var headerObj = handlerObj[key];
                    //                         for (var key2 in headerObj) {
                    //                             config.headers[key2] = headerObj[key2];
                    //                         }

                    //                     } else { //不是header
                    //                         config[key] = handlerObj[key];
                    //                     }

                    //                 }
                    //             }
                    //         }
                    //     }
                    // }


                    //判断是否需要添加头信息
                    var token = $window.sessionStorage.getItem('token');
                    if (token) {
                        //向请求头中加入有信息
                        config.headers.mytoken = token;
                    } //否则头信息不变
                    return config;
                },
                response: function(response) {
                    return response;
                }
            }
        }])
})(angular);
