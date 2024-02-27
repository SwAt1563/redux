// get counter slice
import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
  incrementByAmount,
  reset,
} from "../../features/counter/counterSlice";
import { useState } from "react";

const Counter = () => {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();

  const [incrementAmount, setIncrementAmount] = useState(0);

  const value = Number(incrementAmount) || 0;

  const handleReset = () => {
    dispatch(reset());
    setIncrementAmount(0);
  };

  return (
    <>
      <h1 >Counter</h1>
      <div>
        <span>{count}</span>
        <button onClick={() => dispatch(decrement())}>-</button>
        <button onClick={() => dispatch(increment())}>+</button>
        <input
          type="text"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button onClick={() => dispatch(incrementByAmount(value))}>
          Add Amount
        </button>
        <button onClick={() => handleReset()}>Reset</button>
      </div>
    </>
  );
};

export default Counter;
