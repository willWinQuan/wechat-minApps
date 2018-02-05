// pages/my-wallet/my-wallet.js

/***
 * ========================begin=================================
 *            wirte by  chq 2017-12-15
 * 1.revise by chq 2017-12-16 分封装
 * 2.revise by chq 2017-12-22 数据接口对接
 * 3.revise by chq 2017-12-23 数据与功能查漏补缺
 * ========================begin=================================
 */

/**
 * 引用类
 * =========================begin=======================
 */
//公共
let common = require('my-wallet-common.js');
let util = require("../../utils/util.js"); 
let app = getApp();
//提现
let getmoney = require('my-wallet-getmoney.js');
//收入、支出切换
let tabinout = require('my-wallet-tabinout.js');
//时间选择
let datepicker = require('my-wallet-datepicker.js');
//标签筛选选择
let chooseclass = require('my-wallet-chooseclass.js');
/**
 * =========================end=======================
 * 引用类
 */

/***
 * 基础类
 */
let pageObject=function(){
     /**
     * 页面的初始数据
    */
     this.data={};

    /**
     * 生命周期函数--监听页面初次渲染完成
    */
    this.onReady=function () {
    
    },

    /**
     * 生命周期函数--监听页面隐藏
    */
    this.onHide=function () {

        },

    /**
     * 生命周期函数--监听页面卸载
    */
    this.onUnload=function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
    */
    this.onPullDownRefresh=function () {

        },


    /**
     * 用户点击右上角分享
    */
    this.onShareAppMessage=function () {

        }
};

pageObject.prototype = {
    data: {},
};

/**
    * 生命周期函数--监听页面显示
   */
pageObject.prototype.onShow = function () {
    let that=this;
    wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: util.color,
    });
    if (that.data.show_in_endmonth.toString().length==1){
        that.setData({
            show_in_beginmonth: '0' + that.data.show_in_beginmonth,
            show_out_beginmonth: '0' + that.data.show_out_beginmonth,
            show_in_endmonth: '0' + that.data.show_in_endmonth,
            show_out_endmonth: '0' + that.data.show_out_endmonth
        })
    }

    if (util.user_id_en == '' || util.user_id_en == undefined) {
        console.log(that.data.openSettingsuccess);
        if (!that.data.openSettingsuccess) {
           regetlogin(that, util, app);
        }
    } 
};

 /**
 * 生命周期函数--监听页面加载
 */
let show_myWalletMoney_data = {
    myWalletMoney: '',
    myWalletin_today: '',
    myWalletin_total: '',
    query_type: "1",//1收入(默认),2支出
    showby: "1",//1按时间筛选(默认),2收入类型筛选
    show_type: "0",//0全部(默认),1我去提问,2去偷听偷看,3我的回答,4被偷听偷看收入,5提现成功,6提现驳回
    page: "1",//上拉加载页面
    show: "5",//每页个数
    myWallet_list: [],
    isall_data:false,
    color:'',//主题色
    nomore:false,//上拉加载没有更多了
    datastauts:'加载中...',
    cashdate:'',//可以提现日期
    openSettingsuccess:false//重新授权成功否

};
pageObject.prototype.data = Object.assign({}, pageObject.prototype.data, show_myWalletMoney_data);

pageObject.prototype.onLoad=function (options) {
    let that = this;
    //获取主题色
    showcolor(that);
    
    
    // 获取数据
    if (util.user_id_en != '' && util.user_id_en != undefined) {
        //展示数据
            showdata(that, 1, 5);
        
    }
};

//重新授权
function regetlogin(that,util,app){
        wx.showModal({
            title: '提示',
            content: '查询不到授权，请前往授权',
            showCancel:false,
            success:function(res){
                if(res.confirm){
                    that.setData({
                        openSettingsuccess: true
                    })
                    wx.openSetting({
                        success: res => {
                            console.log(res);
                            if (res.authSetting["scope.userInfo"]){                               
                                wx.showToast({
                                    title: '正在授权...',
                                    icon: 'loading',
                                    duration: 2500
                                });
                                app.getUserInfo(function(res){
                                    //展示数据
                                    showdata(that, 1, 5);
                                    //获取主题色
                                    showcolor(that);
                                    wx.hideToast();
                                })
                            }else{
                                regetlogin(that, util, app);
                            }
                            // res.authSetting = {
                            //     "scope.userInfo": true,
                            //     "scope.userLocation": true
                            // }
                        }
                    })
                }
            }
        })    
}

function showcolor(that){
    // console.log(util.color);
    that.setData({
        color:util.color
    })
}

//拿选中的下标
function getindex(classIndex) {
    for (let i = 0; i < classIndex.length; i++) {
        if (classIndex[i]) {
            return i;
        }
    }
};

