const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/user');


const PORT = 3001;
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());

app.use(async (req, res, next) => {
    if (!req.headers['authorization'])
        return res.status(403).json({ error: 'Unauthorized' });
    if (req.headers['authorization'] !== 'api_key')
        return res.status(401).json({ error: 'Authorization failed' })

    req.context = {
        User,
    };
    next();
});

app.use('/users', require('./routes/user'));

app.use((req, res, next) => {
    res.status(404).json({ error: 'Not found' });
});

const connect = async () => {
    await mongoose.connect(
        'mongodb+srv://cluster0.7pfm7.mongodb.net/Test',
        {'auth': {'authSource': 'admin' },
            'user': 'admin',
            'pass': '6CbgXG6Z2Mc3J6Aj'
        }
    );
};
connect().then(async () => {
        app.listen(PORT, () =>
            console.log(`App listening on port ${PORT}!`),
        );
    }
);