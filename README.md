# dynamic.js
dynamic load single local or remote js file

## how to use
```bash
npm i --save lisa.dynamic.js

## if you need unzip
npm i --save unzip

```

```js
var dynamic = require('lisa.dynamic.js')

dynamic.require('/xxxx/demo/test.js').then(m =>{
    m.test()
})

dynamic.require('http://localhost:11549/test_url.js').then(m=>{
    m.test()
}).catch(e=>{
    console.log('you should run serve demo -p 11549, then retry : ' + e)
})

dynamic.require(__dirname + '/demo/test.zip').then(m=>{
    m.test()
})

dynamic.require('http://localhost:11549/testRemote.zip').then(m=>{
    m.test()
}).catch(e=>{
    console.log('you should run serve demo -p 11549, then retry : ' + e)
})

```

### 设置缓存地址

```bash
export CACHE_PATH=/tmp
```