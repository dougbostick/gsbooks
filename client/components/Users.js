import React from "react";
import { connect } from "react-redux";
import AddProduct from "./AddProduct";
import Products from "./Products";

const Users = (props) => {
  const { isAdmin, match, history } = props;
  console.log(match);
  const users = props.users.map((user) => {
    return (
      <tr key={user.id}>
        <td> {user.username} </td>
        <td> {user.email} </td>
        <td> {user.firstName} </td>
        <td> {user.lastName} </td>
        <td> {user.address} </td>
      </tr>
    );
  });

  return (
    <div>
      <div className="user-table">
        <h2> Users </h2>
        <table>
          <tbody>
            <tr>
              <th> Username </th>
              <th> Email </th>
              <th> First Name </th>
              <th> Last Name </th>
              <th> Address </th>
            </tr>
            {users}
          </tbody>
        </table>
      </div>

      <div className="admin-product-container">
        <h2> Products </h2>
        <AddProduct />
        <div>
          <Products match={match} history={history} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, { match }) => {
  return {
    users: state.users,
  };
};

export default connect(mapStateToProps)(Users);
