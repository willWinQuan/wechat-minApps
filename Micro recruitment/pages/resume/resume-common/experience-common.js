
var util = require("../../../utils/util.js");

//获取现在的时间
function nowtime(){
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();

    if (day.toString().length < 2) {
        day = "0" + day;
    }
    
    return (year + "-" + month + "-" + day);
}

//增加修改工作经历
function aadchancework(that,e,isflag){
    var value = e.detail.value;
    var isindex = value.workisindex;
    var work_id = value.workid;
    var workindex = that.data.workindex;
    var workarray = that.data.workarray;
    workindex[isindex] = isflag;
    // console.log(workindex)

    for (var i in value) {
        if (value[i] == "" && i != "workid") {
            that.setData({
                toastHidden: false,
                toastcontent: "还有未填项",
                textareahidden:true
            });
            return;
        }
        
    }
    var begintime = Date.parse(new Date(value['indate']))/1000;
    var outdate = value['outdate'];
    if (outdate=='至今'){
        var date = new Date();
        value['outdate'] = nowtime();
    }
    var endtime = Date.parse(new Date(value['outdate'])) / 1000;
    // console.log(begintime);
    // console.log(endtime);
    if (begintime == endtime) {
        that.setData({
            toastHidden: false,
            toastcontent: "入职时间不能跟离职时间相同",
            textareahidden:true
        });
        return;
    }
    if (begintime > endtime){
        that.setData({
            toastHidden:false,
            toastcontent:"入职时间不能比离职时间晚",
            textareahidden: true
        });
        return;
    }
    if (outdate == '至今') {
        value['outdate']='';
    }
    
    var data = "";
    if (!work_id) {
        data = {
            customer_id_en: util.customer_id_en,
            user_id_en: util.user_id_en,
            obj_id: that.data.id,
            company_name: value.companyname,
            position_name: value.appointmentposition,
            start_time: value.indate,
            end_time: value.outdate,
            content: value.workcontent,
        }
    }
    else if (work_id) {
        data = {
            customer_id_en: util.customer_id_en,
            user_id_en: util.user_id_en,
            obj_id: that.data.id,
            company_name: value.companyname,
            position_name: value.appointmentposition,
            start_time: value.indate,
            end_time: value.outdate,
            content: value.workcontent,
            id: work_id
        }
    }

    util.commonRequestPost(
        data,
        "/mini_program/minvite/back/index.php/home/user/operation_work",
        function (res) {
            // console.log("添加或修改：" + JSON.stringify(res));

            if (res.data.err_code != 1000) {
                wx.showModal({
                    title: '提示',
                    content: res.data.err_data,
                    showCancel: false
                });
                return;
            }
            wx.showModal({
                title: '提示',
                content: res.data.err_data,
                showCancel: false,
                success: function (data) {
                    if (data.confirm) {
                        // console.log(workindex)
                        workarray[isindex] = res.data.data;
                        // console.log(workarray);
                        that.setData({
                            workindex: workindex,
                            workarray: workarray
                        })
                    }
                }
            });
        }
    )
};

//添加修改教育经历
function addchanceeach(that,e,isflag){
    var value = e.detail.value;
    var isindex = value.eachisindex;
    var each_id = value.eachid;
    var eachindex = that.data.eachindex;
    var eacharray = that.data.eacharray;
    eachindex[isindex] = isflag;

    for (var i in value) {
        if (value[i] == "" && i != "eachid") {
            that.setData({
                toastHidden: false,
                toastcontent: "还有未填项",
                textareahidden: true
            });
            return;
        }
    };
    var data = "";
    if (!each_id) {
        data = {
            customer_id_en: util.customer_id_en,
            user_id_en: util.user_id_en,
            obj_id: that.data.id,
            school_name: value.schoolname,
            domain_name: value.domainname,
            end_time: value.endtime,
            content: value.eachcontent,
        }
    }
    else if (each_id) {
        data = {
            customer_id_en: util.customer_id_en,
            user_id_en: util.user_id_en,
            obj_id: that.data.id,
            school_name: value.schoolname,
            domain_name: value.domainname,
            end_time: value.endtime,
            content: value.eachcontent,
            id: each_id
        }
    }

    util.commonRequestPost(
        data,
        "/mini_program/minvite/back/index.php/home/user/operation_education",
        function (res) {
            // console.log("添加或修改：" + JSON.stringify(res));
            if (res.data.err_code != 1000) {
                wx.showModal({
                    title: '提示',
                    content: res.data.err_data,
                    showCancel: false
                });
                return;
            }
            wx.showModal({
                title: '提示',
                content: res.data.err_data,
                showCancel: false,
                success: function (data) {
                    if (data.confirm) {
                        // console.log(eachindex)
                        eacharray[isindex] = res.data.data;
                        // console.log(eacharray);
                        that.setData({
                            eachindex: eachindex,
                            eacharray: eacharray
                        })

                    }
                }
            });
        }
    )
}

