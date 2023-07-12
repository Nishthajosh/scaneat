import express from "express";
const router = express.Router();
import Qr from '../models/Qr';

router.get('/',(req, res) => {
    Qr.find()
      .then((table) => res.json(table))
      .catch((err) => res.json("Error" + err));
  });
  
  router.post('/add', (req, res) => {
    const tableid = req.body.tableid;
    try {
     
      const newuser = new Qr({
        tableid,
      });
  
      newuser.save()
        .then(() => res.send({ status: "ok" }))
        .catch((err) => {
          res.send({ status: "error" });
        });
    } catch (err) {
      res.send({ status: "error" });
    }
  });
  module.exports = router;