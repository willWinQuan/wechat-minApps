// pages/mine/mine.js
var app = getApp();
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_id_en:'',
    phoneNumber:'',
    latitude:'',
    longitude:'',
    scale:'',
    send_status:0,
    job_id:'',
    enterprise_id:'',
    is_see:'',
    send:true,
    loading:false,
    collect_status:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.setData({
      job_id:options.id,
      user_id_en: util.user_id_en
    })
    console.log(that.data.job_id)
    console.log(util.user_id_en)
  },
  // 渲染页面数据
  job_detail:function(){
    var that=this;
    var data={
      customer_id_en:util.customer_id_en,
      user_id_en: util.user_id_en,
      job_id:that.data.job_id,
    };
    util.commonRequest(
      data,
      '/mini_program/minvite/back/index.php/home/job/job_detail',
      function(res){
        console.log(res)
        var address=res.data.address;
        if(address.indexOf('省' || '市' || '区') == -1){
          that.setData({
            address:res.data.province+res.data.city+res.data.area+address
          })
          console.log('address:'+address)
        }else{
          that.setData({
            address:res.data.address
          })
        }
        that.setData({
          job_name:res.data.job_name,
          publish_time:res.data.publish_time,
          min:res.data.min,
          max:res.data.max,
          labels:res.data.labels,
          pic_url:res.data.pic_url,
          company_name:res.data.company_name,
          discription:res.data.discription,
          position:res.data.position,
          content:res.data.content,
          // address:address,
          legal_person:res.data.legal_person,  
          id:res.data.id,
          phoneNumber:res.data.e_contact,  
          latitude:res.data.latitude,
          longitude: res.data.longitude, 
          collect_status:res.data.status,
          send_status: res.data.is_send, 
          scale:res.data.scale,
          edu_type:res.data.edu_type,
          is_have:res.data.is_have,
          is_see: res.data.is_see,
        })
      }
    )
  },

  // 查看位置
  get_location:function(){
    var that=this;
    var latitude = Number(that.data.latitude);
    var longitude = Number(that.data.longitude);
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: that.data.scale,
          name: that.data.company_name,
          address:that.data.address,
        })
      }
    })
  },
  // 拨打电话
  call_phone:function(){
    var that=this;
    wx.makePhoneCall({
      phoneNumber: that.data.phoneNumber, //仅为示例，并非真实的电话号码
    })
  },
  // 收藏职位
  collect_job:function(){
    var that=this;
    if (util.user_id_en) {
      var collect_status = that.data.collect_status;
      var data = {
        customer_id_en: util.customer_id_en,
        user_id_en: util.user_id_en,
        job_id: that.data.job_id,
      };
      util.commonRequest(
        data,
        '/mini_program/minvite/back/index.php/home/user/collect',
        function (res) {
          console.log(res)
          if (res.data.err_data == '已收藏') {
            that.setData({
              collect_status: 1,
            })
          }
          if (res.data.err_data == '已取消') {
            that.setData({
              collect_status: 0,
            })
          }
          wx.showToast({
            title: res.data.err_data,
            icon: 'success',
          })
        }
      )

    } else {
      wx.showModal({
        title: '提示',
        content: '查询不到授权，请前往授权',
        showCancel: false,
        success: function () {
          wx.openSetting({
            success: function (res) {
              if (res.authSetting["scope.userInfo"]) {
                wx.showToast({
                  title: '正在授权中...',
                  icon: 'loading',
                  mask: true
                })
              }
              app.getUserInfo(function (userInfo) {
                console.log(userInfo)
                that.setData({
                  userInfo: userInfo,
                })
                that.job_detail();
                wx.showToast({
                  title: '授权成功',
                  duration: 500,
                  mask: true
                })
              })
            }
          })
        }
      })
    }
  },
  // 投递简历
  bindresume:function(e){
    //   console.log(e);
    var that=this;
    // 无简历，跳转到创建简历
    if(that.data.is_have==0){
      if (util.user_id_en) {
        wx.navigateTo({
          url: '../resume/creat-new-resume',
        })
        return;
      }else{
        wx.showModal({
          title: '提示',
          content: '查询不到授权，请前往授权',
          showCancel: false,
          success: function () {
            wx.openSetting({
              success: function (res) {
                if (res.authSetting["scope.userInfo"]){
                  wx.showToast({
                    title: '正在授权中',
                    icon: 'loading',
                    mask: true
                  })
                }
                app.getUserInfo(function (userInfo) {
                  console.log(userInfo)
                  that.setData({
                    userInfo: userInfo,
                  })
                  that.job_detail();
                  wx.showToast({
                    title: '授权成功',
                    duration: 500,
                    mask: true
                  })
                })
              }
            })
          }
        })
        return;
      }     
    }
    if (util.user_id_en){
      var send=that.data.send;
      if(send){
        that.setData({
          send:false,
          loading:true,
        })
        
        var send_status = that.data.send_status;
        var data = {
          customer_id_en: util.customer_id_en,
          user_id_en: util.user_id_en,
          job_id: that.data.job_id,
          enterprise_id: that.data.id,
        //   page:'pages/send_msg/send_msg',
        //   form_id:e.detail.formId
        }
        console.log(data);
        wx.request({
          url: util.http_host + '/mini_program/minvite/back/index.php/home/send/send',
          data: data,
          success: function (res) {    
            console.log(res)
            that.setData({
              send:true,
              loading: false,
            })
            if (res.data.err_code == 1000) {
              that.setData({
                send_status: 1,
              })
              wx.showToast({
                title: '投递成功',
                icon: 'success',
              })
            } else {
              wx.showModal({
                title: '提示',
                content: res.data.err_data,
                showCancel: false,
              })
            }
          }
        }) 
      }
      
    }else{
      wx.showModal({
        title: '提示',
        content: '查询不到授权，请前往授权',
        showCancel: false,
        success: function () {
          wx.openSetting({
            success: function (res) {
              if (res.authSetting["scope.userInfo"]) {
                wx.showToast({
                  title: '正在授权中',
                  icon: 'loading',
                  mask:true
                })
              }
              app.getUserInfo(function (userInfo) {
                console.log(userInfo)
                that.setData({
                  userInfo: userInfo,
                })
                that.job_detail();
                wx.showToast({
                  title: '授权成功',
                  duration: 500,
                  mask: true
                })
              })
            }
          })
        }
      })    
    }
     
  },
  // 查看公司
  bindcompanydetail:function(e){
    console.log(e)
    var that=this;
    var id=e.currentTarget.dataset.id;
    console.log(id)
    console.log(that.data.id)
    var data={
      customer_id_en:util.customer_id_en,
      user_id_en:util.user_id_en,
      id:id,
      type:1,
      page:1,
    };
    util.commonRequest(
      data,
      '/mini_program/minvite/back/index.php/home/enterprise/enterprise_detail',
      function(res){
        console.log(res)
        if(res.data.err_code==1000){
          wx.navigateTo({
            url: '../company-detail/company-detail?id=' + id,
          })
        }else{
          wx.showToast({
            title: res.data.err_data,
          })
        }
      }
    )
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.job_detail();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})