//删除工作经历
function delteworktemplate(that,e){
    var isindex = e.currentTarget.dataset.index;
    var workarray = that.data.workarray;
    var indatevalue = that.data.indatevalue;
    var outdatevalue = that.data.outdatevalue;
    var workindex = that.data.workindex;
    var work_id = e.currentTarget.dataset.workid;
    if (!work_id) {
        wx.showModal({
            title: '提示',
            content: '您确定要删除此工作经历吗？',
            success: function (res) {
                if (res.confirm) {
                    workarray = util.removearry(workarray, isindex);
                    indatevalue = util.removearry(indatevalue, isindex);
                    outdatevalue = util.removearry(outdatevalue, isindex);
                    workindex = util.removearry(workindex, isindex);

                    that.setData({
                        workarray: workarray,
                        indatevalue: indatevalue,
                        outdatevalue: outdatevalue,
                        workindex: workindex
                    })
                    wx.showToast({
                        title: '删除成功',
                        textareahidden: true
                    })
                }
            }
        })
    }
    else if (work_id) {
        wx.showModal({
            title: '提示',
            content: '您确定要删除此工作经历吗？',
            success:function(res){
                if(res.confirm){
                    var data = {
                        customer_id_en: util.customer_id_en,
                        user_id_en: util.user_id_en,
                        id: work_id
                    };
                    util.commonRequest(
                        data,
                        '/mini_program/minvite/back/index.php/home/user/delete_work',
                        function (res) {
                            // console.log("删除工作经历" + JSON.stringify(res));
                            if (res.data.err_code != 1000) {
                                that.setData({
                                    toastHidden: false,
                                    toastcontent: res.data.err_data 
                                })
                                return;
                            };
                            workarray = util.removearry(workarray, isindex);
                            indatevalue = util.removearry(indatevalue, isindex);
                            outdatevalue = util.removearry(outdatevalue, isindex);
                            workindex = util.removearry(workindex, isindex);

                            that.setData({
                                workarray: workarray,
                                indatevalue: indatevalue,
                                outdatevalue: outdatevalue,
                                workindex: workindex
                            })
                            wx.showToast({
                                title: '删除成功',
                                textareahidden: true
                            })
                        }
                    )
                }
            }
        })

    }
}

//删除教育经历
function delteeachtemplate(that,e){
    var isindex = e.currentTarget.dataset.index;
    var each_id = e.currentTarget.dataset.eachid;
    var eacharray = that.data.eacharray;
    var enddatevalue = that.data.enddatevalue;
    var eachindex = that.data.eachindex;

    if (!each_id) {
        wx.showModal({
            title: '提示',
            content: '您确定要删除此教育经历吗？',
            success: function (res) {
                if (res.confirm) {
                    eacharray = util.removearry(eacharray, isindex);
                    enddatevalue = util.removearry(enddatevalue, isindex);
                    eachindex = util.removearry(eachindex, isindex);

                    that.setData({
                        eacharray: eacharray,
                        enddatevalue: enddatevalue,
                        eachindex: eachindex
                    })
                    wx.showToast({
                        title: '删除成功',
                        textareahidden: true
                    })
                }
            }
        })
    }
    else if (each_id) {
        wx.showModal({
            title: '提示',
            content: '您确定要删除此教育经历吗？',
            success:function(res){
                if(res.confirm){
                    var data = {
                        customer_id_en: util.customer_id_en,
                        user_id_en: util.user_id_en,
                        id: each_id
                    };
                    util.commonRequest(
                        data,
                        '/mini_program/minvite/back/index.php/home/user/delete_edu',
                        function (res) {
                            // console.log("删除教育经历" + JSON.stringify(res));
                            if (res.data.err_code != 1000) {
                                that.setData({
                                    toastHidden: false,
                                    toastcontent: res.data.err_data
                                })
                                return;
                            };
                            eacharray = util.removearry(eacharray, isindex);
                            enddatevalue = util.removearry(enddatevalue, isindex);
                            eachindex = util.removearry(eachindex, isindex);

                            that.setData({
                                eacharray: eacharray,
                                enddatevalue: enddatevalue,
                                eachindex: eachindex
                            })
                            wx.showToast({
                                title: '删除成功',
                                textareahidden: true
                            })
                        }
                    )
                }
            }
        })
    }
}


module.exports = {
    aadchancework: aadchancework,
    addchanceeach: addchanceeach,
    delteworktemplate: delteworktemplate,
    delteeachtemplate: delteeachtemplate,
    nowtime: nowtime
}
