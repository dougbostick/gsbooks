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
import TablePagination from "@material-ui/core/TablePagination";
import TableFooter from "@material-ui/core/TableFooter";

function PastOrders({ auth, cartItem, products }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
      //   height: "400px",
      //   width: "800px",
      // backgroundColor: "#3f51b5",
    },
    cell: {
      textAlign: "center",
      width: "100px",
      fontSize: "18px",
    },
    thumb: {
      height: "80px",
      width: "50px",
    },
    thumbCell: {
      width: "100px",
    },
  });
  const classes = useStyles();
  //   console.log(props);
  //   const thumb = products.find(
  //     (product) => product.id === book.productId
  //   ).thumbUrl;

  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableCell></TableCell>
          <TableCell>Title</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Quantity</TableCell>
        </TableHead>
        <TableBody>
          {cartItem
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((book) => {
              const thumb = products.find(
                (product) => product.id === book.productId
              ).thumbUrl;
              return book.purchased === true ? (
                <TableRow key={book.id}>
                  <TableCell className={classes.thumbCell}>
                    <Link to={`/products/${book.id}`}>
                      {<img src={thumb} className={classes.thumb}></img>}
                    </Link>
                  </TableCell>
                  <TableCell
                    align="right"
                    component="th"
                    scope="row"
                    className={classes.cell}
                    style={{ width: "200px" }}
                  >
                    {
                      products.find((product) => product.id === book.productId)
                        .name
                    }
                  </TableCell>

                  <TableCell
                    component="th"
                    scope="row"
                    className={classes.cell}
                  >
                    {book.price / 100}
                  </TableCell>
                  <TableCell className={classes.cell}>
                    {book.quantity}
                  </TableCell>
                </TableRow>
              ) : null;
            })}
        </TableBody>
        <TableFooter>
          <TablePagination
            component="div"
            rowsPerPageOptions={[5, 10]}
            count={101}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default connect((state) => state)(PastOrders);

// const PastOrders = ({ auth, cartItem, products }) => {
//   return (
//     <div>
//       <h2> {auth.username}'s Past Orders </h2>
//       {cartItem.map((item) => {
//         return item.purchased === true ? (
//           <div key={item.id}>
//             <p>
//               Product:{" "}
//               {products.find((product) => product.id === item.productId).name}{" "}
//             </p>
//             <p>Quantity: {item.quantity}</p>
//           </div>
//         ) : null;
//       })}
//     </div>
//   );
// };
