//index.js
//获取应用实例

Page({
 data:{
   titles: ['国内', '国际', '财经', '娱乐', '军事', '体育', '其他']
 },
  onTapDetail() {
    wx.navigateTo({
      url: '/pages/detail/detail',
    })
  },
})
