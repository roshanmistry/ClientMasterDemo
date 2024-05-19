const express = require("express");
const router = new express.Router();
const conn = require("../db/conn");


// register client data
// router.post(
//     "/login",
//     check("email")
//         .isEmail()
//         .withMessage("Enter a valid email address")
//         .normalizeEmail(),
//     check("password").not().isEmpty(),
//     Validate,
//     Login
// );

router.post("/login", (req, res) => {

    console.log(req.body);

    const {email, password, subscription_start_date, subscription_end_dat } = req.body;

    if (!email || !password) {
        res.status(422).json("plz fill the all data");
    }

    try {
        conn.query("SELECT * FROM client_profile WHERE email = ?", email, (err, result) => {
            
            if (result.length) {
                res.status(422).json(result);
            } else {
                // conn.query("INSERT INTO login SET ?", {  email, password }, (err, result) => {
                //     if (err) {
                //         console.log("err" + err);
                //     } else {
                //         res.status(201).json(req.body);
                //     }
                // })
                console.log("no need to add data");
            }
        })
    } catch (error) {
        res.status(422).json(error);
    }

});


// get clientdata

// auth.get("/getclients",(req,res)=>{

//     conn.query("SELECT * FROM client_profile",(err,result)=>{
//         if(err){
//             res.status(422).json("nodata available");
//         }else{
//             res.status(201).json(result);
//             console.log(res.status(201).json(result));
//         }
//     })
// });


// client delete api

// auth.delete("/deleteuser/:id",(req,res)=>{

//     const {id} = req.params;

//     conn.query("DELETE FROM client_profile WHERE id = ? ",id,(err,result)=>{
//         if(err){
//             res.status(422).json("error");
//         }else{
//             res.status(201).json(result);
//         }
//     })
// });



// get single client

// auth.get("/induser/:id",(req,res)=>{

//     const {id} = req.params;

//     conn.query("SELECT * FROM client_profile WHERE id = ? ",id,(err,result)=>{
//         if(err){
//             res.status(422).json("error");
//         }else{
//             res.status(201).json(result);
//         }
//     })
// });


// update users api


// auth.patch("/updateuser/:id",(req,res)=>{

//     const {id} = req.params;

//     const data = req.body;

//     conn.query("UPDATE client_profile SET ? WHERE id = ? ",[data,id],(err,result)=>{
//         if(err){
//             res.status(422).json({message:"error"});
//         }else{
//             res.status(201).json(result);
//         }
//     })
// });

module.exports = router;



