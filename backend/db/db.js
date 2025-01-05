import mongoose from "mongoose";

function connect() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch(() => {
      console.log("Error connecting to MongoDB");
    });
}

export default connect;
