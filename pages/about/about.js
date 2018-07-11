let utils = require('../../utils/utils')
Page({
  data: {
    email: '8662054@qq.com',
    qq: '8662054',
    swiperHeight: 'auto',
    bannerImgList: [
      'https://ojlf2aayk.qnssl.com/20180711gh_8a6e261661c5_860.jpg', 'https://ojlf2aayk.qnssl.com/20180711timg.jpeg'
    ],
  },
  onLoad() {
    this.initSwiper()
  },
  previewImages(e) {
    let index = e.currentTarget.dataset.index || 0
    let urls = this.data.bannerImgList
    wx.previewImage({
      current: urls[index],
      urls,
      success: function(res) {},
      fail: function(res) {
        console.error('previewImage fail: ', res)
      }
    })
  },
  initSwiper() {
    let that = this
    let systeminfo = getApp().globalData.systeminfo
    if (utils.isEmptyObject(systeminfo)) {
      wx.getSystemInfo({
        success: function(res) {
          that.setSwiperHeight(res)
        },
      })
    } else {
      that.setSwiperHeight(systeminfo)
    }
  },
  setSwiperHeight(res) {
    this.setData({
      swiperHeight: `${(res.windowWidth || res.screenWidth) / 375 * 200}px`
    })
  },
  copy(e) {
    let dataset = (e.target || {}).dataset || {}
    let title = dataset.title || ''
    let content = dataset.content || ''
    wx.setClipboardData({
      data: content,
      success() {
        wx.showToast({
          title: `已复制${title}`,
          duration: 2000,
        })
      },
    })
  },
})
