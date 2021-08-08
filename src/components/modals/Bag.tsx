import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';

import { walletInfoSelect } from '../../redux/wallet/walletSelectors';
import { walletActions } from '../../redux/wallet/walletActions';

const Bag = () => {
  const dispatch = useDispatch();
  const walletInformation = useSelector(walletInfoSelect);

  const clickHandler = (id: any, amount: number, price: string | number) => {
    dispatch(walletActions.deleteRequest({ id, amount, price }));
  };

  return (
    <div>
      {Object.values(walletInformation).map((elem: any) => (
        <div key={elem.id}>
          <h4>{elem.name}</h4>
          <h4>{elem.price}</h4>
          <h4>{elem.amount}</h4>
          <Button
            onClick={() => clickHandler(elem.id, elem.amount, elem.price)}
          >
            delete
          </Button>
        </div>
      ))}
    </div>
  );
};

export default Bag;
