git initconst { join } = require('path')
const fs = require('fs')
const Koa = require('koa')
const json = require('koa-json')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')
const { exec } = require('child_process')

const app = new Koa()
const router = new Router()

const responseBody = (code, msg) => ({ code, msg })

// CORS middleware
app.use(cors())
// JSON prettier middleware
app.use(json())
// Bodyparser middleware
app.use(bodyParser())

router.get('/view', async (ctx) => {})

router.post('/reliable', (ctx) => {
  const { stack } = ctx.request.body
  if (!stack) {
    ctx.body = responseBody(-1, 'Reliable success.')
    return
  }
  fs.writeFileSync('data.stack', stack)
  exec('./FlameGraph/flamegraph.pl data.stack > ./graph/flamegraph.svg')
  ctx.body = responseBody(0, 'Reliable success.')
})

// Router middleware
app.use(router.routes()).use(router.allowedMethods())

app.listen(3609, () => console.log('Server started...'))
