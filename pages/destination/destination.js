// pages/destination/destination.js
var tempArr = [];
Page({
  data:{
      winHeight: 0,
      winWidth:0,
      searchHeight:0,
      margin:0,
      currentIndex:0, 
      citys:[],
      history:[],
      destinations:[
                  {"destination":"热门",
                  "id":"0"},
                  {"destination":"国内",
                  "id":"1"},
                  {"destination":"东南亚",
                  "id":"2" },
                  {"destination":"日韩",
                  "id":"3" },
                  {"destination":"海岛",
                  "id":"4" },
                  {"destination":"港澳台",
                  "id":"5" },
                  {"destination":"欧洲",
                  "id":"6" },
                  {"destination":"美洲",
                  "id":"7" },
                  {"destination":"澳洲",
                  "id":"8" },
                  {"destination":"中东非",
                  "id":"8" },
                   {"destination":"热门",
                  "id":"1" },
                  {"destination":"热门",
                  "id":"0"},
                  {"destination":"国内",
                  "id":"1"},
                  {"destination":"东南亚",
                  "id":"2" },
                  {"destination":"日韩",
                  "id":"3" },
                  {"destination":"海岛",
                  "id":"4" },
                  {"destination":"港澳台",
                  "id":"5" },
                  {"destination":"欧洲",
                  "id":"6" },
                  {"destination":"美洲",
                  "id":"7" },
                  {"destination":"澳洲",
                  "id":"8" },
                  {"destination":"中东非",
                  "id":"8" }
                  ],

        cityList:[
          [{"initial":"热门国际","items":["纽约","加拿大","泰国","韩国","日本","迪拜"]},{"initial":"热门国内","items":["北京","三亚","香港"]},{"initial":"热门国内","items":["北京","三亚","香港"]},{"initial":"热门国内","items":["北京","三亚","香港"]},{"initial":"热门国内","items":["北京","三亚","香港"]},{"initial":"热门国内","items":["北京","三亚","香港"]},{"initial":"热门国际","items":["纽约","加拿大","泰国","韩国","日本","迪拜"]},{"initial":"热门国际","items":["纽约","加拿大","泰国","韩国","日本","迪拜"]},{"initial":"热门国际","items":["纽约","加拿大","泰国","韩国","日本","迪拜"]},{"initial":"热门国际","items":["纽约","加拿大","泰国","韩国","日本","迪拜"]}],
    [{"initial":"","items":["北京","三亚","香港"]}],
     [{"initial":"","items":["泰国","新加坡","吉隆坡"]}],
     [{"initial":"","items":["韩国","日本","东京"]}],
     [{"initial":"","items":["济州岛","海盗","塞班"]}],     [{"initial":"","items":["澳门","台北","香港"]}],
        ]
  },
  // 点击事件
  switchTab:function(e){
    console.log(e);
    var id = e.currentTarget.dataset.id;

    // 造假数据，右侧的
    console.log(typeof id);
    var citys = this.data.cityList[id];
    this.setData({
      currentIndex:id,
      citys:citys
    });
  },
  cityClick:function(e){
    tempArr.splice(0,0,e.currentTarget.dataset.city);
    this.setData({
      history:this.historyUnique(tempArr),
    });
  },
  // 历史记录去重
  historyUnique:function(arr){
    var newArr = [];
    for(var i in arr){
      if(newArr.indexOf(arr[i])==-1){
        newArr.push(arr[i]);
      }
    }
    return newArr;
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
     // 获取屏幕的高度
    var sysInfo = wx.getSystemInfoSync();
    var winHeight = sysInfo.windowHeight;
    var winWidth = sysInfo.windowWidth;
     // 先将rpx 转换为 px
    var searchH = Math.floor(164*(winWidth/750));
    var margin = Math.floor(20*(winWidth/750));
      // 造假数据，右侧的
    var citys = this.data.cityList[this.data.currentIndex];
    this.setData({
      winHeight:winHeight,
      winWidth:winWidth,
      searchHeight:searchH,
      margin:margin,
      citys:citys
    });
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
