var utils = require('lisa.utils')
var path = require('path')
var fs = require('fs')
var hent = require('hent')
var unzip = null

try {
    unzip = require('unzip')
} catch (e) {

}
var cwd = process.env.CACHE_PATH || process.cwd()

const doUnzip = async (src, tgt) => {
    if (!unzip)
        throw Error('no unzip found,you should npm i unzip first')
    var rs = fs.createReadStream(src).pipe(unzip.Extract({
        path: tgt
    }))
    return  new Promise((r, j) => {
        rs.on('close', function () {
            r()
        })
        rs.on('error', e => {
            j(e)
        })
    })
}

const getCacheRawFileName = (p) => {
    if (!p) return ''
    // http://abc.com/  .zip  去除 http//sfsdf  及 .zip
    var fileName = p.replace(/^https?:\/\/((?!\/).)*/g, '')
    fileName = utils.startTrim(fileName, '/').replace(/[\/:\\]/g, '_')
    return path.join(cwd, 'temp_modules', fileName)
}

const getCacheFileName = p => {
    return getCacheRawFileName(p).replace(/\.zip$/, '')
}
const initDir = () => {
    var dir = path.join(cwd, 'temp_modules')
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
    }
}

exports.require = exports.load = async (urlOrPath) => {
    if (!urlOrPath) return null
    initDir()
    //first find cache
    var fileName = getCacheFileName(urlOrPath)
    var rawFile = getCacheRawFileName(urlOrPath)
    if (fs.existsSync(fileName)) {
        return require(fileName)
    }
    if (utils.startWith(urlOrPath, 'http://') || utils.startWith(urlOrPath, 'https://')) {
        var {
            buffer
        } = await hent(urlOrPath)
        fs.writeFileSync(rawFile, buffer)
    } else {
        fs.copyFileSync(urlOrPath, rawFile)
    }
    // zip 处理
    if(fileName!=rawFile){
        await Promise.resolve(doUnzip(rawFile,fileName))
    }
    return require(fileName)
}

//console.log(process.cwd())