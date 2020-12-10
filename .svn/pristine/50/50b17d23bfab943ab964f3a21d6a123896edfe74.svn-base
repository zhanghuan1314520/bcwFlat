// pages/author/children_details/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    array: ['女', '男'],
    index: 0,
    childrens: []
    // studentName: "",
    // gender: "",
    // studentCode: ""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("----------这是传过来的值-------",options)
    var that = this;
    this.setData({
      orm: options
    })
    if(options.gender==0){
      this.setData({
        index: 0
      })
    }else if(options.gender==1){
      this.setData({
        index: 1
      })
    }
  },

  //性别选择
  bindPickerChange: function (e) {
    console.log('当前选择的值为:', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  formSubmit: function (e) {
    var that = this;
    console.log("-----这是提交的里面的------",e)
    console.log("e:" + e.detail.value);
    //表单数据
    var objData = e.detail.value;
    console.log("22222",objData)
    console.log("------e:studentName-----" + objData.studentName);
    console.log("-----e:gender-----" + objData.gender);
    console.log("-----e:studentCode----" + objData.studentCode);
    console.log("-----e:mac----" + objData.mac);
    // let stu = wx.getStorageSync('oper_student')
    // console.log('switch1Change:stu::', stu)
    // stu = JSON.parse(stu)


    console.log("gender:" + objData.gender);

    wx.request({
      url: 'https://pswanmor.edu505.com/api/device/updateDeviceInfo',
      data: {
        gender: objData.gender,
        mac: objData.mac,
        name: objData.studentName,
        studentCode: objData.studentCode
      },
      method: "POST",
      success: (res) => {
        console.log(res);

        //判断提交mac与缓存mac地址一致
        if(objData.mac==wx.getStorageSync('oper_mac')){
          console.log('判断提交mac与缓存mac地址一致')
          wx.setStorageSync('oper_student', '{"id":0,"gender":'+objData.gender+',"mac":"'+objData.mac+'","studentName":"'+objData.studentName+'","studentCode":"'+objData.studentCode+'","scanStatus":0}')
        }

        wx.showToast({
          title: '修改成功',
          icon: "none",
          duration: 2000,
          success() {
            setTimeout(() => {
              wx.switchTab({
                url: '/pages/my/index',
              })
            }, 2000)
          }
        })
      }
    })

  },


  // studentName: function (e) {
  //   this.data.studentName = e.detail.value
  // },
  // studentCode: function (e) {
  //   this.data.sstudentCode = e.detail.value
  // },

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