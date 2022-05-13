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

function MuiCart(props) {
  const { userCartItems } = props;
  console.log("cart items", userCartItems);
  console.log("cartitem state", props.state);
  const inventory = new Array(10);
  for (let i = 0; i < inventory.length; i++) {
    inventory[i] = i + 1;
  }
  const total = props.state.cartItem.length
    ? props.state.cartItem
        .filter((item) => !item.purchased)
        .map((item) => item.quantity * (item.price / 100))
    : null;
  console.log("total", total);

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
      padding: "1rem",
      // width: "500px",
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
      alignItems: "center",
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
      marginLeft: "18rem",
      marginRight: "18rem",
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
            <TableCell className={classes.owner}>
              {props.state.auth.username}'s Cart
            </TableCell>
          </TableHead>
          <TableBody>
            {userCartItems.map((item) => {
              if (item.purchased === false)
                return (
                  <div key={item.id}>
                    <TableRow>
                      <TableCell
                        align="right"
                        component="th"
                        scope="row"
                        className={classes.cell}
                        style={{ width: "180px" }}
                      >
                        {
                          props.state.products.find(
                            (product) => product.id === item.productId
                          ).name
                        }
                      </TableCell>

                      <TableCell
                        component="th"
                        scope="row"
                        className={classes.cell}
                        style={{ width: "100px" }}
                      >
                        {item.price / 100}
                      </TableCell>
                      <TableCell style={{ width: "60px" }}>
                        {item.quantity}
                      </TableCell>
                      <TableCell className={classes.quantity}>
                        Change Quantity:
                        <form>
                          <select
                            onChange={(ev) =>
                              props.updateQuantity(
                                item,
                                Number(ev.target.value)
                              )
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
                          onClick={() => props.deleteCartItem(item)}
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
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell className={classes.total}>
                Total: $
                {props.state.cartItem.length
                  ? total.reduce((a, b) => {
                      return a + b;
                    }, 0)
                  : 0}
                <Box className={classes.stripe}>
                  <Stripe />
                </Box>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
}

const mapStateToProps = (state) => {
  //For each cartItem in the cart, return if the cartitems userId matches whoever is currently logged in. This is added to props in line 78.
  const userCartItems = state.cartItem.filter(
    (item) => item.userId === state.auth.id
  );
  return {
    userCartItems,
    state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCartItem: (cartItem) => dispatch(deleteCartItem(cartItem)),
    updateQuantity: async (cartItem, quantity) =>
      await dispatch(updateQuantity(cartItem, quantity)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MuiCart);
