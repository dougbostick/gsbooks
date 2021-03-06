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
    },
  });
  const classes = useStyles();
  console.log(props);

  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableCell>Title</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Details</TableCell>
        </TableHead>
        <TableBody>
          {props.products
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((book) => (
              <TableRow>
                <TableCell>{<img src={book.thumbUrl}></img>}</TableCell>
                <TableCell
                  align="right"
                  component="th"
                  scope="row"
                  className={classes.cell}
                >
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
              rowsPerPageOptions={[101]}
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
