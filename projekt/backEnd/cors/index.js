const cors = require('cors');


const corsOptions = {
    origin: '*'/*file:///home/vinah331/Desktop/tdp013/projekt/main.html'*/,
    optionsSuccessStatus: 200, 
    methods: ['GET', 'POST', 'PATCH']
};

module.exports = cors(corsOptions)

