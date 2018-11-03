const express = require('express');
const userRouter = express.Router();

function router(connection) {
    userRouter.route('/')
        .get((req, res) => {
            connection.query('SELECT * FROM T_Users order by userId', (err, rows, fields)=>{
                if(!err){
                    res.send(rows);
                }else{
                    res.send('Error getting users: ', err);
                }
            });
        });

    userRouter.route('/:id')
        .get((req, res) => {
            connection.query('SELECT * FROM T_Users WHERE userId =  ?', [req.params.id], (err, rows, fields)=>{
                if(!err){
                    res.send(rows);
                }else{
                    res.send('Error getting user: ', err);
                }
            });
        });

    userRouter.route('/products/:id')
        .get((req, res) => {
            connection.query('SELECT * FROM T_Productos where userId = ?', [req.params.id], (err, rows, fields)=>{
                if(!err){
                    res.send(rows);
                }else{
                    res.send('Error getting products: ', err);
                }
            });
        });

    userRouter.route('/products/count/:id')
        .get((req, res) => {
            connection.query('SELECT COUNT(*) as count FROM T_Productos where userId=?', [req.params.id], (err, rows)=>{
                if(!err){
                    res.send(rows);
                }else{
                    res.send('Error getting count of products');
                }
            });
        });
    
    return userRouter;
    
}

module.exports = router;