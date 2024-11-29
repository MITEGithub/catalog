
const Store = {
  wxSetStorage: (Key, Data) => {
    console.log(Key, Data)
    wx.setStorage({
      key: Key,
      data: Data,
      encrypt: true,
      success: () => {
        console.log("save sucess!")
      },
      fail: () => {
        console.log("save fail!")
      }
    })
  },
  wxGetStorage: Key => {
    return new Promise((resolve, reject) => {
      wx.getStorage({
        key: Key,
        encrypt: true,
        success: (res) => {
          console.log("get sucess!")
          resolve(res.data)
          // return res.data
        },
        fail: (res) => {
          console.log("get error!")
          // return null
          reject(null)
        }
      })
    })
  },
}

const authGate = {
  data: {
    ip: "http://192.168.1.197:8080",
    token: "",
  },
  SetToken: (token) => {
    authGate.data.token = token
    Store.wxSetStorage("Token", token)
  },

  GetToken: () => {
    Store.wxGetStorage("Token").then((res) => {
      if (res != null) {
        authGate.data.token = res
      }
    })
    return authGate.data.token
  },

}
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('-')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

const UserInfo = {
  data: {
    avatar: ""
  },
}
module.exports = {
  authGate,
  Store,
  formatTime,
  UserInfo,
}