// pages/administration/index.js
import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0, //tab切换
    shows: false,
    lists: [],   // 系统应用
    Tripartite: [], //第三方应用
    arrayIndex: 0,   //时间段选择
    time: '设置开始时间',
    time1: '设置结束时间',
    switch1: 0,
    switch2: 0,
    lockStatusParam: 0,
    switch1Checked: false,
    learn: [],
    categoryId: "",
    pushStatus: 0,
    // shows: [],
    shows: [],
    lockStatusParams: 0,
    lockStatusParam1: 0,
    startTime: [],
    endTime: [],
    third_switch: [],
    switchChecked: [],
    index_curr: 0,
    appIds: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //var that = this;
    this.getlists();            //平板应用列表type1
    this.getTripartite();       //平板应用列表type1
    this.getlearn();            //修改已安装应用可用时间
    let oper_mac = wx.getStorageSync('oper_mac')
    console.log("=======oper_mac=====",oper_mac)
    request({ url: "/deviceConfig/queryDeviceConfig?mac=" + oper_mac })
      .then(result => {

        console.log("queryDeviceConfig:", result.data)
        // if(result.data.tabletAppStatus == 1){//平板应用控制状态已开启家长控制，返回
        //     return;
        // }

        if(result.data == null || result.data.tabletAppStatus == 0){
          wx.request({
            url: 'https://pswanmor.edu505.com/api/deviceConfig/updateTabletAppStatus',
            data: {
              tabletAppStatus: 1,
              mac: oper_mac
            },
            method: "POST",
            success: (res) => {
              console.log("----------平板应用控制状态(1:家长控制,0:平台老师控制)-------------", res)
            },
            fail: function (res) {
              wx.showToast({
                title: '网络不在状态!',
                icon: "none",
                duration: 2000,
                mask: true
              })
            }
          })
        }
     })
  },
  //获取系统应用列表1.1
  getlists() {
    let oper_mac = wx.getStorageSync('oper_mac')
    request({ url: "/tabletApp/queryTabletAppListByMac?type=1&mac=" + oper_mac })
      .then(result => {
        console.log("type1", result.data)
        this.setData({
          lists: result.data
        })
      })
  },
  //获取第三方应用列表1.2
  getTripartite() {
    let oper_mac = wx.getStorageSync('oper_mac')
    request({ url: "/tabletApp/queryTabletAppListByMac?type=2&mac=" + oper_mac })
      .then(result => {
        console.log("type2", result.data)
        this.setData({
          Tripartite: result.data
        })
      })
  },
  //**************系统应用type1开关部分开始**********************
  onChange1: function (e) {
    var that = this;
    let id = e.currentTarget.dataset.id;
    this.setData({
      shows: e.detail.value
    });
    if (e.detail.value == true) {
      this.lockStatusParam = 1
      wx.request({
        url: 'https://pswanmor.edu505.com/api/tabletApp/updateStatus',
        method: "POST",
        data: { status: this.lockStatusParam, id: e.currentTarget.dataset.id },
        success: (result) => {
          that.onLoad();
          wx.showToast({
            title: '设置成功',
            icon: "none",
            mask: true
          })
        }
      })
    } else{
      this.lockStatusParam = 0
      wx.request({
        url: 'https://pswanmor.edu505.com/api/tabletApp/updateStatus',
        method: "POST",
        data: { status: this.lockStatusParam, id: e.currentTarget.dataset.id },
        success: (result) => {
          that.onLoad();
          wx.showToast({
            title: '设置成功',
            icon: "none",
            mask: true
          })
        }
      })
    }
  },
  //**************系统应用type1开关部分结束*************
  //**************系统应用type2开关部分开始*********************
  onChange2: function (e) {
    var that = this;
    let id = e.currentTarget.dataset.id;
    if (e.detail.value == true) {
      this.lockStatusParam = 1
    } else {
      this.lockStatusParam = 0
    }
    wx.request({
      url: 'https://pswanmor.edu505.com/api/tabletApp/updateStatus',
      method: "POST",
      data: { status: this.lockStatusParam, id: e.currentTarget.dataset.id },
      success: (result) => {
        console.log("type1", result.data)
        that.onLoad();
        wx.showToast({
          title: '设置成功',
          icon: "none",
          mask: true
        })
      }
    })
    this.setData({
      shows: e.detail.value
    });
  },
  //**************系统应用type2开关结束部分结束**********************

  /* *************修改已安装应用可用时间部分开始*********** */
  getlearn() {
    let oper_mac = wx.getStorageSync('oper_mac')
    // var that = this
    request({ url: "/appDevice/queryMyAppDevice", data: { appName: this.appName, categoryId: this.categoryId, mac: oper_mac, pushStatus: 2, searchType: 1 }, method: "POST" })
      .then(result => {
        console.log("=======已安装应用列表======", result.data)
        //定时锁屏开关
        var obj = {}
        for (let index = 0; index < result.data.length; index++) {
          this.data.appIds[index] = result.data[index].id
          // console.log("result.data[index]", result.data[index]);
          if (result.data[index].status == 1) {
            this.switch2 = 1
            var shows_item = 'shows[' + index + ']'
            var switch_item = 'switchChecked[' + index + ']'
            this.setData({
              [shows_item]: true,
              [switch_item]: true
            });

            var startTime = 'startTime[' + index + ']'
            this.setData({
              [startTime]: result.data[index].startTime
            });
            var endTime = 'endTime[' + index + ']'
            this.setData({
              [endTime]: result.data[index].endTime
            });            
            // console.log("startTime", result.data[index].startTime)
          } else {
            var startTime = 'startTime[' + index + ']'
            var endTime = 'endTime[' + index + ']'
            this.setData({
              [startTime]: '设置开始时间',
              [endTime]: '设置结束时间'
            });
            var shows_item = 'shows[' + index + ']'
            var switch_item = 'switchChecked[' + index + ']'
            this.setData({
              [shows_item]: false,
              [switch_item]: false
            });
          }
        }
        this.setData({
          learn: result.data
        })
      })
  },
  /* *************修改已安装应用可用时间部分结束*********** */
  /* *************修改小程序应用使用时间部分开始*********** */
  switch1Change: function (e) {
    let id = e.currentTarget.dataset.id;
    let oper_mac = wx.getStorageSync('oper_mac')
    if (e.detail.value == true) {
      this.lockStatusParam1 = 0  //关闭
      this.data.index_curr = e.currentTarget.dataset.index
      console.log("-----index-----", e.currentTarget.dataset.index)
      var time_item = 'shows[' + e.currentTarget.dataset.index + ']'
      this.setData({
        [time_item]: true,
      });

    } else {
      this.lockStatusParam1 = 1 //打开

      console.log("-----index-----", e.currentTarget.dataset.index)
      var time_item = 'shows[' + e.currentTarget.dataset.index + ']'
      this.setData({
        [time_item]: false,
      });

      this.switch2 = 0
      console.log("--------是否打开关闭-----", e.detail.value)
      let oper_mac = wx.getStorageSync('oper_mac')
      let appId = e.currentTarget.dataset.id;
      wx.request({
        url: 'https://pswanmor.edu505.com/api/useTime/update',
        method: "POST",
        data: {
          mac: oper_mac,
          appId: e.currentTarget.dataset.id,
          endTime: "00:00:00",
          startTime: "00:00:00",
          status: 0
        },
        success: (result) => {
          console.log("修改娱乐时长设置", result.data);
        }
      })
    }
  },
  //时间段选择
  //设置开始时间
  bindTimeChange: function (e) {
    console.log("当前开始选择的值为", e.detail.value);

    var startTime = 'startTime[' + e.target.dataset.current + ']'
    this.setData({
      [startTime]: e.detail.value + ':00',
      index: e.target.dataset.current
      // startTimess:e.detail.value
    })
    this.time = e.detail.value + ":00"
    console.log(e.target.dataset.current)

    if(this.data.endTime[ e.target.dataset.current ] != '设置结束时间'){
      let oper_mac = wx.getStorageSync('oper_mac')
      let appId = e.currentTarget.dataset.id;
      this.time1 = this.data.endTime[ e.target.dataset.current ]
      wx.request({
        url: 'https://pswanmor.edu505.com/api/useTime/update',
        method: "POST",
        data: {
          mac: oper_mac,
          endTime: this.time1,
          startTime: this.time,
          appId: appId,
          status: 1
        },
        success: (result) => {
          // this.onLoad();
          console.log("设置使用时间段", result.data);
        }
      })
    }
  },
  //设置结束时间
  bindTimeChange1: function (e) {
    console.log("当前结束选择的值为", e);
    var endTime = 'endTime[' + e.target.dataset.current + ']'
    this.setData({
      [endTime]: e.detail.value + ":00"
    })
    this.time1 = e.detail.value + ":00"
    console.log("当前结束选择的值为", this.time1);

    console.log("当前开始选择的值为", this.time);
    // if(this.time == null || this.time == '' ){
      this.time = this.data.startTime[ e.target.dataset.current ]
    // }
    console.log("当前开始选择的值为", this.time);

    let oper_mac = wx.getStorageSync('oper_mac')
    let appId = e.currentTarget.dataset.id;
    wx.request({
      url: 'https://pswanmor.edu505.com/api/useTime/update',
      method: "POST",
      data: {
        mac: oper_mac,
        endTime: this.time1,
        startTime: this.time,
        appId: appId,
        status: 1
      },
      success: (result) => {
        // this.onLoad();
        console.log("设置使用时间段", result.data);
      }
    })
  },


  /* *************修改小程序应用使用时间部分结束*********** */
  //*************卸载平板部分开始****************************** */
  del: function (e) {
    let that = this;
    let id = e.currentTarget.dataset.id;
    console.log("================id==========", id)
    let oper_mac = wx.getStorageSync('oper_mac')
    wx.request({
      // 推送api
      url: 'https://pswanmor.edu505.com/api/appDevice/uninstall',
      data: {
        appId: e.currentTarget.dataset.id, mac: oper_mac
      },
      method: 'POST',
      success: function (res) {
        // wx.setStorageSync('oper_mac', null)
        that.onLoad();
        wx.showToast({
          title: '操作成功',
          icon: "none",
          mask: true,
          duration: 5000
        })
      }
    })
  },
  //*************卸载平板部分结束****************************** */

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // //查询平板应用控制状态
    let oper_mac = wx.getStorageSync('oper_mac')
    // wx.request({
    //   url: 'https://pswanmor.edu505.com/api/deviceConfig/queryDeviceConfig?mac=' + oper_mac,
    //   success: (res) => {
    //     console.log("----------查询列表数据状态-------------", res)
    //   }
    // })
    wx.request({
      url: 'https://pswanmor.edu505.com/api/deviceConfig/updateTabletAppStatus',
      data: {
        tabletAppStatus: 1,
        mac: oper_mac
      },
      method: "POST",
      success: (res) => {
        console.log("----------平板应用控制状态(1:家长控制,0:平台老师控制)-------------", res)
      },
      fail: function (res) {
        wx.showToast({
          title: '网络不在状态!',
          icon: "none",
          duration: 2000,
          mask: true
        })
      }
    })
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