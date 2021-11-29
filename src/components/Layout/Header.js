import React from 'react';
import HeaderCartButton from './HeaderCartButton.js';
import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css' 

function Header(props) {
  return (
    <>
      <header className={classes.header}>
        <h1>FooD APP</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt='Full of delicious meals'/>
      </div>
    </>
  );
}

export default Header;
