var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')


router.post('/add_product_details', upload.any(), function (req, res, next) {
    console.log(req.body)
    console.log(req.files)
    var file_str = ""
    req.files.map((item) => {
        file_str += item.filename + ","
    })
    pool.query("insert into listproduct (categoryid, productid, companyid, weight, price, offerprice, description, productimages, createdat, updatedat, createdby) values(?,?,?,?,?,?,?,?,?,?,?)",
        [
            req.body.categoryid,
            req.body.productid,
            req.body.companyid,
            req.body.weight,
            req.body.price,
            req.body.offerprice,
            req.body.description,
            file_str,
            req.body.createdat,
            req.body.updatedat,
            req.body.createdby,



        ], function (error, result) {
            if (error) {
                console.log(error)
                res.status(500).json({ status: false, message: 'Server error....' })
            }
            else {

                res.status(200).json({ status: true, message: 'ProductList Registerd Successfully' })
            }

        })
});

router.get('/fetch_all_categories', function (req, res, next) {
    pool.query("select * from category", function (error, result) {
        if (error) {
            console.log(error)
            res.status(200).json({ status: false, message: 'Server error....' })
        }
        else {
            res.status(200).json({ status: true, data: result })
        }

    })
});

router.post('/fetch_all_products', function (req, res, next) {
    pool.query("select * from products where categoryid=?", [req.body.categoryid], function (error, result) {
        if (error) {
            console.log(error)
            res.status(500).json({ status: false, message: 'Server error....' })
        }

        else {
            res.status(200).json({ status: true, data: result })
        }

    })
});
module.exports = router;