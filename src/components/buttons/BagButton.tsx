import React, { FC, memo } from 'react';
import numeral from 'numeral';
import { Button } from 'react-bootstrap';

interface IBagButton {
  wallet: number;
  difference: number;
  differencePercent: number;
  onClick: () => void;
}
const BagButton: FC<IBagButton> = ({
  wallet,
  difference,
  differencePercent,
  onClick,
}) => {
  return (
    <Button onClick={onClick} className="header-bag">
      <h4 className="header-bag__wallet">
        {numeral(wallet).format('($ 0.00)')}
      </h4>
      <h5 className="header-bag__item">
        {numeral(difference).format('(0.00)')}
      </h5>
      <h5 className="header-bag__item">
        {numeral(differencePercent).format('0.00')}%
      </h5>
    </Button>
  );
};

export default memo(BagButton);
