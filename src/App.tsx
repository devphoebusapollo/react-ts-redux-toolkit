import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { incremented, amountAdded } from "./features/counter/counter-slice";
import { useFetchBreedQuery } from "./features/dogs/dogs-api-slice";
import "./App.css";

function App() {
  const [amount, setAmount] = useState<number>(0);
  const [numDogs, setNumDogs] = useState(5);

  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  const { data = [] } = useFetchBreedQuery(numDogs);

  const handleClick = () => {
    dispatch(incremented());
  };

  const handleAddAmount = () => {
    dispatch(amountAdded(amount));
  };

  const handleOnChange = (e: { target: HTMLInputElement }) => {
    setAmount(e.target.valueAsNumber);
  };

  return (
    <div className="App">
      <h1>Vite + React</h1>
      <div className="card">
        <p>{count}</p>
        <input
          type="number"
          value={amount}
          name="amount"
          onChange={handleOnChange}
        />
        <button onClick={handleAddAmount}>Add</button>
        <button onClick={handleClick}>Increment</button>
      </div>
      <div>
        <p>Dogs to fetch:</p>
        <select
          value={numDogs}
          onChange={(e) => setNumDogs(Number(e.target.value))}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>
      <div>
        <p>Numbers of Dogs Fetched: {data.length}</p>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Picture</th>
            </tr>
          </thead>
          <tbody>
            {data.map((breed) => (
              <tr key={breed.id}>
                <td>{breed.name}</td>
                <td>
                  <img src={breed.image.url} alt={breed.name} height={250} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
