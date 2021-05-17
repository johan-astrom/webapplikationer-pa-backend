const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db.js');

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const httpPort = 3000;

app.listen(httpPort, () => {
    console.log(`Server listening at port: ${httpPort}`);
});

app.get('/users', (req, res, next) => {
    let sql = 'SELECT * FROM users';
    let params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({'error': err.message});
            return;
        }
        res.json({
            'message': 'success',
            'users': rows
        })
    });
});

app.get('/users/:id', (req, res, next) => {
    let sql = 'SELECT * FROM users WHERE userId = ?';
    let params = [req.params.id];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({'error': err.message});
            return;
        }
        res.json({
            'message': 'success',
            'users': rows
        })
    });
});

app.post('/users/', (req, res, next) => {
    let data = {
        username: req.body.username,
        password: req.body.password
    };
    let sql = 'INSERT INTO users (username, password) VALUES (?,?)'
    let params = [data.username, data.password];
    db.run(sql, params, function(err, result){
        if (err){
            res.status(400).json({'error': err.message});
            return;
        }
        res.json({
            'message': 'success',
            'users': data,
            'id': this.lastID
        })
    });
});


