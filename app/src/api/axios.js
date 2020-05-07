import axios from "axios";
// import qs from "qs";
// 登录接口函数
export function UserLogin(value) {
  const url = "http://114.116.242.72:8080/login/login.do";
  return axios.get(url,{
    params:value,
    headers:{
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    }
  }).then(res => {
      return Promise.resolve(res.data);
    });
}

// 注册接口函数
export function UserSignup(value) {
  const url = "http://114.116.242.72:8080/user/register.do";
  return axios.get(url,{
    params:value,
    headers:{
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    }
  }).then(res => {
      return Promise.resolve(res.data);
    });
}

// 发布动态
export function ShareMood(value) {
  const url = "http://114.116.242.72:8080/trend/insert.do";
  return axios.get(url,{
    params:value,
    headers:{
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    }
  }).then(res => {
      return Promise.resolve(res.data);
    });
}

// 查询动态
export function trendList(value) {
  const url = "http://114.116.242.72:8080/trend/select.do";
  return axios.get(url,{
    params:value,
    headers:{
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    }
  }).then(res => {
      return Promise.resolve(res.data);
    });
}

// 查询动态
export function trendView(value) {
  const url = "http://114.116.242.72:8080/trend/view.do";
  return axios.get(url,{
    params:value,
    headers:{
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    }
  }).then(res => {
    console.log(res);
      return Promise.resolve(res.data);
    });
}