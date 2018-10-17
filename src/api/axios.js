/*
* success : 请求成功执行的函数
* fail：请求失败执行的函数
*
* */

import http from './http';
import qs from 'qs';






//有的请求需要用户认证，视情况而定
// const getConfig = function (auth) {
//   let config = {}
//   if(auth){
//     config.headers={
//       "Authorization": auth
//     }
//   }
//   return config;
// }

var request = {
  get:function (url,param,success,fail) {
    return http.get(url,{
      params:param
    }).then((res) => {
      if(success){
        success(res.data);
      }
    }).catch(function (error) {
      if(fail){
        fail(error);
      }
      console.log(error);
    })
  },
  post:function (url,param,jsonFlag,success,fail) {
    var config = {
      method: "POST",
      url:url,
    };
    if(jsonFlag){
      config.headers = {
        'Content-Type': 'application/json;charset=UTF-8'
      }
      config.data = JSON.stringify(param);
      return http(config)
        .then((res) => {
          if(success){
              success(res.data);
          }
        })
        .catch(function (error) {
          if(fail){
            fail(error);
          }
          console.log(error);
        })
    }else{
      config.data = qs.stringify(param);
      return http(config)
        .then((res) => {
          success(res.data);
        })
        .catch(function (error) {
          if(fail){
            fail(error);
          }
          console.log(error);
        })
    }

  },
  // put:function (url,data,auth,success,fail) {
  //   return http.put(url,data,getConfig(auth))
  //     .then((res)=> {
  //       success(res);
  //     })
  //     .catch(function (error) {
  //       if(fail){
  //         fail(error);
  //       }
  //       console.log(error);
  //     })
  // },
}


// 用法
// this.$request1.get(url,params,res => {
//
// },err => {
//
// })
// this.$request1.post(url,params,true,res => {
//
// },err => {

// })
export default  request  ;
