import { Store, authGate } from '../../utils/utils.js'

Page({
    "data": {
        style1: "selected",
        style2: "",
        style3: "",
        rank_show: "",
        showing: "cards",// totalrank,dailyrank,time,recent,search
        new_msg: true,
        index: 0,
        rank: ["总点赞量", "单日点赞量"],
        follow: ["最近更新", "关注时间"],
        show_H: false,
        search_history: ["sb"],
        cards: [{
            img_url: "/img/cat.jpg",
            name: "橘猫",
            location: "不在福州大学",
            intro: "已绝育，未领养，性格温和，白天喜欢睡觉",
            like_num: 143223
        }],
        totalrank: [],
        dailyrank: [],
        time: [{
            img_url: "/img/cat.jpg",
            name: "橘猫",
            location: "不在福州大学",
            intro: "已绝育，未领养，性格温和，白天喜欢睡觉",
            like_num: 143223
        }],
        recent: [{
            img_url: "/img/cat2.jpg",
            name: "小白",
            location: "不在福州大学",
            intro: "已绝育，未领养，性格温和，白天喜欢睡觉",
            like_num: 143223
        }],
        search_result: [
            // {
            //     img_src: "/img/cat.jpg",
            //     name: "search_result",
            //     location: "不在福州大学",
            //     intro: "已绝育，未领养，性格温和，白天喜欢睡觉",
            //     like_num: 143223
            // }
        ],
        key_word: "",
        offset: 0,
        loading: false
    },

    selected1() {
        this.setData({
            style1: "selected",
            style2: "",
            style3: "",
            showing: "cards",
            cards: []
        })
        this.GetCard()
    },
    selected2() {
        this.setData({
            style1: "",
            style2: "selected",
            style3: "",
        })
        wx.showLoading({
            title: '加载中',
        })
        this.onGetTotalRank()
        this.onGetDailyRank()
        wx.hideLoading()
    },
    selected3() {
        this.setData({
            style1: "",
            style2: "",
            style3: "selected",

        })
        wx.showLoading({
            title: '加载中',
        })
        // this.on
    },
    showHistory() {
        wx.getStorage({
            key: "search_history",
            success: (res) => {
                this.setData({
                    search_history: res.data
                })
            }
        })
        this.setData({
            show_H: true,
        })
    },
    hideHistory() {
        this.setData({
            show_H: false,
        })
    },
    useHistory(e) {
        let history_index = e.currentTarget.dataset.index;
        let key_word = this.data.search_history[history_index];
        this.setData({
            key_word,
        })
    },
    useHistory(e) {
        let history_index = e.currentTarget.dataset.index;
        let key_word = this.data.search_history[history_index];
        this.setData({
            key_word,
        })
    },
    Login() {
        wx.login({
            success: (res) => {
                wx.request({
                    url: authGate.data.ip + "/user/login",
                    method: "POST",
                    header: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    data: {
                        "code": res.code
                    },
                    success: (res) => {
                        authGate.SetToken(res.data.data.token)
                        this.GetCard()
                    },
                    fail: (res) => {
                        console.log("request 失败:")
                        console.log(res)
                    }
                })
            },
            fail: (res) => {
                console.log("登入失败:")
                console.log(res)
            }
        })
    },
    GetCard() {
        wx.showLoading({
            title: '加载中',
        })
        this.setData({
            loading: true
        })
        // this.onLocation().then((res) => {
        // const value = res; // 在这里获取到位置信息
        const value = {
            first: "90'0''",
            second: "50'20''"
        }
        const num = 10;
        wx.request({
            url: authGate.data.ip + "/user/home",
            method: "POST",
            header: {
                "Authorization": authGate.GetToken()
            },
            data: {
                "num": num,
                "offset": this.data.offset,
                "longitude": value.first, // 使用获取到的值
                "latitude": value.second   // 使用获取到的值
            },
            success: (res) => {
                this.setData({
                    cards: this.data.cards.concat(res.data), // this must be res.data !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! clear is importance
                    offset: this.data.offset + num
                });
            },
            fail: (res) => {
                console.log("request 失败:");
                console.log(res);
            },
            complete: () => {
                wx.hideLoading();
                this.setData({
                    loading: false
                });
            }
        });
        // }).catch((error) => {
        // console.log(error);
        // });
    },
    onLoad() {
        this.Login()
    },

    onLocation() {
        return new Promise((resolve, reject) => {
            wx.getLocation({
                type: "wgs84",
                success: (res) => {
                    resolve({
                        first: res.latitude,
                        second: res.longitude
                    })
                },
                fail: (error) => {
                    reject(error)
                }

            })
        })
    },
    onReachBottom: function () {
        if (this.data.loading) {
            return
        }
        this.GetCard()
    },
    onGetTotalRank() {
        wx.request({
            url: authGate.data.ip + "/ranklist/total",
            method: "GET",
            header: {
                "Authorization": authGate.GetToken()
            },
            success: (res) => {
                console.log(res)
                this.setData({
                    totalrank: res.data.data
                })
                console.log(this.data.totalrank)
            },
            fail: (res) => {
                console.log("request 失败:")
                console.log(res)
            }
        })
    },
    onGetDailyRank() {
        wx.request({
            url: authGate.data.ip + "/ranklist/daily",
            method: "GET",
            header: {
                "Authorization": authGate.GetToken()
            },
            success: (res) => {
                console.log(res)
                this.setData({
                    dailyrank: res.data.data
                })
                console.log(this.data.dailyrank)
            },
            fail: (res) => {
                console.log("request 失败:")
                console.log(res)
            }
        })
    },
    onFollower(rule) {
        wx.request({
            url: authGate.data.ip + "/user/follow",
            method: "GET",
            header: {
                "Authorization": authGate.GetToken()
            },
            data: {
                sort_rule: rule
            },
            success: (res) => {
                console.log(res)
                if (rule == 1) {
                    this.setData({
                        time: res.data.data
                    })
                } else {
                    this.setData({
                        recent: res.data.data
                    })
                }
            },
            fail: (res) => {
                console.log("request 失败:")
                console.log(res)
            }
        })
    },
    onSearch() {
        this.setData({
            search_history: this.data.search_history.concat(this.data.key_word)
        })
        this.setData({
            key_word: ""
        })
        // console.log()
        wx.setStorage({
            key: "search_history",
            data: this.data.search_history,
            success: (res) => {
                console.log("set success")
            },
            fail: (res) => {
                console.log("set fail")
            }
        })
        // console.log("history is over")
        wx.showLoading({
            title: '加载中',
        })

        wx.request({
            url: authGate.data.ip + "/user/card",
            method: "POST",
            header: {
                token: authGate.GetToken()
            },
            data: {
                "key_word": this.data.key_word
            },
            success: (res) => {
                console.log(res)
                this.setData({
                    search_result: this.res.data.data.cards,
                })
            },
            fail: (res) => {
                console.log("request 失败:")
                console.log(res)
            },
            complete: () => {
                wx.hideLoading()
            }
        })
    },
    totalOrDaily(e) {
        wx.showLoading({
            title: '加载中',
        })
        console.log(e.detail.value);
        let index = e.detail.value;
        if (index == 1) {
            // this.onGetDailyRank()
            this.setData({
                showing: "dailyrank",
            })
        } else {
            // this.onGetTotalRank()
            this.setData({
                showing: "totalrank",
            })
        }
        wx.hideLoading()
    },
    // 根据关注时间或最近更新
    timeOrRecent(e) {
        wx.showLoading({
            title: '加载中',
        })
        console.log(e.detail.value);
        let index = e.detail.value;
        if (index == 1) {
            this.onFollower(index)
            this.setData({
                showing: "recent",
            })
        } else {
            this.onFollower(index)
            this.setData({
                showing: "time",
            })
        }
        wx.hideLoading()
    },
    onInput(e) {
        this.setData({
            key_word: e.detail.value
        })
        // console.log(this.data.key_word)
    }
})
