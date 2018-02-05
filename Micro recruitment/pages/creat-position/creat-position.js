// pages/position_info/position_info.js
var showmyresume = require("../resume/resume-common/showmyresume.js");
var chooseaddress = require("../common/chooseaddress.js");
var util = require("../../utils/util.js");
//获取省、市对应下的数据
function getcitys_areas(array, toarray, val_p) {
  var new_array = [];
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
    if (picker[i].shortname == value) {
      return i;
    }
  }
}

//选择的省、城市、区展示
var addressprovince = "";
var addresscity = "";
var addresscounty = "";

//确定保存基础参数
var province_id = "";
var city_id = "";
var area_id = "";

//请求城市、区数据参数
var address_id = "";

//省id 用于第二次选择地址
var address_id_p = "";

// 记忆位置
var val_p = [0];
var val_city = [0];
var val_county = [0];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    education: '',
    education_array: [],
    education_array_have:[],
    trade: '',
    trade_array: [],
    trade_array_have: [],
    welfare: '',
    welfare_array: [],
    welfare_array_have:[],

    hiddenmask: true,
    toastHidden:true,
    pickershow: '-81rpx',
    submit_value: '',
    provinces: [],
    addressprovince: "",
    citys: [],
    addresscity: "",
    countys: [],
    addresscounty: "",
    pickershow: "-580rpx",
    toastcontent: "",
    swipercurrent: "0",
    addressvalue: '',
    showmyresume: "",


    trade_array_id:[],
    trade_array_have_id:[],
    welfare_array_id:[],
    welfare_array_have_id:[],
    save_status:'',
    position_explain:'',
    job_id:'',
    detail_address:'街道门牌信息',
    address_status:true,
    detail_status:false,
    destribe_status:true,
    code:'',
    save_btn:0,
    label:'',

    provincesvalue: [0],
    citysvalue: [0],
    countysvalue: [0],
    begin_addressprovince: '',
    begin_addresscity: '',
    begin_addresscounty: '',
    begin_province_id: '',
    begin_city_id: '',//避免picker出现后，不做任何操作就关闭造成city_id为空
    begin_area_id: '',
    margin_top:'12rpx',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      job_id:options.id,
    }) 
    // console.log(that.data.job_id)
    var trade_array = that.data.trade_array;
    var education_array = that.data.education_array;
    var welfare_array = that.data.welfare_array;
    var trade_array_id = that.data.trade_array_id;
    var welfare_array_id=that.data.welfare_array_id

    // 未创建过 渲染页面数据
    var data={
      customer_id_en:util.customer_id_en,
      user_id_en:util.user_id_en,
    };
    util.commonRequest(
      data,
      '/mini_program/minvite/back/index.php/home/frontweb/job_info_web',
      function(res){
        console.log(res)
        // 职业分类数据
        var trade='';
        var trade_id='';
        for(var i=0;i<res.data.pos_data.length;i++){
          trade = res.data.pos_data[i].name;
          trade_id=res.data.pos_data[i].pos_id;
          trade_array.push(trade);
          trade_array_id.push(trade_id);
        }
        // 福利待遇数据
        var label='';
        var label_id='';
        for(var i=0;i<res.data.label_data.length;i++){
          label=res.data.label_data[i].label;
          label_id=res.data.label_data[i].label_id;
          welfare_array.push(label);
          welfare_array_id.push(label_id);
        }
        console.log(welfare_array)
        province_id = res.data.def_addr.province_id;
        city_id = res.data.def_addr.city_id;
        area_id = res.data.def_addr.area_id;
        address_id_p = res.data.def_addr.province_id;

        var picker_value = [];
        that.setData({
          trade_array: trade_array,
          education_array: res.data.edu_data,
          welfare_array: welfare_array,
          trade_array_id: trade_array_id,
          pos_data:res.data.pos_data,
          welfare_array_id: welfare_array_id,
          addressprovince:res.data.def_addr.province_name,
          addresscity:res.data.def_addr.city_name,
          addresscounty:res.data.def_addr.area_name,
          is_job:res.data.is_job,
          detail_address:res.data.def_addr.address,

          value: picker_value,
          begin_addressprovince: res.data.def_addr.province_name,
          begin_addresscity: res.data.def_addr.city_name,
          begin_addresscounty: res.data.def_addr.area_name,

          begin_province_id: res.data.def_addr.province_id,
          begin_city_id: res.data.def_addr.city_id,
          begin_area_id: res.data.def_addr.area_id
        })
        // 编辑职位
        if (that.data.job_id != undefined) {
          var data_edit = {
            customer_id_en: util.customer_id_en,
            user_id_en: util.user_id_en,
            job_id: that.data.job_id,
          };
          util.commonRequest(
            data_edit,
            '/mini_program/minvite/back/index.php/home/job/job_detail',
            function (res) {
              console.log(res)
              that.setData({
                job_name: res.data.job_name,
                min_money: res.data.min,
                max_money: res.data.max,
                phone_number: res.data.e_contact,
                addressprovince: res.data.province,
                addresscity: res.data.city,
                addresscounty: res.data.area,
                detail_address: res.data.address,
                position_explain: res.data.content,
              })
              province_id = res.data.province_id;
              city_id = res.data.city_id;
              area_id = res.data.area_id;

              // var trade=''
              var trade_array_have = that.data.trade_array_have;
              var trade_array_have_id=that.data.trade_array_have_id
              if (res.data.position!=null){
                for (var i = 0; i < res.data.position.length; i++) {
                  trade = res.data.position[i].name;
                  trade_id = res.data.position[i].id;
                  trade_array_have.push(trade);
                  trade_array_have_id.push(trade_id);
                }
              }
              
              var education='';
              var education_array_have = that.data.education_array_have;
              for(var i=0;i<res.data.edu_status.length;i++){
                education = res.data.edu_status[i].name;
                education_array_have.push(education);
              }
              var welfare_array_have = that.data.welfare_array_have;
              var welfare_array_have_id = that.data.welfare_array_have_id;
              if (res.data.labels!=null){
                for (var i = 0; i < res.data.labels.length; i++) {
                  label = res.data.labels[i].label;
                  label_id = res.data.labels[i].id;
                  welfare_array_have.push(label);
                  welfare_array_have_id.push(label_id)
                }
              }             
              that.setData({
                trade_array_have: trade_array_have,
                education_array_have: education_array_have,
                welfare_array_have: welfare_array_have,
                trade_array_have_id: trade_array_have_id,
                welfare_array_have_id: welfare_array_have_id,
              })
            }
          )
        }
      }
    )
    that.showaddress();    
  },
  binddatepicker: function (e) {
    var that = this;
    that.setData({
      datepickershow: "500rpx",
      hiddendetamask: false,
      address_status: false,
      detail_status: true,
      descript_status: false,
    })
  },

  // 地址选择器
  showaddress: function (callback) {
    var that = this;

    var data = {
      customer_id_en: util.customer_id_en,
      user_id_en: util.user_id_en
    }
    chooseaddress.showaddress(data, function (res) {
      // console.log(res);
      var citys = [];
      var countys = [];
      var provinces_data = res.province;
      var citys_data = res.city;
      var areas_data = res.area;
      citys = getcitys_areas(citys_data, provinces_data, val_p);
      countys = getcitys_areas(areas_data, citys_data, val_city);

      that.setData({
        provinces: provinces_data,
        all_citys: res.city,
        all_countys: res.area,
        citys: citys,
        countys: countys
      })

    });
  },
  bindaddressChange: function (e) {
    // console.log(e);
    var that = this;
    var value = e.detail.value;

    val_p[0] = value[0];
    val_city[0] = value[1];
    val_county[0] = value[2];

    var citys = [];
    var countys = [];
    var provinces_data = that.data.provinces;
    var citys_data = that.data.all_citys;
    var areas_data = that.data.all_countys;

    citys = getcitys_areas(citys_data, provinces_data, val_p);
    that.setData({
      citys: citys
    })

    if (citys.length == 0) {
      that.setData({
        countys: citys
      })
      return;
    }
    setTimeout(function () {
      citys_data = that.data.citys;
      countys = getcitys_areas(areas_data, citys_data, val_city);
      that.setData({
        countys: countys
      })

    }, 250)

  },
  sureaddress: function () {
    var that = this;
    var provinces_data = that.data.provinces;
    var citys_data = that.data.citys;
    var areas_data = that.data.countys;

    province_id = provinces_data[val_p[0]].id;


    if (citys_data.length == 0) {
      city_id = '无';
      citys_data = [
        {
          shortname: '无',
          id: ''
        }
      ];
      that.setData({
        citys: citys_data
      })
    } else {
      city_id = citys_data[val_city[0]].id;
    }

    if (areas_data.length == 0) {
      area_id = '无';
      areas_data = [
        {
          shortname: '无',
          id: ''
        }
      ];
      that.setData({
        countys: areas_data
      })
    } else {
      area_id = areas_data[val_county[0]].id;
    }

    that.setData({
      addressprovince: provinces_data[val_p[0]].shortname,
      addresscity: citys_data[val_city[0]].shortname,
      addresscounty: areas_data[val_county[0]].shortname,
      hiddenmask: true,
      pickershow: "-580rpx"
    })
    setTimeout(function () {
      that.setData({
        address_status: true,
        detail_status: false,
        destribe_status: true,
      })
    }, 200)
  },
  toastChange: function () {
    var that = this;
    that.setData({
      toastHidden: true
    })
  },

  canceladdress: function () {
    var that = this;
    that.setData({
      hiddenmask: true,
      pickershow: "-580rpx"
    })
    setTimeout(function () {
      that.setData({
        address_status: true,
        detail_status: false,
        destribe_status: true,
      })
    }, 200)
  },
  tabchooseaddress: function () {
    var that = this;
    var citys = [];
    var countys = [];
    var provinces_data = that.data.provinces;
    var citys_data = that.data.all_citys;
    var areas_data = that.data.all_countys;
    var province = that.data.addressprovince;
    var addresscity = that.data.addresscity;
    var addresscounty = that.data.addresscounty;

    var provincesvalue_index = getaddresspickerindex(that.data.provinces, province);

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
      } else {
        city_id = citys_data[val_city[0]].id;
      }

      if (city_id != '无') {
        countys = getcitys_areas(areas_data, citys_data, val_city);
        that.setData({
          countys: countys
        })
      } else {
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

    if (!val_city[0]) {
      val_city[0] = 0;
    }
    if (!val_county[0]) {
      val_county[0] = 0;
    }

    that.setData({
      swipercurrent: "0",
      pickershow: '0rpx',
      hiddenmask: false,
      addressvalue: [val_p[0], val_city[0], val_county[0]]
    })
    setTimeout(function () {
      that.setData({
        address_status: false,
        detail_status: true,
        destribe_status: false,
      })
    }, 200)

  },
  toastChange: function () {
    this.setData({
      toastHidden: true
    })
  },
  bindmask: function () {
    var that = this;

    if (city_id == '') {//没有操作picker
      city_id = that.data.begin_city_id;
      area_id = that.data.begin_area_id;
    }
    that.setData({
      hiddenmask: true,
      pickershow: "-580rpx",
      destribe_status: true,
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
    wx.login({
      success: function (res) {
        that.setData({
          code: res.code
        })
      }
    })
    var phone = wx.getSystemInfoSync();  //调用方法获取机型
    var system = phone.system.substring(0, 3)
    var Cts = 'iOS'
    if (Cts.indexOf(system) !== -1) {
      console.log(111111111)
      that.setData({
        margin_top:'-10rpx',
      })
    }
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

  },
  // 选择地址
  bindaddressPickerChange: function (e) {
    var that = this;
    this.setData({
      addressvalue: e.detail.value
    })
  },
  // 学历要求
  bindeducationChange: function (e) {
    console.log(e)
    var that = this;
    var education_array_have=that.data.education_array_have;
    if(education_array_have.indexOf(that.data.education_array[e.detail.value])<=-1){
      education_array_have.push(that.data.education_array[e.detail.value]);
      that.setData({
        education_array_have: education_array_have,
      })
    }
  },
  // 学历要求删除按钮
  del_education: function (e) {
    var that = this;
    var education_array_have = that.data.education_array_have;
    var education_index = e.currentTarget.dataset.index;
    education_array_have.splice(education_index, 1);
    that.setData({
      education_array_have: education_array_have,
    })
  },
  // 职业分类
  bindtradeChange: function (e) {
    console.log(e)
    var that = this;
    if (that.data.trade_array.length!=0){
      var trade_array_have = that.data.trade_array_have;
      var trade_array_have_id = that.data.trade_array_have_id;
      if (trade_array_have.indexOf(that.data.trade_array[e.detail.value]) > -1) {
        // console.log('此处可加逻辑!')
      } else {
        trade_array_have.push(that.data.trade_array[e.detail.value])
        trade_array_have_id.push(that.data.trade_array_id[e.detail.value])
        that.setData({
          trade_value: that.data.trade_array[e.detail.value],
          trade_array_have: trade_array_have,
          trade_id: that.data.trade_array_id[e.detail.value],
          trade_array_have_id: trade_array_have_id,
        })
        // console.log(that.data.trade_array_have)
      }
      console.log(trade_array_have_id);
      console.log(trade_array_have)
    }else{
      that.setData({
        toastHidden: false,
        toastcontent: "该选项为空"
      })
    } 
  },
  // 职业分类删除按钮
  del_trade: function (e) {
    var that = this;
    var trade_array_have = that.data.trade_array_have;
    var trade_index = e.currentTarget.dataset.index;
    var trade_array_have_id = that.data.trade_array_have_id;
    trade_array_have.splice(trade_index, 1);
    trade_array_have_id.splice(trade_index,1);
    that.setData({
      trade_array_have: trade_array_have,
      trade_array_have_id: trade_array_have_id,
    })
    console.log(trade_array_have_id);
  },
  // 福利待遇
  bindwelfareChange: function (e) {
    // console.log(e)
    var that = this;
    console.log(that.data.label)
    var welfare_array_have = that.data.welfare_array_have;
    var welfare_array_have_id = that.data.welfare_array_have_id;
    console.log(that.data.welfare_array)
    if (that.data.welfare_array.length!=0) {
      if (welfare_array_have.indexOf(that.data.welfare_array[e.detail.value]) <= -1) {
        welfare_array_have.push(that.data.welfare_array[e.detail.value]);
        welfare_array_have_id.push(that.data.welfare_array_id[e.detail.value])
        that.setData({
          welfare_array_have: welfare_array_have,
          welfare_array_have_id: welfare_array_have_id,
        })
      }
      console.log(welfare_array_have);
      console.log(welfare_array_have_id)
    }else{
      that.setData({
        toastHidden: false,
        toastcontent: "该选项为空"
      })
    }
  },
  // 福利待遇删除按钮
  del_welfare: function (e) {
    var that = this;
    var welfare_array_have = that.data.welfare_array_have;
    var welfare_array_have_id=that.data.welfare_array_have_id;
    var welfare_index = e.currentTarget.dataset.index;
    welfare_array_have.splice(welfare_index, 1);
    welfare_array_have_id.splice(welfare_index,1);
    that.setData({
      welfare_array_have: welfare_array_have,
      welfare_array_have_id:welfare_array_have_id,
    })
  },
  // 获取手机号码
  getPhoneNumber: function (e) {
    console.log(e);
    var that = this;
    if (e.detail.errMsg == 'getPhoneNumber:ok') {
      wx.login({
        success:function(res){
          that.setData({
            code: res.code
          })
          var http_host = util.http_host
          var customer_id_en = util.customer_id_en;
          var user_id_en = util.user_id_en;

          var iv = e.detail.iv;
          var encryptedData = e.detail.encryptedData;
          var code = res.code;
          wx.request({
            url: http_host + '/mini_program/minvite/back/index.php/home/Auxiliary/telphone',
            data: {
              customer_id_en: customer_id_en,
              user_id_en: user_id_en,
              iv: iv,
              encryptedData: encryptedData,
              code: code
            },
            success: function (res) {
              console.log(res)
              that.setData({
                phone_number: res.data.data,
              })
            },
            fail: function (res) {
              that.setData({
                toastHidden: false,
                toastcontent: '获取手机号码失败'
              })
            }
          });
        }
      })
    }
  },
  // 详细地址
  detail_address:function(e){
    var that=this;
    that.setData({
      detail_address:e.detail.value,
    })
  },
  // 职位说明
  position_explain:function(e){
    var that=this;
    that.setData({
      position_explain:e.detail.value,
    })
  },
  // 保存
  save:function(){
    var that=this;
    var save_status = that.data.save_status;
    console.log('that.data.job_id:'+that.data.job_id)
    if (that.data.job_id == undefined){
      console.log(1)
      that.setData({
        save_status: 1,
      })
    }
    if (that.data.job_id != undefined){
      that.setData({
        save_status: 3,
        job_edt_type:1
      })
    }
    console.log("save:" + that.data.save_status)
  },
  // 保存并发布
  save_publish:function(){
    var that=this;
    if (that.data.job_id == undefined) {
      that.setData({
        save_status: 2,
      })
    }
    if (that.data.job_id != undefined) {
      that.setData({
        save_status: 3,
        job_edt_type:2
      })
    }
  },
  // 保存按钮
  formSubmit:function(e){
    var value=e.detail.value;
    // console.log(value);
    // console.log(province_id);
    // console.log(city_id);
    // console.log(area_id);
    var that = this;
    var save_status = that.data.save_status;
    var phonez = /^1[34578]\d{9}$/;
    var telephone = /^(0[0-9]{2,3}\-)([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;
    
    for (var i in value) {
      if (value[i] == "") {
        that.setData({
          address_status: false,
          detail_status: true,
          toastHidden: false,
          toastcontent: "还有未填项"
        })
        setTimeout(function(){
          that.setData({
            address_status: true,
            detail_status: false,
          })
        },1000)
        return;
      }
      if (i == "phonenumber" && !(phonez.test(value[i])) && !(telephone.test(value[i]))) {
        that.setData({
          toastHidden: false,
          toastcontent: "联系电话不符合规则"
        })
        return;
      }
      if (i == "money_start" && value[i] > value['money_end']) {
        that.setData({
          toastHidden: false,
          toastcontent: "请输入正确的薪资待遇"
        })
        return;
      }
    }
    if (that.data.save_btn == 0) {
      that.setData({
        save_btn: 1,
      })
      if (city_id == '' || area_id == '') {//没有操作picker
        province_id = that.data.begin_province_id
        city_id = that.data.begin_city_id;
        area_id = that.data.begin_area_id;
      }
      setTimeout(function () {
        var detail_address = that.data.detail_address;
        if (detail_address == '街道门牌信息') {
          that.setData({
            detail_address: '',
          })
        }
        // 创建
        if (that.data.job_id == undefined) {
          var data = {
            customer_id_en: util.customer_id_en,
            user_id_en: util.user_id_en,
            job_name: value.job_name,
            min_money: value.min_money,
            max_money: value.max_money,
            position_id: that.data.trade_array_have_id,
            edu_type: value.education_value,
            label_id: that.data.welfare_array_have_id,
            contact: value.phonenumber,
            province_id: province_id,
            city_id: city_id,
            area_id: area_id,
            address: that.data.detail_address,
            content: that.data.position_explain,
            action_type: that.data.save_status,
          };
        }
        // 编辑
        if (that.data.job_id != undefined) {
          var data = {
            customer_id_en: util.customer_id_en,
            user_id_en: util.user_id_en,
            job_name: value.job_name,
            job_id: that.data.job_id,
            min_money: value.min_money,
            max_money: value.max_money,
            position_id: that.data.trade_array_have_id,
            edu_type: value.education_value,
            label_id: that.data.welfare_array_have_id,
            contact: value.phonenumber,
            province_id: province_id,
            city_id: city_id,
            area_id: area_id,
            address: that.data.detail_address,
            content: that.data.position_explain,
            action_type: that.data.save_status,
            job_edt_type: that.data.job_edt_type,
          };
        }
        wx.request({
          url: util.http_host + '/mini_program/minvite/back/index.php/home/frontweb/create_job',
          method: 'POST',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: data,
          success: function (res) {
            console.log(res)
            that.setData({
              save_btn: 0,
            })
            if (res.data.err_code == 1000) {
              if (that.data.save_status == 1 || (that.data.save_status == 3 && that.data.job_edt_type == 1)) {
                wx.showToast({
                  title: '保存成功',
                })
              }
              if (that.data.save_status == 2 || (that.data.save_status == 3 && that.data.job_edt_type == 2)) {
                wx.showToast({
                  title: '发布成功',
                })
              }
              setTimeout(function () {
                wx.navigateBack({
                  url: '../posting-position/posting-position',
                })
              }, 1000)
            }
            if (res.data.err_code == -1) {
              wx.showModal({
                title: '提示',
                content: res.data.data,
                success: function (res) {
                  if (res.confirm) {
                    wx.navigateTo({
                      url: '../company_info/company_info',
                    })
                  }
                }
              })

            }
            if (res.data.err_code != 1000 && res.data.err_code != -1) {
              wx.showModal({
                title: '提示',
                content: res.data.data,
              })
            }
          }
        })
      }, 1000)
    }  
  },
})
