const { modul } = require('../module');
const { fs } = modul;
const { color } = require('./color')

async function uncache(module = '.') {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(module)]
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}

async function nocache(module, cb = () => { }) {
    console.log(color('Module', 'blue'), color(`'${module} 𝗗𝗜 𝗔𝗪𝗔𝗦𝗜 𝗢𝗟𝗘𝗛 𝗦𝘆𝗻𝗰𝗫𝗗 𝗝𝗔𝗡𝗚𝗔𝗡 𝗔𝗦𝗔𝗟 𝗨𝗕𝗔𝗛'`, 'orange'))
    fs.watchFile(require.resolve(module), async () => {
        await uncache(require.resolve(module))
        cb(module)
    })
}

module.exports = {
    uncache,
    nocache
}
