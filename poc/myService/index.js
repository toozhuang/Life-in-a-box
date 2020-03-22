// const express = require('express');
const express = require('serverless-express/express')
var app = express();


// Q: What is serverless-express/express ??
//
// A: It's express, the exact same express that you already use.
//    We wrapped it and we abstracted away all specific implementation 
//    that has to be done in order to work properly on every provider.
//
//    Basicaly, we just made express development provider agnostic
//    so you can develop your app without any vendor lock-in, yeah !


// --- example code ---
//
// app.get('/some_url', doSomething() )
// app.post('/other_url', doSomethingElse() )
//
// ------- end --------

module.exports = app
// app.listen(PORT, ()=>{
//   console.log('listening')  
// })