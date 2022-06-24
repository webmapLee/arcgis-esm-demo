const injectCss = [
    {
      url: "https://js.arcgis.com/4.23/esri/themes/dark/main.css",
      disabled: true,
      id: "jsapi-theme-dark",
    },
    {
      url: "https://js.arcgis.com/4.23/esri/themes/light/main.css",
      id: "jsapi-theme-light",
    },
  ]
const injectJs = [
  {
    url:"https://js.arcgis.com/4.23/"
  }
]

module.exports = {
    injectCss,
    injectJs
}