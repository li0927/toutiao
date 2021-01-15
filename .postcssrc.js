module.exports = {
  plugins: {
    //   加css浏览器声明前缀，兼容性
    // cli内部已经配置过了
    // autoprefixer: {
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },
    'postcss-pxtorem': {
      // vant 基于375，设计稿750，10等分，所以以后量设计稿后要除以2
      // rootValue还支持函数动态处理返回
      // rootValue: 37.5,
      rootValue({ file }) {
        console.log(file)
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      //   配置所需转换的css属性，这里转换所有
      propList: ['*']
    }
  }
}
