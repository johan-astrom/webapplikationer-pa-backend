const sqlite3 = require('sqlite3').verbose();

const DBSOURCE = 'quiz.db';

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log('Connected to database');
        db.run(`CREATE TABLE users (
            userId INTEGER PRIMARY KEY,
            username TEXT UNIQUE,
            password TEXT
            )`, (err) => {
            if (err) {
                // Table already created
            } else {
                // Table just created, creating some rows
                let insert = 'INSERT INTO users (username, password) VALUES (?,?)'
                db.run(insert, ['johanastrom', 'mypassword'])
            }
        });
        db.run(`CREATE TABLE testResults (
            testId INTEGER PRIMARY KEY,
            userId INTEGER ,
             operation TEXT,
             timeStamp  TEXT,
             score  INTEGER
            )`, (err) => {
            if (err) {
                console.log(err)
            } else {
                // Table just created, creating some rows
                let insert = 'INSERT INTO testResults (userId,operation,timeStamp,score)  VALUES (?,?,?,?)'
                db.run(insert, [1, 'addition',new Date(),4])
            }
        });
    }
})

module.exports = db;