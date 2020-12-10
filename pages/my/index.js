// pages/my/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    localPhone: "",
    username: "",
    UserAvatar:"",
    UserAvatar:0,
    index:0,
    gender:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var localPhone = wx.getStorageSync('localPhone');
    var userName = wx.getStorageSync('userName');
    var UserAvatar = wx.getStorageSync('UserAvatar');
    var index = wx.getStorageSync('gender');
    console.log("===手机号===",localPhone)
    console.log("===昵称===",userName)
    console.log("===头像===",UserAvatar)
    console.log("===性别===",index)
    this.setData({
      localPhone: localPhone,   //手机号
      username: userName,      //昵称
      UserAvatar: UserAvatar,   //用户头像
      gender:index
    })
  },
  quit: function () {
    wx.showModal({
      title: '温馨提示',
      content: '是否要退出账号？',
      success(res) {
        if (res.confirm) {
	        wx.setStorageSync('oper_student', null)
	        wx.setStorageSync('oper_mac', null)
		  wx.redirectTo({
		    url: '/pages/login/index',
		  })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 跳转
  childrens: function () {
    wx.navigateTo({
      url: '/pages/author/device_information/index',
    })
  },
  information_updatas: function () {
    wx.navigateTo({
      url: '/pages/author/parent_information/index',
    })
  },
  abouts: function () {
    wx.navigateTo({
      url: '/pages/author/about/index',
    })
  },
  feedbacks: function () {
    wx.navigateTo({
      url: '/pages/author/feedback/index',
    })
  },
  code: function () {
    wx.navigateTo({
      url: '/pages/author/code/index',
    })
  },
  pw: function () {
    wx.navigateTo({
      url: '/pages/author/change_password/index',
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
    this.onLoad();
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