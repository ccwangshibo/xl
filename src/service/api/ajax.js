import axios from 'axios'

export default function ajax(url='',params={},type='get'){
  // 定义一个变量接收
  let promise='';
  // 1.返回Promise对象
  return new Promise(function(resolve,reject){
    // 1.1判断请求类型
    if(type=='get'){
      // // 1.2拼接字符串
      // let paramsStr='';
      // // 1.3遍历对象
      // Object.keys(params).forEach(key=>{
      //   paramsStr+=key+'='+params[key]+'&'
      // })
      // 发送get请求
      promise=axios.get(url,{params:{}});
    }else if(type=='post'){
      // 发送post请求
      promise=axios.post(url,params);
    }
    // 2.接收结果并返回
    promise.then((response)=>{
      resolve(response.data)
    }).catch(error=>{
      reject(error)
    })
  });
}