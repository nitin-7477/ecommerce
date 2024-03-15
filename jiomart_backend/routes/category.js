var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')


router.post('/add_new_category', upload.single('picture'), function (req, res, next) {
    pool.query("insert into category (companyid,  categoryname,description,picture, createdat, updatedat, createdby) values(?,?,?,?,?,?,?)",
        [
            req.body.companyid,
            req.body.categoryname,
            req.body.description,
            req.file.originalname,
            req.body.createdat,
            req.body.updatedat,
            req.body.createdby,

        ], function (error, result) {
            if (error) {
                console.log(error)
                res.status(200).json({ status: false, message: 'Server error....' })
            }
            else {
                res.status(200).json({ status: true, message: 'Category Registerd Successfully' })
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

router.post('/edit_category_data', function (req, res, next) {
    pool.query("update category set  companyid=?, categoryname=?, description=? ,createdat=?, updatedat=?, createdby=? where categoryid=? ",
        [
            req.body.companyid,
            req.body.categoryname,
            req.body.description,
            req.body.updatedat,
            req.body.createdat,
            req.body.createdby,
            req.body.categoryid



        ], function (error, result) {
            if (error) {
                console.log(error)
                res.status(200).json({ status: false, message: 'Server error....' })
            }
            else {
                console.log("XXXXXXXXXXXXXXXXXXXXXXXXX", req.body.companyid)    
                res.status(200).json({ status: true, message: 'Category Updated Successfully' })
            }

        })
});

router.post('/delete_category_data', function (req, res, next) {
    pool.query("delete from category  where categoryid=? ",
        [req.body.categoryid
        ], function (error, result) {
            if (error) {
                res.status(200).json({ status: false, message: 'Server error....' })
            }
            else {

                res.status(200).json({ status: true, message: 'Category Deleted Succesfully...' })
            }

        })
});


router.post('/edit_category_logo', upload.single('picture'), function (req, res, next) {
    pool.query("update category set picture=? where categoryid=? ",
        [
            req.file.originalname,
            req.body.categoryid
        ], function (error, result) {
            if (error) {
                res.status(500).json({ status: false, message: 'Server error....' })
            }
            else {

                res.status(200).json({ status: true, message: 'Picture Updated' })
            }

        })
});


module.exports = router;
