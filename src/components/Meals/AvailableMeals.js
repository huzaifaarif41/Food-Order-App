import React, { useEffect, useState } from 'react';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';

function AvailableMeals() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(); //undefined because I wanna show some error message and initially I dont have any value

  useEffect(async () => {
    const fetchMeals = async () => {
      const response = await fetch(
        'https://food-order-e3e42-default-rtdb.firebaseio.com/meals.json'
      ); //we use now async await to get a response for fetching our meals

      if (!response.ok) {
        throw new Error('Something Went Wrong');
      }
      const responseData = await response.json(); //and then for fetch(), we can parse data, we can get our response by caliing response.json() which also returns a promise hence we also called a await keyword here

      const loadedMeals = []; //in firebase, we have a keys and the keys will be ids here and then in a specific key, the values for those keys will be the nested objects and i want an array

      for (const key in responseData) {
        loadedMeals.push({
          id: key, //we such have an id prop because we do expect that our meals have an id field so we make sure that we transform the loadedData such that we do have an id field here and then we can give a key because key will be the id in database.
          name: responseData[key].name, //name can be pulled out of the responseData for the given key. with that, we have an access the nested object in there and then nested object have a name .
          description: responseData[key].description,
          price: responseData[key].price,
        }); //
      } //we use for in loop to go through all the ids, all the keys in responseData

      setMeals(loadedMeals); //we use meals to map the mealItem and initially they have an empty array again, but once change the loadedData is there. and here after For loop, once we filled our loadedMeals helper constant here with transformed data, from that which we setting a data and therefore then, the component should update.
      setIsLoading(false); // because we are definitely done loading
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });  //Another advantage for using seperate function for wrapping that fetch logic, that fetchMeal function will now throw an error if something goes wrong with sending request, therefore, we can go where we call fetchMeals(), and it is inside of useEffect but outside of fetchMeals() function, and we can simply wrap this try-catch and then if fetchMeals() throw an error and its a case here, then we make it to catch block and we can have access to that error here by using try-catch and in catch block,it has access to error object and to be precise, error has a property of message so error.message will given because when we throw an error and inside have a string which has an error, it will directly throw that string to message property.
    //link of the whole database and then we need a meals node here so call meals.json..json is firebase specific which we have to add....fetch returns a promise because sending http request is a asynchronous task
  }, []); 
  //I want to fetch my meals data from firebase when this component is loaded and we can utilize useEffect hook for this to trigger a side effect like data fetching data from web.
  //the function you pass on useEffect should not return a promise instead a function you pass to useEffect may return a cleanup function which can be executed and that func is a synchronously task. Hence, overall function which we pass in useEffect must not be returned into an async funciton
  //we made a const to add a func which is async and then execute fetchMeals as part of useEffect ,,,by doing it that way, this func is still executed and you can still use async await but now, overall useEffect function is now, not return a promise, its now not an async function because we now not add async in useEffect(async ()) here and that is not allowed.
  
  //if we use try-catch in that case so fetchMeals is an async function which returns a promise, so if we throw an error inside of a promise, that error will cause that promise to reject. So we cant use try-catch to wrap it,unless we also await this fetchMeals() func for which we also need to turn our useEffect() func into async function but we are not allowed to do that.. We could also make a seperate function which we call thereafter, so we have 2 different functions, one for sending http request and one for handling Error but here its easy to use the fact that its a promise and add the catch method on it to handle errors So that a traditional way to handling an errror inside of a promise.  
  if (isLoading) {
    //we dont make it to the code down there if we have a loading
    return (
      <section className={classes.mealsLoading}>
        <p>Loading ...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.mealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>{mealsList}</Card>
    </section>
  );
}

export default AvailableMeals;
