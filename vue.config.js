module.exports = {
  devServer: {
    port: 8080, // กำหนดพอร์ตของ dev server
  },
    publicPath: process.env.NODE_ENV === 'production' ? '/evsystem/' : '/'
  }