import http from 'axios'

http.defaults.timeout = 100000;

//  http.defaults.headers.post['Content-Type'] = 'application/json'
// cache-control: "max-age=0, private, must-revalidate"
//http.defaults.headers.post['Cache-control'] = 'max-age=5'
//http.defaults.headers.post['Access-Control-Allow-Headers'] = 'x-access-token'
//http.defaults.headers.post['X-ACCESS_TOKEN'] = 'Access-Control-Allow-Origin'
// Add a request interceptor 解决ie下url带中文参数乱码问题
http.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // console.log(config)
    config.headers['loginId'] = sessionStorage.getItem('loginId') || "2d07e7953a2a63ceda6df5144d1abec3";
    config.headers['token'] = sessionStorage.getItem('token')|| "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDA1NTIxMjU2NTksInBheWxvYWQiOiJ7XCJpZFwiOjE1Mzk2ODgxMjUxNDMsXCJhY2NvdW50XCI6XCJoZW5hbl9jdWlndW9jaGFvXCIsXCJuYW1lXCI6XCLltJTlm73otoVcIixcIm9yZ0NvZGVcIjpcImhlbmFuemhvbmd5YW5cIixcIm9yZ0lkXCI6XCJoZW5hbnpob25neWFuXCIsXCJvcmdOYW1lXCI6bnVsbCxcImRlcHRcIjpudWxsLFwibW9iaWxlXCI6bnVsbCxcIm1lbW9cIjpudWxsLFwiaXBcIjpudWxsLFwic3RhdHVzXCI6bnVsbCxcImN0aW1lXCI6bnVsbCxcInV0aW1lXCI6bnVsbCxcImNyZWF0b3JcIjpudWxsLFwic21hbGxVcmxcIjpudWxsLFwiYmlnVXJsXCI6bnVsbCxcImxvZ2luVGltZVwiOjE1Mzk2ODgxMjUxNDMsXCJtYW5hZ2VyXCI6ZmFsc2UsXCJ0eXBlXCI6bnVsbCxcIm9yZ1JlZ2lvblwiOm51bGx9In0.6fSIYMcwSIzwDkSMt88Ww9dN8ApJhjP2v9EaLEBBL1w";


    if (config.method == 'get') {
      config.url = encodeURI(config.url);
      // config.data = config.params
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
http.interceptors.response.use(
  function (response) {
    // Do something with response data
    // console.log(response)

    if (response.headers['content-type'] == "application/vnd.ms-excel") {

    }


    return response;
  },
  function (error) {
    // Do something with response error
    if (error.response) {
      if (error.response.status === 400) {
        error.response('客户端请求的语法错误，服务器无法理解！');
      } else if (error.response.status === 401) {
        // define window.app=vm in main.js
        // window.app.$message.error('请求要求用户的身份认证！');
        window.app.$router.push({
          name: 'Login'
        });
      } else if (error.response.status === 403) {
        window.app.$message.error('服务器理解请求客户端的请求，但是拒绝执行此请求！');
      } else if (error.response.status === 404) {
        window.app.$message.error('服务器无法根据客户端的请求找到资源（网页）。通过此代码，网站设计人员可设置"您所请求的资源无法找到"的个性页面！');
      } else if (error.response.status === 500) {
        window.app.$message.error('服务器内部错误，无法完成请求！');
      } else {
        error.response = '服务器错误，无法完成请求！';
      }
    }

    return Promise.reject(error);
  }
);

export default http;





