const router = require('koa-router')();

module.exports = (app) => {
    router.get('/', app.controller.home.index);

    app.use(router.routes())
        .use(router.allowedMethods());
};