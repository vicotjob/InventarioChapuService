const express = require('express');
const productsRouter = express.Router();

function router(connection){

    productsRouter.route('/')
        .get((req, res) => {
            connection.query('SELECT * FROM T_Productos order by Id', (err, rows, fields)=>{
                if(!err){
                    res.send(rows);
                }else{
                    res.send('Error getting products: ', err);
                }
            });
        });

    productsRouter.route('/:id')
        .get((req, res) => {
            connection.query('SELECT * FROM T_Productos where Id = ?', [req.params.id], (err, rows, fields)=>{
                if(!err){
                    res.send(rows);
                }else{
                    res.send('Error getting products: ', err);
                }
            });
        });

    productsRouter.route('/')
        .post((req, res) => {
            var product = {
                Nombre: req.body.Nombre,
                Descripcion: req.body.Descripcion,
                Cantidad: req.body.Cantidad,
                Material: req.body.Material,
                Tamano: req.body.Tamano,
                Orientacion: req.body.Orientacion,
                Hojas: req.body.Hojas,
                Precio: req.body.Precio,
                Status: req.body.Status,
                CreatedDate: req.body.CreatedDate,
                SaleDate: req.body.SaleDate,
                UserId: req.body.UserId
            };
            connection.query('INSERT INTO T_Productos SET ?', product, (err, rows)=>{
                if(!err){
                    res.send('Product added successfully!');
                }else{
                    res.send('Error adding product: ', err);
                }
            });
        });

    productsRouter.route('/:id')
        .put((req, res) => {
            var product = {
                Status: req.body.Status,
                SaleDate: req.body.SaleDate
            };
            connection.query('UPDATE T_Productos set Status=?, SaleDate=? where Id=?', [product.Status, product.SaleDate, req.params.id], (err, rows)=>{
                if(!err){
                    res.send('Product Id: ' + req.params.id + ' has been sold!');
                }else{
                    res.send('Error changing product status');
                }
            });
        });

    productsRouter.route('/:id')
        .delete((req, res) => {
            connection.query('DELETE T_Productos WHERE Id = ?', [req.params.id], (err, rows)=>{
                if(!err){
                    res.send('Product deleted successfully!');
                }else{
                    res.send('Error deleting product: ', err);
                }
            });
        });

    productsRouter.route('/sold/:id')
        .put((req, res) => {
            var product = {
                Status: req.body.Status,
                SaleDate: req.body.SaleDate
            };
            connection.query('UPDATE T_Productos set Status=?, SaleDate=? where Id=?', [product.Status, product.SaleDate, req.params.id], (err, rows)=>{
                if(!err){
                    res.send('Product Id: ' + req.params.id + ' has been sold!');
                }else{
                    res.send('Error changing product status');
                }
            });
        });

    return productsRouter;
}

module.exports = router
