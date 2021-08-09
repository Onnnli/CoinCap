import React, { FC, useCallback } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import numeral from 'numeral';

import { accessSelector } from '../redux/app/appSelectors';
import { appActions } from '../redux/app/appActions';
import { IAssets } from '../interfaces/assets';

interface IChartList {
  clickAdd: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    elemList: IAssets
  ) => void;
}

const CoinList: FC<IChartList> = ({ clickAdd }) => {
  const dispatch = useDispatch();
  const access = useSelector(accessSelector);
  const headerTable = [
    'Rank',
    'Name',
    'Price',
    'MarKet Cap',
    'VWAP(24Hr)',
    'Supply',
    'Volume(24Hr)',
    'Change(24Hr)',
    'Add',
  ];

  const handleClick = useCallback(
    (e, id) => {
      e.stopPropagation();
      dispatch(appActions.getCoinInfo(id));
    },
    [dispatch]
  );

  return (
    <Table className="coin-list">
      <thead>
        <tr className="coin-list__header">
          {headerTable.map(title => (
            <th key={title}>{title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {access?.map((elemList: IAssets) => (
          <tr
            className="coin-list__info"
            key={elemList.id}
            onClick={e => handleClick(e, elemList.id)}
          >
            <td>{elemList.rank}</td>
            <td className="coin-list__name">
              <img
                alt="logotype"
                className="coin-list__img"
                src={`https://static.coincap.io/assets/icons/${elemList.symbol.toLowerCase()}@2x.png`}
              />
              {elemList.name} ({elemList.symbol})
            </td>

            <td>{numeral(elemList.priceUsd).format('($ 0.00)')}</td>
            <td>{numeral(elemList.marketCapUsd).format('($ 0.00a)')}</td>
            <td>{numeral(elemList.vwap24Hr).format('($ 0,0[.]00)')}</td>
            <td>{numeral(elemList.supply).format('0.0a')}</td>
            <td>{numeral(elemList.volumeUsd24Hr).format('($ 0.00a)')}</td>
            <td>{numeral(elemList.changePercent24Hr).format('0.00')}%</td>
            <td>
              <Button
                className="coin-list__btn"
                onClick={e => clickAdd(e, elemList)}
              >
                +
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CoinList;
