var utils_city = require('../../utils/city.js');
var history_array=[];
Page({
  data: {
    searchLetter: [],
    showLetter: "",
    winHeight: 0,
    //个人理解的这个是顶部的高度，top
    tHeight: 0,
    // 这个是底部的高度bottom
    bHeight: 0,
    startPageY: 0,
    cityList: [],
    isShowLetter: false,
    scrollTop: 0,
    city: "",
    winWidth:0,
    searchHeight:0,
  },
  inputChange:function(e){
    console.log('inputChange=====:'+ e);
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载  
    var searchLetter = utils_city.searchLetter;
    var cityList = utils_city.cityList();
    // console.log('cityInfo'+cityInfo);
    // 先给热点模拟数据
    var hot  = [{
    "city" : "阿克苏地区",
    "code" : "652900",
    "id" : "335",
    "initial" : "热门",
    "provincecode" : "650000"
  },{
    "city" : "北京市",
    "code" : "110100",
    "id" : "1",
    "initial" : "热门",
    "provincecode" : "110000"
  },{
    "city" : "成都市",
    "code" : "510100",
    "id" : "238",
    "initial" : "热门",
    "provincecode" : "510000"
  },{
    "city" : "杭州市",
    "code" : "330100",
    "id" : "87",
    "initial" : "热门",
    "provincecode" : "330000"
  }];
  utils_city.updateHot(hot);
    // 获取屏幕的高度
    var sysInfo = wx.getSystemInfoSync();
    console.log(sysInfo);
    var winHeight = sysInfo.windowHeight;
    var winWidth = sysInfo.windowWidth;
    //添加要匹配的字母范围值
    //1、更加屏幕高度设置子元素的高度
     // 先将rpx 转换为 px
    var searchH = Math.floor(108*(winWidth/750))
    var itemH = (winHeight-searchH) / searchLetter.length;
    var tempObj = [];
    for (var i = 0; i < searchLetter.length; i++) {
      var temp = {};
      temp.name = searchLetter[i];
      temp.tHeight = i * itemH + searchH;
      temp.bHeight = (i + 1) * itemH + searchH;

      tempObj.push(temp)
    }
   
    this.setData({
      winHeight: winHeight,
      itemH: itemH,
      searchLetter: tempObj,
      cityList: cityList,
      winWidth : winWidth,
      searchHeight:searchH,
    })
  },
  // 开始点击
  searchStart: function (e) {
    // console.log(e)
    var showLetter = e.currentTarget.dataset.letter;
    var pageY = e.touches[0].pageY;
    this.setScrollTop(this, showLetter);
    this.nowLetter(pageY, this);
    this.setData({
      showLetter: showLetter,
      startPageY: pageY,
      isShowLetter: true,
    })
  },
  // 点击并开始移动
  searchMove: function (e) {
    var pageY = e.touches[0].pageY;
    var startPageY = this.data.startPageY;
    var tHeight = this.data.tHeight;
    var bHeight = this.data.bHeight;
    var showLetter = 0;
    // console.log('pagey--'+pageY);
    // console.log('tHeight--'+tHeight);
    // console.log('bHeight--'+bHeight);

    if (startPageY - pageY > 0) { //向上移动
      if (pageY < tHeight) { //小于起点位置
        this.nowLetter(pageY, this);
      }
    } else {//向下移动
      if (pageY > bHeight) { // 大于终点位置
        this.nowLetter(pageY, this);
      }
    }
  },
  // 移动结束
  searchEnd: function (e) { 
    var that = this;
    setTimeout(function () {
      that.setData({
        isShowLetter: false
      })
    }, 800)

  },
  nowLetter: function (pageY, that) {//当前选中的信息
    var letterData = this.data.searchLetter;
    var bHeight = 0;
    var tHeight = 0;
    var showLetter = "";
    for (var i = 0; i < letterData.length; i++) {
      if (letterData[i].tHeight <= pageY && pageY <= letterData[i].bHeight) {
        bHeight = letterData[i].bHeight;
        tHeight = letterData[i].tHeight;
        showLetter = letterData[i].name;
        break;
      }
    }

    this.setScrollTop(that, showLetter);

    that.setData({
      bHeight: bHeight,
      tHeight: tHeight,   // 这两个注释掉后测试索引上滑会失效
      showLetter: showLetter,
      startPageY: pageY
    })
  },
  bindScroll: function (e) {
    // console.log(e.detail)
  },
  setScrollTop: function (that, showLetter) {
    var scrollTop = 0;
    var cityList = that.data.cityList;
    var cityCount = 0;
    var initialCount = 0;

    //TODO: 自己后加的,行数
    var  count = 0;
    // 先将rpx 转换为 px
    // var rH = 78*0.42;
    // var letterH = 64*0.42;
    // var marginH =20*0.42; 
    var rH = 78*(this.data.winWidth/750);
    var letterH = 64*(this.data.winWidth/750);
    var marginH =20*(this.data.winWidth/750);


    // scrollTop = rH +letterH+marginH;
    for (var i = 0; i < cityList.length; i++) {
      if (showLetter == cityList[i].initial) {

        scrollTop = initialCount * (letterH + marginH) + cityCount * rH ;
        break;
      } else {
        initialCount++;
        if(cityList[i].cityInfo.length % 4 === 0){
          count = cityList[i].cityInfo.length / 4
        }else{
          count = (Math.floor(cityList[i].cityInfo.length / 4))+ 1;
        }
        
        cityCount += count
      }
    }
    //     console.log(count)
    //     console.log('scrollTop'+ scrollTop)

    that.setData({
      scrollTop: scrollTop
    })
  },
  bindCity: function (e) {
    console.log(e)
    var city = e.currentTarget.dataset.city;
    var selected = {"city":city,"initial":"当前"};
    utils_city.updateCurrent(selected);
    var city_item = {};
    city_item.city = city;
    city_item.id = e.currentTarget.dataset.id;
    city_item.initial = "历史";
    if(history_array.length>0){
        var result = this.isHave(history_array,city);
        if(result == -1){
            history_array.push(city_item);
        }
    }else
    {
      history_array.push(city_item);
    }
    utils_city.updateHistory(history_array);
    this.setData({ 
      city: city,
      cityList : utils_city.cityList()
    })

    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
      success: function(res){
        
      },
      fail: function() {
        
      },
      complete: function() {
        
      }
    })
  },
  
  onUnload: function () {
    // 生命周期函数--监听页面卸载
    console.log('城市列表页面关闭')
    
  },

// 判断当前点击的城市是否已经存在历史数组里
 isHave:function (arr,key){
   var result = 0;
   if(arr.length>0)
   {
     for(var i =0;i<arr.length;i++){
       if(key == arr[i].city){
         result = 1;
         break;
       }else
       {
         result = -1;
         continue;
       }
     }
   }
   return result;
 },

// 系统函数
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成

  },
  onShow: function () {
    // 生命周期函数--监听页面显示

  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏

  },

  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作

  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数

  },
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  },
})

