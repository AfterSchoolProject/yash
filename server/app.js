const routes = require('./routes/');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const app = express();
const router = express.Router();

routes(router);

app.use(cors());
app.use(bodyParser.json());
app.use('/api', router);

let port = 5000;
app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
});
