const sqlite3 = require('sqlite3').verbose();

const DBSOURCE = 'quiz.db';

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if(err){
        console.error(err.message);
        throw err;
    }else{
        console.log('Connected to database');
                let insert = 'INSERT INTO users (username, password) VALUES (?,?)';
                db.run(insert, ['leoebenezer', 'mypassword2']);
            }
        });
