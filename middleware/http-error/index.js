const path = require('path');

module.exports = (opts = {}) => {
    // 增加环境变量，用来传入到视图中，方便调试
    const env = opts.env || process.env.NODE_ENV || 'development';
    // 404.html 400.html other.html 的存放位置
    const folder = opts.errorPageFolder;
    // 指定默认模版文件
    // const templatePath = path.resolve(__dirname, './../../views/error/error.html');
    const templatePath = 'error/error';

    let fileName = 'other';
    return async (ctx, next) => {
        try {
            await next();
            if (ctx.response.status === 404 && !ctx.response.body)
                ctx.throw(404);
        } catch (e) {
            let status = +e.status;

            switch (status) {
                case 400:
                case 404:
                case 500:
                    fileName = status;
                    break;
                default:
                    status = 500;
                    fileName = status;
            }
            const filePath = folder ? path.join(folder, fileName.toString()) : templatePath;
            // 渲染对应错误类型的视图，并传入参数对象
            try {
                ctx.status = status;
                await ctx.render(filePath, {
                    env,
                    ctx,
                    status: e.status || e.message,
                    error: e.message,
                    stack: e.stack
                });
            } catch (e) {
                ctx.throw(500, `错误页渲染失败：${e.message}`);
            }
        }
    };
};