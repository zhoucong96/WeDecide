//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    animationData1: {},
    animationData2: {},
    buttonGone: false,
    confirm: '进入',
    greeting1: '花更少的时间做决定',
    greeting2: '花更多的时间陪身边的人',
    motto: 'Let\'s decide it!',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    src: '../../resources/pictures/linebreak.png'
  },
  //事件处理函数
  /*bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },*/
  onLoad: function () {
    this.backgroundFadeIn();
    this.titleFadeIn();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.initialAnimation()
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    this.initialAnimation()
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  greetingTranslate: function () {
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })
    animation.translateY(-500).step()
    this.setData({
      animationData1: animation.export()
    })
  },
  confirmButtonTranslate: function () {
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })
    animation.translateY(500).step()
    this.setData({
      animationData2: animation.export()
    })
  },
  titleFadeIn: function () {
    var animation = wx.createAnimation({
      duration: 2000,
      timingFunction: 'ease',
    })
    animation.opacity(1).translateY(-30).step()
    this.setData({
      animationData: animation.export()
    })
  },
  backgroundFadeIn: function () {
    var animation = wx.createAnimation({
      duration: 1500,
      timingFunction: 'ease',
    })
    animation.opacity(1).step()
    this.setData({
      animationBackground: animation.export()
    })
  },
  initialAnimation: function () {
    this.confirmButtonTranslate()
    this.greetingTranslate()
    setTimeout(function (){
      wx.redirectTo({
        url: '../userWelcome/userWelcome'
      })
    }, 1000);
  }
})
