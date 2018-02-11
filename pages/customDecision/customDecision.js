//util library
const util = require('../../utils/util.js')

Page({
  data: {
    question: '你要解决什么问题？',
    optionMessage: '请列出你的选项',
    questionVariable: '',
    deleteEnabled: false,
    addEnabled: true,
    optionCount: 2,
    isQuestionEmpty: true,
    isOptionEmpty: true,
  },
  onLoad: function () {
    this.options = new Array(5);
    for(var i = 0; i < this.options.length; i++){
      this.options[i] = undefined;
    }
    this.optionCount = 2;
    this.useNoise = false;
    this.questionVariable = undefined;
  },
  onAddTap: function(){
    //js scope and view scope binding
    this.optionCount++;
    this.deleteEnabled = true;
    this.setData({
      optionCount: this.optionCount,
      deleteEnabled: this.deleteEnabled
    })
    if (this.optionCount === 5){
      this.addEnabled = false;
      this.setData({
        addEnabled: this.addEnabled
      })
    }
    this.checkOptionEmpty();
    this.titleFadeIn();
  },
  onDeleteTap: function(){
    this.optionCount--;
    this.addEnabled = true;
    this.setData({
      optionCount: this.optionCount,
      addEnabled: this.addEnabled
    })
    this.options[this.optionCount] = undefined;
    if (this.optionCount === 2){
      this.deleteEnabled = false;
      this.setData({
        deleteEnabled: this.deleteEnabled
      })
    }
    this.checkOptionEmpty();
  },
  bindQuestionInput: function(e){
    this.questionVariable = e.detail.value == '' ? undefined : e.detail.value;;
    this.setData({
      questionVariable: e.detail.value
    });
    this.checkQuestionEmpty(this.questionVariable);
  },
  onNoiseRandSwitched: function(e){
    this.useNoise = e.detail.value;
    console.log("Use Noise? "+this.useNoise);
  },
  bindOption0Input: function(e){
    this.options[0] = e.detail.value == '' ? undefined : e.detail.value;
    this.checkOptionEmpty();
  },
  bindOption1Input: function (e) {
    this.options[1] = e.detail.value == '' ? undefined : e.detail.value;
    this.checkOptionEmpty();
  },
  bindOption2Input: function (e) {
    this.options[2] = e.detail.value == '' ? undefined : e.detail.value;
    this.checkOptionEmpty();
  },
  bindOption3Input: function (e) {
    this.options[3] = e.detail.value == '' ? undefined : e.detail.value;
    this.checkOptionEmpty();
  },
  bindOption4Input: function (e) {
    this.options[4] = e.detail.value == '' ? undefined : e.detail.value;
    this.checkOptionEmpty();
  },
  checkQuestionEmpty: function (question) {
    if (question === undefined) {
      this.setData({
        isQuestionEmpty: true
      })
    }
    else{
      this.setData({
        isQuestionEmpty: false
      })
    }
  },
  checkOptionEmpty: function(){
    if (this.containEmpty()){
      this.setData({
        isOptionEmpty: true
      })
    }
    else{
      this.setData({
        isOptionEmpty: false
      })
    }
  },
  //to be replaced by underscore.js
  containEmpty: function(){
    for(var i = 0; i < this.optionCount; i++){
      if (this.options[i] === undefined){
        return true;
      }
    }
    return false;
  },
  onDecideTap: function () {
    //for testing purpose
    console.log("question is " + this.questionVariable);
    console.log(this.options);
    this.randomResult = this.options[util.getPesudoRand(this.optionCount - 1)];
    //simple test of random data
    this.setData({
      randomResult: this.randomResult
    })

    //gloabal variable for data transmission between pages
    getApp().globalData.questionVariable = this.questionVariable;
    getApp().globalData.randomResult = this.randomResult;
    getApp().globalData.customOptions = this.options;
    getApp().globalData.customOptionsCount = this.optionCount;

    wx.navigateTo({
      url: '../decisionResult/decisionResult'
    })
  },
  onClearTap: function () {
    this.optionCount = 2;
    for(var i = 0; i < this.options.length;i++){
      this.options[i] = undefined;
    }
    this.setData({
      randomResult: 0,
      optionCount: 2,
      deleteEnabled: false,
      addEnabled: true,
      isOptionEmpty: true,
      value0: '',
      value1: ''
    })
  },
  titleFadeIn: function () {
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease'
    })

    animation.opacity(1).step()

    this.setData({
      animationData: animation.export()
    })
    //reset animation
    this.setData({
      animationData: null
    })
  }
})