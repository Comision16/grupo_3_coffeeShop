const express = require('express');
const { detail, add, cafeteras, capsulas, cafeengrano, edit, create, store, update, todos, search } = require('../controllers/productsController');


const upload = require('../middlewares/upload');
//const { leerJSON, escribirJSON } = require("../data");
const { existsSync, unlinkSync } = require('fs')

const productsController = require('../controllers/productsController');
const productAddValidatior = require('../validations/product-add-validator');


//const productos = leerJSON('products');
const fs = require('fs');

const router = express.Router();


router
    .get('/productDetail:id?', detail)
    .get('/agregar', add)
    .get('/cafeteras', cafeteras )
    .get('/capsulas', capsulas )
    .get('/café en grano', cafeengrano )
    .get('/editar-articulo/:id', edit)
    .put('/update/:id',upload.fields([
        {
          name : 'image1'
        },
        {
          name : 'image2'
        }
        ]),update)
    .get('/agregar', productsController.create)
    .get('/todos', todos)
    .get('/search', search)
    .post('/store', upload.single('imagen'), store)
    .post('/crear', upload.fields([{name:"imagen"},{name:"imagen"}]), productAddValidatior, create)
    .delete("/eliminar/:id", (req,res) =>{

            const {id} = req.params;
        
            //const productos = leerJSON("products")
        
            const {imagen} = productos.find(product => product.id == id);
        
            existsSync('public/img/' + imagen) && unlinkSync('public/img/' + imagen)
        
            const productoFiltrado = productos.filter(producto => producto.id != id )
        
            //escribirJSON(productoFiltrado, "products")
        
            return res.redirect('/dashboard')
    })
    

module.exports = router;



