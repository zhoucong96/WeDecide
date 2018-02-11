Page({
  data: {
    shareData: {},
    about: false,
    question: "Ta用了不该用的符号...",
    result: "快让Ta回去把符号去掉"
  },
  onLoad: function (options) {
    this.titleFadeIn();
    this.data.shareData = JSON.parse(options.shareData);
    this.question = this.data.shareData.question;
    this.result = this.data.shareData.result;
    this.setData({
      question: this.question,
      result: this.result,
    }) 
  },
  titleFadeIn: function () {
    var animation = wx.createAnimation({
      duration: 2000,
      transformOrigin: "50% 50%"
    })
    animation.opacity(1).translateY(-30).step()
    this.setData({
      animationData: animation.export()
    })
  },
  onDecideButtonTap: function () {
    wx.reLaunch({
      url: '../index/index'
    })
  },
  onAboutTap: function () {
    wx.navigateTo({
      url: '../about/about'
    })
  }
})