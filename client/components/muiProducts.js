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
import Api from "./ImgApi";
import TableFooter from "@material-ui/core/TableFooter";

function ProductsTable(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [products, setProducts] = React.useState([]); //argument for useState is initialstate of products

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
    },
    root: {
      flexGrow: 1,
    },
  });
  const classes = useStyles();

  console.log(props);
  // console.log("products", products);
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead></TableHead>
        <TableBody>
          {props.products
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((book) => (
              <TableRow>
                <TableCell>{/* {<Api book={book} />} */}</TableCell>

                <TableCell align="right" component="th" scope="row">
                  {book.name}
                </TableCell>

                <TableCell component="th" scope="row">
                  {book.price}
                </TableCell>
                <TableCell>
                  <Link to={`/products/${book.id}`}> Find out More </Link>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              component="div"
              rowsPerPageOptions={[5, 10, 15]}
              count={101}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default connect((state) => state)(ProductsTable);
