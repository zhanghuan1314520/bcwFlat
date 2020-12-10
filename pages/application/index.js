// pages/application/index.js
import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    learn: [],  //查询类别下拉列表内容部分
    selected: 0,   //tab是否选中
    list: [], // 查询类别下拉列表
    categoryId: "",
    pushStatus: 0,
    appName: "",
    remove_app: [],
    app: [],
    search_app: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      selected: 0
    })
    this.getlearn(2);
    wx.request({
      url: 'https://pswanmor.edu505.com/api/appCategory/select',
      success: function (res) {
        //循环使用
        that.list = res.data.data
        console.log("查询类别下拉列表数据:", that.list)
        for (var i = 0; i < res.data.data.length; i++) {
          that.data.list[i] = res.data.data[i].label
        }
        that.data.list.splice(0, 1);
        that.setData({
          list: that.data.list
        })
      }
    })
  },

  getlearn(cId) {
    let oper_mac = wx.getStorageSync('oper_mac')
    request({ url: "/appDevice/queryMyAppDevice", data: { appName: this.appName, categoryId: cId, mac: oper_mac, pushStatus: this.data.pushStatus, searchType: 1 }, method: "POST" })
      .then(result => {
        let app_legnth = 0
        this.data.app = []
        for (let index = 0; index < result.data.length; index++) {
          const element = result.data[index];

          // console.log("element", element)

          let flag= true
          for (let index_1 = 0; index_1 < this.data.remove_app.length; index_1++) {
            const remove_app_element = this.data.remove_app[index_1];
            // this.data.remove_app.forEach(remove_app_element => {
            if (element.appName != remove_app_element) {
              flag = true
            } else {
              // console.log("element===========", element.appName + " " + remove_app_element)
              flag = false
              break
            }
          };
          if (flag == true) {
            // console.log("element", element)
            this.data.app[app_legnth] = element
            app_legnth += 1
          }

        }
        // console.log("remove_apps", this.remove_apps)
        console.log("this.app", this.data.app)
        this.setData({
          learn: this.data.app
        })

      })
  },

  //从平板卸载或者推送至平板部分逻辑开始
  push: function (e) {
    let that = this;
    let id = e.currentTarget.dataset.id;
    let appName = e.currentTarget.dataset.name;
    let oper_mac = wx.getStorageSync('oper_mac')
    wx.showModal({
      title: '温馨提示',
      content: '确定推送' + e.target.dataset.name + '至平板吗？',
      showCancel: true,
      cancelText: "取消",
      cancelColor: "#030303",
      confirmText: "确定",
      confirmColor: "#804CF7",
      success: function (res) {
        if (res.confirm) {
          wx.request({
            // 推送api
            url: 'https://pswanmor.edu505.com/api/appDevice/push',
            data: {
              appId: e.currentTarget.dataset.id, mac: oper_mac
            },
            method: 'POST',
            success: function (res) {
              that.getlearn(that.categoryId);
              wx.showToast({
                title: '操作成功',
                icon: "none",
                mask: true,
                duration: 4000
              })
            }
          })
        } else if (res.cancel) {
        }
      }
    })
  },

  uninstall: function (e) {
    let that = this;
    let id = e.currentTarget.dataset.id;
    let appName = e.currentTarget.dataset.name;
    let oper_mac = wx.getStorageSync('oper_mac')
    wx.showModal({
      title: '温馨提示',
      content: '确定把' + e.target.dataset.name + '从平板卸载吗？',
      showCancel: true,
      cancelText: "取消",
      cancelColor: "#030303",
      confirmText: "确定",
      confirmColor: "#804CF7",
      success: function (res) {
        if (res.confirm) {
          wx.request({
            // 推送api
            url: 'https://pswanmor.edu505.com/api/appDevice/uninstall',
            data: {
              appId: e.currentTarget.dataset.id, mac: oper_mac
            },
            method: 'POST',
            success: function (res) {
              that.getlearn(that.categoryId);
              wx.showToast({
                title: '操作成功',
                icon: "none",
                mask: true,
                duration: 4000
              })
            }
          })
        } else if (res.cancel) {
        }
      }
    })
  },

  //从平板卸载或者推送至平板部分逻辑结束

  //搜索方法 key为用户输入的查询字段
  formSubmit_search: function (e) {
    let oper_mac = wx.getStorageSync('oper_mac')
    var objData = e.detail.value;
    console.log("22222", objData)
    // console.log("key.currentTarget.dataset.id=", key.currentTarget.dataset.id)
    request({ url: "/appDevice/queryMyAppDevice", data: { appName: objData.keyword, categoryId: this.categoryId, mac: oper_mac, pushStatus: this.data.pushStatus, searchType: 2 }, method: "POST" })
      .then(result => {
        console.log("result-->", result.data)
        console.log("this.search_app", this.data.search_app)
        this.data.search_app = []
        let app_legnth = 0
        for (let index = 0; index < result.data.length; index++) {
          const element = result.data[index];

          console.log("element", element)

          let flag=true
          console.log('flag', flag)
          for (let index_1 = 0; index_1 < this.data.remove_app.length; index_1++) {
            const remove_app_element = this.data.remove_app[index_1];
            // this.data.remove_app.forEach(remove_app_element => {
            if (element.appName != remove_app_element) {
              flag = true
            } else {
              console.log("element===========", element.appName + " " + remove_app_element)
              flag = false
              break
            }
          };
          if (flag == true) {
            this.data.search_app[app_legnth] = element
            app_legnth += 1
          }

        }
        // console.log("remove_apps", this.remove_apps)
        console.log("this.search_app", this.data.search_app)
        this.setData({
          learn: this.data.search_app
        })
      })

  },
  //tab框开始
  selected: function (e) {
    let that = this
    let index = e.currentTarget.dataset.value;
    console.log("++++++++++++++++index++++++++++++++++++++++", index)
    index = index + 2;
    this.getlearn(index);
    if (index == 2) {
      that.setData({
        selected: 0
      })
    } else if (index == 3) {
      that.setData({
        selected: 1
      })
    } else if (index == 4) {
      that.setData({
        selected: 2
      })
    } else if (index == 5) {
      that.setData({
        selected: 3
      })
    }

    that.categoryId = index;
    // that.getlearn();
  },
  //tab框结束
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

  },
})