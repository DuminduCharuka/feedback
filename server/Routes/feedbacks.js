const router = require("express").Router();
let Feedback = require('../Models/feedback');
const express = require('express');
const app = express();

// create feedback
 router.route("/add").post((req,res)=>{

    const name =req.body.name ;
    const date =req.body.date ;
    const discription =req.body.discription;

    const newFeedback = new Feedback({  
        name,
        date,
        discription,
    })

    newFeedback.save().then(()=>{
        res.json("Feedback added")
    }).catch((err)=>{
        console.log(err);
    })
 })

 // display all feedback

 router.route("/").get((req,res)=>{

    Feedback.find().then((feedbacks)=>{
        res.json(feedbacks)
    }).catch((err)=>{
        console.log(err)
    })
 })

 // update feedback details

 router.route("/update/:id").put(async (req, res) => {
    let userId = req.params.id ;
    const {name, date, discription } = req.body; 

    const updateFeedback = {
        name,
        date,
        discription
    }

    const update = await Feedback.findByIdAndUpdate(userId, updateFeedback)
    .then(()=>{
        res.status(200).send({status: "Feedback updated"})
    }).catch((err)=> {
        console.log(err);
        res.send({status: "Error with updating data",error: err.message});
    })

 })

 // Delete feedback

 router.route("/delete/:id").delete(async(req,res)=>{
    let userId = req.params.id ;

    await Feedback.findByIdAndDelete(userId)
    .then(()=>{
        res.status(200).send({status:"Feedback Deleted"}) ;
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with delete feedback",error:err.message});
    })
 })

 // Get only one feedback details

 router.route("/get/:id").get(async(req,res)=>{
    let userId =req.params.id ;
    const user = await Feedback.findById(userId)
    .then(()=>{ 
        res.status(200).send({status: "feedback fetched"})
    }).catch((err)=>{
        console.log(err.message) ;
        res.status(500).send({status: "Error with get user",error: err.message});
    })
 })

 module.exports = router;