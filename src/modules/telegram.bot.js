const fetch = require('node-fetch');

const telegram = {

    config: {
      baseUrl: 'https://api.telegram.org/bot',
      token: '',
      chat_id: ''
    },

    setting: (token, chat_id) => {
      telegram.config.token = token;
      telegram.config.chat_id = chat_id;
    },

    send: async (msg = '', type = 'text') => {
        const { baseUrl, token, chat_id } = telegram.config;
        const url = new URL(`${baseUrl}${token}/sendMessage`);
        //Image test -> 'https://s.tcdn.co/8a1/9aa/8a19aab4-98c0-37cb-a3d4-491cb94d7e12/19.png';
        const params = {
            chat_id: chat_id,
            text: msg
        };
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        let response = await fetch(url);
        return await response.json();
    }
}

module.exports = telegram;