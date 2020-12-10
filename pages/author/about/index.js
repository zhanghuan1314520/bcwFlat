// pages/author/about/index.js
Page({
  data: {
    contents: '0571-86292265'
  },
  copyText: function (e) {
    console.log("当前的值为：",e)
    console.log(e.currentTarget.dataset)
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '已复制客服热线'
            })
          }
        })
      }
    })
  },
  // edition: function () {
  //   wx.navigateTo({
  //     url: '/pages/edition/index',
  //   })
  // },
})