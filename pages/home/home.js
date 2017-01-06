// pages/home/home.js
Page({
  data:{
    city:''
  },
  citySelected:function (){
    wx.navigateTo({
      url: '../switchcity/switchcity',
      success: function(res){
        console.log('pushSuccess==='+res)
      },
      fail: function() {
        console.log('pushFail==')
      },
      complete: function() {
        
      }
    })
  },
  destination:function(){
    wx.navigateTo({
      url: '../destination/destination',
      success: function(res){
        
      },
      fail: function() {
        
      },
      complete: function() {
        
      }
    })
  },
  onLoad:function(options){
    console.log(options)
    this.setData({
      city:options.city
    });
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})