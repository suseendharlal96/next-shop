import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModal from "../../../model/User";

export default async (req, res) => {
  const { method } = req;
  console.log(1);
  switch (method) {
    case "POST":
      if (req.body.email.trim() === "") {
        return res.status(400).json({ email: "Should not be empty" });
      } else {
        const regEx = /^([0-9a-zA-Z]([-.w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-w]*[0-9a-zA-Z].)+[a-zA-Z]{2,9})$/;
        if (!req.body.email.trim().match(regEx)) {
          return res.status(400).json({ email: "Enter a valid email" });
        }
      }
      if (req.body.password.trim() === "") {
        return res.status(400).json({ password: "Should not be empty" });
      }
      try {
        const oldUser = await UserModal.findOne({ email: req.body.email });
        if (!oldUser) {
          return res.status(404).json({ message: "User doesn't exist" });
        }
        const isPassCorrect = await bcrypt.compare(
          req.body.password,
          oldUser.password
        );
        if (!isPassCorrect) {
          return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign(
          { email: oldUser.email, id: oldUser.id },
          "secretkey",
          { expiresIn: "1h" }
        );
        res.status(200).json({ result: oldUser, token });
      } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(err);
      }
  }
};
