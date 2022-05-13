import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import { deleteCartItem, updateQuantity } from "../store/cart-item";
import Stripe from "./Stripe";
import TableFooter from "@material-ui/core/TableFooter";
import { Button } from "@material-ui/core";
import { Box } from "@material-ui/core";

function MuiGuestCart(props) {
  const guestCart = JSON.parse(window.localStorage.getItem("guest_cart"));
  console.log("gc", guestCart);
  const inventory = new Array(10);
  for (let i = 0; i < inventory.length; i++) {
    inventory[i] = i + 1;
  }

  const remove = (item) => {
    const updatedCart = guestCart.filter((cartItem) => {
      return item.product.id !== cartItem.product.id;
    });
    window.localStorage.setItem("guest_cart", JSON.stringify(updatedCart));
    props.history.push("/cartItem");
  };

  const updateQuantity = (cartItem, num) => {
    for (let item = 0; item < guestCart.length; item++) {
      if (guestCart[item].product.id == cartItem.product.id) {
        guestCart[item].quantity = num;
        window.localStorage.setItem("guest_cart", JSON.stringify(guestCart));
        props.history.push("/cartItem");
      }
    }
  };

  const total = guestCart
    ? guestCart.map((item) => item.quantity * (item.product.price * 1))
    : null;
  console.log("total", total);

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
      padding: "1rem",
      width: "500px",
      justifyContent: "center",
      backgroundColor: "white",
      boxShadow: "0 0 25px 4px rgb(0, 0, 0, .25)",
    },
    root: {
      flexGrow: 1,
    },
    container: {
      display: "flex",
      justifyContent: "center",
      // backgroundColor: "#3f51b5",
    },
    cell: {
      textAlign: "center",
      fontSize: "16px",
    },
    stripe: {
      display: "flex",
      justifyContent: "center",
      margin: "8px",
    },
    main: {
      display: "flex",
      flexDirection: "column",
    },
    total: {
      fontSize: "18px",
    },
    quantity: {
      display: "flex",
      justifyContent: "center",
      textAlign: "left",
      fontSize: "16px",
      alignItems: "center",
    },
    owner: {
      fontSize: "20px",
    },
  });
  const classes = useStyles();

  return (
    <Box className={classes.main}>
      <TableContainer component={Paper} className={classes.container}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableCell className={classes.owner}>Guest Cart</TableCell>
          </TableHead>
          <TableBody>
            {guestCart
              ? guestCart.map((item) => {
                  return (
                    <div key={item.id}>
                      <TableRow>
                        <TableCell
                          align="right"
                          component="th"
                          scope="row"
                          className={classes.cell}
                          style={{ width: "200px" }}
                        >
                          {item.product.name}
                        </TableCell>

                        <TableCell
                          component="th"
                          scope="row"
                          className={classes.cell}
                        >
                          {item.product.price}
                        </TableCell>
                        <TableCell className={classes.cell}>
                          {item.quantity}
                        </TableCell>
                        <TableCell className={classes.quantity}>
                          Change Quantity:
                          <form>
                            <select
                              onChange={(ev) =>
                                updateQuantity(item, Number(ev.target.value))
                              }
                            >
                              <option>{item.quantity}</option>
                              {inventory.map((inv) => {
                                return (
                                  <option value={inv} key={inv}>
                                    {inv}
                                  </option>
                                );
                              })}
                            </select>
                          </form>
                        </TableCell>

                        <TableCell>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => remove(item)}
                            style={{
                              width: "120px",
                              height: "45px",
                              fontSize: "10px",
                            }}
                          >
                            Remove from Cart
                          </Button>
                        </TableCell>
                      </TableRow>
                    </div>
                  );
                })
              : null}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell className={classes.total}>
                Total: $
                {guestCart
                  ? total.reduce((a, b) => {
                      return a + b;
                    }, 0)
                  : 0}
                <Box className={classes.stripe}>
                  <Stripe gcTotal={total} history={props.history} />
                </Box>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default connect((state) => state)(MuiGuestCart);
