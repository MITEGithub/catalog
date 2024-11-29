const { authGate, formatTime } = require("../../utils/utils");

Page({

  data: {
    multiArray: [['教学区', '生活区'], ['西三教学楼', '西二教学楼', '西一教学楼', '中楼', '东三教学楼'], ['一楼', '二楼', '三楼']],
    multiIndex: [0, 0, 0],
    img_src: "",
    name: "",
    intro: ""
  },



  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },

  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['西三教学楼', '西二教学楼', '西一教学楼', '中楼', '东三教学楼'];
            data.multiArray[2] = ['一楼', '二楼', '三楼'];
            break;
          case 1:
            data.multiArray[1] = ['一区', '二区', '三区'];
            data.multiArray[2] = ['宿舍楼', '食堂'];
            break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
      case 1:
        switch (data.multiIndex[0]) {
          case 0:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['一楼', '二楼', '三楼'];
                break;
              case 1:
                data.multiArray[2] = ['一楼', '二楼', '三楼'];
                break;
              case 2:
                data.multiArray[2] = ['一楼', '二楼', '三楼'];
                break;
              case 3:
                data.multiArray[2] = ['一楼', '二楼', '三楼'];
                break;
              case 4:
                data.multiArray[2] = ['一楼', '二楼', '三楼'];
                break;
            }
            break;
          case 1:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['宿舍楼', '食堂'];
                break;
              case 1:
                data.multiArray[2] = ['宿舍楼', '食堂'];
                break;
              case 2:
                data.multiArray[2] = ['宿舍楼', '食堂'];
                break;
            }
            break;
        }
        data.multiIndex[2] = 0;
        console.log(data.multiIndex);
        break;
    }
    this.setData(data);
  },
  onUploadCardImg() {
    wx.chooseImage({
      success: (res) => {
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        this.setData({
          img_src: tempFilePaths[0]
        })
        return tempFilePaths[0];
      }
    })
  },
  onIntro(res) {
    this.setData({
      intro: res.detail.value
    })
    // console.log(this.data.intro)
  },
  onName(res) {
    this.setData({
      name: res.detail.value
    })
    // console.log(this.data.name)
  },
  onSubmitCard() {
    // onIntro();
    // onName();
    // onUploadCardImg();
    let location = this.onGetLocation();
    let time = formatTime(new Date());
    console.log("intro is \n" + this.data.intro)
    console.log("name is \n" + this.data.name)
    console.log("location\n" + location)
    console.log("time\n" + time)
    console.log("img\n" + this.data.img_src)
    console.log("token\n" + authGate.GetToken())

    let longitude = 41.1
    let latitude = 41.1

    wx.uploadFile({
      url: authGate.data.ip + "/user/card",
      filePath: this.data.img_src,
      name: "img",
      header: {
        "Authorization": authGate.GetToken()
      },
      formData: {
        intro: this.data.intro,
        name: this.data.name,
        location: location,
        longitude: longitude,
        latitude: latitude,
        // upload_time: time

      },
      success: (res) => {
        console.log(res)
        wx.showToast({
          title: '上传成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: (res) => {
        console.log("request failed:")
        console.log(res)
      }
    })
  },
  onGetLocation() {
    let Index = this.data.multiIndex;
    let mlArray = this.data.multiArray[0][Index[0]] + " " + this.data.multiArray[1][Index[1]] + " " + this.data.multiArray[2][Index[2]];
    console.log(mlArray);
    return mlArray;
  }
})