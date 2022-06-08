const express = require('express');
const ws = require('ws');

class Server {

    app;
    wsServer;
    server;

    init() {
        this.app = express();
        this.server = this.app.listen(3000);

        this.app.get('/', (req, res) => {
            res.send('Server is ready!');
        });
    }

}

module.exports = Server;





