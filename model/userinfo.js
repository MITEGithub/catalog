const { Store } = require('../../utils/utils.js')

class UserInfo {
    constructor() {
        this.avatar = ''
        this.nick = ''
        this.followers = 0
        this.photos = 0
        this.upvokes = 0
    }

    init(avatar, nick, followers, photos, upvokes) {
        this.avatar = avatar
        this.nick = nick
        this.followers = followers
        this.photos = photos
        this.upvokes = upvokes
    }

    tojson() {
        return {
            avatar: this.avatar,
            nick: this.nick,
            followers: this.followers,
            photos: this.photos,
            upvokes: this.upvokes
        }
    }

    GetUserInfo() {
        bool = false
        Store.wxGetStorage("UserInfo").then((res) => {
            if (res != null) {
                this.init(res['avatar'], res['nick'], res['followers'], res['photos'], res['upvokes'])
                bool = true
            }
        })
        if (!bool) {
            wx.request({
                url: Store.data.ip + "/user/info",
                method: "POST",
                data: {
                    token: Store.GetToken()
                },
                success: (res) => {
                    this.init(res['avatar'], res['nick'], res['followers'], res['photos'], res['upvokes'])
                    Store.wxSetStorage("UserInfo", res)
                },
                fail: (res) => {
                    console.log("request 失败:")
                    console.log(res)
                }
            })
        }
    }
}
