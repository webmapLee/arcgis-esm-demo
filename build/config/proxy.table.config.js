const proxyTable = {
  "/x": { // 这是请求接口中要替换的标识
    target: "https://js.arcgis.com/4.23", // 被替换的目标地址，即把 /api 替换成这个
    pathRewrite: {"^/api" : ""}, 
    secure: false, // 若代理的地址是https协议，需要配置这个属性
  },
}

module.exports = proxyTable
