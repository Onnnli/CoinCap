import React, { FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';

import { walletInfoSelect } from '../../redux/wallet/walletSelectors';
import { walletActions } from '../../redux/wallet/walletActions';
import numeral from 'numeral';

interface IBag {
  onClose: () => void;
}

const Bag: FC<IBag> = ({ onClose }) => {
  const dispatch = useDispatch();
  const walletInformation = useSelector(walletInfoSelect);

  const clickHandler = useCallback(
    (id: any, amount: number, price: string | number) => {
      dispatch(walletActions.deleteRequest({ id, amount, price }));
      onClose();
    },
    [dispatch, onClose]
  );

  return (
    <div className="bag-coin">
      {Object.values(walletInformation).map((coin: any) => (
        <div key={coin.id} className="bag-coin__item">
          <h4>{coin.name}</h4>
          <h4>{numeral(coin.price).format('($ 0.00)')}</h4>
          <h4>{coin.amount}</h4>
          <Button
            onClick={() => clickHandler(coin.id, coin.amount, coin.price)}
          >
            delete
          </Button>
        </div>
      ))}
    </div>
  );
};

export default Bag;
