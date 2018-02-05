

//初始数据
let common_data_f = function (pageObject) {
    let common_data = {
        hiddenmask: true,
        datepickerbottom: '-521rpx',
        toastHidden: true,
        toastcontent: '',
        isshowgetmoney: false
    }
    pageObject.prototype.data = Object.assign({}, pageObject.prototype.data, common_data);
}

/**
 * 点击遮罩层处理
 */
let bindmask_f = function (pageObject) {
    return pageObject.prototype.bindmask = function () {
        let that = this;
        that.setData({
            hiddenmask: true,
            datepickerbottom: '-521rpx',
            isshowgetmoney: false
        })
    };
}

/**
 * toat到时处理
 */
let toastChange = function (pageObject) {
    return pageObject.prototype.toastChange = function () {
        let that = this;
        that.setData({
            toastHidden: true
        })
    };
}

module.exports = {
    common_data_f: common_data_f,
    bindmask_f: bindmask_f,
    toastChange: toastChange
}