var dynamic = require('./index')

dynamic.require(__dirname + '/demo/test.js').then(m =>{
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
    console.log('============you should run serve demo -p 11549, then retry : ' + e)
})