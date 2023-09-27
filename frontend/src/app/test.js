import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../redux/actions';
import { selectCounter } from '../redux/selectors';

const CounterComponent = () => {
  const counter = useSelector(selectCounter);
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  return (
    <div>
      <button onClick={handleIncrement}>Increment</button>
      <span>{counter}</span>
      <button onClick={handleDecrement}>Decrement</button>
    </div>
  );
};

export default CounterComponent;
