const path = require('path');
const bodyParser = require('koa-bodyparser');
const nunjucks = require('koa-nunjucks-2');
const staticFiles = require('koa-static');

const log = require('./log');
const rule = require('./rule');
const httpError = require('./http-error');

module.exports = (app) => {

    // 配置日志输出
    app.use(log());

    // 配置错误页
    app.use(httpError({
        errorPageFolder: 'error'
    }));

    // 配置静态资源
    app.use(staticFiles(path.resolve(__dirname, '../public')));

    // 配置页面模板
    app.use(nunjucks({
        ext: 'html',
        path: path.join(__dirname, '../views'),
        nunjucksConfig: {
            trimBlocks: true
        }
    }));

    // 配置表单提交
    app.use(bodyParser());

    rule({
        app,
        rules: [
            {
                path: path.join(__dirname, '../controller'),
                name: 'controller'
            },
            {
                path: path.join(__dirname, '../service'),
                name: 'service'
            }
        ]
    });

    app.on("error", (err, ctx) => {
        console.log(err);
        if (ctx && !ctx.headerSent && ctx.status < 500) {
            ctx.status = 500;
        }
        if (ctx && ctx.log && ctx.log.error) {
            if (!ctx.state.logged) {
                ctx.log.error(err.stack);
            }
        }
    });
};