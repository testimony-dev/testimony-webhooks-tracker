const express = require('express');
const args = process.argv.slice(2);

const hooksListener= express();
const hooksListenerPort=args[0]||0;
const responseCode=args[1]||200;
const hooksPath=args[2]||'/hooks';
 
hooksListener.use(express.json());
hooksListener.post(hooksPath, async (req,resp)=>{
    process.send(JSON.stringify(req.body));
    resp.sendStatus(responseCode)
})

hooksListener.listen(hooksListenerPort, ()=>{
    console.log(`Listening for hooks at ${hooksPath} on ${hooksListenerPort}`);
    });

