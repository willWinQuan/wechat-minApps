
let util = require("../../utils/util.js"); 
/**
 * ==========================时间初始====================begin==============
 * ==========================时间初始====================begin==============
 */
let date = new Date();
let years = [];
let months = [];
let days = [];

let year = date.getFullYear();
let month = date.getMonth() + 1;
let day = date.getDate();

if (day.toString().length < 2) {
    day = "0" + day;
}

for (let i = date.getFullYear() - 50; i <= date.getFullYear(); i++) {
    years.push(i);
}

for (let i = 1; i <= 12; i++) {
    if (i.toString().length < 2) {
        i = "0" + i;
    }
    months.push(i);
}

for (let i = 1; i <= 31; i++) {
    if (i.toString().length < 2) {
        i = "0" + i;
    }
    days.push(i);
}

//获取时间数组下标
function getpickerindex(picker, value) {
    for (var i = 0; i < picker.length; i++) {
        if (picker[i] == value) {
            return i;
        }
    }
}

let yearvalue = getpickerindex(years, year);
let monthvalue = getpickerindex(months, month);
let dayvalue = getpickerindex(days, day);
/**
 * ==========================时间初始====================end==============
 * ==========================时间初始====================end==============
 */

//初始数据
let date_data_f = function (pageObject) {
    let date_data = {
        //时间选择组件
        years: years,
        months: months,
        days: days,
        beginyear: year,
        beginmonth: month ,
        beginday: day,
        show_in_beginyear: year,
        show_in_beginmonth: month,
        show_in_beginday: day,
        show_out_beginyear: year,
        show_out_beginmonth: month,
        show_out_beginday: day,
        datevalue: [yearvalue, monthvalue, dayvalue],
        endyear: year,
        endmonth: month+1,
        endday: day,
        show_in_endyear: year,
        show_in_endmonth: month+1,
        show_in_endday: day,
        show_out_endyear: year,
        show_out_endmonth: month+1,
        show_out_endday: day,
        dateflag: true
    };
    pageObject.prototype.data = Object.assign({}, pageObject.prototype.data, date_data);
};

//时间选择请求数据
let datepicker_getdata = function (start_time, end_time, query_type, showby, show_type, page, show, callback) {
    let data = {
        customer_id_en: util.customer_id_en,
        user_id_en: util.user_id_en,
        start_time: start_time,
        end_time: end_time,
        query_type: query_type,//1收入(默认),2支出
        showby: showby,//1按时间筛选(默认),2收入类型筛选
        show_type: show_type,//0全部(默认),1我去提问,2去偷听偷看,3我的回答,4被偷听偷看收入,5提现成功,6提现驳回
        page: page,//上拉加载页面
        show: show//每页个数
    };
    util.commonRequestPost(
        data,
        '/mini_program/applets/index.php/answer/frontweb/mywallet',
        function (res) {
            typeof callback == 'function' && callback(res);
        }
    )
};

//展示时间选择picker=============begin=============
let showdatepicker = function (pageObject) {
    return pageObject.prototype.showdatepicker = function () {
        let that = this;
        let {
            tabinout: tabinout,
            show_in_beginyear: show_in_beginyear,
            show_in_beginmonth: show_in_beginmonth,
            show_in_beginday: show_in_beginday,
            show_in_endyear: show_in_endyear,
            show_in_endmonth: show_in_endmonth,
            show_in_endday: show_in_endday,
            show_out_beginyear: show_out_beginyear,
            show_out_beginmonth: show_out_beginmonth,
            show_out_beginday: show_out_beginday,
            show_out_endyear: show_out_endyear,
            show_out_endmonth: show_out_endmonth,
            show_out_endday: show_out_endday
         } = that.data;

        if (tabinout) {
            const yearvalue = getpickerindex(years, show_in_endyear);
            const monthvalue = getpickerindex(months, show_in_endmonth);
            const dayvalue = getpickerindex(days, show_in_endday);
            that.setData({
                hiddenmask: false,
                datepickerbottom: '0',
                beginyear: show_in_beginyear,
                beginmonth: show_in_beginmonth,
                beginday: show_in_beginday,
                endyear: show_in_endyear,
                endmonth: show_in_endmonth,
                endday: show_in_endday,
                datevalue: [yearvalue, monthvalue, dayvalue],
                dateflag: true,
                isdate_keywork_in:true
            })
        } else if (!tabinout) {

            const yearvalue = getpickerindex(years, show_out_endyear);
            const monthvalue = getpickerindex(months, show_out_endmonth);
            const dayvalue = getpickerindex(days, show_out_endday);
            that.setData({
                hiddenmask: false,
                datepickerbottom: '0',
                beginyear: show_out_beginyear,
                beginmonth: show_out_beginmonth,
                beginday: show_out_beginday,
                endyear: show_out_endyear,
                endmonth: show_out_endmonth,
                endday: show_out_endday,
                datevalue: [yearvalue, monthvalue, dayvalue],
                dateflag: true,
                isdate_keywork_out: true
            })
        }

    };
};

