import React, { FC, memo, useState } from 'react';
import { Container, Navbar, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { accessSelector } from '../../redux/app/appSelectors';
import { formatter } from '../../utils/formatter';
import BagInfo from './BagInfo';
import {
  differencePercentSelect,
  differenceSelect,
  walletSelect,
} from '../../redux/wallet/walletSelectors';
import ModalWrapper from '../modals/ModalWrapper';
import Bag from '../modals/Bag';

const Header: FC<any> = () => {
  const access = useSelector(accessSelector);
  const topCrypto = access?.slice(0, 3);
  const [show, setShow] = useState(false);

  const wallet = useSelector(walletSelect);
  const diff = useSelector(differenceSelect);
  const diffPercent = useSelector(differencePercentSelect);

  const openWallet = () => {
    setShow(true);
  };

  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">Coincap</Navbar.Brand>
          <Row>
            {topCrypto?.map((elem: { [K: string]: string | number }) => (
              <div key={elem.id}>
                <h4>{elem.symbol}</h4>
                <span>{formatter.format(Number(elem.priceUsd))}m</span>
              </div>
            ))}
            <BagInfo
              onClick={openWallet}
              wallet={wallet}
              diff={diff}
              diffPercent={diffPercent}
            />
          </Row>
        </Container>
      </Navbar>
      <ModalWrapper show={show} onHide={() => setShow(false)}>
        <Bag />
      </ModalWrapper>
    </>
  );
};

export default memo(Header);
