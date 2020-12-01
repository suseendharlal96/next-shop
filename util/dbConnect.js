import mongoose from "mongoose";

const connection = {};
(async function dbConnect() {
  if (connection.connected) {
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    connection.connected = db.connections[0].readyState;
    console.log("connected");
  } catch (err) {
    console.log(err);
  }
})();
