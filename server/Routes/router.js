const express = require("express");
const router = new express.Router();
const conn = require("../db/conn");


// register client data
router.post("/create", (req, res) => {

    console.log(req.body);

    const { client_name, email, mobile_number, address, subscription_start_date, subscription_end_date ,password } = req.body;

    if (!client_name || !email || !mobile_number || !address || !subscription_start_date || ! subscription_end_date || !password) {
        res.status(422).json("plz fill the all data");
    }

    try {
        conn.query("SELECT * FROM client_profile WHERE email = ?", email, (err, result) => {
            if (result.length) {
                res.status(422).json("This Data is Already Exist")
            } else {
                conn.query("INSERT INTO client_profile SET ?", { client_name, email, mobile_number, address, subscription_start_date, subscription_end_date ,password }, (err, result) => {
                    if (err) {
                        console.log("err" + err);
                    } else {
                        res.status(201).json(req.body);
                    }
                })
            }
        })
    } catch (error) {
        res.status(422).json(error);
    }

});




// get clientdata

router.get("/getclients",(req,res)=>{

    conn.query("SELECT * FROM client_profile",(err,result)=>{
        if(err){
            res.status(422).json("nodata available");
        }else{
            res.status(201).json(result);
        }
    })
});


// client delete api

router.delete("/deleteclient/:id",(req,res)=>{

    const {id} = req.params;

    conn.query("DELETE FROM client_profile WHERE id = ? ",id,(err,result)=>{
        if(err){
            res.status(422).json("error");
        }else{
            res.status(201).json(result);
        }
    })
});



// get single client

router.get("/indclient/:id",(req,res)=>{

    const {id} = req.params;

    conn.query("SELECT * FROM client_profile WHERE id = ? ",id,(err,result)=>{
        if(err){
            res.status(422).json("error");
        }else{
            res.status(201).json(result);
        }
    })
});


// update users api


router.patch("/updateuser/:id",(req,res)=>{

    const {id} = req.params;

    const data = req.body;

    conn.query("UPDATE client_profile SET ? WHERE id = ? ",[data,id],(err,result)=>{
        if(err){
            res.status(422).json({message:"error"});
        }else{
            res.status(201).json(result);
        }
    })
});

module.exports = router;



