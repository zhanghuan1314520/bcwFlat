// pages/author/parent_information/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['女', '男'],
    index: 0,
    email: "", //邮箱
    userName: "", //昵称
    UserAvatar: '../../../images/boy.png',//头像
    url: '',//图片上传给后台完成后后台返回图片路径
    localPhone:"",
    gender:'',
    UserAvatar:0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'userName',
      success: function (res) {
        console.log("===昵称===",res.data)
        that.setData({ userName: res.data })
      },
    })
    wx.getStorage({
      key: 'email',
      success: function (res) {
        console.log("===邮箱===",res.data)
        that.setData({ email: res.data })
      },
    })
    wx.getStorage({
      key: 'UserAvatar',
      success: function (res) {
        console.log("===头像===",res.data)
        that.setData({ UserAvatar: res.data })
      },
    })
    wx.getStorage({
      key: 'gender',
      success: function (res) {
        console.log("===性别===",res.data)
        that.setData({
          //  gender: res.data 
          index: res.data
          })
      },
    })
   
    // wx.getStorage({
    //   key: 'gender',
    //   success: function (res) {
    //     console.log(res.data)
    //     that.setData({
    //       // index: res.data
    //       gender: res.data 
    //     })


    
    // wx.getStorage({
    //   key: 'gender',
    //   success: function (res) {
    //     console.log(res.data)
    //     that.setData({
    //       index: res.data
    //     })
    //   },
    //   // fail(error){
    //   //   console.log('error:' + error)
    //   // //   that.setData({
    //   // //     index: 0
    //   // //   })
    //   // } ,
    // })



    // if(wx.getStorageSync('gender') == null || wx.getStorageSync('gender') == '' ){
    //   console.log('gender:' + wx.getStorageSync('gender'))
    //   that.setData({
    //     index: 0
    //   })
    // }
  },

//上传图片
  chooseimg: function () {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], 
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({
          UserAvatar: res.tempFilePaths//传进去的图片数组放在data里面
        })
        let version = __wxConfig.envVersion;
        let axiosurl;
        switch (version) {
          case "develop": //开发预览版
            axiosurl = "https://1z74t80660.51mypc.cn";
            break;
          case 'trial': //体验版
            axiosurl = "https://1z74t80660.51mypc.cn";
            break;
          // break;
          case 'release': //正式版
            axiosurl = "https://wx.bucuonet.com";
            break;
          default: //未知,默认调用正式版
            axiosurl = "https://wx.bucuonet.com";
            break;
        }
        //图片上传
        wx.uploadFile({
          url: axiosurl + '/bcapi/api/doUploadImage',
          method: 'POST',
          filePath: this.data.UserAvatar[0],//图片路径需要字符串而不是数组
          name: 'files',//和后台约定的name
          formData: {
            "type": "goods"
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: (res) => {
            var data = JSON.parse(res.data);
            var  UserAvatar = data.data.prePath + data.data.images[0] ;
            wx.setStorageSync('UserAvatar',UserAvatar);
            if (res.statusCode != 200) {
              wx.showToast({
                title: '上传失败',
                icon: "none",
                duration: 2000,
                mask: true
              })
              return;
            } else {
              wx.showToast({
                title: '上传成功',
                icon: "none",
                duration: 2000,
                mask: true
              })
              this.url = JSON.parse(res.data).data.url//上传成功后后台会返回一个图片路径把图片路径放到this里面 因为页面没用到所以不用放到this.data里面
            }
          },
          fail: (res) => {
            console.log(res);
          }
        })
      }
    })
  },

  //性别选择
  bindPickerChange: function (e) {
    console.log('当前选择的值为:', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  formSubmit: function (e) {  //提交数据
    var that = this;
    var localPhone = wx.getStorageSync('localPhone');
    var  UserAvatar = wx.getStorageSync('UserAvatar');
    // var myreg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
    // //表单数据
    var objData = e.detail.value;
    //异步方式储存表单数据
    wx.setStorage({ key: 'userName', data: objData.userName })
    wx.setStorage({ key: 'email', data: objData.email })
    wx.setStorage({ key: 'gender', data: objData.gender })
    if (that.data.userName == '') {
      wx.showToast({
        title: '昵称不能为空',
        icon: "none",
        duration: 2000,
        mask: true
      })
    // } else if (that.data.email == '') {
    //   wx.showToast({
    //     title: '邮箱不能为空',
    //     icon: "none",
    //     duration: 2000,
    //     mask: true
    //   })
    // } else if (!myreg.test(that.data.email)) {
    //   wx.showToast({
    //     title: '邮箱格式不正确',
    //     icon: "none",
    //     duration: 2000,
    //     mask: true
    //   })
    }
    else {

      let version = __wxConfig.envVersion;
      let axiosurl;
      switch (version) {
        case "develop": //开发预览版
          axiosurl = "https://1z74t80660.51mypc.cn";
          break;
        case 'trial': //体验版
          axiosurl = "https://1z74t80660.51mypc.cn";
          break;
        // break;
        case 'release': //正式版
          axiosurl = "https://wx.bucuonet.com";
          break;
        default: //未知,默认调用正式版
          axiosurl = "https://wx.bucuonet.com";
          break;
      }
      console.log("<<<<<<<<<<<<<<<",that.data);
      wx.request({
        url: axiosurl + '/bcapi/api/ipad/padManageUserParent/saveUserInfo',
        method: "POST",
        data: {
          localPhone: localPhone,
          gender: that.data.index,
          email: that.data.email,
          headurl:  UserAvatar,
          nickname:that.data.userName
        },
        header:{
          "content-type": "application/x-www-form-urlencoded"
        },
        success:(res)=> {
          console.log("提交的数据",res.data)
            wx.showToast({
              // title: "修改成功",
              title: res.data.actionMessages[0],
              icon: 'none',
              duration: 2000,
              mask: true,
              success: function () {
                setTimeout(function () {
                  wx.navigateBack({
                    delta: 1,
                  })
                }, 2000)
              }
            })
            return false;
        }
      })
    }
  },



  userNameInput: function (e) {
    this.data.userName = e.detail.value
  },
  emailInput: function (e) {
    this.data.email = e.detail.value
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

  },
})