// pages/resume-index/new-resume-workcontent.js

var util=require("../../utils/util.js");
var exprienceCommon = require("resume-common/experience-common.js");
var showmyresume = require("resume-common/showmyresume.js");

//防止多次点击
var tabflag = false;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        id:"",//简历id
        workarray: [],
        eacharray: [],
        workindex: [],
        eachindex: [],
        enddatevalue: [],
        indatevalue: [],
        outdatevalue: [],
        textaretvalue:"",
        lineclamp:"2",
        showmyresume: "",
        textmyself:"",
        toastHidden:true,
        toastcontent:"",
        textareaflag:false,
        textareahidden: false 
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        that.setData({
            id:options.id
        })
        that.onloadshow();
    },
    onloadshow:function(){
        var that=this;
        var workarray = [],
            eacharray = [],
            workindex = [],
            eachindex = [],
            enddatevalue = [],
            indatevalue = [],
            outdatevalue = [];
   
        var data = {
            customer_id_en: util.customer_id_en,
            user_id_en: util.user_id_en
        };
        showmyresume.showmyresume(util, data, that,function(res){    
                workarray= res.data.work;
                eacharray = res.data.edu;
                
                if (workarray.length != 0) {
                    for (var i = 0; i < workarray.length; i++) {
                        workindex.push(false);
                        indatevalue.push(workarray[i].start_time);
                        outdatevalue.push(workarray[i].end_time);
                    }
                }
                if (eacharray.length != 0) {
                    for (var i = 0; i < eacharray.length; i++) {
                        eachindex.push(false);
                        enddatevalue.push(eacharray[i].end_time);
                    }
                }

                that.setData({
                    workarray: workarray,
                    eacharray: eacharray,
                    workindex: workindex,
                    eachindex: eachindex,
                    enddatevalue: enddatevalue,
                    indatevalue: indatevalue,
                    outdatevalue: outdatevalue,
                    id: res.data.baseinfo.id,
                    textmyself: res.data.baseinfo.discription,
                })

                util.hideToast();
        });

    },
    bindeachinput: function (e) {
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
    bindworkinput: function (e) {
        // console.log(e);
        var that = this;
        var workindex = e.currentTarget.dataset.workindex;
        var inputproperty = e.currentTarget.dataset.inputproperty;
        var value = e.detail.value;
        var workarray = that.data.workarray;
        workarray[workindex][inputproperty] = value;
        that.setData({
            workarray: workarray
        })
    },
    toastChange: function () {
        var that = this;
        that.setData({
            toastHidden: true,
            textareahidden: false 
        })
    },
    workchanceformSubmit: function (e) {
        // console.log(e);
        // console.log("workformsubmit:" + JSON.stringify(e.detail.value));
        var that = this;
        exprienceCommon.aadchancework(that,e,false);
    },
    eachchanceformSubmit: function (e) {
        // console.log(e);
        // console.log("eachformsubmit:" + JSON.stringify(e.detail.value));
        var that = this;
        exprienceCommon.addchanceeach(that,e,false);
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
    bindinDateChange: function (e) {
        // console.log(e);
        var that = this;
        var isindex = e.currentTarget.dataset.index;
        var indatevalue = that.data.indatevalue;
        indatevalue[isindex] = e.detail.value;
        that.setData({
            indatevalue: indatevalue
        })
    },
    bindoutDateChange:function(e){
        var that=this;
        var isindex = e.currentTarget.dataset.index;
        var outdatevalue = that.data.outdatevalue;
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
        workindex[isindex] = true;
        that.setData({
            workindex: workindex
        });
    },
    tapwriteeach: function (e) {
        // console.log(e);
        var that = this;
        var isindex = e.currentTarget.dataset.index;
        var eachindex = that.data.eachindex;
        eachindex[isindex] = true;
        that.setData({
            eachindex: eachindex
        });
    },
    delteeachtemplate: function (e) {
        var that = this;
        exprienceCommon.delteeachtemplate(that,e);
    },
    delteworktemplate: function (e) {
        var that = this;
        exprienceCommon.delteworktemplate(that,e);
    },
    textareinput:function(e){
        // console.log(e);
        var value=e.detail.value;
        var that=this;
        that.setData({
            textmyself:value
        })
    },
    bindaddworkexperience: function (e) {
        var that=this;
        if (tabflag){
            return;
        }
        tabflag=true;
        var textmyself = that.data.textmyself;
        var data={
            customer_id_en: util.customer_id_en,
            user_id_en: util.user_id_en,
            id:that.data.id,
            discription: textmyself
        };
        
        util.commonRequest(
            data,
            '/mini_program/minvite/back/index.php/home/user/save_resume_dis',
            function(res){
                // console.log("保存自我介绍"+JSON.stringify(res));
                if(res.data.err_code !=1000){
                    wx.showModal({
                        title: '提示',
                        content: res.data.err_data,
                        showCancel:false
                    })
                    return;
                };

                wx.showModal({
                    title: '提示',
                    content: "添加成功",
                    showCancel: false,
                    success:function(res){
                         if(res.confirm){
                             wx.navigateBack({
                                 url: "creat-new-resume"
                             })
                         }
                    }
                }); 
            }
        )
        
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
        var that=this;
        tabflag=false;
        util.showLoading();
        that.onloadshow();  
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
    onReachBottom: function (e) {
        this.setData({
            textareaflag:true
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})