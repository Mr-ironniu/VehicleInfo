import axios from "axios";
// import qs from "qs";

const api = 'http://114.116.242.72:8080'

// 登录接口函数
export function UserLogin(value) {
  const url = api + "/login/login.do";
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
  const url = api + "/user/register.do";
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
  const url = api + "/trend/insert.do";
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
  const url = api + "/trend/select.do";
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
  const url = api + "/trend/view.do";
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

// 查询求助信息接口函数
export function helpDataPost(values) {
	const url = api + '/seek/select.do';	
	console.log(values)
	return axios.get(url,{
		params: values,
		headers: {
			"Content-Type": "multipart/form-data"
		},
	}).then(res => {
		return Promise.resolve(res.data);
	});
}

// 新增求助信息接口函数
export function helpDataSubmit(values) {
	const url = api + '/seek/insert.do';	
	console.log(values)
	
	return axios.get(url,{
		params: values
	}).then(res => {
		return Promise.resolve(res.data);
	});
}

// 获取动态消息图片接口函数
export function imgDataPost() {
	const url = api + '/trend/getPic.do?url=';
	
	return url
}