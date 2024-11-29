Page({
    data: {
        msg_id: 0,
        content: "这是一条消息",
        upload_time: "2020-05-01 12:00:00",
        is_read: false
    },
    onLoad(options) {
        this.setData({
            msg_id: options.msg_id
        })
    },
    onUnload(options) {
        console.log("HHHHHHH")
        this.onReadCard()
    },
    onReadCard() {
        wx.request({
            url: authGate.data.ip + "/user/read_msg",
            method: "PUT",
            header: {
                "Authorization": authGate.GetToken()
            },
            data: {
                msg_id: this.data.msg_id
            },
            success: res => {
                console.log(res)
            },
            fail: res => {
                console.log("request failed:")
                console.log(res)
            }
        })
    },
})