const app = getApp()

// pages/home/home.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    latitude:0,
    longitude: 0,
    targetAddr:'湘阴港村',
    key:"Z4TBZ-HYJL3-T7C3L-3TS4N-UD56H-I3BYR",
    swiperObj:[
      {src:"../../imges/swperTest/pig.jpg",alt:"鲜猪肉"},
      {src:"../../imges/swperTest/hazi.jpg", alt:"基围虾"},
      {src:"../../imges/swperTest/jier.jpg",alt:"鲜鸡肉"},
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onReady:function () {
    this.getLocation(this)
  },

  getLocation:(vm)=>{
    let that = vm
    wx.getLocation({
      success(res){
        console.log(res)
        that.setData({
          latitude:res.latitude,
          longitude:res.longitude
        })
        //全局坐标
        app.globalData.locPoint.latitude = that.data.latitude
        app.globalData.locPoint.longitude = that.data.longitude

        let location = that.data.latitude+','+that.data.longitude
        that.getAddr(that,location,that.data.key)
      }
    })
  },
  getAddr:(vm,location,key) =>{
    let that = vm
    wx.request({
      url: 'https://apis.map.qq.com/ws/geocoder/v1/?',
      data:{
        location:location,
        key:key,
        get_poi:1
      },
      success:(res) =>{
        that.setData({
          targetAddr:res.data.result.address
        })
        app.globalData.location = that.data.targetAddr
      },
      fail:(e)=>{
        console.log(e)
      }
    }
)
  },
  mapUp: function () {
    let that = this
    wx.chooseLocation({
      latitude: that.data.latitude,
      longitude: that.data.longitude,
      success: (res) =>{
          that.setData({
            targetAddr:res.name,
            latitude:res.latitude,
            longitude:res.longitude
          })
        app.globalData.latitude = that.data.latitude
        app.globalData.longitude = that.data.longitude
      },
      fail: (res)=>{
        if (res.errMsg =="chooseLocation:fail auth deny"){
          wx.showModal({
            title: '提示',
            content: '需要允许使用位置信息啊啊啊啊',
            success (res) {
            if (res.confirm) {
              wx.openSetting({
                withSubscriptions: true,
              })
            }else if (res.cancel) {
              console.log('用户点击取消')
              }
            }
          })
        }
      }
    })
  },
  searchPage:function(){
    wx.navigateTo({
      url: '../search/search'
    })
  }


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
 

  /**
   * 生命周期函数--监听页面显示
   */
  

  /**
   * 生命周期函数--监听页面隐藏
   */
  

  /**
   * 生命周期函数--监听页面卸载
   */


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
 

  /**
   * 页面上拉触底事件的处理函数
   */
 

  /**
   * 用户点击右上角分享
   */
 
})