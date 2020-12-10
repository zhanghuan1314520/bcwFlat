// pages/author/children/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  relieve:function(){
    wx.showModal({
      title: '重要提示',
      content: '解绑孩子后:学习平板自动删除万墨家长的所有操作,请慎重！',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  device_information:function(){
    wx.navigateTo({
      url: '/pages/author/device_information/index',
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