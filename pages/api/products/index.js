import Product from "../../../model/Product";
import "../../../util/dbConnect";

export default async (req, res) => {
  const { method } = req;
  console.log(req.method);
  switch (method) {
    case "GET":
      const page = +req.query.page;
      const limit = +req.query.limit;
      console.log({ page, limit });
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      try {
        let products;
        const allProducts = await Product.find();
        if (startIndex + 1 < allProducts.length) {
          products = await Product.find().limit(limit).skip(startIndex);
        } else {
          products = await Product.find();
        }
        const paginationInfo = {};
        paginationInfo.totalPage = Math.ceil(allProducts.length / limit);
        if (products) {
          if (endIndex < allProducts.length) {
            paginationInfo.nextPage = {
              page: page + 1,
            };
          }
          if (startIndex !== 0) {
            paginationInfo.prevPage = {
              page: page - 1,
            };
          }
          console.log(paginationInfo);
          res.status(200).json({
            products,
            paginationInfo,
          });
        }
      } catch (err) {
        return res.status(400).json({ message: "Error" });
      }
  }
};
