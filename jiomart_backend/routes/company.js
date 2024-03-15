var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')


router.post('/add_new_company', upload.single('logo'), function (req, res, next) {
  pool.query("insert into company (companyname, ownername, emailaddress, mobilenumber, address, state, city, password, logo, status, createdat, updatedat, createdby) values(?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      req.body.companyname,
      req.body.ownername,
      req.body.emailaddress,
      req.body.mobilenumber,
      req.body.address,
      req.body.state,
      req.body.city,
      req.body.password,
      req.file.originalname,
      req.body.status,
      req.body.createdat,
      req.body.updatedat,
      req.body.createdby,



    ], function (error, result) {
      if (error) {
        res.status(500).json({ status: false, message: 'Server error....' })
      }
      else {

        res.status(200).json({ status: true, message: 'Company Registerd Successfully' })
      }

    })
});



router.get('/display_all_companies', function (req, res, next) {
  pool.query("select C.*,(select S.statename from states S where S.stateid=C.state)as statename,(select CT.cityname from cities CT where CT.cityid=C.city)as cityname from company C", function (error, result) {
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

router.post('/edit_company_data', function (req, res, next) {
  pool.query("update company set companyname=?, ownername=?, emailaddress=?, mobilenumber=?, address=?, state=?, city=?, status=?,  updatedat=?, createdby=? where companyid=? ",
    [
      req.body.companyname,
      req.body.ownername,
      req.body.emailaddress,
      req.body.mobilenumber,
      req.body.address,
      req.body.state,
      req.body.city,
      req.body.status,
      req.body.updatedat,
      req.body.createdby,
      req.body.companyid



    ], function (error, result) {
      if (error) {
        res.status(500).json({ status: false, message: 'Server error....' })
      }
      else {
        console.log("XXXXXXXXXXXXXXXXXXXXXXXXX", req.body.companyid)

        res.status(200).json({ status: true, message: 'Company Registerd Successfully' })
      }

    })
});

router.post('/delete_company_data', function (req, res, next) {
  pool.query("delete from company  where companyid=? ",
    [req.body.companyid
    ], function (error, result) {
      if (error) {
        res.status(500).json({ status: false, message: 'Server error....' })
      }
      else {

        res.status(200).json({ status: true, message: 'Company Deleted Succesfully...' })
      }

    })
});


router.post('/edit_company_logo', upload.single('logo'), function (req, res, next) {
  pool.query("update company set logo=? where companyid=? ",
    [

      req.file.originalname,
      req.body.companyid



    ], function (error, result) {
      if (error) {
        res.status(500).json({ status: false, message: 'Server error....' })
      }
      else {

        res.status(200).json({ status: true, message: 'Logo Updated' })
      }

    })
});

router.post('/chk_company_login', function (req, res) {
  pool.query("select * from company where (emailaddress=? or mobilenumber=?) and password=? and status='Verified' ",

    [
      req.body.emailaddress, req.body.emailaddress, req.body.password
    ],
    function (error, result) {

      if (error) {
        console.log(error)
        res.status(500).json({ status: false, message: 'Server error....' })

      }
      else {
        if (result.length == 0) {
          res.status(500).json({ status: false, message: 'Server error....' })

        }
        else {
          res.status(200).json({data:result[0], status: true, message: 'Login Successfully...' })

        }
      }


    })

})

module.exports = router;
