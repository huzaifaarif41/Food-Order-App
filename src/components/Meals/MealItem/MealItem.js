import React, { useContext } from 'react';
import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';
import CartContext from '../../../store/cart-context';

function MealItem(props) {
  const cartCtx= useContext(CartContext);

  const price = `$${props.price.toFixed(2)}`;

  //here we add the addToCartHandler function which we get validated amount as a parameter and pass a pointer to MealItemForm to onAddToCart prop which I executing in the MealItemForm Component
  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id:props.id,
      name: props.name,
      amount: amount, //amount which we get here as a parameter in addToCartHandler function through form
      price: props.price
    })

  };
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description} </div>
        <div className={classes.price}>{price} </div>
      </div>

      <div>
        <MealItemForm onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
}

export default MealItem;
