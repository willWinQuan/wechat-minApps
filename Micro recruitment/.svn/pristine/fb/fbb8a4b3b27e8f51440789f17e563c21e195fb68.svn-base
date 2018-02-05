// pages/resume/add-work-experience.js

var util = require("../../utils/util.js");
var exprienceCommon = require("resume-common/experience-common.js");
//初始
var newworkarray = {
    company_name: "",
    content: "",
    createtime: "",
    end_time: "",
    endtime: "",
    id: "",
    isvalid: "",
    position_name: "",
    start_time: "",
    starttime: "",
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
        indatevalue: [],
        outdatevalue: [],
        workarray: [],
        workindex: [],
        lineclamp:"2",
        toastHidden:true,
        toastcontent:"",
        nowDate:"",
        isfalse:[false,false,false,false],
        textareahidden:false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        var workarray = [newworkarray];
        var workindex = [];
        var indatevalue = [];
        var outdatevalue = [];
        var nowDate = exprienceCommon.nowtime();

        for (var i = 0; i < workarray.length; i++) {
            workindex.push(false);
            indatevalue.push("");
            outdatevalue.push("至今");
        }
        that.setData({
            workarray: workarray,
            workindex: workindex,
            indatevalue: indatevalue,
            outdatevalue: outdatevalue,
            id:options.id,
            nowDate: nowDate
        })
    },
    bindworkinput:function(e){
    //    console.log(e);
       var that=this;
       var workindex=e.currentTarget.dataset.workindex;
       var inputproperty = e.currentTarget.dataset.inputproperty;
       var value=e.detail.value;
       var workarray = that.data.workarray;
       workarray[workindex][inputproperty]=value;
       that.setData({
           workarray: workarray
       })
    },
    addworktemplate: function (e) {
        var that = this;
        var workarray = that.data.workarray;
        var workindex = that.data.workindex;
        var indatevalue = that.data.indatevalue;
        var outdatevalue = that.data.outdatevalue;
        workarray.push(newworkarray);
        workindex.push(false);
        indatevalue.push("");
        outdatevalue.push("至今");

        that.setData({
            workarray: workarray,
            workindex: workindex,
            indatevalue: indatevalue,
            outdatevalue: outdatevalue
        })
    },
    workformSubmit: function (e) {
        // console.log(e);
        var that = this;
        exprienceCommon.aadchancework(that, e,true);           
    },
    bindinDateChange: function (e) {
        // console.log(e)
        var that = this;
        var isindex = e.currentTarget.dataset.index;
        var indatevalue = that.data.indatevalue;
        // console.log(indatevalue);
        indatevalue[isindex] = e.detail.value;
        that.setData({
            indatevalue: indatevalue
        })
    },
    bindoutDateChange: function (e) {
        // console.log(e);
        var that = this;
        var isindex = e.currentTarget.dataset.index;
        var outdatevalue = that.data.outdatevalue;
        // console.log(outdatevalue);
        outdatevalue[isindex] = e.detail.value;
        that.setData({
            outdatevalue: outdatevalue
        })
    },
    tapwritework: function (e) {
        // console.log(e);
        var that = this;
        var isindex = e.currentTarget.dataset.index;
        var workindex = that.data.workindex;
        workindex[isindex] = false;
        // console.log(workindex);
        that.setData({
            workindex: workindex
        })
    },
    delteworktemplate: function (e) {
        var that = this;
        exprienceCommon.delteworktemplate(that,e);  
    },
    bindnewresumeworkcontent: function () {
        var that=this;
        if (tabflag){
            return;
        }
        tabflag=true;
        var isfalse=0;
        var workindex = that.data.workindex;
        for (var i = 0; i < workindex.length;i++){
            if(workindex[i]==false){
                isfalse++;
            }
        }
        if(isfalse >0){
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
        else if (isfalse==0){
            wx.navigateBack({
                url: "new-resume-workcontent?id=" + that.data.id + ""
            })
        }
        
    },
    toastChange:function(){
        this.setData({
            toastHidden:true,
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