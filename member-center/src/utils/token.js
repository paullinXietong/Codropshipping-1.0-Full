import dayjs from "dayjs";
var localizedFormat = require("dayjs/plugin/localizedFormat");
export const setToken = (token) => {
    localStorage.setItem("TOKEN", token);
  };
  export const getToken = () => {
    return localStorage.getItem("TOKEN");
  };
  export const removeToken=()=>{
     localStorage.removeItem("TOKEN");
  }
  
  export const setEmail = (userEmail) => {
    localStorage.setItem("EMAIL", userEmail);
  };
  export const getEmail = () => {
    return localStorage.getItem("EMAIL");
  };
  export const removeEmail=()=>{
     localStorage.removeItem("EMAIL");
  }
//   export const  userId=(id)=>{
//       sessionStorage.setItem('GETUSERINFO',id)
//   }
export function formENData(date){
  dayjs.extend(localizedFormat);
  return dayjs(date).format("lll");
}

export function formENDatall(date){
  dayjs.extend(localizedFormat);
  return dayjs(date).format("ll");
}

