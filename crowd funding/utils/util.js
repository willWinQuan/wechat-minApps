
var config=require('config.js');

// 请求数据公共函数
function commonRequest(data, url, callback) {
  wx.request({
    url: config.BaseURL+url,
    data: data,
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
    // header: {}, // 设置请求的 header  
    success: function (res) {
      callback(res);
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    },
    fail: function (err) {
      console.log(err)
      // fail  
      callback(err)
    },
    complete: function (msg) {
      console.log(msg)
      // complete  
    }
  })
} 

//loading提示
function showLoading(title = "正在拼命加载...", duration = 5000) {
  wx.showToast({
    title: title,
    icon: 'loading',
    duration: (duration <= 0) ? 5000 : duration
  });
}

//模态框
function showModal(title,content,showCancel,callback){
  wx.showModal({
    title: title,
    content: content,
    showCancel: showCancel,//是否显示取消按钮，默认为 true
    cancelText: '取消',//取消按钮的文字，默认为"取消"，最多 4 个字符
    cancelColor: '#000', //取消按钮的文字颜色，默认为"#000000"
    confirmText: '确定',//确定按钮的文字，默认为"确定"，最多 4 个字符
    confirmColor: '#3CC51F',//确定按钮的文字颜色，默认为"#3CC51F"
    complete: function (res) {
      callback(res);
     },//接口调用结束的回调函数（调用成功、失败都会执行）
  });
}


//显示操作菜单
function showActionSheet(){
  wx.showActionSheet({
    itemList: ['A', 'B', 'C'],
    success: function (res) {
      console.log(res.tapIndex)
    },
    fail: function (res) {
      console.log(res.errMsg)
    }
  })
}

//调用微信账号地址选择&&编辑
function chooseAddress(callback){
  wx.chooseAddress({
    complete:function(res){
       callback(res);
    }
  })
}

//隐藏提示框
function hideToast() {
  wx.hideToast();
}


module.exports = {
  // formatTime: formatTime
  commonRequest: commonRequest,
  showLoading: showLoading,
  hideToast: hideToast,
  showModal: showModal,
  showActionSheet: showActionSheet,
  customer_id_en: config.customer_id_en,
  activity_id: config.activity_id,
  chooseAddress:chooseAddress
}
