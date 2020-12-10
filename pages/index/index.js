// pages/home/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    // checked: false,
    banners: [{
      id: 0,
      img: "../../images/banner1.png"
    }],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    circular: true,
    interval: 2000,
    duration: 500,
    shows: false,
    lockStatusParam: 0,
    switch1Checked: false,
    shows: false,
    shows1: false,
    grades: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // this.getgrades();
    let oper_mac = wx.getStorageSync('oper_mac')
    wx.request({
      url: 'https://pswanmor.edu505.com/api/deviceConfig/queryDeviceConfig?mac=' + oper_mac,
      success: (result) => {
        console.log("查询一键锁屏状态", result.data);
        if (result.data.data.lockStatus == 1) {
          var obj = {}
          obj['switch1Checked'] = true
          this.setData(obj)
          console.log("查询一键锁屏状态lockStatus2", result.data.lockStatus);
        } else {
          var obj = {}
          obj['switch1Checked'] = false
          this.setData(obj)
        }
      }
    })

    var phone = wx.getStorageSync('phone');
    //查询孩子数据缓存，缓存中没有,查询接口，返回第一个孩子数据放缓存
    // let stu;
    //   wx.getStorage({key: 'oper_student',
    //   success(res) {
    //     console.log("res.data",res.data)
    //     stu = res.data
    //   }
    // })


    let stu = wx.getStorageSync('oper_student')
    console.log("stu：------", stu);
    console.log("oper_mac：------", oper_mac);
    if (oper_mac == null || oper_mac == '') {
      // console.log("stu111：------", stu);
      wx.request({
        url: 'https://pswanmor.edu505.com/api/device/queryChildList?phone=' + phone,
        success: (res) => {

          if (res.data.data.length > 0) {//已有绑定平板
            // wx.setStorage('oper_student', res.data.data[0]);
            console.log("stu222：------", res.data.data[0]);
            console.log("stu333：------", res.data.data[0].mac);
            // wx.setStorage({
            //   data: res.data.data[0],
            //   key: 'oper_student',
            // })
            wx.setStorageSync('oper_student', JSON.stringify(res.data.data[0]))
            wx.setStorageSync('oper_mac', res.data.data[0].mac)
            wx.setStorageSync(JSON.stringify(res.data.data[0].mac), JSON.stringify(res.data.data[0]))

            that.setData({
              grade_name: res.data.data[0].studentName,
              stu_gender: res.data.data[0].gender,
              grades: res.data.data

            })

            // that.setData({
            // [item]: res.data.data[i].mac
            // })

          } else if (res.data.data.length == 0) {//未绑定平板
            wx.setStorageSync('oper_student', null)
            wx.setStorageSync('oper_mac', null)
            // wx.setStorageSync(JSON.stringify(res.data.data[0].mac), JSON.stringify(res.data.data[0]))

            that.setData({
              grade_name: '',
              stu_gender: '-1',
            })
          }
        }
      })
    } else {
      let stu = wx.getStorageSync('oper_student')
      console.log('stu::',stu)
      stu = JSON.parse(stu)
      console.log('stu:.studentName:',stu.studentName)
      that.setData({
        grade_name: stu.studentName,
        stu_gender: stu.gender,

      })
    }

  },




  //通过手机号获取关联设备列表
  // getgrades() {
  //   var phone = wx.getStorageSync('phone');
  //   wx.request({
  //     url: 'https://pswanmor.edu505.com/api/device/queryChildList?phone=' + phone,
  //     success: (res) => {
  //       console.log("========", res.data)
  //       this.setData({
  //         grades: res.data.data
  //       })
  //     }
  //   })
  // },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
  },

  switch1Change: function (e) {
    var that = this;
    // let oper_mac = wx.getStorageSync('oper_mac')
    let stu = wx.getStorageSync('oper_student')
    console.log('switch1Change:stu::',stu)
    stu = JSON.parse(stu)
    console.log(e.detail.value)
    if (e.detail.value == true) {
      this.lockStatusParam = 1
    } else {
      this.lockStatusParam = 0
    }
    wx.request({
      url: 'https://pswanmor.edu505.com/api/deviceConfig/updateLockStatus',
      method: "POST",
      data: { lockStatus: this.lockStatusParam, mac: stu.mac },
      success: (result) => {
        console.log("修改锁屏状态", result.data);
      }
    })
    this.setData({
      shows: e.detail.value
    });
  },




  //跳转
  //日志
  journal: function () {
    wx.navigateTo({
      url: '/pages/journal/index',
    })
  },
  // 时间
  time: function () {
    wx.navigateTo({
      url: '/pages/time/index',
    })
  },
  // 浏览器
  browser: function () {
    wx.navigateTo({
      url: '/pages/browser/index',
    })
  },
  //定位
  location: function () {
    wx.navigateTo({
      url: '/pages/location/index',
    })
  },
  //查看
  inspect: function () {
    wx.navigateTo({
      url: '/pages/inspect/index',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onLoad();

  },



  share() {
    var that = this;
    var sh = that.data.shows1;
    this.setData({
      shows1: !sh
    })
  },
  /**
   * 已选下拉框
   */
  mySelect(e) {
    console.log(e)
    let name = e.currentTarget.dataset.name
    let mac = e.currentTarget.dataset.mac
    let code = e.currentTarget.dataset.code  
    let gender = e.currentTarget.dataset.gender       
    this.setData({
      grade_name: name,
      stu_gender: gender,
      select: false
    })
    console.log("mac:", mac)
    wx.setStorageSync('oper_mac', mac);
    wx.setStorageSync('oper_student', '{"id":0,"gender":'+gender+',"mac":"'+mac+'","studentName":"'+name+'","studentCode":"'+code+'","scanStatus":0}')

    console.log(wx.getStorageSync('oper_mac'))
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