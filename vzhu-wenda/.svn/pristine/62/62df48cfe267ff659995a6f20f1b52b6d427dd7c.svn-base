// pages/setting/setting.js

var util = require("../../utils/util.js");
var chooseimage=require('../common/chooseimage.js');
let time0='';
//获取简介num
function getmyself_content_num(myself_content) {
    let myself_content_num = 0;
    //  //中文
    //  let zchinese =/^[\u4e00-\u9fa5]{0,}$/;
    //  let zchinese_num=0;
    //  //数字
    //  let znumber =/^[0-9]{0,}$/;
    //  let znumber_num=0;
    //  //符号
    //  let zdiot =/[^%&',;=?$\。，！!...]$/;
    //  let zdiot_num=0;

    let zfletter_num = 0;
    //字母
    let zletter = /^[A-Za-z]+$/;
    let zletter_num = 0;
    for (let i = 0; i < myself_content.length; i++) {
        //  if (zchinese.test(myself_content[i])){
        //      zchinese_num++;
        //  };
        //  if (znumber.test(myself_content[i])){
        //      znumber_num++;
        //  }
        //  if (zdiot.test(myself_content[i])){
        //      zdiot_num++;
        //  }
        if (zletter.test(myself_content[i])) {
            zletter_num++;
        } else {
            zfletter_num++;
        }
    }

    //  console.log(zchinese_num);
    //  console.log(znumber_num);
    //  console.log(zdiot_num);
    //  console.log(zletter_num);
    //  console.log(zfletter_num);
    return myself_content_num = Math.ceil(zletter_num / 2) + zfletter_num;
};

