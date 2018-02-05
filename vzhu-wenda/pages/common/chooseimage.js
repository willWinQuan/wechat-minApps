
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
};

//promise
function getJSON(url) {
    let promise = new Promise(function (resolve, reject) {
        // OK，现在我们可以在promise中编写我们的异步行为代码了。比如ajax调用。 
        let arry_data = [];
        for (var i = 0; i < url.length; i++) {
            wx.request({
                url: url[i],
                data: {
                },
                success: function (res) {
                    arry_data.push(res);
                    resolve(arry_data);
                },
                fail: function (error) {
                    reject(error);
                }
            })
        }
        // 如果我们的ajax调用成功，会调用resolve()并传递必要的参数给它。参数是什么呢？由我们自己根据我们的异步工作而决定。 
        // 比如，对于ajax工作，jquery的ajax()方法在其成功加载文件后会调用我们的成功回调函数。它也会传递一个参数，就是它实际加载的数据。 
        // 因此我们这儿的参数就是这个数据。 
        // 如果失败，我们会调用reject()，并且传递必要的参数给它。 
    });

    return promise;
    // r记得将promise返回 
};



//图片上传
function chooseimage(isheadImg,count,that){
    let imagerray = [];
    if (isheadImg) {
        imagerray = [];
    } else {
        imagerray = that.data.imagerray;
        console.log(typeof imagerray);
    }
    wx.chooseImage({
        count: count, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
            
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            var tempFilePaths = res.tempFilePaths;
            
            let data={
                customer_id_en: util.customer_id_en,
                pic_url: tempFilePaths,
                user_id_en: util.user_id_en
            };
           
            for (var i = 0; i < tempFilePaths.length; i++) {
                wx.uploadFile({
                    url: util.http_host + '/mini_program/applets/index.php/answer/Front_expert_order/upload_img',
                    filePath: res.tempFilePaths[i],
                    name: 'pic_url',
                    formData:data,
                    success: res => {
                        // console.log(res);
                        var data = JSON.parse(res.data);
                        if (data.error != 1000) {
                            wx.showModal({
                                title: '提示',
                                content: data.err_data
                            })
                            return;
                        };

                        var pic_url = util.http_host + data.data;
                        imagerray.push(pic_url);

                        if (isheadImg) {
                            that.setData({
                                headImg: imagerray[0],
                                isupload: true
                            });
                        } else {
                            that.setData({
                                imagerray: imagerray,
                                isupload: true
                            });

                            if (that.data.imagerray.length == 9) {
                                that.setData({
                                    iscanchooseImg: false
                                })
                            }
                        }
                       
                    },
                    fail: function (error) {
                        console.log("上传失败");
                        reject(error);
                    }
                })
            } 
        }
    });
   
}

module.exports = {
    chooseimage: chooseimage,
    cut_pic_url: cut_pic_url
}