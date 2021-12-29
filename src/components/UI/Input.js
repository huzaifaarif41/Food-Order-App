import React from 'react';
import classes from './Input.module.css';

const Input = React.forwardRef((props, ref) => {

//We use forwardRef because it is a custom component and then forwardRef and then it gives a ref prop and then use inside of your component functionto forward that ref into input tag here and then it gives a ref to forwardRef to an input component in MealItemForm 
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input} />
    </div>
  );
});
//if an input object in htmlFor is for example {type:'text} so here in input where ...props.input is written, it will make sure that this type is being added.

export default Input;
