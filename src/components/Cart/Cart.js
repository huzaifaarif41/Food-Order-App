import React, { Fragment, useContext, useState } from 'react';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import Checkout from './Checkout';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';

const Cart = (props) => {
  const [isCheckOut, setIsCheckOut] = useState(false); //initially false because we are not initially Checkout
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckOut(true); //because when we click order button, IsCheckOut is true then..
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true); //Submitting State is true and then i wanna wait fetch function to finish so we use async and await this fetch func
    const response = await fetch(
      'https://food-order-e3e42-default-rtdb.firebaseio.com/orders.json',
      {
        method: 'POST',
        body: JSON.stringify({
          user: userData, //userData which we get here as an argument from onConfirm prop
          orderedItems: cartCtx.items, //cartCtx which we get our items. And thats data which we send to the backend..
        }), //because we need to send JSON data to firebase
      }
    ); //json is mandatory because of firebase needs that and orders is a node
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart(); //to clear Cart after we can order.. 
  };
  //because when we submit the order,we have all the user Data which weget from props.onConfirm prop from checkout file

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <Fragment>
      <Modal onClose={props.onClose}>
        {cartItems}
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>

        {isCheckOut && (
          <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
        )}
        {!isCheckOut && modalActions}
      </Modal>
    </Fragment>
  );
  const isSubmittingModalCartContent = <p> Sending Order Data</p>;

  const didSubmitModalContent = (
    <Fragment>
      <p> Successfully Sent the Order</p>
      <button className={classes.button} onClick={props.onClose}>
        Close
      </button>
    </Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalCartContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
//onClose prop we defined earlier to close, and then in CheckOut component, We gave onClick prop to give {props.onCancel{} to Cancel button because that is our custom component and in Cart.js we gave onCancel prop which we expect and gave {onClose} to close the checkout form because we gave that custom function prop earlier.