Page({

  /**
   * 页面的初始数据
   */
  data: {
      code: '',
      sexname:'',
      intro:'',//简介
      licence_name:'证件',//证件名称
      choosebottom:'-500rpx',
      maskhidden:true,
      nofeeswitchChecked:true,
      feeswitchChecked:false,
      isShowQuestion: true,
      toastHidden:true,
      toastcontent:'',
      myself_content_num:0,
      textareamaxlength:-1,
      tagList:[],
      cate_id_list:[],
      classList: [],
      tagListflag:[],
      //上传图片
      imagerray: [],
      isupload: true,
      iscanchooseImg:true,
      headImg:'',//头像
      phonenumber:'',
      color:"",//主题色
      textareahidden:false,
      chooseClassOpacity:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let that=this; 
      let Type = options.type;
      that.setData({
          code:util.code,
          headImg: '../../image/via.png',
          color:util.color
      });
    if (Type == 1) {
        that.setData({
            isShowQuestion: false
        })
      that.show_applydata(function(res){
              wx.setNavigationBarTitle({
                  title: '申请编辑'
              })
          
        });
    }   
    else if (Type == 0) {
        that.show_chancedata();
        wx.setNavigationBarTitle({
            title: '答主设置'
        }) 
    }       
  },
  show_chancedata:function(){
       let that=this;
       let data={
           customer_id_en: util.customer_id_en,
           user_id_en: util.user_id_en
       };
       util.commonRequest(
           data,
           '/mini_program/applets/index.php/answer/frontweb/expert_set_web',
           res=>{
               console.log(res);
               if(res.data.errcode!=0){
                   that.setData({
                       toastHidden: false,
                       toastcontent: res.data.data,
                       textareahidden:true
                   }) 
                   return;
               };
               let tagList=[];
               let cate = res.data.data.select_cate;
               let cate_id_list=[];
               for (let item in cate){
                   tagList.push(cate[item].cate_name);
                   cate_id_list.push(cate[item].cate_id);
               };
               let myself_content_num = getmyself_content_num(res.data.data.self_intro);

               let tagListflag=[];
               for (let i = 0; i < res.data.data.all_cate.length; i++) {
                   tagListflag.push(false);
               }
               
               let nofeeswitchChecked=false;
               if (res.data.data.is_ask==1){
                   nofeeswitchChecked=true
               }
               that.setData({
                   headImg: res.data.data.headurl,
                   sexname: res.data.data.nickname,
                   phonenumber: res.data.data.tel,
                   intro: res.data.data.self_intro,
                   tagList: tagList,
                   cate_id_list: cate_id_list,
                   myself_content_num: myself_content_num,
                   classList: res.data.data.all_cate,
                   tagListflag: tagListflag,
                   nofeeswitchChecked: nofeeswitchChecked,
                   feeswitchChecked: !nofeeswitchChecked,
                   questionMoney: res.data.data.money
               })
           }
       )
  },
  show_applydata:function(callback){
       let that=this;
       let tagListflag=[];
       let data={
           customer_id_en: util.customer_id_en,
           user_id_en: util.user_id_en
       };
       util.commonRequest(
           data,
           '/mini_program/applets/index.php/answer/frontweb/expert_editweb',
           res=>{
             console.log(res);
             let tagListflag=[];
             for (let i = 0; i < res.data.data.all_cate.length;i++){
                 tagListflag.push(false);
             }

             if (res.data.data.is_apply_expert==0){
                 that.setData({
                     classList: res.data.data.all_cate,
                     licence_name: res.data.data.licence_name,
                     tagListflag: tagListflag,
                     phonenumber: res.data.data.tel
                 })
             }
             else if (res.data.data.is_apply_expert==1){
                
                 let tagList = [];
                 let cate = res.data.data.select_cate;
                 let cate_id_list = [];
                 for (let item in cate) {
                     tagList.push(cate[item].cate_name);
                     cate_id_list.push(cate[item].cate_id);
                 };
                 let myself_content_num = getmyself_content_num(res.data.data.self_intro);
                 
                 let imagerray=[];
                 let licence_pic_list= res.data.data.licence_pic_list;
                 for (let i = 0; i < licence_pic_list.length;i++){
                     imagerray.push(licence_pic_list[i].licence_url);
                 };
                 console.log(imagerray);
                 that.setData({
                     classList: res.data.data.all_cate,
                     licence_name: res.data.data.licence_name,
                     tagListflag: tagListflag,
                     headImg: res.data.data.headurl,
                     sexname: res.data.data.nickname,
                     phonenumber: res.data.data.tel,
                     intro: res.data.data.self_intro,
                     tagList: tagList,
                     cate_id_list: cate_id_list,
                     myself_content_num: myself_content_num,
                     imagerray: imagerray
                 })
             }
            
             typeof callback=='function' && callback({'ok':true});
           }
       )
  },
  tabheadImg:function(){
     let that=this;
     chooseimage.chooseimage(true, 1, that)
  },
  getPhoneNumber: function (e) {
      // console.log(e);
      let that = this;
      if (!e.detail.iv || !e.detail.encryptedData) {
          return;
      };
    wx.login({
          success:function(res){
        let data = {
            customer_id_en: util.customer_id_en,
            user_id_en: util.user_id_en,
            code: res.code,
            iv: e.detail.iv,
            encryptedData: e.detail.encryptedData
        };
      util.commonRequest(
          data,
          "/mini_program/applets/index.php/answer/front_page/telphone",
          res=> {
              if (res.data.error == 1000) {
                  that.setData({
                      phonenumber: res.data.data
                  })
                //   clearInterval(time0);
                //   let time1=setInterval(function(){
                //       that.getcode();
                //   },1000)
              } else {
                //   clearInterval(time0);
                //   let time2 = setInterval(function () {
                //       that.getcode();
                //   }, 1000);
                  that.setData({
                      toastHidden: false,
                      toastcontent: res.data.data,
                      textareahidden:true
                  })
                  console.log(res);
              }
          }
      );
    }
 })
},

  textareainput:function(e){
      console.log(e);
      let that=this; 
      let intro = that.data.intro;
      //验证量
      let myself_content = e.detail.value;
      let myself_content_num=getmyself_content_num(myself_content);
      console.log(myself_content_num);
      if (myself_content_num>=300){
         that.setData({
             myself_content: myself_content,
             textareamaxlength: 300,
             myself_content_num:300
         })
         return;
      };

      that.setData({
          myself_content_num: myself_content_num,
          myself_content: myself_content,
          textareamaxlength:-1,
          intro: myself_content
      })
  },
  bindchoose:function(e){
    //  console.log(e);
     let that=this;
     let classindex=e.currentTarget.dataset.classindex;
     let classList = that.data.classList;
     let tagListflag = that.data.tagListflag;   
     let tagListflag_true=0;
     tagListflag[classindex] = !tagListflag[classindex];

     if (tagListflag[classindex]){
        for (let i = 0; i < tagListflag.length;i++){
            if (tagListflag[i]){
                tagListflag_true++;
                if (tagListflag_true>6){
                    that.setData({
                        toastHidden:false,
                        toastcontent:'最多只能选择6个',
                        textareahidden:true
                    });
                    tagListflag[classindex] = !tagListflag[classindex];
                    return;
                }
            }
        };
     };
     
     that.setData({
         tagListflag: tagListflag
     })
  },
  surechoose:function(){
     let that=this;
     let tagListflag = that.data.tagListflag;
     console.log(tagListflag);
     let tagList = [];
     let cate_id_list=[];
     let classList = that.data.classList;
    //  console.log(tagListflag)
     for (let i = 0; i < tagListflag.length;i++){
         if (tagListflag[i]){
            //  console.log(tagListflag[i])
             tagList.push(classList[i].cate_name);
             cate_id_list.push(classList[i].cate_id);
         }
     }
    //  console.log(tagList);
     that.setData({
         tagList: tagList,
         cate_id_list: cate_id_list,
         choosebottom: '-500rpx',
         maskhidden: true,
         textareahidden: false,
         chooseClassOpacity:0
     });
  },
  chooseImg:function(){
      let that=this;
      let count =9-that.data.imagerray.length;
      chooseimage.chooseimage(false, count, that);
  },
  delpic:function(e){
      let that=this;
      let imagerray = that.data.imagerray;
      let del_pic_index = e.currentTarget.dataset.imagerrayindex;
      imagerray.splice(del_pic_index,1);
      that.setData({
          imagerray: imagerray,
          iscanchooseImg:true
      })
  },
  formSubmit:function(e){
     console.log(e);
     let that=this;
     let value=e.detail.value;

     let headImg = that.data.headImg;
     if (headImg =='../../image/via.png'){
         that.setData({
             toastHidden:false,
             toastcontent:'请上传头像',
             textareahidden:true
         })
         return;
     };
     console.log(headImg)
     headImg=chooseimage.cut_pic_url(headImg);

     let sexname = value.sexname;
     if (sexname.length==0){
         that.setData({
             toastHidden: false,
             toastcontent: '昵称不能为空',
             textareahidden:true
         })
         return;
     };

     let phone=value.phone;
     let phonez = /^1[34578]\d{9}$/;
     if (!phonez.test(phone)){
         that.setData({
             toastHidden: false,
             toastcontent: '手机号码不符合',
             textareahidden:true
         })
         return;
     };

     let cate_id_list = that.data.cate_id_list;
     cate_id_list = cate_id_list.join(',');
     console.log(value.isShowQuestion);

   if (!that.data.isShowQuestion){//申请
     let imagerray = that.data.imagerray;
     
     for (let i = 0; i < imagerray.length;i++){
         imagerray[i] = chooseimage.cut_pic_url(imagerray[i]);
     };
     imagerray = imagerray.join(',');

     let data={
         customer_id_en: util.customer_id_en,
         user_id_en: util.user_id_en,
         headurl: headImg,
         nickname: sexname,
         tel: phone,
         self_intro: value.intro,//简介
         cate_id_list: cate_id_list,
         pic_list: imagerray
     };
    //  console.log(data);
     util.commonRequestPost(
         data,
         '/mini_program/applets/index.php/answer/frontweb/expert_edit_apply',
         res=>{
            console.log(res);
            if(res.data.errcode!=0){
                that.setData({
                    toastHidden: false,
                    toastcontent: res.data.data,
                    textareahidden:true
                })
                return;
            };
           wx.redirectTo({
               url:'../set-apply/set-apply'
           }) 
         }
     )
  }
   else if (that.data.isShowQuestion){//答主设置
    //    console.log(2)
       let data =''
       if (that.data.nofeeswitchChecked){
           if (value.questionMoney == '' || Number(value.questionMoney)==0){//提问金额不能为空
               that.setData({
                   toastHidden: false,
                   toastcontent: '提问金额不能为空或者为0',
                   textareahidden:true
               })
               return;
           };
           data = {
               customer_id_en: util.customer_id_en,
               user_id_en: util.user_id_en,
               headurl: headImg,
               nickname: sexname,
               tel: phone,
               self_intro: value.intro,//简介
               cate_id_list: cate_id_list,
               is_ask:1,
               money: Number(value.questionMoney).toFixed(2)
           }
       } else if (!that.data.nofeeswitchChecked){
           data = {
               customer_id_en: util.customer_id_en,
               user_id_en: util.user_id_en,
               headurl: headImg,
               nickname: sexname,
               tel: phone,
               self_intro: value.intro,//简介
               cate_id_list: cate_id_list,
               is_ask: 2,
           }
       };
       console.log(data);
       util.commonRequestPost(
           data,
           '/mini_program/applets/index.php/answer/frontweb/expert_set',
           res=>{
               console.log(res);
               if (res.data.errcode !=0){
                   that.setData({
                       toastHidden: false,
                       toastcontent: res.data.data,
                       textareahidden:true
                   })
                   return;
               }
               wx.showModal({
                   title: '提示',
                   content: res.data.data,
                   showCancel: false,
                   success: function (res) {
                       if (res.confirm) {
                           wx.switchTab({
                               url:'../mine/mine'
                           })
                       }
                   }
               });
           }
       )

  }

  },
  queestionReset:function(){
    let that=this;
    // that.setData({
    //     headImg:'../../image/via.png',
    //     tagList:[]
    // })
    wx.showModal({
        title: '提示',
        content: '确定取消保存吗？',
        success: function (res) {
            if (res.confirm) {
                wx.switchTab({
                    url:'../mine/mine'
                })
            };
        }
    });

  },
  toastChange:function(){
    let that=this;
    that.setData({
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
      let that=this;
      wx.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor: util.color,
      })
    //  time0=setInterval(function(){
    //       that.getcode();
    //   },1000)  
  },
  bindmask:function(){
      let that = this;
      that.setData({
          choosebottom: '-500rpx',
          maskhidden: true,
          textareahidden:false,
          chooseClassOpacity:0
      })

    
  },

  bindchooseClass:function(){
         let that=this;
         
         let tagListflag = [];
         let tagList = that.data.tagList;
         let classList = that.data.classList;
         
         for(let i=0;i<classList.length;i++){
             tagListflag.push(false);
         }

         for (let j = 0; j < classList.length; j++) {
            for (let i = 0; i < tagList.length; i++) {
                if (classList[j].cate_name==tagList[i]) {
                     tagListflag[j] = true;
                 } 
             } 
         };
         console.log(tagListflag);

             that.setData({
                 tagListflag: tagListflag,
                 choosebottom: '0rpx',
                 maskhidden: false,
                 textareahidden: true,
                 chooseClassOpacity:1
             })
        
  },
  bindfeeswitch:function(e){//免费开关
        let that=this;
        // console.log(e);
        that.setData({
            nofeeswitchChecked: !e.detail.value,
            feeswitchChecked: e.detail.value
        })
  },
  bindonfeeswitch:function(e){
      let that = this;
      that.setData({
          nofeeswitchChecked: e.detail.value,
          feeswitchChecked: !e.detail.value
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
  
  }
})