// pages/resume/add-work-experience.js

var util = require("../../utils/util.js");
var exprienceCommon = require("resume-common/experience-common.js");

function nowtime() {
    var date = new Date();
    var year = Number(date.getFullYear())+1;
    var month = date.getMonth()+1;
    var day = date.getDate();

    if (day.toString().length < 2) {
        day = "0" + day;
    }

    return (year + "-" + month + "-" + day);
}

//初始
var neweacharry={
    content:"",
    createtime:"",
    domain_name:"",
    end_time:"",
    endtime:"",
    id:"",
    isvalid:"",
    school_name:"",
    textmyPlaceholder: '请在此输入您的自我介绍...',
    texteachPlaceholder: '请在此描述您的教育内容...',
    textworkPlaceholder: '请在此描述您的工作内容...'
}

//防止多次点击
var tabflag = false;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        id:"",//简历id
        eacharray: [],
        enddatevalue: [],
        eachindex: [],
        lineclamp:"2",
        toastHidden:true,
        toastcontent:"",
        nowdate:"",
        textareahidden:false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
       var that = this;
       var eacharray = [neweacharry];
       var enddatevalue = [];
       var eachindex = [];
       var nowdate = nowtime();
       for (var i = 0; i < eacharray.length; i++) {
           eachindex.push(false);
           enddatevalue.push("");
       }
       that.setData({
           eacharray: eacharray,
           eachindex: eachindex,
           enddatevalue: enddatevalue,
           id:options.id,
           nowdate: nowdate
       })
    },
    bindeachinput:function(e){
        var that = this;
        var eachindex = e.currentTarget.dataset.eachindex;
        var inputproperty = e.currentTarget.dataset.inputproperty;
        var value = e.detail.value;
        var eacharray = that.data.eacharray;
        eacharray[eachindex][inputproperty] = value;
        that.setData({
            eacharray: eacharray
        })
    },
    eachformSubmit: function (e) {
        // console.log(e);
        var that = this;
        exprienceCommon.addchanceeach(that,e,true);

    },
    bindendDateChange: function (e) {
        // console.log(e)
        var that = this;
        var isindex = e.currentTarget.dataset.index;
        var enddatevalue = that.data.enddatevalue;
        enddatevalue[isindex] = e.detail.value;
        that.setData({
            enddatevalue: enddatevalue
        })
    },
    tapwriteeach: function (e) {
        // console.log(e);
        var that = this;
        var isindex = e.currentTarget.dataset.index;
        var eachindex = that.data.eachindex;
        eachindex[isindex] = false;
        that.setData({
            eachindex: eachindex
        })
    },
    addeachtemplate: function () {
        var that = this;
        var eacharray = that.data.eacharray;
        var enddatevalue = that.data.enddatevalue;
        var eachindex = that.data.eachindex;
        eacharray.push(neweacharry);
        enddatevalue.push("");
        eachindex.push(false);
        that.setData({
            eacharray: eacharray,
            enddatevalue: enddatevalue,
            eachindex: eachindex
        })
    },
    delteeachtemplate: function (e) {
        var that = this;
        exprienceCommon.delteeachtemplate(that,e);
    },
    bindnewresumeworkcontent: function () {
        var that=this;
        if (tabflag){
            return;
        }
        tabflag=true;
        var isfalse = 0;
        var eachindex = that.data.eachindex;
        for (var i = 0; i < eachindex.length; i++) {
            if (eachindex[i] == false) {
                isfalse++;
            }
        }
        if (isfalse > 0) {
            wx.showModal({
                title: '温馨提示',
                content: '未保存项将会遗失',
                cancelText: "留在本页",
                confirmText: "确定返回",
                success: function (res) {
                    if (res.confirm) {
                        wx.navigateBack({
                            url: "new-resume-workcontent?id=" + that.data.id + ""
                        })
                    }
                    if(res.cancel){
                        tabflag=false;
                    }
                }
            })
        }
        else if (isfalse == 0) {
            wx.navigateBack({
                url: "new-resume-workcontent?id=" + that.data.id + ""
            })
        }

    },
    toastChange: function () {
        this.setData({
            toastHidden: true,
            textareahidden:false
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
    onShow: function () {
        tabflag=false;
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