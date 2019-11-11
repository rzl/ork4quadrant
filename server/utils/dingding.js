var axios = require('axios')

function Dingding(appkey, appsecret) {
  this.appkey = appkey
  this.appsecret = appsecret
  this.token = ''
  this.tokenTime = 0

  this.service = axios.create({
    baseURL: 'https://oapi.dingtalk.com/',
    timeout: 60 * 60 * 1000 // 请求超时时间
  })

  this.dc = function(opt) {
    return new Promise((rs, rj) => {
      if (!opt || opt === undefined) { rj() }
      this.freshToken(this.appkey, this.appsecret).then((dd) => {
        if (opt.params !== undefined) {
          opt.params.access_token = dd.token
        } else {
          opt.params = {
            access_token: dd.token
          }
        }
        this.service(opt).then((res) => {
          rs(res)
        })
      }).catch((e) => {
        console.log(e)
      })
    }) 
  }

  this.freshToken = function(appkey, appsecret) {
    return new Promise((rs, rj) => {
      if (this.token === '' || (new Date().getTime() - this.tokenTime > 7000 * 1000) ) {
        this.service({
          url: 'gettoken',
          method: 'get',
          params: {
            appkey: appkey,
            appsecret: appsecret
          }
        }).then((res) => {
          this.token = res.access_token
          rs(this)
        })
      } else {
        rs(this)
      }
    })
  }

  this.service.interceptors.request.use(config => {
    return config
  }, error => {
    Promise.reject(error)
  })

  // respone拦截器
  this.service.interceptors.response.use(
    response => {
      if (response.data.errcode !== 0) {
        console.log(response.data)
      }
      return response.data
    },
    error => {
      console.log('err' + error)// for debug
      return Promise.reject(error)  
    }
  )

  return this
}


module.exports = new Dingding(
    'id',
    'pwd'
  )
