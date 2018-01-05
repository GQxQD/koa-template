module.exports = {
    register: async (name, password) => {
        let result = {};
        if (name === 'kohai' && password === '123456') {
            result = {
                status: 0,
                data: {
                    title: '个人中心',
                    content: '欢迎进入个人中心'
                }
            };
        } else {
            result = {
                status: -1,
                data: {
                    title: '登录失败',
                    content: '请输入正确的账号信息'
                }
            };
        }
        return result;
    }
};