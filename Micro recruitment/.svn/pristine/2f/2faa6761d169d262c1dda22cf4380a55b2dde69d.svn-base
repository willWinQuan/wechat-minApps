// pages/my-resume/my-resume.js
var app = getApp();
var util = require("../../utils/util.js");
var showmyresume = require("resume-common/showmyresume.js");

function getlineclampnum(array){
    var num = 0;
    for (var i = 0; i <array.length; i++) {
        if (array[i].content.length <=44) {
            num++;
            return num;
        }
    }
}

//防止多次点击
var tabflag = false;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        user_id_en:"",
        hiddenmask: true,
        haveresume: false,
        lineclamp:"2",
        toastHidden:true,
        toastcontent:"",
        showmyresume:'2',
        workarray:[],
        eacharray:[],
        id:"",
        resumeid:'',
        http_host: util.http_host,
        form_id:'',
        weixin_userid:''
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that=this;
        if (util.user_id_en == "" || util.user_id_en == undefined) {
            that.setData({
                showmyresume:''
            })
            return;
        }
        if (options.id) {
            wx.setNavigationBarTitle({
                title: '简历详情'
            })
            that.setData({
                id: options.id,//投递id
                resumeid: options.resumeid,//简历id
                user_id_en: util.user_id_en,
                form_id: options.form_id,
                weixin_userid: options.weixin_userid
            });
        } else {
            that.setData({
                user_id_en: util.user_id_en
            })
        }
        
    },
    showmyresume:function(){
        var that = this;
        var workarray = [],
            eacharray = [],
            id=that.data.id,
            resume_id = that.data.resumeid,
            data="";
        if (id != "" && resume_id != ""){
            data = {
                customer_id_en: util.customer_id_en,
                user_id_en: that.data.user_id_en,
                id:id,
                resume_id: resume_id,
                page:'pages/send_msg/send_msg',
                form_id: that.data.form_id,
                weixin_userid: that.data.weixin_userid
            };
        }else{
            data = {
                customer_id_en: util.customer_id_en,
                user_id_en: that.data.user_id_en
            };
        }
        // console.log(data);
        showmyresume.showmyresume(util,data,that,function(res){
            workarray = res.data.work;
            eacharray = res.data.edu;
        var baseinfo = res.data.baseinfo;
        var lineclamp = that.data.lineclamp;
        var workcontentnum = getlineclampnum(workarray);
        var eachcontentnum = getlineclampnum(eacharray);

        //没有内容超出2行隐藏查看全部    
        if (baseinfo.discription.length <= 44 && workcontentnum != 0 && eachcontentnum != 0){
            lineclamp=0;
        }
            that.setData({
                workarray: workarray,
                eacharray: eacharray,
                textmyself: res.data.baseinfo.discription,
                lineclamp: lineclamp
            })
            util.hideToast();
        });
    },
    creatnewresume:function(){
        // var that=this;
        // var istapform = that.data.istapform;
        // istapform++;
        // that.setData({
        //     istapform:
        // })
        if (util.user_id_en == "" || util.user_id_en == undefined) {
          var that=this;
            wx.showModal({
                title: '提示',
                content: '查询不到授权，请前往授权',
                success: function (res) {
                    if (res.confirm) {
                        wx.openSetting({
                            success: (res) => {
                                // console.log(res);
                                if (res.authSetting["scope.userInfo"]) {
                                    wx.showToast({
                                        title: '正在授权中',
                                        icon: 'loading'
                                    });
                                    app.getUserInfo(function (res) {
                                        that.setData({
                                            user_id_en: util.user_id_en,
                                        })
                                        setTimeout(function(res){
                                            that.showmyresume();
                                        },1000)
                                    })
                                }
                            }
                        })
                }
        }
    });
            return;
}
        wx.redirectTo({
            url: '../resume/creat-new-resume',
        })
    },
    tapnewresume: function () {
        if (tabflag){
            return;
        }
        tabflag=true;
        wx.navigateTo({
            url: '../resume/creat-new-resume',
        })
    },
    seeallcontent:function(){
         this.setData({
             lineclamp:"20"
         })
    },
    seeonecontent:function(){
        this.setData({
            lineclamp: "2"
        })
    },
    toastChange: function () {
        var that = this;
        that.setData({
            toastHidden: true
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function (options) {
      var that=this;
      util.showLoading();
      tabflag=false;
      if (util.user_id_en == "" || util.user_id_en == undefined) {
          util.hideToast();
          return;
      }
      that.showmyresume();

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
    // onShareAppMessage: function () {

    // }
})