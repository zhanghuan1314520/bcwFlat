import { request } from "../../request/index.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //时间段选择
    arrayIndex: 0,
    timeLockStartTime: '设置开始时间',
    timeLockEndTime: '设置结束时间',
    shows: false,
    switch1:0,
    oper_mac:null
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    let oper_mac = wx.getStorageSync('oper_mac')
    let stu = wx.getStorageSync('oper_student')
    console.log('switch1Change:stu::',stu)
    console.log("=====oper_mac=======",oper_mac)
    stu = JSON.parse(stu)
    this.setData({
      oper_mac: oper_mac
    })
    // 获取浏览器数据
    request({ url: "/deviceConfig/queryDeviceConfig?mac="+stu.mac })
    .then(result => {
      console.log("根据mac查询设备配置",result.data);
   ///deviceConfig/updateBrowserSetting    修改浏览器设置
   if(result.data.networkHostingStatus==1){
    var obj = {}
    obj['switch1Checked1'] = true
    this.setData(obj)
    this.setData({
      shows: true,
      timeLockStartTime:result.data.browserAvailableStartTime,
      timeLockEndTime:result.data.browserAvailableEndTime
    });
    this.timeLockStartTime=result.data.browserAvailableStartTime
    this.timeLockEndTime=result.data.browserAvailableEndTime
    this.switch1=1
  }else {
    var obj = {}
    obj['switch1Checked1'] = false
    this.setData(obj)
  }

    })
  },
   //开关
   switch1Change: function (e) {
    console.log(e);
    this.setData({
      shows: e.detail.value
    });
    if(e.detail.value==false){
      this.switch1=0
      let stu = wx.getStorageSync('oper_student')
      console.log('switch1Change:stu::',stu)
      stu = JSON.parse(stu)
      wx.request({
        url: 'https://pswanmor.edu505.com/api/deviceConfig/updateBrowserSetting',
        method: "POST",
        data: {
          mac: stu.mac,
          browserAvailableEndTime: "00:00:00",
          browserAvailableStartTime: "00:00:00",
          networkHostingStatus: this.switch1
        },
        success: (result) => {
          console.log("修改娱乐时长设置", result.data);
          wx.showToast({
            title: '操作成功',
            icon:"none",
            duration:2000,
            mask:true
          })        
        }
      })
  
    }else {
      this.switch1=1      
    }
    // wx.showToast({
    //   title: '操作成功',
    //   icon: "none",
    //   duration: 2000,
    //   mask:true
    // })
  },
  //开始时间段选择
  bindTimeChange: function (e) {
    console.log(e);
    console.log('当前的开始时间为', e.detail.value)
    this.setData({
      // 浏览器获取到标签的开始时间
      timeLockStartTime: e.detail.value
    })
    this.timeLockStartTime=e.detail.value+":00"
    console.log('timeLockEndTime', this.timeLockEndTime)
    if(this.timeLockEndTime!=undefined){
      let stu = wx.getStorageSync('oper_student')
      console.log('switch1Change:stu::',stu)
      stu = JSON.parse(stu)      
    wx.request({
      url: 'https://pswanmor.edu505.com/api/deviceConfig/updateBrowserSetting',
      method: "POST",
      data: {
        mac: stu.mac,
        browserAvailableEndTime: this.timeLockEndTime,
        browserAvailableStartTime: this.timeLockStartTime,
        networkHostingStatus: this.switch1
      },
      success: (result) => {
        console.log("修改娱乐时长设置", result.data);
        wx.showToast({
          title: '操作成功',
          icon:"none",
          duration:2000,
          mask:true
        })   
      }     
    })
  }
  },
   //结束时间段选择
  bindTimeChange1: function (e) {
    console.log(e);
    console.log('当前的结束时间为', e.detail.value)
    this.setData({
      // 浏览器获取到标签的结束时间
      timeLockEndTime: e.detail.value
    })

    this.timeLockEndTime=e.detail.value+":00"
    console.log("当前结束选择的值为", this.timeLockEndTime);

    let stu = wx.getStorageSync('oper_student')
    console.log('switch1Change:stu::',stu)
    stu = JSON.parse(stu) 
    wx.request({
      url: 'https://pswanmor.edu505.com/api/deviceConfig/updateBrowserSetting',
      method: "POST",
      data: {
        mac: stu.mac,
        browserAvailableEndTime: this.timeLockEndTime,
        browserAvailableStartTime: this.timeLockStartTime,
        networkHostingStatus: this.switch1
      },
      success: (result) => {
        console.log("修改娱乐时长设置", result.data);
        wx.showToast({
          title: '操作成功',
          icon:"none",
          duration:2000,
          mask:true
        })        
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