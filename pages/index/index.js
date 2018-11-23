//index.js
//获取应用实例

Page({
  data: {
    titles: ['国内', '国际', '财经', '娱乐', '军事', '体育', '其他'],
    newsList: [],
    newsHot:{},
  },
  onTapDetail() {
    wx.navigateTo({
      url: '/pages/detail/detail',
    })
  },
  getNewsList(type) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list', //仅为示例，并非真实的接口地址
      data: {
        type: type,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        console.log(res.data)
        console.log(res.data.result)
        let result = res.data.result
        this.setHot(result)
        this.setNewsList(result)


      },
      // complete: () => {
      //   callback && callback()
      // }
    })
  },
  setHot(result){
    let hot = result[0]
    
    console.log(hot)
    this.setData({
      newsHot:hot
    })
  },
  setNewsList() {

  },
  onLoad() {
    this.getNewsList("gn")
  },
  

})