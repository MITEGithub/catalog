const { authGate, formatTime } = require("../../utils/utils.js")

Page({

    data: {
        card_id: 0,
        is_like: false,
        is_star: false,
        img_src: "/img/cat.jpg",
        name: "暹罗猫",
        location: "不在福州大学",
        intro: "一大堆简介一大堆简介一大堆简介一大堆简介一大堆简介一大堆简介一大堆简介一大堆简介一大堆简介一大堆简介一大堆简介",
        photos: [
            {
                month: "12月",
                photo: [
                    "/img/cat2.jpg",
                    "/img/cat3.jpg",
                    "/img/cat4.jpg",
                    "/img/cat5.jpg",
                    "/img/cat.jpg",
                    "/img/cat.jpg",
                    "/img/cat.jpg",
                ]
            }, {
                month: "11月",
                photo: [
                    "/img/cat.jpg",
                    "/img/cat.jpg",
                    "/img/cat.jpg",
                    "/img/cat.jpg",
                    "/img/cat.jpg",
                ]
            }, {
                month: "10月",
                photo: [
                    "/img/cat.jpg",
                    "/img/cat.jpg",
                ]
            },
        ],
        showing_photo: "/img/cat.jpg",
        display: false
    },

    onLoad(options) {
        this.setData({
            card_id: options.card_id
        })
        this.onUserCard()
    },

    tapPhoto(e) {
        console.log();
        let src = e.currentTarget.dataset.photosrc;
        this.setData({
            showing_photo: src,
            display: true,
        })
    },

    changeLike() {
        // try {
        wx.request({
            url: authGate.data.ip + "/user/card_like",
            method: "PUT",
            header: {
                "Authorization": authGate.GetToken()
            },
            data: {
                card_id: this.data.card_id
            },
            success: (res) => {
                console.log(res)
                if (res.statusCode == 200) {
                    this.setData({
                        is_like: !this.data.is_like
                    })
                }
            },
            fail: (res) => {
                console.log("request failed:")
                console.log(res)
            }
        })
        // } catch (e) {
        //     console.log(e)
        // }


    },

    changeStar() {
        wx.request({
            url: authGate.data.ip + "/user/card_star",
            method: "PUT",
            header: {
                "Authorization": authGate.GetToken()
            },
            data: {
                card_id: this.data.card_id
            },
            success: (res) => {
                console.log(res)
                if (res.statusCode == 200) {
                    this.setData({
                        is_star: !this.data.is_star
                    })
                }

            },
            fail: (res) => {
                console.log("request failed:")
                console.log(res)
            }
        })

    },

    clickClose() {
        this.setData({
            display: false,
        })
    },

    // onCardLike() {
    //     // console.log(this.data.card_id)
    //     // if()
    //     if (this.data.is_like_old != this.data.is_like_new) {

    //     }
    // },
    // onCardStar() {
    //     if (this.data.is_star_old != this.data.is_star_new) {

    //     }
    // },
    onUploadCardImg() {
        wx.chooseImage({
            success: (res) => {
                const tempFilePaths = res.tempFilePaths
                console.log(tempFilePaths)
                wx.uploadFile({
                    url: authGate.data.ip + "/user/upload_card_img",
                    filePath: tempFilePaths[0],
                    header: {
                        "Authorization": authGate.GetToken()
                    },
                    name: "img_file",
                    formData: {
                        card_id: this.data.card_id
                    },
                    success: (res) => {
                        console.log(res)
                    },
                    fail: (res) => {
                        console.log("request failed:")
                        console.log(res)
                    }
                })
            }
        })

    },
    onUserCard() {
        console.log(this.data.card_id)
        wx.request({
            url: authGate.data.ip + "/user/card",
            method: "GET",
            header: {
                "Authorization": authGate.GetToken()
            },
            data: {
                card_id: this.data.card_id
            },
            success: (res) => {
                console.log(res)
                let alias = res.data.data

                this.setData({
                    img_src: alias.img_url,
                    name: alias.pet_name,
                    location: alias.location,
                    intro: alias.intro,
                    is_like: alias.is_like,
                    is_star: alias.is_star
                })

                let list = alias.imgs

                const groupedPhotos = {};

                // 遍历列表并分组
                if (list != null) {
                    list.forEach(item => {
                        console.log(item)
                        const date = item.updateTime.split(" ")[0]; // 提取日期部分
                        if (!groupedPhotos[date]) {
                            groupedPhotos[date] = []; // 初始化数组
                        }
                        groupedPhotos[date].push(item.url); // 添加 URL 到对应的日期数组
                    });

                    // 将分组结果转换为所需格式
                    let photos = Object.keys(groupedPhotos).map(day => {
                        return { day: day, photo: groupedPhotos[day] };
                    });

                    // 按照日期从大到小排序
                    photos.sort((a, b) => new Date(b.day) - new Date(a.day));

                    // 输出结果
                    this.setData({
                        photos: photos
                    })
                    console.log(this.data.photos)
                } else {
                    this.setData({
                        photos: []
                    })
                }
            }
        })
    },
})