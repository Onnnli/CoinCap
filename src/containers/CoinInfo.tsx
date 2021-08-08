import React, { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Button, Container, Spinner } from 'react-bootstrap';

import { coinSelector, historyCoinSelector } from '../redux/app/appSelectors';
import Header from '../components/header/Header';
import { appActions } from '../redux/app/appActions';
import numeral from 'numeral';
import { IAssets } from '../Interfaces/assets';
import ModalWrapper from '../components/modals/ModalWrapper';
import CoinAddForm from '../components/forms/CoinAddForm';
import Chart from '../components/Chart';

const CoinInfo: FC = (props: any) => {
  const coinInfo = useSelector(coinSelector);
  const historyCoin = useSelector(historyCoinSelector);
  const [visible, setVisible] = useState<boolean>(false);
  const [chooseElem, setChooseElem] = useState<IAssets | undefined>();
  const [interval, setInterval] = useState<string>('d1');
  const dispatch = useDispatch();

  const { id } = props.match.params;

  const openForm = useCallback(
    (e, elemList: IAssets) => {
      e.stopPropagation();
      setChooseElem(elemList);
      setVisible(true);
    },
    [setChooseElem, setVisible]
  );

  useEffect(() => {
    dispatch(appActions.getCoinInfo(id));
  }, []);

  useEffect(() => {
    dispatch(appActions.getHistoryCoin(id, interval));
  }, [dispatch, id, interval]);

  if (!coinInfo) {
    return <Spinner animation="border" variant="primary" />;
  }

  return (
    <div className="layout">
      <Header />
      <Container>
        <section className="section-crypto">
          <div className="section-crypto__title">
            <img
              alt="logotype"
              style={{ height: '60px', width: '60px' }}
              src={`https://static.coincap.io/assets/icons/${coinInfo?.symbol?.toLowerCase()}@2x.png`}
            />
            <h1>
              {coinInfo.name}({coinInfo.symbol})
              <Badge bg="secondary">Rank: {coinInfo.rank}</Badge>
            </h1>
          </div>
          <div className="section-crypto__info">
            <div className="info-item">
              <span>Price</span>
              <h4>{numeral(coinInfo.priceUsd).format('($ 0.00)')}</h4>
            </div>
            <div className="info-item">
              <span>Change</span>
              <h4>{numeral(coinInfo.changePercent24Hr).format('0.00')}%</h4>
            </div>
            <div className="info-item">
              <span>Market Cap</span>
              <h4>{numeral(coinInfo.marketCapUsd).format('($ 0.00a)')}</h4>
            </div>
            <div className="info-item">
              <span>Volume (24Hr)</span>
              <h4>{numeral(coinInfo.volumeUsd24Hr).format('($ 0.00a)')}</h4>
            </div>
            <div className="info-item">
              <span>Supply</span>
              <h4>{numeral(coinInfo.supply).format('0.0a')}</h4>
            </div>
          </div>
          <div className="btn-block">
            <Button variant="primary" onClick={e => openForm(e, coinInfo)}>
              Add to bag
            </Button>
          </div>
          <Chart data={historyCoin} changeInterval={setInterval} />
        </section>
      </Container>

      <ModalWrapper
        title={chooseElem?.name}
        show={visible}
        onHide={() => setVisible(false)}
      >
        <CoinAddForm
          onClose={() => setVisible(false)}
          chooseElem={chooseElem}
        />
      </ModalWrapper>
    </div>
  );
};

export default CoinInfo;
