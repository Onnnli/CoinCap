import React, { FC } from 'react';

interface IBag {
  wallet: number;
  difference: number;
  differencePercent: number;
  onClick: () => void;
}
const BagInfo: FC<IBag> = ({
  wallet,
  difference,
  differencePercent,
  onClick,
}) => {
  return (
    <div onClick={onClick}>
      Wallet : {wallet?.toFixed(2)}USD {difference?.toFixed(2)} (
      {differencePercent?.toFixed(2)}%)
    </div>
  );
};

export default BagInfo;
