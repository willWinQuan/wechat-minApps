// pages/person_info/person_info.js
var util = require('../../utils/util.js');
var phone_close = "";
var isclose = "";
var share_img = '';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    name_value: '',
    phone_value: '',
    radioCheckVal: "",
    dateValue: '2017-10-01',
    name: '',
    person_list: 0,
    state: false,
    person_name: [],
    num: [],
    color: '#ffffff',
    pass_id: '',
    num_value: '',
    date: "",
    addressvalue: '',
    timevalue: '',
    toastHidden: true,
    toastcontent: '',
    isin: 0,
    disabled_status:false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (options.pass_id) {
      that.setData({
        pass_id: options.pass_id,
      })
      console.log(options.pass_id)
    }
    var customer_id_en = util.customer_id_en;
    var http_host = util.http_host;
    var user_id_en = util.user_id_en;
    var person_list = that.data.person_list;
    var person_name = that.data.person_name;
    var num = that.data.num;
    wx.request({
      url: http_host + '/mini_program/wa_card/back/index.php/Home/Membership/fields',
      data: {
        customer_id_en: customer_id_en,
        user_id_en: user_id_en,
      },
      success: function (res) {
        console.log(res)
        var person_list = res.data;
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].type == 'text' || res.data[i].type == 'number') {
            num.push(res.data[i].name)
          }
          if (res.data[i].type == 'bool') {
            var radioCheckVal = 'radioCheckVal[' + i + ']';
            that.setData({
              [radioCheckVal]: res.data[i].value
            })

          }
          if (res.data[i].type == 'address') {
            that.setData({
              addressvalue: res.data[i].value
            })
          }
          if (res.data[i].type == 'time') {
            that.setData({
              timevalue: res.data[i].value
            })
          }
        }
        that.setData({
          person_list: res.data,
          person_name: person_name,
        })
        console.log(res)
        console.log(num)
      }
    })
  },
  formSubmit: function (e) {
      console.log(e);
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    var value = e.detail.value;
    var that = this;
    var list = that.data.person_list;
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    that.setData({
      disabled_status:true,
    })
    for (var i in value) {

      if ((i == "1" && value[i].length == 0) || (i == "2" && value[i].length == 0)) {
        for (var j = 0; j < list.length; j++) {
          if (list[j].id == i) {
            value[i] = list[j].value;
            console.log(value[i]);
          }
        }
      }

      for (var j = 0; j < list.length; j++) {
          if (list[j].id == i && list[j].is_required == "1" && value[i] == "") {
              that.setData({
                  toastHidden: false,
                  toastcontent: "还有必填项未填"
              })
              return;
          }
      }

      if (i == "-2" && !myreg.test(value[i])) {
        that.setData({
          toastHidden: false,
          toastcontent: "手机号码不符合规则"
        })
        return;
      }

    };

    var customer_id_en = util.customer_id_en;
    var user_id_en = util.user_id_en;
    var data = {
      customer_id_en: customer_id_en,
      user_id_en: user_id_en,
      values: JSON.stringify(value),
      page: "pages/mine/mine",
      form_id: e.detail.formId
    }
    console.log(data);
    that.personalchance(
      data,
      function (res) {
        console.log(res)
        console.log("修改信息：" + JSON.stringify(res));
        if (res.data == 1000) {
          util.status = 1;
          wx.showToast({
            title: "激活成功",
          })
          
          setTimeout(function () {
            wx.switchTab({
              url: '../mine/mine',
            })
          }, 1000)
        }
        else if (res.data == 1001) {
          wx.showToast({
            title: '修改成功',
          })
          setTimeout(function () {
            wx.switchTab({
              url: '../mine/mine',
            })
          }, 1000)
        }
        else if (res.data == 901 || res.data == 902 || res.data == 1002 || res.data == 1003) {
          console.log(res.data)
          that.setData({
            toastHidden: false,
            toastcontent: "操作失败," + res.data
          })
        }
      })

      setTimeout(function(){
        that.setData({
          disabled_status:false,
        })
      },1000)

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
    util.topColor();
    var that = this;
    var customer_id_en = util.customer_id_en;
    var http_host = util.http_host;
    wx.request({
      url: http_host + '/mini_program/wa_card/back/index.php/home/miniprogram/color_style',
      data: {
        customer_id_en: customer_id_en,
      },
      success: function (res) {
        console.log(res.data.data)
        that.setData({
          color: res.data.data
        })
      },
      fail: function (res) {
        // console.log('no')
      }
    })
    util.share(function (res) {
      console.log(res);
      share_img = res;
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
  onShareAppMessage: function () {
    return {
      path: '/pages/person_info/person_info',
      imageUrl: share_img,
    }
  },
  toastChange: function () {
    var that = this;
    that.setData({
      toastHidden: true
    })
  },
  // input输入的时候
  closetap: function (e) {
    var that = this;
    var value = e.detail.value;
    var index = e.currentTarget.dataset.index;
    var isclose = 'isclose[' + index + ']';
    console.log(isclose)
    var name_value = 'name_value[' + index + ']';
    var person_list = this.data.person_list;
    var id = e.currentTarget.dataset.id;
    if (id == "-2") {
      if (value.length > 11) {
        that.setData({
          toastHidden: false,
          toastcontent: "手机号码长度不对"
        })
        return;
      }
    }
    if (value) {
      for (var i = 0; i < person_list.length; i++) {
        if (person_list[i].id == id) {
          person_list[i].value = value;
          that.setData({
            [isclose]: true,//isclose[0]
            person_list: person_list,
          })
        }
      }
    } else {
      that.setData({
        [isclose]: false,
        [name_value]: '',
      })
    }
  },
  closeshow: function (e) {
    var index = e.currentTarget.dataset.index;
    var isclose = 'isclose[' + index + ']';
    var that = this;
    that.setData({
      [isclose]: true,//isclose[0]
    })
  },
  closeblur: function (e) {
    var value = e.detail.value;
    var index = e.currentTarget.dataset.index;
    var isclose = 'isclose[' + index + ']';
    var id = e.currentTarget.dataset.id;
    var that = this;
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (id == '-2' && value.length != 0) {
      if (!myreg.test(value)) {
        that.setData({
          toastHidden: false,
          toastcontent: "手机号码不符合规则"
        })
        return;
      }
    }
  },
  // 点击关闭按钮
  clear_name: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.id;
    var isclose = 'isclose[' + index + ']';
    var person_list = that.data.person_list;
    person_list.forEach(function (item, index, list) {
      if (list[index].id == id) {
        list[index].value = ''
      }
    })
    console.log(person_list);
    // return;
    for (var i = 0; i < person_list.length; i++) {
      if (person_list[i].id == id) {
        var index = i;
        person_list[index].value = '';
        console.log(person_list[index].value);
        console.dir(person_list)
        if ('' == person_list[index].value) {
          console.dir(person_list)
          setTimeout(function () {
            that.setData({
              person_list: person_list,
              [isclose]: false,
              isin: 1
            })
          }, 500)
        }
      }
    }

  },
  // 性别选项
  radioCheckedChange: function (e) {
    var index = e.currentTarget.dataset.index;
    var radioCheckVal = 'radioCheckVal[' + index + ']';
    console.log(e.detail.value)
    this.setData({
      [radioCheckVal]: e.detail.value
    })
  },
  // 生日选项
  datePickerBindchange: function (e) {
    var that = this;
    var value = e.detail.value;
    that.setData({
      timevalue: value
    })
  },
  save_info: function (e) {
    // console.log(e.detail.value.[name]);
  },
  personalchance: function (data, callback) {
    wx.request({
      url: util.http_host + '/mini_program/wa_card/back/index.php/Home/Membership/fields',
      data: data,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        callback(res);
        console.log(res)
      }
    });
  },
  bindRegionChange: function (e) {
    var that = this;
    var value = e.detail.value;
    that.setData({
      addressvalue: value
    })
  }
})
