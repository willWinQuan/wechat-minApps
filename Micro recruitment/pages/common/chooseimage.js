
var util = require("../../utils/util.js");

//去除图片域名
function cut_pic_url(pic_url) {
    var pnum = 0;
    for (var i = 0; i < pic_url.length; i++) {
        if (pic_url[i] == "/") {
            pnum++;
            if (pnum == 3) {
                return pic_url.substring(i, pic_url.length)
            }
        }
    }
}

//图片上传
function chooseimage(count,that){
    var imagerray=[];
    wx.chooseImage({
        count: count, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            var tempFilePaths = res.tempFilePaths;
            // console.log(JSON.stringify(res));
            for(var i=0;i<tempFilePaths.length;i++){
              wx.uploadFile({
                url: util.http_host + '/mini_program/minvite/back/index.php/home/user/upload_pic',
                filePath: tempFilePaths[i],
                name: 'pic_url',
                formData:{
                    customer_id_en: util.customer_id_en,
                    pic_url: tempFilePaths
                },
                success: function (res) {
                    // console.log(res);
                    var data = JSON.parse(res.data);
                    var pic_url = util.http_host + data.data
                    imagerray.push(pic_url);
                    // console.log(imagerray)
                    that.setData({
                        imagerray: imagerray,
                        isupload:true
                    });
                },
                fail: function () {
                    console.log("上传失败")
                }
            })
        };
         
        }
    })
}

module.exports = {
    chooseimage: chooseimage,
    cut_pic_url: cut_pic_url
}