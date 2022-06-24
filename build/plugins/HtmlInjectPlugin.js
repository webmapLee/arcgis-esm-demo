const HtmlWebpackPlugin = require("html-webpack-plugin");
const pluginName = "HtmlInjectPlugin";

const assetsHelper = (data) => {
  let js = [],
    css = [];
  for (let item of data.js) {
    js.push(`<script src="${item.url}"></script>`);
  }
  for (let item of data.css) {
    let cssItem = '<link rel="stylesheet" ';
    if (item.disabled) {
      cssItem += "disabled ";
    }
    if (item.id) {
      cssItem += `id="${item.id}" `;
    }
    cssItem += `href="${item.url}" />`;
    css.push(cssItem);
  }
  return {
    js,
    css,
  };
};

class HtmlInjectPlugin {
  constructor(options) {
    this.options = options
  }
  apply(compiler) {
    compiler.hooks.compilation.tap(pluginName, (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).beforeAssetTagGeneration.tapAsync(
        pluginName,
        (data, cb) => {
          const { js, css } = assetsHelper(this.options);
          this.options = { js, css };
          cb(null, data);
        }
      );
        HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(pluginName,(data,cb)=>{
            let _html = data.html;
            _html = _html.replace("<!-- injectjs -->", this.options.js.join(''));
            _html = _html.replace("<!-- injectcss -->", this.options.css.join(''));
            data.html = _html;
            // Tell webpack to move on
            cb(null, data)
        })
    });
  }
}
module.exports = HtmlInjectPlugin;