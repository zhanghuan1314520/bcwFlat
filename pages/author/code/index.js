// pages/author/code/index.js
var QRCode = require('../../../utils/qrcode.js')
var qrcode;
Page({
    data: {
        text: '',
        image: ''
    },
    onLoad: function (options) {
        var phone = wx.getStorageSync('phone');
        console.log("======================", phone)
        var value = '{"phone":"' + phone + '",' + '"source":"BCW"}';
        qrcode = new QRCode('canvas', {
            text: value,
            image: '../../../images/code.png',
            // image: 'https://i.loli.net/2020/11/18/42dwVcHiaBXOzL3.png',
            width: 150,
            height: 150,
            colorDark: "#000000"
            // colorLight: "white",

            // correctLevel: QRCode.CorrectLevel.H,
        });
        // var value = '{"phone":"' + phone + '",' + '"source":"BCW"}';
        // qrcode.makeCode(value)

        let version = __wxConfig.envVersion;
        let axiosurl;
        switch (version) {
          case "develop": //开发预览版
            axiosurl = "https://1z74t80660.51mypc.cn";
            this.setData({
                version : '体验版'
            })
            break;
          case 'trial': //体验版
            axiosurl = "https://1z74t80660.51mypc.cn";
            this.setData({
                version : '体验版'
            })
            break;
            case 'release': //正式版
            axiosurl = "https://wx.bucuonet.com";
            this.setData({
                version : ''
            })
            break;
          default: //未知,默认调用正式版
            axiosurl = "https://wx.bucuonet.com";
            this.setData({
                version : ''
            })
            break;
        }
    },
    save: function () {
        console.log('save')
        wx.showActionSheet({
            itemList: ['保存图片'],
            success: function (res) {
                console.log(res.tapIndex)
                if (res.tapIndex == 0) {
                    qrcode.exportImage(function (path) {
                        wx.saveImageToPhotosAlbum({
                            filePath: path,
                        })
                    })
                }
            }
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