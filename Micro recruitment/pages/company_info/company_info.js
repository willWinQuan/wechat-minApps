// pages/company_info/company_info.js
var chooseimage = require("../common/chooseimage.js");
var chooseaddress = require("../common/chooseaddress.js");
var util = require("../../utils/util.js");
const date = new Date();
const years = [];
const months = [];

for (let i = date.getFullYear() - 80; i <= date.getFullYear(); i++) {
  years.push(i);
}

for (let i = 1; i <= 12; i++) {
  if (i.toString().length < 2) {
    i = "0" + i;
  }
  months.push(i);
}

//获取date-picker位置
function getpickerindex(picker, value) {
  for (var i = 0; i < picker.length; i++) {
    if (picker[i] == value) {
      return i;
    }
  }
}

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

var year = years[years.length - 1];
var month = months[months.length-2];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressvalue: '',
    enddatevalue: '',
    imgflag:0,
    destribe_text:0,
    logo_img:'../../image/add_picture.png',
    trade_array:[],
    trade_value:'',
    trade_array_id:[],

    hiddendetamask: true,
    hiddenmask: true,
    toastHidden: true,
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
    years: years,
    year: "",
    months: months,
    month: "",
    value: [],

    inc_logo:'',
    detail_address:'街道门牌信息',
    address_status:true,
    detail_status:false,
    destribe_status:true,
    company_des:'',
    margin_top:'18rpx',

    pickeryear: date.getFullYear(),
    pickermonth: date.getMonth() + 1,
    pickerday: date.getDate(),
    showmyresume: "",
    provincesvalue: [0],
    citysvalue: [0],
    countysvalue: [0],
    begin_year: '',
    begin_month: '',
    begin_addressprovince: '',
    begin_addresscity: '',
    begin_addresscounty: '',
    begin_province_id: '',
    begin_city_id: '',//避免picker出现后，不做任何操作就关闭造成city_id为空
    begin_area_id: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.setData({
      enterprise_id: options.id,
    })
    console.log(that.data.enterprise_id)
    var data={
      customer_id_en:util.customer_id_en,
      user_id_en:util.user_id_en,
    };
    util.commonRequest(
      data,
      '/mini_program/minvite/back/index.php/home/frontweb/inc_edt_web',
      function(res){
        console.log(res)
        var trade='';
        var trade_id='';
        var trade_array = that.data.trade_array;
        var trade_array_id=that.data.trade_array_id;
        for(var i=0;i<res.data.data.length;i++){
          trade=res.data.data[i].industry_name;
          trade_id=res.data.data[i].id;
          trade_array.push(trade);
          trade_array_id.push(trade_id);
        }
        var year_index = getpickerindex(years, year);
        var month_index = getpickerindex(months, month);
        var picker_value = [];
        picker_value.push(year_index);
        picker_value.push(month_index);

        that.setData({
          trade_array:trade_array,
          trade_array_id: trade_array_id,
          inc_logo:res.data.inc_logo,
          value: picker_value,
          company_apply:res.data.incdata.name,
          phone_number:res.data.incdata.contact,
          addressprovince:res.data.incdata.province_name,
          addresscity:res.data.incdata.city_name,
          addresscounty:res.data.incdata.area_name,
          detail_address:res.data.incdata.address,
          // year:year,
          // month:month,
          // value: picker_value
        })
        province_id = res.data.incdata.province_id;
        city_id = res.data.incdata.city_id;
        area_id = res.data.incdata.area_id;
        address_id_p = res.data.incdata.province_id;
        
        // 企业信息填写过 渲染页面数据
        if (that.data.enterprise_id != undefined) {
          var data_edit = {
            customer_id_en: util.customer_id_en,
            enterprise_id: that.data.enterprise_id,
          }
          wx.request({
            url: util.http_host + '/mini_program/minvite/back/index.php/home/Auxiliary/enterprise',
            data: data_edit,
            success: function (res) {
              console.log(res)

              province_id = res.data.data.province_id;
              city_id = res.data.data.city_id;
              area_id = res.data.data.area_id;
              address_id_p = res.data.data.province_id;
              year = res.data.data.year;
              month = res.data.data.month;

              var year_index = getpickerindex(years, year);
              var month_index = getpickerindex(months, month);
              var picker_value = [];
              picker_value.push(year_index);
              picker_value.push(month_index);

              that.setData({
                logo_img_src: res.data.data.logo,
                logo_send:res.data.data.logos,
                company_apply: res.data.data.name,
                phone_number: res.data.data.phone,
                mail_address: res.data.data.email,
                trade_value: res.data.data.industry,
                enddatevalue: res.data.data.time,
                person_number: res.data.data.staff,
                addressprovince: res.data.data.province,
                addresscity: res.data.data.city,
                addresscounty: res.data.data.area,
                detail_address: res.data.data.addr,
                company_des: res.data.data.discription,
                destribe_text: res.data.data.discription.length,
                trade_id: res.data.data.industry_id,

                year: res.data.data.year,
                month: res.data.data.month,
                begin_year: year,
                begin_month: month,
                value: picker_value,
                begin_addressprovince: res.data.data.province,
                begin_addresscity: res.data.data.city,
                begin_addresscounty: res.data.data.area,
                begin_province_id: res.data.data.province_id,
                begin_city_id: res.data.data.city_id,
                begin_area_id: res.data.data.area_id
              })
              
            }
          })
        }
      }
    ) 
    that.showaddress();    
  },
  // 选择行业
  bindtradeChange:function(e){
    var that=this;
    that.setData({
      trade_value:that.data.trade_array[e.detail.value],
      trade_id: that.data.trade_array_id[e.detail.value]
    })
  },
  // 日期选择器
  binddatepicker: function (e) {
    var that = this;
    that.setData({
      datepickershow: "500rpx",
      hiddendetamask: false,
      address_status: false,
      detail_status: true,
      destribe_status: false,
    })
  },
  binddetaChange: function (e) {
    const val = e.detail.value;
    year = this.data.years[val[0]];
    month = this.data.months[val[1]];
  },
  suredate: function (e) {
    var that = this;
    that.setData({
      datepickershow: "-80rpx",
      hiddendetamask: true,
      year: year,
      month: month,
      begin_year: year,
      begin_month: month,
    });
    setTimeout(function(){
      that.setData({
        address_status: true,
        detail_status: false,
        destribe_status: true,
      })
    },200)
  },
  canceldate: function () {
    var that = this;
    that.setData({
      datepickershow: "-80rpx",
      hiddendetamask: true,
      year: that.data.begin_year,
      month: that.data.begin_month,
    });
    setTimeout(function () {
      that.setData({
        address_status: true,
        detail_status: false,
        destribe_status: true,
      })
    }, 200)
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
    this.setData({
      hiddenmask: true,
      pickershow: "-580rpx",
      destribe_status: true,
    });
  },
  binddetamask: function () {
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
    var that = this;
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
        margin_top: '0rpx',
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
  // 地址选择器
  bindaddressPickerChange: function (e) {
    var that = this;
    this.setData({
      addressvalue: e.detail.value
    })
  },
  // 时间选择器
  bindendDateChange: function (e) {
    var that = this;
    that.setData({
      enddatevalue: e.detail.value
    })
  },
  // 企业logo
  company_logo:function(){
    var that = this;
    wx.chooseImage({
      count: 1,
      //original原图，compressed压缩图
      sizeType: ['original'],
      //album来源相册 camera相机 
      sourceType: ['album', 'camera'],
      //成功时会回调
      success: function (res) {
        console.log(res);
        //重绘视图
        that.setData({
          imgflag: 1,
          logo_img: res.tempFilePaths
        });
        // var tempFilePaths = res.tempFilePaths
        // that.data.tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: util.http_host + '/mini_program/minvite/back/index.php/home/user/upload_pic',
          filePath: res.tempFilePaths[0],
          name: 'pic_url',
          formData: {
            customer_id_en: util.customer_id_en
          },
          success: function (res) {
            var img_data = JSON.parse(res.data)
            console.log(img_data)
            that.setData({
              logo_img_src: img_data.show_pic,
              logo_send:img_data.data
            })
            console.log(that.data.logo_img_src)
          },
          fail: function () {
            console.log("上传失败")
          }
        });
      }
    });
  },
  // 详细地址
  detail_address:function(e){
    var that=this;
    var detail_address=e.detail.value;
    that.setData({
      detail_address: detail_address,
    })
  },
  // 企业简介计算文字
  destribe_change:function(e){
    var that=this;
    // var destribe_text=that.data.destribe_text;
    var destribe_text=e.detail.value.length;
    var company_des=e.detail.value;
    that.setData({
      destribe_text: destribe_text,
      company_des: company_des,
    })
  },
  // 获取手机号码
  getPhoneNumber: function (e) {
    console.log(e);
    var that = this;
    if (e.detail.errMsg == 'getPhoneNumber:ok') {
      wx.login({
        success: function (res) {
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
  // 提交申请
  formSubmit: function (e) {
    console.log(e);
    console.log(province_id);
    console.log(city_id);
    console.log(area_id);
    var value = e.detail.value;
    var that = this;
    var phonez = /^1[34578]\d{9}$/;
    var telephone = /^(0[0-9]{2,3}\-)([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;
    var emailz = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
    for (var i in value) {
      if (value[i] == "") {
        that.setData({
          address_status: false,
          detail_status: true,
          toastHidden: false,
          toastcontent: "还有未填项"
        })
        setTimeout(function () {
          that.setData({
            address_status: true,
            detail_status: false,
          })
        }, 1000)  
        return;
      }
      if (i == "phonenumber" && !(phonez.test(value[i])) && !(telephone.test(value[i]))) {
        that.setData({
          toastHidden: false,
          toastcontent: "联系电话不符合规则"
        })
        return;
      }
      if (i == "logoimg" && value[i] == '../../image/icon_03.jpg') {
        that.setData({
          toastHidden: false,
          toastcontent: "请上传企业LOGO"
        })
        return;
      }
      if (i == "mail_address" && !(emailz.test(value[i]))) {
        that.setData({
          toastHidden: false,
          toastcontent: "邮箱不符合规则"
        })
        return;
      }
    };
    var detail_address = that.data.detail_address;
    if (detail_address == '街道门牌信息') {
      that.setData({
        detail_address: '',
      })
    }
    if (city_id == '' || area_id == '') {//没有操作picker
      province_id = that.data.begin_province_id
      city_id = that.data.begin_city_id;
      area_id = that.data.begin_area_id;
    }
    var data={
      customer_id_en: util.customer_id_en,
      user_id_en: util.user_id_en,
      pic_url: that.data.logo_send,
      inc_name:value.company_name,
      contact:value.phonenumber,
      email:value.mail_address,
      industry_id: that.data.trade_id,
      yw_starttime: year + '-' + month,
      scale:value.person_number,
      province_id: province_id,
      city_id: city_id,
      area_id: area_id,
      address:that.data.detail_address,
      discription: value.company_des
    };
    console.log(data)
    wx.request({
      url: util.http_host +'/mini_program/minvite/back/index.php/home/frontweb/inc_edt',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },  
      data:data,
      success:function(res){
        console.log(res)
        if(res.data.err_code==1000){
          wx.showToast({
            title: '保存成功',
          })
          setTimeout(function(){
            wx.switchTab({
              url: '../mine/mine',
            })
          },1000)         
        }else{
          wx.showModal({
            title: '提示',
            content: res.data.data,
            showCancel:false,
          })
        }
      }
    })
  },
  // 取消按钮
  bindCancel:function(){
    wx.navigateBack({
      url:'../../company-msg/company-msg'
    })
  }
})