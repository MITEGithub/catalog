const { authGate } = require("../../utils/utils");
Page({
    data: {
        unread_num: 2,
        msgs: [{
            "text": "适已成装干学。志情从位。万后千务价安清动再并。\n运却万定方线节族数。商近正提难按常做。段力听维界意流位。\n包油中。书手电圆。二么选。",
            "message_id": 40,
            "mgs_time": "2024-05-31 16:17:11",
            "isread": false
        },
        {
            "text": "适已成装干学。志情从位。万后千务价安清动再并。\n运却万定方线节族数。商近正提难按常做。段力听维界意流位。\n包油中。书手电圆。二么选。",
            "message_id": 40,
            "mgs_time": "2024-05-31 16:17:11",
            "isread": false
        },
        ],
        msgs_list: []
    },

    onLoad(options) {
        onUserNotice()
    },

    // 点击删除消息
    clickDel(e) {
        console.log(e.currentTarget.dataset.index);
        let index = e.currentTarget.dataset.index;
        let arr = this.data.msgs;
        arr.splice(index, 1);
        this.setData({
            msgs: arr
        })
        wx.request({
            url: authGate.data.ip + "/user/delete_msg",
            method: "DELETE",
            header: {
                "Authorization": authGate.GetToken()
            },
            data: {
                msg_id: index
            },
            success(res) {
                console.log(res)
                wx.showToast({
                    title: '删除成功',
                    icon: 'success',
                    duration: 2000
                })
            },
            fail(res) {
                console.log("request failed:")
                console.log(res)
            }
        })

    },
    onUserNotice() {
        wx.request({
            url: authGate.data.ip + "/user/notice",
            method: "GET",
            header: {
                "Authorization": authGate.GetToken()
            },
            success: res => {
                console.log(res.data);
                console.log(res.data.length);
                count = 0
                const messages = res.data.data.msgs
                for (var message in messages) {
                    if (message['isread'] == false) {
                        count++
                    }
                }
                console.log(count)
                this.setData({
                    msgs: messages,
                    unread_num: count
                })
            },
            fail: res => {
                console.log("request failed:")
                console.log(res)
            }
        })
    },
    onReadAllMsg() {
        const msgslist = msgs.map(message => message.msg_id)
        wx.request({
            url: authGate.data.ip + "/user/read_all_msg",
            method: "PUT",
            header: {
                "Authorization": authGate.GetToken()
            },
            data: {
                msg_ids: msgslist
            },
            success(res) {
                console.log(res)
                wx.showToast({
                    title: '已读所有消息',
                    icon: 'success',
                    duration: 2000
                })
            },
            fail(res) {
                console.log("request failed:")
                console.log(res)
            }
        })
    },
})