// pages/inspect/index.js
import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgPath:"",
    isOnline: 1,//设备是否在线，0不在线，1在线，默认不在线
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })    
    var that = this;
    // let oper_mac= wx.getStorageSync('oper_mac')
    // console.log("oper_mac：", oper_mac);
    let stu = wx.getStorageSync('oper_student')
    console.log('switch1Change:stu::',stu)
    stu = JSON.parse(stu)
    //修改截屏开启状态
    wx.request({
      url: 'https://pswanmor.edu505.com/api/deviceConfig/updateScreenStatus?mac='+stu.mac,
      method: "POST",
      data: {
        mac: stu.mac,
        screenStatus: 1
      },
      success: (res) => {
        console.log("修改截屏开启状态", res.data)

        let loop_time=0
        let updateStatus_time=res.data.data        
        this.queryByMac_loop(loop_time, updateStatus_time);


      }
    })

  },
  
  
  queryByMac_loop: function (loop_time, updateStatus_time) {
	    console.log("updateStatus_time;", updateStatus_time);
	    console.log("loop_time;", loop_time);
      let mac = '20:75:55:39:01:65'
      // let oper_mac= wx.getStorageSync('oper_mac')
      let stu = wx.getStorageSync('oper_student')
      console.log('stu::',stu)
      stu = JSON.parse(stu)
          //根据mac查询截屏
          wx.request({
            url:  "https://pswanmor.edu505.com/api/deviceScreen/queryByMac?mac=" + stu.mac,
            method: "GET",
            success: (result) => {          
	        // request({ url: "/deviceScreen/queryByMac?mac=" + stu.mac })
	        // .then(result => {
            console.log("result.statusCode:", result.statusCode);
            console.log("根据mac查询截屏", result.data);
            if(result.statusCode==503){
              this.setData({
                isOnline: 0
              })
              wx.hideLoading()
            }
	          // if('2020-11-03 12:47:47' > '2020-11-02 18:03:03'){
	          if(result.data.data.createDate >= updateStatus_time){
	            console.log(">>>>>>>>", result.data);
	            this.setData({
                isOnline: 1,
	              imgPath: result.data.data.imgPath,
              })
              wx.hideLoading()
	        } else {
	          loop_time = loop_time+1
	          //开始轮询查看屏幕接口
	          if(loop_time<10){
	            setTimeout(()=>(this.queryByMac_loop(loop_time, updateStatus_time), 3000));
	          }else{
              this.setData({
                isOnline: 0
              })
              wx.hideLoading()
            }
	        }
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

  },
  /**   
     * 预览图片  
     */
  // previewImage: function (e) {
  //   console.log(e);
  //   var current = e.target.dataset.src;
  //   wx.previewImage({
  //     current: "https://pswanmor.edu505.com", // 当前显示图片的http链接  
  //     urls: this.data.imgPath // 需要预览的图片http链接列表  
  //   })
  // } ,   
})