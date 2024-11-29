const { authGate, UserInfo } = require('../../utils/utils.js')
Component({

  properties: {
    title: {
      type: String,
      value: '标题'
    },
    avatarUrl: {
      type: String,
      value: '../../images/my/user-info/avatar.png'
    },
    tempFilePath: {
      type: String,
      value: ''
    }
  },

  data: {
    showModalStatus: false,
  },

  methods: {
    changeRange: function () {
      this.showModal();
    },


    showModal: function () {

      var animation = wx.createAnimation({
        duration: 200,
        timingFunction: "linear",
        delay: 0
      })
      animation.translateY(300).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: true
      })
      setTimeout(function () {
        animation.translateY(0).step()
        this.setData({
          animationData: animation.export()
        })
      }.bind(this), 200)
    },

    hideModal: function () {
      var animation = wx.createAnimation({
        duration: 200,
        timingFunction: "linear",
        delay: 0
      })

      animation.translateY(300).step()
      this.setData({
        animationData: animation.export(),
      })
      setTimeout(function () {
        animation.translateY(0).step()
        this.setData({
          animationData: animation.export(),
          showModalStatus: false
        })
        // this.onSubmit()
        this.triggerEvent('updateAvatar', { avatarUrl: this.data.avatarUrl })
      }.bind(this), 200)
    },
    chooseavatar: function (event) {
      this.setData({ avatarUrl: event.detail.avatarUrl })
    },

    onSubmit(event) {
      // console.log(event.detail.value)
      wx.uploadFile({
        url: authGate.data.ip + '/user/info',
        filePath: this.data.avatarUrl,
        name: 'img',
        header: {
          "Authorization": authGate.GetToken()
        },
        formData: {
          nickname: event.detail.value.nickname,
          // img: this.data.tempFilePath
        },
        success: (res) => {
          console.log(JSON.parse(res.data).data)
          console.log(res.statusCode)
          // if(res.data.code == 200)
          wx.showToast({
            title: '信息上传成功',
            icon: 'success'
          })
          console.log(res)
          UserInfo.data.avatar = JSON.parse(res.data).data
          this.triggerEvent('updataAvatar', { avatarUrl: JSON.parse(res.data).data })
        },
        fail: (res) => {
          wx.showToast({
            title: '信息上传失败',
            icon: 'error'
          })
          console.log(res)
        }
      })
    }
  }
})
