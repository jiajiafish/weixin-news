// pages/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dest : 1523074607642
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("44")

    console.log(options)
    this.getNewsDetail(options.dest);
    setData({
      dest: options.dest,
    })
  },

  /**
   *抓取detail页面的数据
   */
  getNewsDetail(id, callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: id,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        console.log(res.data)
        console.log(res.data.result)
        let result = res.data.result
        this.setData({
          newsDetail: {
            readcount: result['readCount'],
            title: result['title'],
            firstImage: result['firstImage'] ? result['firstImage'] : "/images/750400.jpg",
            source: result['source'] ? result['source'] : "佚名",
            date: result['date'].substring(11, 16)
          },
          newsPara: result.content
        })



      },
      complete: () => {
        callback && callback()
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
  onPullDownRefresh() {
    console.log(this.tagsSelect)
    console.log("############################")
    console.log(dest)

    console.log("############################")
    this.getNewsDetail(this.dest, () => {
      wx.stopPullDownRefresh()
    })
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

  }
})