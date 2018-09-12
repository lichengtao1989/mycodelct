const router = require('koa-router')()

router.prefix('/elementui')
router.get('/', async (ctx, next) => {
  await ctx.render('elementui', {
    title: 'Hello Koa 2.0!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'bootstrap'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router