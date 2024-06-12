const http = require('https');

const server = http.createServer((req, res) => {
    console.log(res);
});

server.listen(3000, () =>{
    console.log("Server Iniciated");
});