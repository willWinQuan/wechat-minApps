var config = require('config.js');
var innerAudioContext='';
var version=''
//loading提示
function showLoading(title = "加载中...", duration = 5000) {
    wx.showToast({
        title: title,
        icon: 'loading',
        duration: (duration <= 0) ? 5000 : duration
    });
}

//隐藏提示框
function hideToast() {
    wx.hideToast();
}

// 请求数据公共函数get
function commonRequest(data, url, callback) {
  wx.request({
    url: config.http_host + url,
    data: data,
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
    // header: {}, // 设置请求的 header  
    success: function (res) {
      typeof callback == "function" && callback(res);
    },
    fail: function (err) {
      console.log(err)
      hideToast();
      wx.showModal({
        title: '提示',
        content: '数据请求失败，检查网络是否正常',
        showCancel: false
      })
    },
    complete: function (msg) {
      // console.log(msg)     
    }
  })
}

// 请求数据公共函数post
function commonRequestPost(data, url, callback) {
  wx.request({
    url: config.http_host + url,
    data: data,
    method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },// 设置请求的 header  
    success: function (res) {
      typeof callback == "function" && callback(res);
    },
    fail: function (err) {
      console.log(err);
      hideToast();
      wx.showModal({
        title: '提示',
        content: '数据请求失败，检查网络是否正常',
        showCancel: false
      })
      // typeof callback == "function" && callback(err)
    },
    complete: function (msg) {
      // console.log(msg)

    }
  })
}

// 成功提示
function showSuccess(title = "成功了", duration = 2500) {
  wx.showToast({
    title: title,
    icon: 'success',
    duration: (duration <= 0) ? 5000 : duration
  });
}

// 显示带取消按钮的消息提示框
function alertViewWithCancel(title = "提示", content = "消息提示", confirm, showCanel = "true") {
  wx.showModal({
    title: title,
    content: content,
    showCancel: showCanel,
    success: function (res) {
      if (res.confirm) {
        confirm();
      }
    }
  });
}

// 显示不取消按钮的消息提示框
function alertView(title = "提示", content = "消息提示", confirm) {
  alertViewWithCancel(title, content, confirm, false);
}


module.exports = {
  http_host: config.http_host,
  customer_id_en: config.customer_id_en,
  commonRequest: commonRequest,
  commonRequestPost:commonRequestPost,
  showLoading: showLoading,
  hideToast: hideToast,
  code:null,
  user_id_en:null,
  showSuccess: showSuccess,
  alertViewWithCancel: alertViewWithCancel,
  alertView: alertView,
  color:''
}
