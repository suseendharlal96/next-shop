import React, { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const SingleOrder = () => {
  const router = useRouter();
  useEffect(() => {
    getSingleOrder();
  }, []);
  const getSingleOrder = async () => {
    const res = await axios.get(
      `http://localhost:3000/api/singleOrder/?id=${router.query.id}`,
      {
        headers: {
          Authorization: `Bearer ${
            localStorage.getItem("token") ? localStorage.getItem("token") : null
          }`,
        },
      }
    );
    console.log(res.data);
  };
  return <div>SingleOrder</div>;
};

export default SingleOrder;

// export const getStaticProps = async ({ params }) => {
//   const { id } = params;
//   const res = await axios.get("http://localhost:3000/api/singleOrder/${id}", {
//     headers: {
//       Authorization: `Bearer ${
//         localStorage.getItem("token") ? localStorage.getItem("token") : null
//       }`,
//     },
//   });
//   console.log(res.data);
//   return {
//     props: {
//       order: res.data,
//     },
//   };
// };

// export const getStaticPaths = async () => {
//   const res = await axios.get("http://localhost:3000/api/orders", {
//     headers: {
//       Authorization: `Bearer ${
//         localStorage.getItem("token") ? localStorage.getItem("token") : null
//       }`,
//     },
//   });

//   const orders = res.data.orders;

//   const paths = orders.map((order) => ({
//     params: { id: order.product.id },
//   }));

//   return {
//     paths,
//     fallback: true,
//   };
// };
