import User from "../../model/User";

import auth from "../../util/authMiddleware";

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      const data = await auth(req);
      console.log(data);
      const user = await User.findById(data.userId);
      console.log(user);
      if (user) {
        return res.status(200).json({ orders: user.order });
      }
  }
};
