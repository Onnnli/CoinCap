import React, { FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table } from 'react-bootstrap';

import { walletInfoSelect } from '../redux/wallet/walletSelectors';
import { walletActions } from '../redux/wallet/walletActions';
import numeral from 'numeral';

const Bag: FC = () => {
  const dispatch = useDispatch();
  const walletInformation = useSelector(walletInfoSelect);

  const clickHandler = useCallback(
    (id: any, amount: number, price: string | number) => {
      dispatch(walletActions.deleteRequest({ id, amount, price }));
    },
    [dispatch]
  );

  return (
    <Table className="bag-coin">
      <thead>
        <tr className="bag-coin__header">
          <th>Name</th>
          <th>Price</th>
          <th>Amount</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {Object.values(walletInformation).map((coin: any) => (
          <tr key={coin.id} className="bag-coin__item">
            <td>{coin.name}</td>
            <td>{numeral(coin.price).format('($ 0.00)')}</td>
            <td>{coin.amount}</td>
            <td>
              <Button
                className="bag-coin__btn"
                onClick={() => clickHandler(coin.id, coin.amount, coin.price)}
              >
                delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
export default Bag;
