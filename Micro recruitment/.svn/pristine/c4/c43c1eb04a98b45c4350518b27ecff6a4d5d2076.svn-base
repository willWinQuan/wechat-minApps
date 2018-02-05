// pages/resume-index/creat-new-resume.js
var chooseaddress = require("../common/chooseaddress.js");
var chooseimage=require("../common/chooseimage.js");
var showmyresume = require("resume-common/showmyresume.js");
var util = require("../../utils/util.js");
const date = new Date();
const years = [];
const months = [];

for (let i = date.getFullYear() - 80; i <= date.getFullYear(); i++) {
    years.push(i);
}

for (let i = 1; i <= 12; i++) {
    if (i.toString().length<2){
        i="0"+i;
    }
    months.push(i);
}

//获取date-picker位置&&工作年限下标
function getpickerindex(picker,value){
    for (var i = 0; i < picker.length; i++) {
        if (picker[i] == value) {
            return i;
        }
    }
}

//获取省、市对应下的数据
function getcitys_areas(array,toarray,val_p){
    var new_array=[];
    for (var i = 0; i < array.length; i++) {
        if (array[i].parentid == toarray[val_p[0]].id) {
            new_array.push(array[i]);
        }
    }
    return new_array;
}


//获取省picker位置
function getaddresspickerindex(picker, value) {
    for (var i = 0; i < picker.length; i++) {
        if (picker[i].shortname== value) {
            return i;
        }
    }
}

//选择的省、城市、区展示
var addressprovince = "";
var addresscity = "";
var addresscounty = "";

//确定保存基础参数
var province_id="";
var city_id="";
var area_id="";

//请求城市、区数据参数
var address_id="";

//省id 用于第二次选择地址
var address_id_p="";

// 记忆位置
var val_p=[0];
var val_city=[0];
var val_county=[0];

var year=years[years.length-1];
var month=months[1];

