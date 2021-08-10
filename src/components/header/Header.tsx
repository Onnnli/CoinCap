import React, { FC, memo, useState } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import numeral from 'numeral';

import { accessSelector } from '../../redux/app/appSelectors';
import BagButton from '../buttons/BagButton';
import {
  differencePercentSelect,
  differenceSelect,
  walletSelect,
} from '../../redux/wallet/walletSelectors';
import ModalWrapper from '../ModalWrapper';
import Bag from '../Bag';
import { IAccess } from '../../interfaces/access';

const Header: FC = () => {
  const access = useSelector(accessSelector);
  const topCoin = access?.slice(0, 3);

  const [show, setShow] = useState<boolean>(false);

  const wallet = useSelector(walletSelect);
  const difference = useSelector(differenceSelect);
  const differencePercent = useSelector(differencePercentSelect);

  const openBag = () => {
    setShow(true);
  };

  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <div className="top-coin">
            {topCoin?.map((topCoin: IAccess) => (
              <div key={topCoin.id} className="top-coin__block">
                <img
                  className="top-coin__img"
                  alt="logotype"
                  src={`https://static.coincap.io/assets/icons/${topCoin.symbol.toLowerCase()}@2x.png`}
                />
                <h4 className="top-coin__title">{topCoin.symbol}</h4>
                <span className="top-coin__subtitle">
                  {numeral(topCoin.priceUsd).format('($ 0.00)')}
                </span>
              </div>
            ))}
          </div>
          <BagButton
            onClick={openBag}
            wallet={wallet}
            difference={difference}
            differencePercent={differencePercent}
          />
        </Container>
      </Navbar>
      <ModalWrapper title="Your bag" show={show} onHide={() => setShow(false)}>
        <Bag />
      </ModalWrapper>
    </>
  );
};

export default memo(Header);
