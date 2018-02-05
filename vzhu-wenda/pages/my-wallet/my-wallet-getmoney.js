
let util = require("../../utils/util.js"); 

//初始数据
let getmoney_data_f = function (pageObject) {
    let getmoney_data = {
        //提现
        inMoneyNumber: '',
        isshowgetmoneynext: false,
        isshowgetmoneysuccess: false,
        cash_sw:1,//是否免审核
        notapmore:false,
        tapgetmoneySureBtn: "getmoneySureBtn"//防止多次点击，切换点击方式
    };
    pageObject.prototype.data = Object.assign({}, pageObject.prototype.data, getmoney_data);
};

//展示提现模态框
let showgetmoney = function (pageObject) {
    return pageObject.prototype.getmoney = function () {
        let that = this;
        if (Number(that.data.myWalletMoney)==0){
             wx.showModal({
                 title: '提示',
                 content: '余额为零不可提现',
                 showCancel:false
             })
             return;
        };

        //获取当前周几
        let week = "周" + "日一二三四五六".split("")[new Date().getDay()];

        let iscanshowgetmoney=false;
        for (let i = 0; i < that.data.cashdate.length;i++){
            if (that.data.cashdate[i] == week){
                iscanshowgetmoney=true;
            }
        };
      
        if (iscanshowgetmoney){
            that.setData({
                isshowgetmoney: true,
                hiddenmask: false
            })
            return;
        }

        let cash_date = that.data.cashdate.join('、');
        that.setData({
            isshowgetmoney: false,
            isshowgetmoneynext: true,
            cash_date: cash_date,
            hiddenmask: false
        });    
       
    };
};

//输入金额
let inMoneyNumber = function (pageObject) {
    return pageObject.prototype.inMoneyNumber = function (e) {
        let that = this;
        let value = e.detail.value;
        //   console.log(value);
        that.setData({
            inMoneyNumber: value
        })
    };
};

//提现请求接口
let gemoneyapi=function(money,callback){
    let data={
        customer_id_en: util.customer_id_en,
        user_id_en: util.user_id_en,
        money: money
    };
    util.commonRequest(
        data,
        '/mini_program/applets/index.php/answer/frontweb/goto_tixan',
        function(res){
            typeof callback == 'function' && callback(res);
        }
    )
};

//展示数据函数
function showdata(that, page, show) {
    let {
        show_in_beginyear: show_in_beginyear,
        show_in_beginmonth: show_in_beginmonth,
        show_in_beginday: show_in_beginday,
        show_in_endyear: show_in_endyear,
        show_in_endmonth: show_in_endmonth,
        show_in_endday: show_in_endday
    } = that.data;

    let data = {
        customer_id_en: util.customer_id_en,
        user_id_en: util.user_id_en,
        start_time: show_in_beginyear + '-' + show_in_beginmonth + '-' + show_in_beginday,
        end_time: show_in_endyear + '-' + show_in_endmonth + '-' + show_in_endday,
        page: page,
        show: show
    }
    util.commonRequest(
        data,
        '/mini_program/applets/index.php/answer/frontweb/mywallet',
        function (res) {
            // console.log(res);
            if (res.data.errcode != 0) {
                that.setData({
                    toastHidden: false,
                    toastcontent: res.data.data
                })
                return;
            };

            if (res.data.data.mywallet.length < 5) {
                that.setData({
                    isall_data: true
                })
            }else{
                that.setData({
                    isall_data: false
                })
            }
            
            that.setData({
                myWalletMoney: res.data.data.balance,
                myWalletin_today: res.data.data.acc_today,
                myWalletin_total: res.data.data.acc_total,
                myWallet_list: res.data.data.mywallet
            })
        }
    )
};

//点击确认提现
let getmoneySureBtn = function (pageObject) {
    return pageObject.prototype.getmoneySureBtn = function () {
        let that = this;

        //防止多次连续点击
        that.setData({
            tapgetmoneySureBtn:'moregetmoneySureBtn'
        })
        
        setTimeout(function(){
            that.setData({
                tapgetmoneySureBtn: 'getmoneySureBtn'
            })
        },3000)

        if (that.data.inMoneyNumber==''){
            that.setData({
                toastHidden: false,
                toastcontent: '提现金额不能为空'
            })
            return;
        }

        let inMoneyNumber = Number(that.data.inMoneyNumber);
        if (inMoneyNumber<1){
            that.setData({
                toastHidden: false,
                toastcontent: '提现金额最少为1元'
            })
            return;
        }    
        if (inMoneyNumber > that.data.myWalletMoney){
            that.setData({
                toastHidden: false,
                toastcontent: '余额不足'
            })
            return;
        }
        //记录条数是否不超过5条归回false 就是可以下拉加载 && 上拉加载没有更多为false
        that.setData({
            isall_data: false,
            nomore: false
        })

        gemoneyapi(inMoneyNumber,function(res){
            // console.log(res);
            if(res.data.errcode !=0){
                if(res.data.errcode==2){
                    let cash_date=res.data.cash_date;
                    cash_date = cash_date.join('、');
                    that.setData({
                        isshowgetmoney: false,
                        isshowgetmoneynext: true,
                        cash_date: cash_date,
                        notapmore: true,
                        inMoneyNumber:''
                    });
                   
                    return;
                }
                
                that.setData({
                    toastHidden: false,
                    toastcontent: res.data.data,
                    notapmore: true,
                    inMoneyNumber:''
                });
               
                return;
        }
            that.setData({
                hiddenmask: true,
                isshowgetmoney: false,
                isshowgetmoneysuccess: true,
                cash_sw: res.data.cash_sw,
                inMoneyNumber:''
            })
            //刷新数据
            showdata(that, 1, 5);

            setTimeout(function(){
                that.setData({
                    isshowgetmoneysuccess: false
                })
            },1000);
        })
       
    };
};

//连续多次点击触发
let moregetmoneySureBtn = function (pageObject){
    return pageObject.prototype.moregetmoneySureBtn=function(){
        console.log('操作过于频繁');
    }
};

//可提现时间提示
let getmoneymsgSureBtn = function (pageObject) {
    return pageObject.prototype.getmoneymsgSureBtn = function () {
        let that = this;
        that.setData({
            isshowgetmoneynext: false,
            hiddenmask: true
        })
    };
}

module.exports={
    getmoney_data_f: getmoney_data_f,
    showgetmoney: showgetmoney,
    inMoneyNumber: inMoneyNumber,
    getmoneySureBtn: getmoneySureBtn,
    getmoneymsgSureBtn: getmoneymsgSureBtn
}