import axios from "axios";
import qs from "qs";
import $ from 'jquery'

const api = 'localhost:8082'

//用户信息查询接口函数
export function userDataPost(userInfo) {
  const url = api + '/user/select.do';
  var data = userInfo 
  return axios.get(url,{
		params:data,
		headers: {
         "Content-Type": "multipart/form-data"
		},
	}).then(res => {
        return Promise.resolve(res.data);
    });
}

// 登录接口函数
export function loginDataPost(values) {
  const url = api + "/login/login.do";

  return axios
    .get(url, {
		params: values,
		headers: {
			"Content-Type": "multipart/form-data"
		}
    })
    .then(res => {
      return Promise.resolve(res.data);
    });
}

// 注册接口函数
export function registerPost(values) {
	let obj = {
		type: "2"
	}
	values = Object.assign(values, obj)

  const url = api + "/user/register.do";
  
  
  return axios
    .get(url,{
		params: values,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
		},
    })
    .then(res => {
		return Promise.resolve(res.data);
    });
}

// 修改用户信息接口函数
export function editUserData (values) {
	const url = api + '/user/update.do'
	return axios
		.get(url, {
			params: values
		})
		.then(res => {
			return Promise.resolve(res.data);
		})
}

// 删除用户信息接口函数
export function delUserData (id) {
	const url = api + '/user/delete.do'
	
	return axios
		.get(url, {
			params: {
				id
			},
			headers: {
				"Content-Type": "multipart/form-data"
			}
		})
		.then(res => {
			return Promise.resolve(res.data);
		})
}

// 动态消息查询接口函数
export function actionDataPost(values) {
  const url = api + '/trend/select.do';
   
  return axios.get(url,{
		params:values,
		headers: {
         "Content-Type": "multipart/form-data"
		},
	}).then(res => {
        return Promise.resolve(res.data);
    });
}

// 动态消息删除接口函数
export function delActionData(id) {
  const url = api + '/trend/delete.do';
   
  return axios.get(url,{
		params:{
			id
		},
		headers: {
         "Content-Type": "multipart/form-data"
		},
	}).then(res => {
        return Promise.resolve(res.data);
    });
}

// 动态消息封禁接口函数
export function banActionData(values) {
	const url = api + '/trend/update.do';
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

// 获取动态消息图片接口函数
export function imgDataPost(imgUrl) {
	const url = api + '/trend/getPic.do?url=';
	
	return url
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

// 求助信息更新接口函数
export function handleDataPost(values) {
	const url = api + '/seek/update.do';
	
	return axios.get(url, {
		params: values,
		headers: {
			"Content-Type": "multipart/form-data"
		},
	}).then(res => {
		return Promise.resolve(res.data)
	})
}

// 删除求助信息接口函数
export function delHandleData(id) {
	const url = api + '/seek/delete.do'
	
	return axios.get(url, {
		params: {
			id
		},
		headers: {
			"Content-Type": "multipart/form-data"
		}
	}).then(res => {
		return Promise.resolve(res.data)
	})
}