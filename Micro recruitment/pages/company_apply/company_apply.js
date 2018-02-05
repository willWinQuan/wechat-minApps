// pages/company_apply/company_apply.js
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
// var addressprovince = '';
// var addresscity='';
// var addressarea='';
const date = new Date();
const years = [];
const months = [];
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
    addressvalue:'',
    pickershow:'-81rpx',
    hiddenmask:true,
    addressprovince: "",
    addresscity: "",
    addressarea: "",
    imgflag: 0,
    license_img:[],
    toastHidden:true,
    submit_value:'',
    hiddenmask: true,
    provinces: [],
    addressprovince: "",
    citys: [],
    addresscity: "",
    countys: [],
    addresscounty: "",
    pickershow: "-580rpx",
    toastHidden: true,
    toastcontent: "",
    swipercurrent: "0",
    addressvalue: '',
    showmyresume: "",


    license_have:[],
    license_img_have:[],
    license_src_array:[],

    begin_city_id: '',//避免picker出现后，不做任何操作就关闭造成city_id为空
    begin_area_id: '',
    value: [],
    provincesvalue: [0],
    citysvalue: [0],
    countysvalue: [0],

    begin_addressprovince: '',
    begin_addresscity: '',
    begin_addresscounty: '',
    begin_province_id: '',
    begin_city_id: '',//避免picker出现后，不做任何操作就关闭造成city_id为空
    begin_area_id: '',

    detail_address:'街道门牌信息',
    address_status: true,
    detail_status: false,
    destribe_status: true,
    img_num:8,
    margin_top: '18rpx',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that=this;
    // 驳回状态
    var data = {
      customer_id_en: util.customer_id_en,
      user_id_en: util.user_id_en,
    };
    util.commonRequest(
      data,
      '/mini_program/minvite/back/index.php/home/Auxiliary/apply_check',
      function (res) {
        console.log(res)
        if (res.data.error == 1000) {
          var license_img_have = that.data.license_img_have;
          var license_src_array = that.data.license_src_array;
          for (var i = 0; i < res.data.data.pic.length; i++) {
            license_img_have.push(res.data.data.pic[i]);
            license_src_array.push(res.data.data.pic_[i]);
          }
          that.setData({
            company_name: res.data.data.name,
            company_legal: res.data.data.legal_person,
            phone_number: res.data.data.contact,
            addressprovince: res.data.data.province,
            addresscity: res.data.data.city,
            addresscounty: res.data.data.area,
            detail_address: res.data.data.address,
            license_img_have: license_img_have,
            position_explain: res.data.data.remark,

            begin_addressprovince: res.data.data.province,
            begin_addresscity: res.data.data.city,
            begin_addresscounty: res.data.data.area,
            begin_province_id: res.data.data.province_id,
            begin_city_id: res.data.data.city_id,
            begin_area_id: res.data.data.area_id
          })
          province_id = res.data.data.province_id;
          city_id = res.data.data.city_id;
          area_id = res.data.data.area_id;
        }
      }
    )  
    that.showaddress();    
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
    // 详细地址样式 判断手机型号
    var phone = wx.getSystemInfoSync();  //调用方法获取机型
    var system = phone.system.substring(0, 3)
    var Cts = 'iOS'
    if (Cts.indexOf(system) !== -1) {
      that.setData({
        margin_top: '0rpx',
      })
    }
    
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
  // 详细地址
  detail_address: function (e) {
    var that = this;
    var detail_address = e.detail.value;
    that.setData({
      detail_address: detail_address,
    })
  },
  // 上传图片
  license_uploading: function () {
    var that = this;
    var license_img='';
    var license_img_have=that.data.license_img_have;
    console.log(license_img_have)
    var license_src_array = that.data.license_src_array;
    var img_num=that.data.img_num;
    console.log('license_src_array.length:'+license_src_array.length)
    if (license_img_have.length<8){
      that.setData({
        img_num: 8 - license_img_have.length,
      })
      wx.chooseImage({
        count: that.data.img_num,
        //original原图，compressed压缩图
        sizeType: ['original'],
        //album来源相册 camera相机 
        sourceType: ['album', 'camera'],
        //成功时会回调
        success: function (res) {
          console.log(res);
          //重绘视图
          console.log(license_img_have.length)
          that.setData({
            imgflag: 1,
            license_img: res.tempFilePaths,
          });
          console.log('license_img:' + that.data.img_num)
          if (license_img_have.length < 8) {
            license_img_have=license_img_have.concat(that.data.license_img)
            that.setData({
              license_img_have: license_img_have,
            })
          }
          for (var i = 0; i < res.tempFilePaths.length;i++){
            wx.uploadFile({
              url: util.http_host + '/mini_program/minvite/back/index.php/home/user/upload_pic',
              filePath: res.tempFilePaths[i],
              name: 'pic_url',
              formData: {
                customer_id_en: util.customer_id_en
              },
              success: function (res) {
                var license_src = JSON.parse(res.data);
                that.setData({
                  license_src: license_src.data,
                })
                license_src_array.push(that.data.license_src);
                that.setData({
                  license_src_array: license_src_array,
                })
                // console.log(license_src_array)
              },
              fail: function () {
                console.log("上传失败")
              }
            });
          }
        }
      });
    }else{
      wx.showToast({
        title: '最多上传8张',
      })
    }
    
  },
  // 点击删除图片
  license_del:function(e){
    var that=this;
    var license_img_have = that.data.license_img_have;
    var license_index = e.currentTarget.dataset.index;
    var license_src_array = that.data.license_src_array;
    var img_num = that.data.img_num;
    license_img_have.splice(license_index,1);
    license_src_array.splice(license_index, 1);
    that.setData({
      license_img_have: license_img_have,
      license_src_array: license_src_array,
      img_num: 8 - license_img_have,
    })
  },
  // 备注
  position_explain:function(e){
    var that=this;
    var position_explain=e.detail.value;
    that.setData({
      position_explain: position_explain,
    })
  },
  // 提交申请
  formSubmit: function (e) {
    console.log(e);
    var value = e.detail.value;
    var that = this;
    var phonez = /^1[34578]\d{9}$/;
    var telephone = /^(0[0-9]{2,3}\-)([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;
    for (var i in value) {
      if (value[i] == "") {
        that.setData({
          address_status: false,
          detail_status: true,
          toastHidden: false,
          toastcontent: "还有未填项",
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
      // console.log(that.data.license_src_array)
    };
    var detail_address = that.data.detail_address;
    if (detail_address == '街道门牌信息') {
      that.setData({
        detail_address: '',
      })
    }
    if (city_id == '' || area_id=='') {//没有操作picker
      province_id = that.data.begin_province_id
      city_id = that.data.begin_city_id;
      area_id = that.data.begin_area_id;
    }
    console.log(that.data.license_src_array)
    wx.request({
      url: util.http_host + '/mini_program/minvite/back/index.php/home/frontweb/inc_apply',
      method:'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },  
      data:{
        customer_id_en: util.customer_id_en,
        user_id_en: util.user_id_en,
        name: value.company_name,
        legal_person: value.company_legal,
        contact: value.phonenumber,
        province_id: province_id,
        city_id: city_id,
        area_id: area_id,
        pic_list: that.data.license_src_array,
        remark: that.data.position_explain,
        detail_addr: that.data.detail_address,
      },
      success:function(res){
        console.log(res)
        console.log(that.data.license_src_array)
        if(res.data.err_code==1000){
          wx.navigateTo({
            url: '../company-apply-submit/company-apply-submit?apply_status=0'
          })
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
})