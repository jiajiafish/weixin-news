//index.js
//获取应用实例
const tagMap = ['gn', 'gj', 'cj', 'yl', 'js', 'ty', 'other']


Page({
  data: {
    titles: ['国内', '国际', '财经', '娱乐', '军事', '体育', '其他'],
    newsHot: {},
    tagsSelect: 0,

  },

  onTapDetail: function(event) {
    console.log(event.currentTarget.dataset.dest)
    let dest = event.currentTarget.dataset.dest
    wx.navigateTo({
      url: '/pages/detail/detail?dest=' + dest,
    })
  },


  getNewsList(type,callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
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
      complete: () => {
        callback && callback()
      },
      fail:()=>{
        console.log("获取数据失败")
      }
    })
  },
  setHot(result) {
    let hot = result[0]

    console.log(hot)
    this.setData({
      newsHot: {
        id: hot['id'],
        title: hot['title'],
        firstImage: hot['firstImage'] ? hot['firstImage'] : "/images/750400.jpg",
        source: hot['source'] ? hot['source'] : "佚名",
        date: hot['date'].substring(2, 10) + "/" +hot['date'].substring(11, 16)
      }
    })
  },
  selectTag: function(event) {
    console.log(event.currentTarget.dataset.index)
    let index = event.currentTarget.dataset.index
    this.getNewsList(tagMap[index])
    this.setData({
      tagsSelect: index,
    })
  },
  setNewsList(result) {
    result.shift()

    let newsList = []
    // 将数组中的值一一的进行修改满足案例要求
    for (let i = 0; i < result.length; i++) {
      newsList.push({
        id: result[i]['id'],
        title: result[i]['title'],
        firstImage: result[i]['firstImage'] ? result[i]['firstImage'] : "/images/750400.jpg",
        source: result[i]['source'] ? result[i]['source'] : "佚名",
        date: result[i]['date'].substring(2, 10) + "/" +result[i]['date'].substring(11, 16)
      })
    }
    console.log(newsList)
    this.setData({
      newsList: newsList
    })
  },
  onLoad() {
    this.getNewsList("gn")
  },
  onPullDownRefresh() {
    console.log(this.tagsSelect)
    this.getNewsList(tagMap[this.data.tagsSelect],() => {
      wx.stopPullDownRefresh()
    })
  },


})