//选择开始时间
let tapbegindate = function (pageObject) {
    return pageObject.prototype.tapbegindate = function () {
        let that = this;
        let beginday = that.data.beginday;
        let beginmonth = that.data.beginmonth;
        let beginyear = that.data.beginyear;

        const yearvalue = getpickerindex(years, beginyear);
        const monthvalue = getpickerindex(months, beginmonth);
        const dayvalue = getpickerindex(days, beginday);

        that.setData({
            dateflag: false,
            datevalue: [yearvalue, monthvalue, dayvalue]
        })
    };
};

//选择结束时间===begin===
let tapenddate = function (pageObject) {
    return pageObject.prototype.tapenddate = function () {
        let that = this;
        let endday = that.data.endday;
        let endmonth = that.data.endmonth;
        let endyear = that.data.endyear;

        const yearvalue = getpickerindex(years, endyear);
        const monthvalue = getpickerindex(months, endmonth);
        const dayvalue = getpickerindex(days, endday);

        that.setData({
            dateflag: true,
            datevalue: [yearvalue, monthvalue, dayvalue]
        })
    };
};

//date-picker选择
let binddateChange = function (pageObject) {
    return pageObject.prototype.binddateChange = function (e) {
        //   console.log(e);
        let that = this;
        let dateflag = that.data.dateflag;
        let value = e.detail.value;

        days=[];
        for (let i = 1; i <= 31; i++) {
            if (i.toString().length < 2) {
                i = "0" + i;
            }
            days.push(i);
        };
        if (months[value[1]] == 4 || months[value[1]] == 6 || months[value[1]] == 9 || months[value[1]] == 11){
            console.log(123)
            days.pop(days.length - 1);
        };
  
        if (months[value[1]] == 2){
            console.log(months[value[1]])
            if (years[value[0]] % 4 == 0) {
                days.splice(days.length - 2, days.length - 1);
            }
            else if (years[value[0]] % 4 != 0) {
                days.splice(days.length - 3, days.length - 1);
              
            };
        }

        that.setData({
            days: days
        });
        //  console.log(days);
        //  console.log(months[value[1]])
        if (dateflag) {
            that.setData({
                endday: days[value[2]],
                endmonth: months[value[1]],
                endyear: years[value[0]]
            })
        } else {
            that.setData({
                beginday: days[value[2]],
                beginmonth: months[value[1]],
                beginyear: years[value[0]]
            })
        }
    };
};

//确定选择date
let suredate = function (pageObject) {
    return pageObject.prototype.suredate = function () {
        let that = this;
        let {
            tabinout: tabinout,
            beginday: beginday,
            beginmonth: beginmonth,
            beginyear: beginyear,
            endday: endday,
            endmonth: endmonth,
            endyear: endyear
     } = that.data;

        //记录条数是否不超过5条归回false 就是可以下拉加载 && 上拉加载没有更多为false
        that.setData({
            isall_data: false,
            nomore: false,
            datastauts:'加载中...',
            showby: 1
        })

        let beginTime = beginyear + '/' + beginmonth + '/' + beginday;
        let endTime = endyear + '/' + endmonth + '/' + endday;
        beginTime = (new Date(beginTime)).getTime();
        endTime = (new Date(endTime)).getTime();

        if (beginTime > endTime) {
            that.setData({
                toastHidden: false,
                toastcontent: '开始时间不能大于结束时间'
            })
            return;
        };    

        if (tabinout) {
            that.setData({
                show_in_beginyear: beginyear,
                show_in_beginmonth: beginmonth,
                show_in_beginday: beginday,
                show_in_endyear: endyear,
                show_in_endmonth: endmonth,
                show_in_endday: endday,
                hiddenmask: true,
                datepickerbottom: '-521rpx'
            });
           
            //请求数据
            let in_start_time = beginyear + '-' + beginmonth + '-' + beginday;
            let in_end_time = endyear + '-' + endmonth + '-' + endday;
            datepicker_getdata(in_start_time, in_end_time, 1, 1, 0, 1, 5, function (res) {
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
                } else {
                    that.setData({
                        isall_data: false
                    })
                }
                that.setData({
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
            
           
        } else {

            that.setData({
                show_out_beginyear: beginyear,
                show_out_beginmonth: beginmonth,
                show_out_beginday: beginday,
                show_out_endyear: endyear,
                show_out_endmonth: endmonth,
                show_out_endday: endday,
                hiddenmask: true,
                datepickerbottom: '-521rpx'
            })
            //请求数据
            let out_start_time = beginyear + '-' + beginmonth + '-' + beginday;
            let out_end_time = endyear + '-' + endmonth + '-' + endday;
            datepicker_getdata(out_start_time, out_end_time, 2, 1, 0, 1, 5, function (res) {
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
                } else {
                    that.setData({
                        isall_data: false
                    })
                };
                that.setData({
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
        }

    };
};

//取消选择date
let canceldate = function (pageObject) {
    return pageObject.prototype.canceldate = function () {
        let that = this;
        that.setData({
            hiddenmask: true,
            datepickerbottom: '-521rpx'
        })
    };
};

module.exports={
    date_data_f: date_data_f,
    showdatepicker: showdatepicker,
    tapbegindate: tapbegindate,
    tapenddate: tapenddate,
    binddateChange: binddateChange,
    suredate: suredate,
    canceldate: canceldate
}