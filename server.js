const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.static(path.join(__dirname,'/public')));
app.get('/',(req,res)=>{
    return res.sendFile('index.html');
});

const server = app.listen(PORT,()=>{
    console.log(`Express app is now running on http://localhost:${PORT}/`)
});

const io = require('socket.io')(server);

io.on('connection',(socket)=>{
   socket.on('message',(msg)=>{
    socket.broadcast.emit("message",msg);
   })
})  


