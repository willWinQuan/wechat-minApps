
var config = require('config.js');

//删除数组序列哪一项
function remove(arr, index) {
    var result = [];
    for (var i = 0; i < arr.length; i++) {
        if (i != index) {
            result.push(arr[i]);
        }
    }
    return result;
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
            util.hideToast();
            wx.showModal({
                title: '提示',
                content: '数据请求失败，检查网络是否正常',
                showCancel:false
            })
        },
        complete: function (msg) {
            // console.log(msg)     
        }
    })
}

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
            util.hideToast();
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

//loading提示
function showLoading(title = "加载中...", duration = 5000) {
    wx.showToast({
        title: title,
        icon: 'loading',
        duration: (duration <= 0) ? 5000 : duration
    });   
}

//模态框
function showModal(title, content, showCancel, callback) {
    wx.showModal({
        title: title,
        content: content,
        showCancel: showCancel,//是否显示取消按钮，默认为 true
        cancelText: '取消',//取消按钮的文字，默认为"取消"，最多 4 个字符
        cancelColor: '#000', //取消按钮的文字颜色，默认为"#000000"
        confirmText: '确定',//确定按钮的文字，默认为"确定"，最多 4 个字符
        confirmColor: '#3CC51F',//确定按钮的文字颜色，默认为"#3CC51F"
        complete: function (res) {
            typeof callback == "function" && callback(res);
        },//接口调用结束的回调函数（调用成功、失败都会执行）
    });
}

//隐藏提示框
function hideToast() {
    wx.hideToast();
}

//缓存-存入
function setstorage(key,data,callback){
    wx.setStorage({
        key: key,
        data: data,
        complete: function (res) {
            // console.log("存缓存返回结果" + JSON.stringify(res));
            typeof callback == "function" && callback(res);
        }
    })
}

function getstorage(key, callback){
    wx.getStorage({
        key: key,
        complete: function (res) {
            // console.log("取缓存返回结果："+JSON.stringify(res));
            typeof callback == "function" && callback(res);  
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
    removearry: remove,
    commonRequest: commonRequest,
    commonRequestPost: commonRequestPost,
    showLoading: showLoading,
    hideToast: hideToast,
    showModal: showModal,
    customer_id_en: config.customer_id_en,
    http_host: config.http_host,
    setstorage: setstorage,
    getstorage: getstorage,
    showSuccess: showSuccess,
    alertViewWithCancel: alertViewWithCancel,
    alertView: alertView
}

