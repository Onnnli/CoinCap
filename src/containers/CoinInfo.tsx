import React, { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Button, Container, Spinner } from 'react-bootstrap';

import { coinSelector, historyCoinSelector } from '../redux/app/appSelectors';
import Header from '../components/header/Header';
import { appActions } from '../redux/app/appActions';
import numeral from 'numeral';
import { IAssets } from '../interfaces/assets';
import ModalWrapper from '../components/modals/ModalWrapper';
import AddCoinForm from '../components/forms/AddCoinForm';
import Chart from '../components/Chart';
import IntervalButtons from '../components/buttons/IntervalButtons';

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
    if (performance.navigation.type === 1) {
      dispatch(appActions.getCoinInfo(id));
    }
  }, [id]);

  useEffect(() => {
    dispatch(appActions.getHistoryCoin(id, interval));
  }, [dispatch, id, interval]);

  if (!coinInfo) {
    return <Spinner animation="border" variant="primary" />;
  }

  return (
    <div className="layout">
      <Header />
      <section className="coin-info">
        <Container>
          <div className="coin-info__wrapper">
            <div className="coin-info__title">
              <img
                className="coin-info__img"
                alt="logotype"
                src={`https://static.coincap.io/assets/icons/${coinInfo?.symbol?.toLowerCase()}@2x.png`}
              />
              <h1 className="coin-info__title">
                {coinInfo.name}({coinInfo.symbol})
                <Badge className="coin-info__rank" bg="success">
                  Rank: {coinInfo.rank}
                </Badge>
              </h1>
            </div>

            <div className="coin-info__info">
              <div className="coinInfo-info__item">
                <span>Price</span>
                <h4>{numeral(coinInfo.priceUsd).format('($ 0.00)')}</h4>
              </div>
              <div className="coinInfo-info__item">
                <span>Change</span>
                <h4>{numeral(coinInfo.changePercent24Hr).format('0.00')}%</h4>
              </div>
              <div className="coin-info__item">
                <span>Market Cap</span>
                <h4>{numeral(coinInfo.marketCapUsd).format('($ 0.00a)')}</h4>
              </div>
              <div className="coin-info__item">
                <span>Volume (24Hr)</span>
                <h4>{numeral(coinInfo.volumeUsd24Hr).format('($ 0.00a)')}</h4>
              </div>
              <div className="coin-info__item">
                <span>Supply</span>
                <h4>{numeral(coinInfo.supply).format('0.0a')}</h4>
              </div>
            </div>

            <Button
              className="coin-info__btn"
              onClick={e => openForm(e, coinInfo)}
            >
              Add to bag
            </Button>
          </div>
          <div className="chart">
            <Chart data={historyCoin} />
            <IntervalButtons changeInterval={setInterval} interval={interval} />
          </div>
        </Container>
      </section>

      <ModalWrapper
        title={chooseElem?.name}
        show={visible}
        onHide={() => setVisible(false)}
      >
        <AddCoinForm
          onClose={() => setVisible(false)}
          chooseElem={chooseElem}
        />
      </ModalWrapper>
    </div>
  );
};

export default CoinInfo;
