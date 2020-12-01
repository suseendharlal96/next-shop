import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import axios from "axios";
import {
  Card,
  CardMedia,
  CardActionArea,
  CardActions,
  Typography,
  CardContent,
  Grid,
  Button,
} from "@material-ui/core";

import styles from "../../styles/Home.module.css";

export default function Orders({ products }) {
  const router = useRouter();
  const authData = useSelector((state) => state.authReducer?.authData);
  console.log(authData);
  const [orders, setOrders] = useState(null);
  useEffect(() => {
    if (!authData) {
      router.push("/auth");
    } else {
      getOrders();
    }
  }, []);
  const getOrders = async () => {
    const res = await axios.get("http://localhost:3000/api/orders", {
      headers: {
        Authorization: `Bearer ${
          localStorage.getItem("token") ? localStorage.getItem("token") : null
        }`,
      },
    });
    setOrders(res.data.orders);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      orders
      <Grid
        container
        direction="row"
        spacing={4}
        wrap="wrap"
        justify="center"
        alignItems="center"
      >
        {orders &&
          orders.map((order, index) => (
            <Grid
              style={{ margin: "0px" }}
              key={order.product._id}
              item
              xs={12}
              sm={6}
              md={3}
              lg={4}
            >
              <Card variant="outlined">
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {index + 1 + ". "}
                      {order.product.name}
                    </Typography>
                    <Typography variant="caption">
                      {order.product.price}
                    </Typography>
                  </CardContent>
                  <CardMedia
                    style={{ height: "150px", width: "150px" }}
                    image={order.product.image}
                    title={order.product.name}
                  />
                </CardActionArea>
                <CardActions>
                  <Link href={`/orders/${order.product._id}`}>
                    <Button variant="contained" color="primary">
                      <a>Details</a>
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </div>
  );
}

// export const getStaticProps = async (context) => {
//   console.log(context);
//   const res = await axios.get("http://localhost:3000/api/orders", {
//     headers: {
//       Authorization: `Bearer ${
//         context.req ? context.req.headers.cookie : null
//       }`,
//     },
//   });
//   console.log("pro", res.data);
//   return {
//     props: {
//       products: res.data.orders,
//     },
//   };
// };
