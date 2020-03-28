/**
 *  func  getCookieObj()  获取所有cookie的值并将其保存为对象的属性
 **/
export function getCookieObj(){
  var cookieObj={},
      cookieSplit=[],
      // 以分号（;）分组
      cookieArr=document.cookie.split(";");
  for(var i=0,len=cookieArr.length;i<len;i++)
    if(cookieArr[i]) {
      // 以等号（=）分组
      cookieSplit=cookieArr[i].split("=");
      // Trim() 是自定义的函数，用来删除字符串两边的空格
      cookieObj[cookieSplit[0].trim()]=cookieSplit[1].trim();
    }
  return cookieObj;
}

// 设置cookie
function setCookie(c_name, value, expiredays) {
  let exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie = c_name + "=" + escape(value) +
      ((expiredays == null) ? "" : ";expires=" + exdate.toUTCString()) + ";path=/";
}

function getCookie(c_name) {
  let c_start,c_end;
  if (document.cookie.length > 0) {
    c_start = document.cookie.indexOf(c_name + "=");
    if (c_start != -1) {
      c_start = c_start + c_name.length + 1;
      c_end = document.cookie.indexOf(";", c_start);
      if (c_end == -1) c_end = document.cookie.length;
      return unescape(document.cookie.substring(c_start, c_end))
    }
  }
  return ""
}

function delCookie(c_name) {
  let exdate = new Date();
  exdate.setDate(exdate.getDate() - 10);
  document.cookie = c_name + "=" + escape(getCookie(c_name)) + ";expires=" + exdate.toUTCString() + ";path=/";
}

export {setCookie,getCookie,delCookie}