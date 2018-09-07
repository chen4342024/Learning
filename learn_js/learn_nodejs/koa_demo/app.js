const Koa = require('koa');
const app = new Koa();

// logger'

app.context.fuck = 'yes';

app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.get('X-Response-Time');
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

app.use(async (ctx, next) => {
    console.log(ctx.fuck);
    next();
})

// x-response-time
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});


app.use(async ctx => {
    ctx.body = 'hello world';
});

app.on('error', err => {
    console.error('server error', err);
})

app.listen(3000);