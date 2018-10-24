import http from 'axios'
import {router} from '../main'
import NProgress from 'nprogress'

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
    config.headers['loginId'] = sessionStorage.getItem('access_loginId') || "2d07e7953a2a63ceda6df5144d1abec3";
    config.headers['token'] = sessionStorage.getItem('access_token')
    config.headers['CLIENTSESSIONID'] = sessionStorage.getItem('CLIENTSESSIONID')
    if (config.method == 'get') {
      config.url = encodeURI(config.url);
      // config.data = config.params
    }
    NProgress.start()

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


    if(response.data.ret == '100405') {
      alert(response.data.message || "请重新登陆！")
      router.push({
        path:"/login"
      })
    }else if(response.data.ret == '100408') {
      alert(response.data.message ||"此帐号已在其他地方登录，您已被迫下线！")
      router.push({
        path:"/login"
      })
    }else if(response.data.ret == '100409') {
      alert(response.data.message ||"密码时限超出，请修改密码！")
      router.push({
        path:"/login"
      })
    }

    NProgress.done()

    if (response.headers['content-type'] == "application/vnd.ms-excel") {
      //do something
    }


    return response;
  },
  function (error) {
    // Do something with response error
    if (error.response) {
      if (error.response.status === 400) {
        alert('客户端请求的语法错误，服务器无法理解！');
      } else if (error.response.status === 401) {
        // define window.app=vm in main.js
        // window.app.$message.error('请求要求用户的身份认证！');
        router.push({
          path:"/login"
        })
      } else if (error.response.status === 403) {
        alert('服务器理解请求客户端的请求，但是拒绝执行此请求！');
      } else if (error.response.status === 404) {
        alert('服务器无法根据客户端的请求找到资源（网页）。通过此代码，网站设计人员可设置"您所请求的资源无法找到"的个性页面！');
      } else if (error.response.status === 500) {
        alert('服务器内部错误，无法完成请求！');
      } else {
        error.response = '服务器错误，无法完成请求！';
      }
    }

    return Promise.reject(error);
  }
);

export default http;





