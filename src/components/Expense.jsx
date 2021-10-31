import React, { useContext } from 'react';
import {Globalcontext} from '../Hooks/GlobalState';

export const Expense = () => {
  const {transactions} = useContext(Globalcontext);
  const amounts = transactions.map(transaction => transaction.amount);

  const Income = amounts
  .filter(item => item > 0)
  .reduce((acc, item) => (acc += item), 0)
  .toFixed(2);
  
  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc+=item), 0)*-1
  ).toFixed(2);
    
    return (
        <div className="inc-exp-container">
        <div>
          <h4>Profit</h4>
          <p id="money-plus" className="money plus">{Income}</p>
        </div>
        <div>
          <h4>Total Invested</h4>
          <p id="money-minus" className="money minus">{expense}</p>
        </div>
        <div>
          <h4>Loss</h4>
          <p>NaN</p>
        </div>
      </div>
    )
}