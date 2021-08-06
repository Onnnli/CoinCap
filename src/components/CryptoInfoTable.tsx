import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { accessSelector } from '../redux/test/appSelectors';
const CryptoInfoTable = () => {
  const access = useSelector(accessSelector);

  return (
    <Table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>symbol</th>
          <th>priceUsd</th>
          <th>marketCapUsd</th>
          <th>supply</th>
          <th>volumeUsd24Hr</th>
          <th>vwap24Hr</th>
          <th>changePercent24Hr</th>
        </tr>
      </thead>
      <tbody>
        {access?.map((elem: { [K: string]: string }) => (
          <tr key={elem.id}>
            <td>{elem.rank}</td>
            <td>{elem.name}</td>
            <td>{elem.symbol}</td>
            <td>{elem.priceUsd}</td>
            <td>{elem.marketCapUsd}</td>
            <td>{elem.supply}</td>
            <td>{elem.volumeUsd24Hr}</td>
            <td>{elem.vwap24Hr}</td>
            <td>{elem.changePercent24Hr}</td>
            <td>
              <Button variant="primary">+</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CryptoInfoTable;
