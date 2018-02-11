Page({
  data: {
    QRsrc: '../../resources/pictures/QRcode.jpeg',
    animationData: {},
    animationBackground: {}
  },
  onLoad: function () {
    this.backgroundFadeIn();
    this.titleFadeIn();
  },
  titleFadeIn: function () {
    var animation = wx.createAnimation({
      duration: 2000,
    })
    animation.opacity(1).translateY(-40).step()
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
})