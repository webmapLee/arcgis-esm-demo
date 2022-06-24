const mockFn = (devServer) => {
  devServer.app.get('/api/test', function (req, res) {
    res.json({ custom: 'response' })
  })
}

module.exports = {
  mockFn
}
