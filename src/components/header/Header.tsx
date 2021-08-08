import React, { FC, memo, useState } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import numeral from 'numeral';

import { accessSelector } from '../../redux/app/appSelectors';
import BagInfo from './BagInfo';
import {
  differencePercentSelect,
  differenceSelect,
  walletSelect,
} from '../../redux/wallet/walletSelectors';
import ModalWrapper from '../modals/ModalWrapper';
import Bag from '../modals/Bag';
import { IAssets } from '../../Interfaces/assets';

const Header: FC = () => {
  const access = useSelector(accessSelector);
  const topCoin = access?.slice(0, 3);

  const [show, setShow] = useState(false);

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
          <Navbar.Brand href="/">Coincap</Navbar.Brand>
          <div className="top-coin-wrapper">
            {topCoin?.map((topCoin: IAssets) => (
              <div key={topCoin.id} className="top-coin-block">
                <h4>{topCoin.symbol}</h4>
                <span>{numeral(topCoin.priceUsd).format('($ 0.00)')}</span>
              </div>
            ))}
            <BagInfo
              onClick={openBag}
              wallet={wallet}
              difference={difference}
              differencePercent={differencePercent}
            />
          </div>
        </Container>
      </Navbar>
      <ModalWrapper title="Your bag" show={show} onHide={() => setShow(false)}>
        <Bag onClose={() => setShow(false)} />
      </ModalWrapper>
    </>
  );
};

export default memo(Header);
