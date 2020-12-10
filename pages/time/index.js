// pages/time/index.js
import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shows: false,
    shows1: false,
    //时长选择
    array: [
      { id: 1, name: '默认30分钟' },
      { id: 2, name: '60分钟' },
      { id: 3, name: '90分钟' },
      { id: 4, name: '120分钟' },
      { id: 5, name: '150分钟' },
      { id: 6, name: '180分钟' },
      { id: 7, name: '210分钟' },
    ],
    index: 0,
    //时间段选择
    arrayIndex: 0,
    time: '设置开始时间',
    time1: '设置结束时间',
    timeArr: [30, 60, 90, 120, 150, 180, 210],
    switch1: 0,
    switch2: 0,
    // ---------
    multiArray1: [['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'], ['00', '10', '20', '30', '40', '50']],
    multiIndex1: [0, 0],
    multiArray2: [['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'], ['00', '10', '20', '30', '40', '50']],
    multiIndex2: [0, 0],
    //---------
    oper_mac:null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    let oper_mac = wx.getStorageSync('oper_mac')
    console.log("oper_mac：", oper_mac);
    this.setData({
      oper_mac: oper_mac
    })
    request({ url: '/deviceConfig/queryDeviceConfig?mac=' + oper_mac })
      .then(result => {
        console.log("根据mac查询设备配置", result.data);
        if (result.data.recreationTimeStatus == 1) {
          var obj = {}
          obj['switch1Checked'] = true
          this.setData(obj)
          this.setData({
            shows: true
          });
          if (result.data.recreationAvailableTime == 30) {
            this.setData({
              index: 0
            });
          }
          else if (result.data.recreationAvailableTime == 60) {
            this.setData({
              index: 1
            });
          }
          else if (result.data.recreationAvailableTime == 90) {
            this.setData({
              index: 2
            });
          }
          else if (result.data.recreationAvailableTime == 120) {
            this.setData({
              index: 3
            });
          }
          else if (result.data.recreationAvailableTime == 150) {
            this.setData({
              index: 4
            });
          }
          else if (result.data.recreationAvailableTime == 180) {
            this.setData({
              index: 5
            });
          }
        } else {
          var obj = {}
          obj['switch1Checked'] = false
          this.setData(obj)
        }
        //定时锁屏开关
        if (result.data.timeLockStatus == 1) {
          var obj = {}
          obj['switch1Checked1'] = true
          this.setData(obj)



          let start_time = result.data.timeLockStartTime.split(':');
          console.log("start_time", start_time)
          console.log("this.data.multiArray1[0].length=", this.data.multiArray1[0].length)
          let hour
          for (let index = 0; index < this.data.multiArray1[0].length; index++) {
            if (this.data.multiArray1[0][index] == start_time[0]) {
              hour = index
              break;
            }
          }
          let minute
          for (let index = 0; index < this.data.multiArray1[1].length; index++) {
            if (this.data.multiArray1[1][index] == start_time[1]) {
              minute = index
              break;
            }
          }

          let end_time = result.data.timeLockEndTime.split(':');
          let hour1
          for (let index = 0; index < this.data.multiArray2[0].length; index++) {
            if (this.data.multiArray2[0][index] == end_time[0]) {
              hour1 = index
              break;
            }
          }
          let minute1
          for (let index = 0; index < this.data.multiArray2[1].length; index++) {
            if (this.data.multiArray2[1][index] == end_time[1]) {
              minute1 = index
              break;
            }
          }



          this.setData({
            shows1: true,
            multiIndex1: [hour, minute],
            multiIndex2: [hour1, minute1]
          });
          this.multiIndex1 = result.data.timeLockStartTime
          this.multiIndex2 = result.data.timeLockEndTime
          this.switch2 = 1
        } else {
          var obj = {}
          obj['switch1Checked1'] = false
          this.setData(obj)
        }

      })
  },

  //娱乐类开关控制
  switch1Change: function (e) {
    console.log(e)
    console.log("e.detail.value:", e.detail.value)
    this.setData({
      shows: e.detail.value
    });
    if (e.detail.value == false) {//切换为关闭
      this.switch1 = 0
      let oper_mac = wx.getStorageSync('oper_mac')
      wx.request({
        url: 'https://pswanmor.edu505.com/api/deviceConfig/updateRecreationTime',
        method: "POST",
        data: {
          mac: oper_mac,
          recreationAvailableTime: 0,
          recreationTimeStatus: this.switch1
        },
        success: (result) => {
          console.log("修改娱乐时长设置", result.data);
        }
      })
    } else {
      this.switch1 = 1
      let oper_mac = wx.getStorageSync('oper_mac')
      wx.request({
        url: 'https://pswanmor.edu505.com/api/deviceConfig/updateRecreationTime',
        method: "POST",
        data: {
          mac: oper_mac,
          recreationAvailableTime: 30,
          recreationTimeStatus: this.switch1
        },
        success: (result) => {
          console.log("修改娱乐时长设置", result.data);
        }
      })
    }
  },
  //整机锁定开关控制
  switch1Change1: function (e) {
    this.setData({
      shows1: e.detail.value
    });
    if (e.detail.value == false) {//切换为关闭
      this.switch2 = 0
      let oper_mac = wx.getStorageSync('oper_mac')
      wx.request({
        url: 'https://pswanmor.edu505.com/api/deviceConfig/updateTimeLock',
        method: "POST",
        data: {
          mac: oper_mac,
          timeLockEndTime: "00:00:00",
          timeLockStartTime: "00:00:00",
          "timeLockStatus": this.switch2
        },
        success: (result) => {
          console.log("修改娱乐时长设置", result.data);
        }
      })
    } else {
      this.switch2 = 1
    }
  },

  //娱乐类时间选择
  bindPickerChange: function (e) {
    var that = this;
    // console.log('当前选择的值为:', e.detail.value)
    console.log('当前选择的值为:', e);
    //var timeArray = [30, 60, 90, 120, 150, 180, 210];
    var recreationAvailableTime = that.data.timeArr[e.detail.value];
    console.log('recreationAvailableTime:', recreationAvailableTime);

    let oper_mac = wx.getStorageSync('oper_mac')
    console.log("oper_mac：", oper_mac);
    wx.request({
      url: 'https://pswanmor.edu505.com/api/deviceConfig/updateRecreationTime',
      method: "POST",
      data: {
        mac: oper_mac,
        recreationAvailableTime: recreationAvailableTime,
        recreationTimeStatus: 1
      },
      success: (result) => {
        console.log("修改娱乐时长设置", result.data);
      }
    })
    this.setData({
      index: e.detail.value
    })
  },


  bindMultiPickerChange1: function (e) {
    console.log('-----------开始时间--------', e.detail.value)
    this.setData({
      multiIndex1: e.detail.value
    })
    let hour = e.detail.value[0]
    let minute = e.detail.value[1]
    this.time = this.data.multiArray1[0][hour] + ":" + this.data.multiArray1[1][minute] + ":00"
    console.log("this.time:", this.time)
  },

  //整机锁定结束选择时间段选择
  bindMultiPickerChange2: function (e) {
    console.log("当前结束选择的值为", e);
    this.setData({
      multiIndex2: e.detail.value
    })
    let hour = e.detail.value[0]
    let minute = e.detail.value[1]
    this.time1 = this.data.multiArray2[0][hour] + ":" + this.data.multiArray2[1][minute] + ":00"
    console.log("this.time1:", this.time1)

    let oper_mac = wx.getStorageSync('oper_mac')

    wx.request({
      url: 'https://pswanmor.edu505.com/api/deviceConfig/updateTimeLock',
      method: "POST",
      data: {
        mac: oper_mac,
        timeLockEndTime: this.time1,
        timeLockStartTime: this.time,
        timeLockStatus: this.switch2
      },
      success: (result) => {
        console.log("修改整机锁定设置", result.data);
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