//展示数据函数
function showdata(that,page,show){
    let {
        show_in_beginyear: show_in_beginyear,
        show_in_beginmonth: show_in_beginmonth,
        show_in_beginday: show_in_beginday,
        show_in_endyear: show_in_endyear,
        show_in_endmonth: show_in_endmonth,
        show_in_endday: show_in_endday,
        tabinout: tabinout
    }=that.data;

    let query_type=1;
    if (tabinout){
        query_type=1;
    } else if (!tabinout){
        query_type=2;
    };
   
    let data={
        customer_id_en: util.customer_id_en,
        user_id_en: util.user_id_en,
        start_time: show_in_beginyear + '-' + show_in_beginmonth + '-' + show_in_beginday,
        end_time: show_in_endyear + '-' + show_in_endmonth + '-' + show_in_endday,
        page: page,
        show:show,
        query_type: query_type,//1收入(默认),2支出 
        showby: that.data.showby
    };
    if (that.data.showby == 2) {
        let chooselist = that.data.chooselist;
        let classIndex = that.data.classIndex;
        let index = getindex(classIndex);//选中的类型下标
        let show_type=0;

        switch (chooselist[index]) {
            case '全部': show_type = 0; break;
            case '我去提问': show_type = 1; break;
            case '去偷听偷看': show_type = 2; break;
            case '我的回答': show_type = 3; break;
            case '被偷听偷看': show_type = 4; break;
            case '提现成功': show_type = 5; break;
            case '提现失败': show_type = 6; break;
        };
       data={
           customer_id_en: util.customer_id_en,
           user_id_en: util.user_id_en,
           start_time: show_in_beginyear + '-' + show_in_beginmonth + '-' + show_in_beginday,
           end_time: show_in_endyear + '-' + show_in_endmonth + '-' + show_in_endday,
           page: page,
           show: show,
           query_type: query_type,//1收入(默认),2支出 
           showby: that.data.showby,
           show_type: show_type
       }
    }
    util.commonRequest(
        data,
        '/mini_program/applets/index.php/answer/frontweb/mywallet',
        function(res){
            // console.log(res);
            if(res.data.errcode !=0){
                that.setData({
                    toastHidden: false,
                    toastcontent: res.data.data
                })
                return;
            };
           
            if (res.data.data.mywallet.length < 5 && res.data.data.mywallet.length>0){
               that.setData({
                   isall_data:true
               }) 
               if (that.data.page > 1 && res.data.data.mywallet.length==0){
                   that.setData({
                       nomore: true
                   }) 
               }
            }else{
                that.setData({
                    isall_data: false
                }) 
            }
            let myWallet_list = that.data.myWallet_list;
                myWallet_list = myWallet_list.concat(res.data.data.mywallet);
            that.setData({
                myWalletMoney: res.data.data.balance,
                myWalletin_today: res.data.data.acc_today,
                myWalletin_total: res.data.data.acc_total,
                myWallet_list: myWallet_list,
                cashdate: res.data.data.cashdate
            })
            if (that.data.myWallet_list.length==0){
                that.setData({
                    datastauts:'---暂无数据---'
                })
            }
        }
    )
};


/**
   * 页面上拉触底事件的处理函数
  */
pageObject.prototype.onReachBottom = function () {
    let that=this;
    let page=that.data.page;
    console.log(that.data.isall_data);
    page=Number(page)+1;
    if (that.data.isall_data) {//刷数据就没有超过5条
       that.setData({
           nomore:true
       })
        return;
    }
    that.setData({
        page: page
    })
    showdata(that,page,5);
};

//跳转详情
pageObject.prototype.toquestionDetail=function(e){
    let that=this;
    let question_id = e.currentTarget.dataset.questionid;
    wx.navigateTo({
        url: '../question_details/question_details?question_id=' + question_id+'',
    })

};
/**
 * 生命周期函数========= 事件函数================
 * ========================begin=======================
 * ========================begin========================
 */

/**=================公共处理=====================begin=======*/
  
//初始数据
common.common_data_f(pageObject);

 /**
  * 点击遮罩层处理
  */
common.bindmask_f(pageObject);

/**
 * toat到时处理
 */
common.toastChange(pageObject);

/**===================公共处理================end==========*/


/**
 * ===========提现===========begin======
 */
//初始数据
getmoney.getmoney_data_f(pageObject);

//展示提现模态框
getmoney.showgetmoney(pageObject);

//输入金额
getmoney.inMoneyNumber(pageObject);

//点击确认提现
getmoney.getmoneySureBtn(pageObject);

//可提现时间提示
getmoney.getmoneymsgSureBtn(pageObject);

/**
 * ===========提现===========end======
 */



/***
 * =======收入、支出tab切换====begin=========
 */
//初始数据
tabinout.tabinout_data_f(pageObject);

//我的收入
tabinout.tabin(pageObject);

//我的支出
tabinout.tabout(pageObject);

/***
 * =======收入、支出tab切换====end=========
 */


/***
 * =======时间范围筛选选择====begin=========
 */                                             
//初始数据
datepicker.date_data_f(pageObject);

//展示时间选择
datepicker.showdatepicker(pageObject);

//选择开始时间
datepicker.tapbegindate(pageObject);

//选择结束时间
datepicker.tapenddate(pageObject);

//date-picker选择
datepicker.binddateChange(pageObject);

//确定选择date
datepicker.suredate(pageObject);

//取消选择date
datepicker.canceldate(pageObject);

/***
 * =======时间范围筛选选择====end=========
 */


/***
 * ========标签筛选选择=======begin==========
 */
//数据初始
chooseclass.chooseclass_data_f(pageObject);

//展示选择
chooseclass.tapshowchoose(pageObject);

//选择标签关键字
chooseclass.chooseclasskeyword(pageObject);

/***
 * ========标签筛选选择=======end==========
 */

/**
 * 生命周期函数========= 事件函数================
 * ========================end=======================
 * ========================end========================
 */

console.log(pageObject.prototype.data);
console.log(pageObject.prototype);

Page(pageObject.prototype);

/***
 * ========================end=================================
 *            wirte by  chq 2017-12-15 
 * ========================end=================================
 */