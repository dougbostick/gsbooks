import React from 'react';
import { connect } from 'react-redux';

const Users = (props) => {
   const users = props.users.map(
     (user) => {
       return (
         <div key={user.id}>
          <li>
            {user.username}
          </li>
          {/* why won't this info show??? */}
          <div>{user.firstName}</div>
          <div>{user.lastName}</div>
         </div>
       )
     });

    return (
    <div>
      Users:
      {users}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users
  };
};

export default connect(mapStateToProps)(Users)