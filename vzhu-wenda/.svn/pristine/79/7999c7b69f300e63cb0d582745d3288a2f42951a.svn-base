let util = require("../../utils/util.js"); 

//数据初始
let chooseclass_data_f = function (pageObject) {
    let chooseclass_data = {
        //筛选
        chooselist: ['全部', '我的回答', '被偷听偷看', '提现失败'],
        chooseshowflag: false,
        classIndex: [true, false, false, false]
    };
    pageObject.prototype.data = Object.assign({}, pageObject.prototype.data, chooseclass_data);
};

//关键字选择请求数据
let chooseclass_getdata = function (start_time, end_time, query_type, showby, show_type, page, show, callback) {
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

//拿选中的下标
function getindex(classIndex){
    for (let i = 0; i < classIndex.length;i++){
        if (classIndex[i]){
            return i;
        }
    }
}

//展示选择
let tapshowchoose = function (pageObject) {
    return pageObject.prototype.tapshowchoose = function () {
        let that = this;
        let chooseshowflag = that.data.chooseshowflag;
        let tabinout = that.data.tabinout;

        //记录条数是否不超过5条归回false 就是可以下拉加载 && 上拉加载没有更多为false
        that.setData({
            isall_data: false,
            nomore: false,
            datastauts: '加载中...',
            showby:2
        })

        if (tabinout){
            that.setData({
                chooseshowflag: !chooseshowflag,
                isdate_keywork_in: false
            })
         if (that.data.chooseshowflag){
            //请求数据
            let query_type=1;//收入
            let showby=2;//类型选择
            let chooselist = that.data.chooselist;
            let classIndex = that.data.classIndex;
            let index = getindex(classIndex);//选中的类型下标
            let show_type=0;     //1我去提问, 2去偷听偷看, 3我的回答, 4被偷听偷看收入, 5提现成功, 6提现驳回

            switch (chooselist[index]) {
                case '全部': show_type = 0; break;
                case '我去提问': show_type = 1; break;
                case '去偷听偷看': show_type = 2; break;
                case '我的回答': show_type = 3; break;
                case '被偷听偷看': show_type = 4; break;
                case '提现成功': show_type = 5; break;
                case '提现失败': show_type = 6; break;
            };

            chooseclass_getdata('', '', query_type, showby, show_type, 1, 5, function (res) {
                // console.log(res);
                if (res.data.errcode != 0) {
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
         }else{
             that.setData({
                 datastauts: '---暂无数据---'
             }) 
         }
        }
        else if (!tabinout){
            that.setData({
                chooseshowflag: !chooseshowflag,
                isdate_keywork_out: false
            });
            if (that.data.chooseshowflag) {
            //请求数据
            let query_type = 2;//支出
            let showby = 2;//类型选择
            let chooselist = that.data.chooselist;
            let classIndex = that.data.classIndex;
            let index = getindex(classIndex);//选中的类型下标
            let show_type = 0;     //1我去提问, 2去偷听偷看, 3我的回答, 4被偷听偷看收入, 5提现成功, 6提现驳回
            switch (chooselist[index]) {
                case '全部': show_type = 0; break;
                case '我去提问': show_type = 1; break;
                case '去偷听偷看': show_type = 2; break;
                case '我的回答': show_type = 3; break;
                case '被偷听偷看': show_type = 4; break;
                case '提现成功': show_type = 5; break;
                case '提现失败': show_type = 6; break;
            };
            
            chooseclass_getdata('', '', query_type, showby, show_type, 1, 5, function (res) {
                // console.log(res);
                if (res.data.errcode != 0) {
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
                    datastauts: '---暂无数据---'
                })
            }
        }      
    };
};

//选择标签关键字
let chooseclasskeyword = function (pageObject) {
    return pageObject.prototype.chooseclasskeyword = function (e) {
        let that = this;
        let classIndex = e.currentTarget.dataset.classindex;
        let tabinout = that.data.tabinout;
        let data_classIndex = '';
        
        //记录条数是否不超过5条归回false 就是可以下拉加载 && 上拉加载没有更多为false
        that.setData({
            isall_data: false,
            nomore: false,
            datastauts: '加载中...'
        })

        if (tabinout) {
            data_classIndex = [false, false, false, false];
            data_classIndex[classIndex] = true;
            that.setData({
                classIndex: data_classIndex
            })
            
            //请求数据
            let query_type = 1;//收入
            let showby = 2;//类型选择

            let show_type = 0;
            let chooselist = that.data.chooselist;
            // console.log(chooselist);
            switch (chooselist[classIndex]) {
                case '全部': show_type = 0; break;
                case '我去提问': show_type = 1; break;
                case '去偷听偷看': show_type = 2; break;
                case '我的回答': show_type = 3; break;
                case '被偷听偷看': show_type = 4; break;
                case '提现成功': show_type = 5; break;
                case '提现失败': show_type = 6; break;
            }
            // console.log(show_type);
            chooseclass_getdata('', '', query_type, showby, show_type, 1, 5, function (res) {
                console.log(res);
                if (res.data.errcode != 0) {
                    that.setData({
                        toastHidden: false,
                        toastcontent: res.data.data
                    })
                    return;
                }
                that.setData({
                    myWalletMoney: res.data.data.balance,
                    myWalletin_today: res.data.data.acc_today,
                    myWalletin_total: res.data.data.acc_total,
                    myWallet_list: res.data.data.mywallet,
                    chooseshowflag:false
                })
                if (that.data.myWallet_list.length == 0) {
                    that.setData({
                        datastauts: '---暂无数据---'
                    })
                }
            })

        } else if (!tabinout) {
            data_classIndex = [false, false, false, false];
            data_classIndex[classIndex] = true;
            that.setData({
                classIndex: data_classIndex
            })
            //请求数据
            let query_type = 2;//支出
            let showby = 2;//类型选择

            let show_type = 0;
            let chooselist = that.data.chooselist;
            // console.log(chooselist);
            switch (chooselist[classIndex]) {
                case '全部': show_type = 0; break;
                case '我去提问': show_type = 1; break;
                case '去偷听偷看': show_type = 2; break;
                case '我的回答': show_type = 3; break;
                case '被偷听偷看': show_type = 4; break;
                case '提现成功': show_type = 5; break;
                case '提现失败': show_type = 6; break;
            }
            // console.log(show_type);
            chooseclass_getdata('', '', query_type, showby, show_type, 1, 5, function (res) {
                // console.log(res);
                if (res.data.errcode != 0) {
                    that.setData({
                        toastHidden: false,
                        toastcontent: res.data.data
                    })
                    return;
                }
                that.setData({
                    myWalletMoney: res.data.data.balance,
                    myWalletin_today: res.data.data.acc_today,
                    myWalletin_total: res.data.data.acc_total,
                    myWallet_list: res.data.data.mywallet,
                    chooseshowflag:false
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

module.exports={
    chooseclass_data_f: chooseclass_data_f,
    tapshowchoose: tapshowchoose,
    chooseclasskeyword: chooseclasskeyword
}