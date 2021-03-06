import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import {
  Card,
  CardActionArea,
  CardActions,
  Typography,
  CardContent,
  Grid,
  Button,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

import styles from "../styles/Home.module.css";

export default function Index({ products, total }) {
  const router = useRouter();
  const handleChange = (e, val) => {
    router.push(`/products/${val}/5`);
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Pagination
        count={total}
        page={1}
        showFirstButton
        showLastButton
        onChange={handleChange}
        style={{ marginBottom: "10px" }}
      />
      <Grid
        container
        direction="row"
        spacing={4}
        wrap="wrap"
        justify="center"
        alignItems="center"
      >
        {products.map((product, index) => (
          <Grid style={{margin:'0px'}} key={product._id} item xs={12} sm={6} md={3} lg={4}>
            <Card variant="outlined">
              {/* <Link href={`/product/${product.fields.title}`}> */}
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    <Link href={`/products/${product.fields}`}>
                      <a>
                        {index + 1 + ". "}
                        {product.name}
                      </a>
                    </Link>
                  </Typography>
                  <Typography variant="caption">{product.price}</Typography>
                </CardContent>
                <Image
                  src={product.image}
                  alt={product.name}
                  layout="responsive"
                  width={300}
                  height={300}
                />
              </CardActionArea>
              <CardActions>
                <Link href={`/product/${product._id}`}>
                  <Button variant="contained" color="primary">
                    <a>Details</a>
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={total}
        page={1}
        showFirstButton
        showLastButton
        onChange={handleChange}
        style={{ marginTop: "10px" }}
      />
    </div>
  );
}

export const getStaticProps = async () => {
  const res = await axios.get(
    "http://localhost:3000/api/products?page=1&limit=2"
  );
  console.log("pro", res.data);
  return {
    props: {
      products: res.data.products,
      total: res.data.paginationInfo.totalPage,
    },
  };
};
