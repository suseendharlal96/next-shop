import User from "../../model/User";

import auth from "../../util/authMiddleware";

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      const data = await auth(req);
      const id = req.query.id;
      const user = await User.findById(data.userId);
      if (user) {
        console.log(id)
        const singleOrder = user.order.find((or) => +or.product._id == +id);
        return res.status(200).json({ singleOrder });
      }
  }
};
