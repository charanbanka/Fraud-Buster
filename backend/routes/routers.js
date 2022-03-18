import express from "express";
import userDetails from "../model/userDetails.js";
import nodemailer from 'nodemailer'

const router = express.Router()

router.get('/',async(req,res)=>{
    try {
        const data = await userDetails.find();

        res.status(202).json(data)
    } catch (error) {
        res.json(error)
    }
})



router.post('/',async(req,res)=>{
    const data = new userDetails(req.body)
    try {
        await data.save();
        console.log(process.env.USER,process.env.PASS)
        let transporter = nodemailer.createTransport({
            service:"gmail",
            auth: {
              user: process.env.USER, // generated ethereal user
              pass: process.env.PASS, // generated ethereal password
            },
          });
          
          let msg = {
            from: process.env.USER, // sender address
            to: data.email, // list of receivers
            subject: "Registartion for Fraud Buster", // Subject line
            html:`<h4>Hi ${data.firstname},<h4><p>You have Successfully completed registration</p>
            <h5>Regards,<h5><h4>Fraud Buster<h4>
            ` // plain text body
          }
          // send mail with defined transport object
          await transporter.sendMail(msg,(err,info)=>{
              let inf=""
              if(err){
                  console.log(err)
                  inf=err
              } else {
                  console.log(info)
                  inf=info
              }
              res.status(200).json({data:data,info:inf});
          })
         
       
    } catch (error) {
        res.status(422).json(error)
    }
})

export default router