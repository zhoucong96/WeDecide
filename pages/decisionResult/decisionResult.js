//util library
const util = require('../../utils/util.js')

Page({
  data: {
    shareData: undefined,
    inTest: false
  },
  onLoad: function () {
    this.titleFadeIn();
    this.againCount = 0;
    this.question = getApp().globalData.questionVariable;
    this.result = getApp().globalData.randomResult;
    this.customOptions = getApp().globalData.customOptions;
    this.customOptionsCount = getApp().globalData.customOptionsCount;
    this.setData({
      question: this.question,
      result: this.result,
      shareData: { question: this.question, result: this.result }
    }) 
  },
  titleFadeIn: function () {
    var animation = wx.createAnimation({
      duration: 2000,
      timingFunction: 'ease'
    })
    animation.opacity(1).translateY(-40).step()
    this.setData({
      animation: animation.export()
    })
  },
  resultFadeIn: function () {
    var animation = wx.createAnimation({
      duration: 250,
      timingFunction: 'ease'
    })
    animation.opacity(0).step()
    animation.opacity(1).step()
    this.setData({
      animationData: animation.export()
    })
  },
  remindFadeIn: function () {
    var animation = wx.createAnimation({
      duration: 2000,
      timingFunction: 'ease'
    })
    animation.opacity(1).step()
    this.setData({
      animationRemind: animation.export()
    })
  },
  onShareAppMessage: function () {
    return {
      title: 'WeDecide',
      desc: '我刚刚做了个决定！快来看看吧',
      path: '/pages/sharePage/sharePage?shareData=' + JSON.stringify(this.data.shareData),
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  onAgainTap: function () {
    this.resultFadeIn();
    this.result = this.customOptions[util.getPesudoRand(this.customOptionsCount - 1)];
    this.againCount++;
    if (this.againCount >= 3) {
      this.remindFadeIn();
    }
    this.setData({
      againCount: this.againCount,
      result: this.result,
      shareData: { question: this.question, result: this.result }
    }) 
  },
  onTestTap: function () {
    wx.navigateTo({
      url: '/pages/sharePage/sharePage?shareData=' + JSON.stringify(this.data.shareData)
    })
  }
})