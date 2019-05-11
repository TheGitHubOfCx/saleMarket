module.exports.routers = [
  {
    component: './CoreLayout/index',
    routes: [
      {path: '/', component: './GoodsShow/index'},
      {path: '/register', component: './Register/index'},
      {path: '/signIn', component: './SignIn/index'},
      {path: '/details', component: './GoodsDetails/index'},
    ]
  }
]
