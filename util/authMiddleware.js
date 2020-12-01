const jwt = require("jsonwebtoken");

export default async (req, res, next) => {
  try {
    console.log(req.headers.authorization);
    const token = req.headers.authorization.split(" ")[1];
    const decodedData = jwt.decode(token);
    console.log(decodedData, typeof decodedData.id);
    if (decodedData) {
      req.userId = decodedData.id;
      return req;
    }
  } catch (error) {
    console.log(error);
  }
};
