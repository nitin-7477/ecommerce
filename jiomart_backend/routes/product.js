var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')


router.post('/add_new_product', upload.single('image'), function (req, res, next) {
    pool.query("insert into products ( companyid, categoryid, productname, description, status, trending, deals, pricetype, image, createdat, updatedat, createdby) values(?,?,?,?,?,?,?,?,?,?,?,?)",
        [
            req.body.companyid,
            req.body.categoryid,
            req.body.productname,
            req.body.description,
            req.body.status,
            req.body.trending,
            req.body.deals,
            req.body.pricetype,
            req.file.originalname,
            req.body.createdat,
            req.body.updatedat,
            req.body.createdby,



        ], function (error, result) {
            if (error) {
                console.log(error)
                res.status(500).json({ status: false, message: 'Server error....' })
            }
            else {

                res.status(200).json({ status: true, message: 'Product Added Successfully' })
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


router.get('/display_all_products', function (req, res, next) {
    pool.query("select P.*,(select C.categoryname from category C where C.categoryid = P.categoryid) as categoryname from products P", function (error, result) {
        if (error) {
            console.log(error)
            res.status(500).json({ status: false, message: 'Server error....' })
        }
        else {
            res.status(200).json({ status: true, data: result })
        }

    })
});

// ***************************Edit Company****************************

router.post('/edit_product_data', function (req, res, next) {
    pool.query("update products set  companyid=?, categoryid=?, productname=?, description=?, status=?, trending=?, deals=?, pricetype=?,  updatedat=?, createdby=? where productid=?",
        [
            req.body.companyid,
            req.body.categoryid,
            req.body.productname,
            req.body.description,
            req.body.status,
            req.body.trending,
            req.body.deals,
            req.body.pricetype,
            req.body.updatedat,
            req.body.createdby,
            req.body.productid



        ], function (error, result) {
            if (error) {
                console.log(error)
                res.status(500).json({ status: false, message: 'Server error....' })
            }
            else {
                

                res.status(200).json({ status: true, message: 'Product Updated Successfully' })
            }

        })
});

router.post('/delete_product_data', function (req, res, next) {
    pool.query("delete from products  where productid=? ",
        [req.body.productid
        ], function (error, result) {
            if (error) {
                res.status(500).json({ status: false, message: 'Server error....' })
            }
            else {

                res.status(200).json({ status: true, message: 'Product Deleted Succesfully...' })
            }

        })
});


router.post('/edit_product_logo', upload.single('image'), function (req, res, next) {
    pool.query("update products set image=? where productid=? ",
        [

            req.file.originalname,
            req.body.productid



        ], function (error, result) {
            if (error) {
                res.status(500).json({ status: false, message: 'Server error....' })
            }
            else {

                res.status(200).json({ status: true, message: 'Image Updated' })
            }

        })
});

module.exports = router;