//防止多次点击
var tabflag=false;
Page({
    /**
     * 页面的初始数据
     */
    data: {
        id:"",//简历id
        user_id_en:"",
        phonenumber:"",
        years: years,
        year: "",
        months: months,
        month: "",
        yearmonthvalue:[80,1],
        value: [],
        array: ["小学","初中", "高中", '中专', "大专", "本科", "硕士", "博士","其他"],
        workarray: ['1年以下', '1-3年', '3-5年','5-8年','8-10年','10-15年','15-20年','20年以上'],
        eachvalue: '',
        workvalue: [],
        addressvalue: '',
        sexchecked: "1",
        hiddenmask: true,
        hiddendetamask:true,
        provinces: [],
        addressprovince: "",
        all_citys:'',
        all_countys:'',
        citys: [],
        addresscity: "",
        countys: [],
        addresscounty: "",
        pickershow: "-580rpx",
        toastHidden: true,
        toastcontent: "",
        swipercurrent:"0",
        datepickershow:"-80rpx",
        imagerray: [false],
        birthdayvalue:"",
        pickeryear:date.getFullYear(),
        pickermonth:date.getMonth()+1,
        pickerday:date.getDate(),
        showmyresume:"",
        provincesvalue:[0],
        citysvalue:[0],
        countysvalue:[0],
        begin_year:'',
        begin_month:'',
        begin_addressprovince:'',
        begin_addresscity:'',
        begin_addresscounty:'',
        begin_province_id:'',
        begin_city_id:'',//避免picker出现后，不做任何操作就关闭造成city_id为空
        begin_area_id:'',
        istapform:false,
        loadingflag:false,
        isupload:false
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that=this;
        var monthvalue=getpickerindex(months,date.getMonth());
        var yearmonthvalue = that.data.yearmonthvalue;
        yearmonthvalue[1] = monthvalue;
        that.setData({
            user_id_en: util.user_id_en,
            yearmonthvalue: yearmonthvalue
        }) 

        that.showaddress();    
        that.showmyresume();
         
    },
    showmyresume: function () {
        var that = this;
        var data = {
            customer_id_en: util.customer_id_en,
            user_id_en: that.data.user_id_en
        };
        showmyresume.showmyresume(util, data, that,function(res){
            // console.log(res);
            if (!res.data.baseinfo) {
                return;
            }
            var baseinfo=res.data.baseinfo;
            switch (baseinfo.edu_type) {
                case "1": baseinfo.edu_type = "小学"; break;
                case "2": baseinfo.edu_type = "初中"; break;
                case "3": baseinfo.edu_type = "高中"; break;
                case "4": baseinfo.edu_type = "中专"; break;
                case "5": baseinfo.edu_type = "大专"; break;
                case "6": baseinfo.edu_type = "本科"; break;
                case "7": baseinfo.edu_type = "硕士"; break;
                case "8": baseinfo.edu_type = "博士"; break;
                case "9": baseinfo.edu_type = "其他"; break;
            }
            var imagerray = that.data.imagerray;

            imagerray[0] = util.http_host+baseinfo.pic_url;
            that.setData({
                showmyresume:res,
                birthdayvalue: baseinfo.birthday,
                eachvalue: baseinfo.edu_type,
                workvalue: baseinfo.workyear,
                addressprovince: baseinfo.province,
                addresscity: baseinfo.city,
                addresscounty: baseinfo.area,
                phonenumber: baseinfo.contact,
                id: baseinfo.id,
                imagerray: imagerray,
                sexchecked: baseinfo.sex,
                begin_addressprovince: baseinfo.province,
                begin_addresscity: baseinfo.city,
                begin_addresscounty: baseinfo.area,
                begin_province_id : baseinfo.province_id,
                begin_city_id: baseinfo.city_id,
                begin_area_id: baseinfo.area_id

            })
            util.hideToast();
        });
    },
    bindbirthdayPickerChange:function(e){
          var that=this;
          var value=e.detail.value;
          that.setData({
              birthdayvalue:value
          });
    },
    binddatepicker:function(e){
        var that=this;
        that.setData({
            datepickershow:"500rpx",
            hiddendetamask:false
        })
    },
    binddetaChange: function (e) {
        const val = e.detail.value;
        year = this.data.years[val[0]];
        month = this.data.months[val[1]];
    },
    suredate:function(e){
        var that = this;
        that.setData({
            datepickershow: "-80rpx",
            hiddendetamask: true,
            year: year,
            month:month,
            begin_year: year,
            begin_month: month,            
        });
    },
    canceldate:function(){
        var that = this;
        that.setData({
            datepickershow: "-80rpx",
            hiddendetamask: true,
            year: that.data.begin_year,
            month: that.data.begin_month
        });
    },
    showaddress:function(callback){
        var that = this;

        var data = {
            customer_id_en: util.customer_id_en,
            user_id_en: util.user_id_en
        }
        chooseaddress.showaddress(data, function (res) { 
            // console.log(res);
            var citys =[];
            var countys=[];
            var provinces_data = res.province;
            var citys_data=res.city;
            var areas_data = res.area;
            citys = getcitys_areas(citys_data, provinces_data, val_p);    
            countys = getcitys_areas(areas_data, citys_data, val_city);

            that.setData({
                provinces: provinces_data,
                all_citys:res.city,
                all_countys: res.area,
                citys:citys,
                countys: countys
            })

        });    
    },
    bindaddressChange:function(e){
        // console.log(e);
        var that=this;
        var value=e.detail.value;

        val_p[0]=value[0];
        val_city[0]=value[1];
        val_county[0]=value[2];

        var citys = [];
        var countys = [];
        var provinces_data = that.data.provinces;
        var citys_data = that.data.all_citys;
        var areas_data = that.data.all_countys;
        
        citys = getcitys_areas(citys_data, provinces_data, val_p);
        that.setData({
            citys: citys
        })
        
        if(citys.length==0){
            that.setData({
                countys:citys
            })
            return;
        }
        setTimeout(function(){
            citys_data = that.data.citys;  
            countys = getcitys_areas(areas_data, citys_data, val_city);
            that.setData({
                countys: countys
            })

        },250)
                
    },
    sureaddress:function(){
        var that=this;
        var provinces_data = that.data.provinces;
        var citys_data = that.data.citys;
        var areas_data = that.data.countys; 

        province_id = provinces_data[val_p[0]].id;

    
        if (citys_data.length==0){
           city_id='无';
           citys_data=[
               {
                   shortname:'无',
                   id:''  
               }
           ];
           that.setData({
               citys: citys_data
           })
        }else{
            city_id = citys_data[val_city[0]].id;
        }
        
        if (areas_data.length==0){
            area_id = '无';
            areas_data = [
                {
                    shortname: '无',
                    id:''
                }
            ];
            that.setData({
                countys: areas_data
            })
        }else{
            area_id = areas_data[val_county[0]].id; 
        }   

        that.setData({
            addressprovince: provinces_data[val_p[0]].shortname,
            addresscity: citys_data[val_city[0]].shortname,
            addresscounty: areas_data[val_county[0]].shortname,
            hiddenmask: true,
            pickershow: "-580rpx"
        })
       
    },
    toastChange: function () {
        var that=this;
        that.setData({
            toastHidden: true
        })
    },

    canceladdress:function(){
        var that=this;
        that.setData({
            hiddenmask: true,
            pickershow: "-580rpx"
        })
    },
    addheardImg: function () {
        var that = this;
        chooseimage.chooseimage(1,that);
    },
    tapchoosesex: function (e) {
        var that = this;
        var value = e.currentTarget.dataset.value;
        that.setData({
            sexchecked: value
        })
    },
    tabchooseaddress: function () {
        var that=this;
        var citys = [];
        var countys = [];
        var provinces_data = that.data.provinces;
        var citys_data = that.data.all_citys;
        var areas_data = that.data.all_countys;
        var province = that.data.addressprovince;
        var addresscity = that.data.addresscity;
        var addresscounty = that.data.addresscounty;   
                
        var provincesvalue_index = getaddresspickerindex(that.data.provinces,province);
       
        if (provincesvalue_index) {

            val_p[0] = provincesvalue_index;
            citys = getcitys_areas(citys_data, provinces_data, val_p);
            that.setData({
                citys: citys
            }) 

            province_id = provinces_data[val_p[0]].id;
            var citysvalue_index = getaddresspickerindex(that.data.citys, addresscity);
            val_city[0] = citysvalue_index;
            citys_data = that.data.citys;
            if (citys_data.length == 0) {
                city_id = '无';
                citys_data = [
                    {
                        shortname: '无',
                        id: '无'
                    }
                ];
                that.setData({
                    citys: citys_data
                })
            }else{
                city_id = citys_data[val_city[0]].id;
            } 
    
            if (city_id!='无'){
                countys = getcitys_areas(areas_data, citys_data, val_city);
                that.setData({
                    countys: countys
                })
            }else{
                that.setData({
                    countys: []
                })
            }

     
            var countyvalue_index = getaddresspickerindex(that.data.countys, addresscounty);
            val_county[0] = countyvalue_index;
            areas_data = that.data.countys;
            if (areas_data.length == 0) {
                area_id = '无';
                areas_data = [
                    {
                        shortname: '无',
                        id: '无'
                    }
                ];
                that.setData({
                    countys: areas_data
                })
            } else {
                area_id = areas_data[val_county[0]].id;
            }  
        }
        
        if (!val_city[0]){
            val_city[0]=0;
        }
        if (!val_county[0]){
            val_county[0]=0; 
        }

        that.setData({
            swipercurrent: "0",
            pickershow: '0rpx',
            hiddenmask: false,
            addressvalue: [val_p[0], val_city[0], val_county[0]]
        })

    },
    getPhoneNumber:function(e){
        // console.log(e);
        var that=this;
        if (!e.detail.iv || !e.detail.encryptedData){
            return;
        }
		 wx.login({
          success:function(res){
                var data={
                    customer_id_en: util.customer_id_en,
                    user_id_en: that.data.user_id_en,
                    code:res.code,
                    iv:e.detail.iv,
                    encryptedData: e.detail.encryptedData
                };
                util.commonRequest(
                    data,
                    "/mini_program/minvite/back/index.php/home/Auxiliary/telphone",
                    function(res){ 
                        if(res.data.error==1000){
                            that.setData({
                                phonenumber:res.data.data
                            })   
                            
                        }else{
                            
                            that.setData({
                                toastHidden:false,
                                toastcontent:'获取手机号码失败'
                            })
                            console.log(res);
                        }
                          
                    }
                );
		  }
		 })		  
    },
    formSubmit: function (e) {
        // console.log(e);
        var value = e.detail.value;
        var that = this;
        
        that.setData({
            loadingflag:true
        })
        if (tabflag){
            return;
        }
        var phonez = /^1[34578]\d{9}$/;
        var emailz = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
        for (var i in value) {
            if (value[i] == "") {
                that.setData({
                    toastHidden: false,
                    toastcontent: "还有未填项",
                    loadingflag: false
                });
                return;
            }
            if (i == "hearimg" && value[i] == '../../image/jianli_tx.png') {
                that.setData({
                    toastHidden: false,
                    toastcontent: "请上传头像",
                    loadingflag: false
                })
                return;
            }
            if (i == "inname" && value[i].length >5 ) {
                that.setData({
                    toastHidden: false,
                    toastcontent: "姓名不能超过5个字符",
                    loadingflag: false
                })
                return;
            }
            if (i == "phonenumber" && !(phonez.test(value[i]))) {
                that.setData({
                    toastHidden: false,
                    toastcontent: "手机号码不符合规则",
                    loadingflag: false
                })
                return;
            }
            if (i == "gmailnumber" && !(emailz.test(value[i]))) {
                that.setData({
                    toastHidden: false,
                    toastcontent: "邮箱不符合规则",
                    loadingflag: false
                })
                return;
            }
        };
        tabflag=true;
        if (province_id=='' ||　city_id == '' || area_id=='') {//没有操作完整picker
            province_id = that.data.begin_province_id; 
            city_id = that.data.begin_city_id;
            area_id = that.data.begin_area_id;
        }
        
        if (city_id=='无'){
           city_id='';
        }
        if (area_id=='无'){
            area_id='';
        }

        var edu_type="";
        switch (value.eachexperience){
            case "小学": edu_type=1;break;
            case "初中": edu_type=2;break;
            case "高中": edu_type=3;break;
            case "中专": edu_type=4; break;
            case "大专": edu_type=5;break;
            case "本科": edu_type=6;break;
            case "硕士": edu_type=7;break;
            case "博士": edu_type=8;break;
            case "其他": edu_type=9; break;
           };

           var birthdayyear = value.birthday.substring(0,4);
           var birthdaymonth = value.birthday.substring(5, 7);
           var birthdayday = value.birthday.substring(9,11);
           var birthday = birthdayyear + "-" + birthdaymonth + "-" + birthdayday;
           var pic_url = value.hearimg;
               pic_url=chooseimage.cut_pic_url(pic_url); 
               var workarray = that.data.workarray;
           
           var workyear_status = getpickerindex(workarray,value.workdate)+1;

        var data={
            customer_id_en: util.customer_id_en,
            user_id_en: that.data.user_id_en,
            pic_url: pic_url,
            name:value.inname,
            sex:value.sex,
            edu_type: edu_type,
            workyear_status: workyear_status,
            province_id: province_id,
            city_id: city_id,
            area_id: area_id,
            contact	:value.phonenumber,
            email: value.gmailnumber,
            birthday: birthday
        };
        
        util.commonRequestPost(
            data,
            "/mini_program/minvite/back/index.php/home/user/create_baseinfo",
            function(res){
                console.log(res);
                if(res.data.err_code != 1000){
                    that.setData({
                        toastHidden: false,
                        toastcontent: res.data.err_data,
                        loadingflag: false
                    })
                    return;
                };
                that.setData({
                    id: res.data.data.id,
                    loadingflag: false
                })
                wx.showModal({
                    title: '提示',
                    content: res.data.err_data,
                    showCancel:false,
                    success:function(data){
                        if(data.confirm){
                            wx.redirectTo({
                                url:"new-resume-workcontent?id="+that.data.id+""
                            });
                        }
                    }
                });
            }
       )
    },
    bindPickerChange: function (e) {
        // console.log(e)
        var that = this;
        that.setData({
            eachvalue: that.data.array[e.detail.value]
        })
    },
    bindworkPickerChange: function (e) {
        // console.log(e)
        var that = this;
        that.setData({
            workvalue: that.data.workarray[e.detail.value]
        });
    },
    bindmask:function(){
        var that=this;

        if (city_id==''){//没有操作picker
            city_id = that.data.begin_city_id;
            area_id = that.data.begin_area_id;
        }
        that.setData({
            hiddenmask:true,
            pickershow:"-580rpx"
        });
    },
    binddetamask:function(){
        this.setData({
            hiddendetamask: true,
            datepickershow: "-80rpx"
        }); 
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
         wx.login({
             success: function (res) {
                 if (res.code) {
                     that.setData({
                         code: res.code
                     })
                 }
             }
         }) 
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

})