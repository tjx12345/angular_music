(function(angular) {
    var host = 'http://127.0.0.1:12345';
    angular.module('music.hostConfig', [])
        .constant('host', {
            checkusername: {
                url: host + '/api/check/username', //验证用户名的url
                handler: { //请求方式

                }
            },
            register: {
                url: host + '/api/register', //注册
                handler: {
                    withCredentials: true //允许携带证书->cookie
                }
            },
            login: {
                url: host + '/api/login', //登錄
                handler: {

                }
            },

            list: {
                url: host + '/api/music/list', //音樂
                handler: {

                }
            },
            delete: {
                url: host + '/api/music/delete?id=', //刪除   ,这两个是不会匹配到拦截器的
                handler: {

                }
            },
            jsonp: {
                url: host + '/myjsonp/music/', //獲取音樂通過id
                handler: {

                }
            },
            update: {
                url: host + '/api/music/update', //更新音乐
                handler: {
                    headers: {
                        'content-type': undefined //针对包含文件上传 multipart/form-data
                    },
                    transformRequest: function(data) { //原样输出
                        return data;
                    }
                }
            },
            upload: {
                url: host + '/api/music/upload', //上传音乐
                handler: {
                    headers: {
                        'content-type': undefined //针对包含文件上传 multipart/form-data
                    },
                    transformRequest: function(data) { //原样输出
                        return data;
                    }
                }
            },
            filelrc: {
                url: '',
                handler: {
                    transformResponse: function(data) {
                        return data;
                    }
                }
            }
        })
        .constant('Whitelist', [host + '/**', 'self'])


})(angular);
