import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { AppBar, Toolbar, Typography, Button, Avatar } from "@material-ui/core";

import useSusee from "./navstyles";
import * as actionType from "../store/actions/actionType";
// import defaultProfile from "/default.jpg";

const Navbar = () => {
  const classes = useSusee();
  const router = useRouter();
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.authReducer?.authData);
  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    router.push("/auth");
  };
  return (
    <AppBar
      className={classes.appBar}
      position="fixed"
      padding={3}
      color="inherit"
    >
      <Toolbar className={classes.toolbar}>
        <Typography
          onClick={() => router.push("/")}
          variant="h6"
          align="left"
          className={classes.heading}
        >
          Next Shop
        </Typography>
        {/* <img src={memory} alt="memory" className={classes.image} height="60" /> */}
        {authData ? (
          <>
            <Avatar
              alt={authData.name ? authData.name : authData.email}
              src={
                authData.imageUrl
                  ? authData.imageUrl
                  : authData.profile
                  ? authData.profile
                  : "/default.jpg"
              }
            />
            <Typography align="right">
              <Link href="/cart">
                <Button variant="contained" color="primary">
                  <a>Cart</a>
                </Button>
              </Link>
            </Typography>
            <Typography align="right">
              <Link href="/orders">
                <Button variant="contained" color="primary">
                  <a>Orders</a>
                </Button>
              </Link>
            </Typography>
            <Typography align="right">
              {authData.name ? authData.name : authData.email}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </>
        ) : (
          <Link href="/auth">
            <Button
              variant="contained"
              className={classes.logout}
              color="primary"
            >
              <a>Signin</a>
            </Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
