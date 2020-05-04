import axios from 'axios';
import qs from 'qs'

export async function qingqiu(params) {
   const url = "http://139.199.192.171:8080/user/select.do"
   axios.post(url,qs.stringify(params),{
       headers:{
           "Content-Type":"application/x-www-form-urlencoded"
       }
   }).then(res => {
       return res;
   })
}