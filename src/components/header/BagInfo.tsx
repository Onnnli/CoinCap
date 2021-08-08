import React, { FC } from 'react';

const BagInfo: FC<any> = ({ wallet, diff, diffPercent, onClick }) => {
  return (
    <div onClick={() => onClick()}>
      Wallet : {wallet?.toFixed(2)}USD {diff?.toFixed(2)} (
      {diffPercent?.toFixed(2)}
      %)
    </div>
  );
};

export default BagInfo;
