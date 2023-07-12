import mongoose from "mongoose";

const qrSchema = new mongoose.Schema({
    tableid: {
    type: String,
    // required: true,
    // unique: true,
  }
});

export default mongoose.model("Qr", qrSchema);