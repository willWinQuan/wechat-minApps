

function showmyresume(util,data,that,callback){
    util.commonRequest(
        data,
        "/mini_program/minvite/back/index.php/home/user/resume_detail",
        function (res) {
            // console.log("我的简历：" + JSON.stringify(res));
            var data = res.data;

            switch (res.data.err_code) {
                case 1000:
                    switch (data.data.baseinfo.edu_type) {
                        case "1": data.data.baseinfo.edu_type = "小学"; break;
                        case "2": data.data.baseinfo.edu_type = "初中"; break;
                        case "3": data.data.baseinfo.edu_type = "高中"; break;
                        case "4": data.data.baseinfo.edu_type = "高中"; break;
                        case "5": data.data.baseinfo.edu_type = "大专"; break;
                        case "6": data.data.baseinfo.edu_type = "本科"; break;
                        case "7": data.data.baseinfo.edu_type = "硕士"; break;
                        case "8": data.data.baseinfo.edu_type = "博士"; break;
                        case "9": data.data.baseinfo.edu_type = "其他"; break;
                    }
                    that.setData({
                        showmyresume: data
                    });
                    if(data.length==0){
                         that.setData({
                             showmyresume:''
                         })
                    }
                    typeof callback=="function" && callback(data);
                    break;
                case 1001:
                    that.setData({
                        showmyresume: ''
                    });
                    util.hideToast();
                    break;
                default:
                    util.hideToast();
                    that.setData({
                        toastHidden: false,
                        toastcontent: res.data.err_data,
                        showmyresume: '0'
                    });   
                    break;
            }
        }
    )
}

module.exports = {
    showmyresume: showmyresume
}
