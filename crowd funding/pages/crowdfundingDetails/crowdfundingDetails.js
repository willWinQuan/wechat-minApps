// crowdfundingDetails.js
var customer_id_en = ""
var activity_id = "";
var id="";//商品id
var user_id_en="";
var apply_id="";
var user_id="";//解码后user_id
var util = require('../../utils/util.js');
var config = require('../../utils/config.js');
var daotime = "";
var time = "";
var activity_expire_code = "";
var proarray = new Array();;//属性id选择数组
var product_id="";//产品id
var pors_id="";//不同选择返回的属性id
//删除数组某一个
Array.prototype.remove = function (val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};
Page({

  /**
   * 页面的初始数据
   */
  data: {
      // subscribe:"",//关注1 ? 0
      shopDetail:"",
      mshop:"",
      pros:"",
      timeData:"",
      tabdetailflag: true,
      tabguigeflag: false,
      tabbaozhangflag:false,
      islaunchCrowd:true,//是否已经发起过众筹
      activity_expire_code: "",
      day: "",
      hours: "",
      min: "",
      second: "",
      maskflag:true,
      animation:"",
      showicon:'-25px',
      opcity:'0'
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    id=options.id;
    user_id_en=options.user_id_en;
    user_id=options.user_id;//解码后user_id
    customer_id_en = options.customer_id_en;
    activity_id = options.activity_id;

    var that = this;
    // 获取商品页面信息
    that.corwdDetail();

    // 是否已经发起过众筹
    that.islanundata();

    // 渲染时间
    that.time(); 
    
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    var that = this;
    console.log('--------下拉刷新-------')
    wx.showNavigationBarLoading() //在标题栏中显示加载
    // 获取商品页面信息
    that.corwdDetail();
  },

  corwdDetail:function(){
    //加载开始
    util.showLoading();
    var that=this;
    var corwdDetailvalue = {
      id,
      user_id_en,
      activity_id,
      customer_id_en
    }
    util.commonRequest(
      corwdDetailvalue,
      'index.php/home/front/goodsinfo',
      function (res) {
        console.log("商品详情：" + JSON.stringify(res));
        console.log("product_id:" + res.data.pros.product_id)
        product_id= res.data.pros.product_id;

        if (res.data.pros_[0].parent_name==null){//如果没有属性
          pors_id=-1;
        }
        
        that.setData({
          // subscribe: res.data.subscribe,
          shopDetail: res.data.data,
          mshop: res.data.mshop,
          pros:res.data.pros_
        })
        //加载结束
        util.hideToast();
      }
    )
  },
  islanundata:function(){
    //加载开始
    util.showLoading();
    var that=this;
    var islanundata = {
      customer_id_en,
      user_id_en,
      activity_id,
      id
    };
    util.commonRequest(
      islanundata,
      'home/front/check_apply',
      function (res) {
        console.log("是否发起过众筹：" + JSON.stringify(res));
        apply_id = res.data.apply_id;
        if (res.data.apply_id != '') {
          that.setData({
            islaunchCrowd: false,
          })
          //加载结束
          util.hideToast(); 
        }
      }
    )

  },
  time: function () {
    //加载开始
    util.showLoading();
    var that = this;
    // 渲染时间
    var timeValue = {
      customer_id_en,
      activity_id
    };
    util.commonRequest(
      timeValue,
      'index.php/home/front/getinfo_realtime',
      function (res) {
        console.log("倒计时：" + JSON.stringify(res));

        var timeData = res.data.data;
        console.log(timeData);

        if (timeData.activity_expire_code == 1) {
          console.log("活动未开始");
          var starttime = (new Date(timeData.activity_start_time)).getTime();
          var nowtime = (new Date(timeData.nowtime)).getTime();
          //剩余时间
          time = starttime - nowtime - 1000;
          //天
          var day = parseInt(time / 86400000);
          console.log("天：" + day);
          //小时
          var hours = parseInt((time % 86400000) / 3600000);
          console.log("小时：" + hours);
          //分钟
          var min = parseInt((time % 86400000 % 3600000) / 60000);
          console.log("分钟：" + min);
          //秒
          var second = parseInt((time % 86400000 % 3600000 % 60000) / 1000);
          console.log("秒：" + second);
          activity_expire_code = 1;
          that.setData({
            activity_expire_code: activity_expire_code,
            day: day,
            hours: hours,
            min: min,
            second: second
          })
          that.update();


        }
        else if (timeData.activity_expire_code == 2) {
          console.log("活动进行中");
          var nowtime = (new Date(timeData.nowtime)).getTime();
          var endtime = (new Date(timeData.activity_end_time)).getTime();
          //剩余时间
          time = endtime - nowtime;
          time = time - 1000;
          //天
          var day = parseInt(time / 86400000);
          console.log("天：" + day);
          //小时
          var hours = parseInt((time % 86400000) / 3600000);
          console.log("小时：" + hours);
          //分钟
          var min = parseInt((time % 86400000 % 3600000) / 60000);
          console.log("分钟：" + min);
          //秒
          var second = parseInt((time % 86400000 % 3600000 % 60000) / 1000);
          console.log("秒：" + second);
          activity_expire_code = 2;
          that.setData({
            activity_expire_code: activity_expire_code,
            day: day,
            hours: hours,
            min: min,
            second: second
          })
          that.update();

        }
        else if (timeData.activity_expire_code == 3) {
          console.log("活动已经结束");
          activity_expire_code = 3;
          that.setData({
            activity_expire_code: activity_expire_code
          })
        }
        else if (timeData.activity_expire_code == 4) {
          console.log("活动已终止");
          activity_expire_code = 4
          that.setData({
            activity_expire_code: activity_expire_code
          })
        }
        //加载结束
        util.hideToast();
      }
    );
  },
  detail: function (event) {//发起众筹或者查看众筹详情
     var that=this;
    console.log(event);
    var islaunchCrowd = event.currentTarget.dataset.islaunchcrowd;
    if (islaunchCrowd==true){
      clearInterval(daotime);

      that.animation.bottom("0").step();
      that.setData({
        //输出动画
        animation: that.animation.export(),
        maskflag:false,
        showicon:"32%",
        opcity:'1'
      })
    } else if (islaunchCrowd==false){
      clearInterval(daotime);
      wx.navigateTo({
        url: '../details/details?user_id_en=' + user_id_en + '&apply_id=' + apply_id + '&customer_id_en=' + customer_id_en + '&user_id=' + user_id + '&activity_id=' + activity_id +'',
      })  
    }
      
  },
  tabmycrowdfunding:function(){
    wx.navigateTo({
      url: '../mycrowdfunding/mycrowdfunding?customer_id_en=' + customer_id_en + '&user_id_en=' + user_id_en + '&activity_id=' + activity_id + ''
    })
  },
  tabdetail:function(){
      // tab 详情
    var that=this;
    that.setData({
      tabdetailflag: true,
      tabguigeflag: false,
      tabbaozhangflag: false
    })
  },
  chancepro:function (e){
      //选择属性
      var that=this;
      var pro = e.currentTarget.dataset.proid;
      var prostatus = e.currentTarget.dataset.proflag;//是否选择
      var pindex = e.currentTarget.dataset.pindex;//属性类型
      var prindex = e.currentTarget.dataset.prindex;//某某类型下的一个属性
      var pros = that.data.pros;
      console.log(pro);
      console.log(prostatus);
      console.log(pindex);
      console.log(prindex);
      if(pros.length==0){
        //没有类别属性
        return console.log("没有类别属性");
      }
      
      for (var i = 0,pros_len = pros.length; i < pros_len;i++){
        console.log(i);
          if(i==pindex){
              console.log(i);
              if(pros[i].porslist.length==0){
                //该类别没有属性   
                return console.log("该类别没有属性");
              }
              //同属性
              for (var j = 0, porslist_len = pros[i].porslist.length; j < porslist_len;j++){
                  console.log(j);
              if(j==prindex){
                //点击是该属性
                console.log(that.data.pros[i].porslist[j].prostatus)
                if (that.data.pros[i].porslist[j].prostatus==false){
                  //还没被选中 让其选中
                  that.data.pros[i].porslist[j].prostatus=true;  
                  that.setData({//更新数据
                    pros: that.data.pros
                  })
                  proarray.push(pro);

                } else if (that.data.pros[i].porslist[j].prostatus==true){
                  //已经被选中 让其不选中 
                  that.data.pros[i].porslist[j].prostatus=false;
                  that.setData({//更新数据
                    pros: that.data.pros
                  })

                  if(proarray.length==0){
                    //存属性的数组为空
                    return;
                  }
                  for(var p=0;p<proarray.length;p++){
                    if(proarray[p]==pro){
                      proarray.remove(pro);
                    }
                  }
                }

              }else{
                //该属性的其他同类型属性
                that.data.pros[i].porslist[j].prostatus=false;
                that.setData({//更新数据
                  pros: that.data.pros
                })

                if (proarray.length == 0) {
                  //存属性的数组为空
                  return;
                }
                for (var p = 0; p < proarray.length; p++) {
                  console.log(proarray[p])
                  if (proarray[p] == pros[i].porslist[j].id ) {
                    proarray.remove(proarray[p]);
                  }
                }
                console.log(proarray);
              }

            }
          }
      };

      console.log(proarray);
      //请求接口返回不同选择而生成的对应属性
      var data = {
        customer_id_en: customer_id_en,
        product_id: product_id,
        pro_id: proarray
      };
      console.log(data);
      wx.request({
        url: config.BaseURL + 'index.php/home/Crowdfund/get_pros',
        data: data,
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
        // header: {}, // 设置请求的 header  
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        complete: function (res) {
          // complete  
          console.log("不同选择返回的属性id" + JSON.stringify(res));
          if(res.data.data!=null){
            
            that.data.shopDetail.storenum = res.data.data.storenum;
            pors_id = res.data.data.id;//对应商品价格表主键
            that.data.shopDetail.now_price = res.data.data.now_price;
            that.data.shopDetail.orgin_price = res.data.data.orgin_price;

            that.setData({//更新数据
              shopDetail: that.data.shopDetail,
            })

          }else{
            pors_id="";
            console.log("没选择完整的属性");
          }
          
        }
      });

  },
  tabgodetail: function (event) {
    var that=this;

    if (pors_id==""){
      //提示模态框
      util.showModal(
       '属性选择',
       '请选择完整属性',
       false,
       function(res){
         if (res.confirm) {//点击确定
             return;
         }
       }
      )

    }else{
      that.animation.bottom("-232px").step();
      that.setData({
        //输出动画
        animation: that.animation.export(),
        maskflag: true,
        showicon: "-25px",
        opcity: '0'
      })
      console.log(pors_id);
      
      wx.navigateTo({//跳转到确认发起众筹页面
        url: '../launchCrowd/launchCrowd?user_id_en=' + user_id_en + '&id=' + id + '&customer_id_en=' + customer_id_en + '&user_id=' + user_id + '&activity_id=' + activity_id + '&pors_id='+pors_id+'',
      })
    }
       
  },
  tabguige: function () {
      //tab 规格
    var that = this;
    that.setData({
      tabdetailflag: false,
      tabguigeflag: true,
      tabbaozhangflag: false
    })
  },
  tabbaozhang: function () {
      // tab 售后保障
    var that = this;
    that.setData({
      tabdetailflag: false,
      tabguigeflag: false,
      tabbaozhangflag: true
    })
  },
  tabindex: function () {
    wx.navigateTo({
      url: '../index/index',
    })
  },
  hiddenmask: function () {
    var that = this;
    that.animation.bottom("-232px").step();
    that.setData({
      maskflag: true,
      animation: that.animation.export(),
      showicon: "-25px",
      opcity:'0'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onReady");
    var that=this;
     this.animation = wx.createAnimation({
      // 动画持续时间，单位ms，默认值 400
      duration: 1000,
      /**
       *  linear  动画一直较为均匀
       *  ease    从匀速到加速在到匀速
       *  ease-in 缓慢到匀速
       *  ease-in-out 从缓慢到匀速再到缓慢
       * 
       *  step-start 动画一开始就跳到 100% 直到动画持续时间结束 一闪而过
       *  step-end   保持 0% 的样式直到动画持续时间结束        一闪而过
       */
      timingFunction: 'ease',
      // 延迟多长时间开始
      delay: 250,
      /**
       * 以什么为基点做动画  效果自己演示
       * left,center right是水平方向取值，对应的百分值为left=0%;center=50%;right=100%
       * top center bottom是垂直方向的取值，其中top=0%;center=50%;bottom=100%
       */
      transformOrigin: '',
      success: function (res) {
        console.log(res);
      }
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
       console.log("onShow");
       var that = this;
       // 获取商品页面信息
       that.corwdDetail();

       // 是否已经发起过众筹
       that.islanundata();
       that.time();
       daotime = setInterval(function () {
         time = time - 1000;
         if (that.data.activity_expire_code == 3 ) {
           return;
         }
         if (time < 0) {
           that.time();
           return;
         }
         console.log(time);
         //天
         var day = parseInt(time / 86400000);
         console.log("天：" + day);
         //小时
         var hours = parseInt((time % 86400000) / 3600000);
         console.log("小时：" + hours);
         //分钟
         var min = parseInt((time % 86400000 % 3600000) / 60000);
         console.log("分钟：" + min);
         //秒
         var second = parseInt((time % 86400000 % 3600000 % 60000) / 1000);
         console.log("秒：" + second);

         that.setData({
           activity_expire_code: activity_expire_code,
           day: day,
           hours: hours,
           min: min,
           second: second
         })
         that.update();
       }, 1000);
  },
 
  /**
  * 生命周期函数--监听页面隐藏
  */
  onHide: function () {
    console.log("详情页面隐藏:" );
    clearInterval(daotime);
    proarray = [];
  },

  /**
 * 生命周期函数--监听页面卸载
 */
  onUnload: function () {
    console.log("详情页面结束:");
    clearInterval(daotime);
    proarray=[];
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
      //  wx.showToast({
      //    title: '触底了！',
      //  })
  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {
  //   return {
  //     title: '众筹商品页-chq',
  //     imageUrl: '../img/share08.jpg',
  //     path: 'pages/index/index'
  //   }
  // }
})
