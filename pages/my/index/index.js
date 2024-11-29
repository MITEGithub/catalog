const { authGate, UserInfo } = require("../../../utils/utils.js");
Page({
  data: {
    avatarUrl: '',
    cards: [],
    followers: 0,
    photos: 0,
    upvokeds: 0,
    nickname: ""
  },
  changeRange() {
    this.popup.changeRange();
    // this.setData({
    //   avatarUrl: UserInfo
    // })
  },
  async onLoad(options) {
    // await this.Login()
    this.onMyCard()
  },
  onUnload() { },
  onReady: function () {
    this.popup = this.selectComponent("#popup");
  },

  onShareAppMessage() {
    console.log("hh")
    return {
      title: "我是你爹"
    }
  },
  onMyCard() {
    console.log("sb a")
    const token = authGate.GetToken()
    console.log("666\n" + token)
    wx.request({
      url: authGate.data.ip + "/user/info",
      method: "GET",
      header: {
        "Authorization": token
      },
      success: (res) => {

        this.setData({
          avatarUrl: res.data.data.img_url,
          nickname: res.data.data.nickname
        })

        if (this.data.avatarUrl == null) {
          this.setData({
            avatarUrl: '/images/my/user-info/avatar.png'
          })
        }
        if (this.data.nickname == null) {
          this.setData({
            nickname: "MITE"
          })
        }

      },
      fail: (res) => {
        console.log("request failed:")
        console.log(res)
      }
    })
  },
  updataAvatar(event) {
    console.log("updataAvatar")
    this.setData({
      avatarUrl: event.detail.avatarUrl
    })
  }
})