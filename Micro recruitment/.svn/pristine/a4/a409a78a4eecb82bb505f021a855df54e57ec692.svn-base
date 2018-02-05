
var util = require("../../utils/util.js");

function showaddress(data,callback){
    util.commonRequest(
        data,
        '/mini_program/minvite/back/index.php/home/user/get_province_city',
        function(res){
            // console.log("省："+JSON.stringify(res));
            if (res.data.err_code != 1000) {
                wx.showModal({
                    title: '提示',
                    content: res.data.err_data,
                    showCancel: false
                })
                return;
            }

            typeof callback == "function" && callback(res.data.data);
            
        }
    )
}


module.exports = {
    showaddress: showaddress
}