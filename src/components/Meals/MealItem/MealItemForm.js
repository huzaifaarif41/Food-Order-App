import React, { useRef, useState } from 'react';
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

function MealItemForm(props) {
  const [amountIsValid, setAmountIsValid] = useState(true);

  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount; //input has type of number but its automatically have a string in current.value so this is done by converting a string to number

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }
    //trim() use for removing any extra white spaces

    props.onAddToCart(enteredAmountNumber);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        //forwardRef is used for using a ref in an input component because it is a custom component and it doesn't work here so we put forwardRef in a Input Custom component.

        ref={amountInputRef}
        label='Amount'
        input={{
          id: 'amount',
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button> + Add</button>
      {!amountIsValid && <p>Please Enter a valid Amount (1-5)</p>}
    </form>
  );
}

export default MealItemForm;
