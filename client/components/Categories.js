import React from 'react';
import { connect } from 'react-redux';

const Categories = (props) => {
  const categories = props.categories.map((category) => {
    return (
      <div key={category.id}>
        <li> {category.name} </li>
      </div>
    )
  });
  
  return (
    <div>
      Categories:
      {categories}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
  };
};

export default connect(mapStateToProps)(Categories);