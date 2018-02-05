
let util = require("../../utils/util.js"); 

//初始数据
let tabinout_data_f = function (pageObject) {
    let tabinout_data = {
        //收入、支出tab切换
        tabinout: true,
        //收入最后筛选（时间-关键字）
        isdate_keywork_in: true,
        //支出最后筛选（时间-关键字）
        isdate_keywork_out: true
    };
    pageObject.prototype.data = Object.assign({}, pageObject.prototype.data, tabinout_data);
};

//tab切换请求数据
let tabinout_getdata = function (start_time, end_time, query_type, showby, show_type, page,show,callback){  
   let data={
        customer_id_en: util.customer_id_en,
        user_id_en: util.user_id_en,
        start_time: start_time,
        end_time: end_time,
        query_type: query_type,//1收入(默认),2支出
        showby: showby,//1按时间筛选(默认),2收入类型筛选
        show_type: show_type,//0全部(默认),1我去提问,2去偷听偷看,3我的回答,4被偷听偷看收入,5提现成功,6提现驳回
        page:page,//上拉加载页面
        show: show//每页个数
    };
    util.commonRequestPost(
        data,
        '/mini_program/applets/index.php/answer/frontweb/mywallet',
        function(res){
            typeof callback == 'function' && callback(res);
        }
    )
};

//我的收入
let tabin = function (pageObject, years, months) {
    return pageObject.prototype.tabin = function () {
        let that = this;
        let classIndex = [true, false, false, false];
        let query_type = 1;//1收入(默认),2支出
        let page = that.data.page;
        
        //记录条数是否不超过5条归回false 就是可以下拉加载 && 上拉加载没有更多为false
        that.setData({
            isall_data: false,
            nomore: false,
            datastauts: '加载中...'
        })

        let {
            show: show,
            showby: showby,
            show_type: show_type,
            show_in_beginyear: show_in_beginyear,
            show_in_beginmonth: show_in_beginmonth,
            show_in_beginday: show_in_beginday,
            show_in_endyear: show_in_endyear,
            show_in_endmonth: show_in_endmonth,
            show_in_endday: show_in_endday
        }=that.data;
        let in_start_time = show_in_beginyear + '-' + show_in_beginmonth + '-' + show_in_beginday;
        let in_end_time = show_in_endyear + '-' + show_in_endmonth + '-' + show_in_endday;

        tabinout_getdata(in_start_time, in_end_time, query_type, showby, show_type,1,5,function(res){
            if (res.data.errcode!=0){
                that.setData({
                    toastHidden: false,
                    toastcontent: res.data.data
                })
                return;
            }
            // console.log(res);
            if (res.data.data.mywallet.length < 5) {
                that.setData({
                    isall_data: true
                })
            } else {
                that.setData({
                    isall_data: false
                })
            };

            that.setData({
                tabinout: true,
                chooselist: ['全部', '我的回答', '被偷听偷看', '提现失败'],
                chooseshowflag: false,
                classIndex: classIndex,
                myWalletMoney: res.data.data.balance,
                myWalletin_today: res.data.data.acc_today,
                myWalletin_total: res.data.data.acc_total,
                myWallet_list: res.data.data.mywallet,
                page:1
            });
            if (that.data.myWallet_list.length == 0) {
                that.setData({
                    datastauts: '---暂无数据---'
                })
            }
        })
       
    };
};

//我的支出
let tabout = function (pageObject) {
    return pageObject.prototype.tabout = function () {
        let that = this;
        let classIndex = [true, false, false, false];
        let query_type=2;
        
        //记录条数是否不超过5条归回false 就是可以下拉加载 && 上拉加载没有更多为false
        that.setData({
            isall_data: false,
            nomore: false,
            datastauts: '加载中...'
        })

        let {
            page: page,
            show: show,
            showby: showby,
            show_type: show_type,
            show_out_beginyear: show_out_beginyear,
            show_out_beginmonth: show_out_beginmonth,
            show_out_beginday: show_out_beginday,
            show_out_endyear: show_out_endyear,
            show_out_endmonth: show_out_endmonth,
            show_out_endday: show_out_endday
        } = that.data;
        let out_start_time = show_out_beginyear + '-' + show_out_beginmonth + '-' + show_out_beginday;
        let out_end_time = show_out_endyear + '-' + show_out_endmonth + '-' + show_out_endday;
        
        tabinout_getdata(out_start_time, out_end_time, query_type, showby, show_type, 1, 5,function (res) {
            // console.log(res);
            if(res.data.errcode !=0){
                that.setData({
                    toastHidden: false,
                    toastcontent: res.data.data
                })
                return;
            }
            
            if (res.data.data.mywallet.length < 5) {
                that.setData({
                    isall_data: true
                })
            } else {
                that.setData({
                    isall_data: false
                })
            }

            that.setData({
                tabinout: false,
                chooselist: ['全部', '我去提问', '去偷听偷看','提现成功'],
                chooseshowflag: false,
                classIndex: classIndex,
                myWalletMoney: res.data.data.balance,
                myWalletin_today: res.data.data.acc_today,
                myWalletin_total: res.data.data.acc_total,
                myWallet_list: res.data.data.mywallet,
                page: 1
            })
            if (that.data.myWallet_list.length == 0) {
                that.setData({
                    datastauts: '---暂无数据---'
                })
            }
      })

    };
};

module.exports={
    tabinout_data_f: tabinout_data_f,
    tabin: tabin,
    tabout: tabout
}