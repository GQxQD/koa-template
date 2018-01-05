module.exports = {
    index: async (ctx, next) => {
        // ctx.throw(500);
        await ctx.render('home/index', {
            title: 'kohai欢迎您',
            content: 'Content'
        });
    }
};