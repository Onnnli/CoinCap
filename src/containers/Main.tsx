import React, { FC, useEffect } from 'react';
import Header from '../components/Header';
import CryptoInfoTable from '../components/CryptoInfoTable';
import { Container, Pagination } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { appActions } from '../redux/test/appActions';
import { useState } from 'react';

const Main: FC = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item
        key={number}
        onClick={() => setPage(number)}
        active={number === page}
      >
        {number}
      </Pagination.Item>
    );
  }

  useEffect(() => {
    dispatch(appActions.getAssets(page * 10));
  }, [dispatch, page]);

  return (
    <>
      <Header />;
      <Container>
        <CryptoInfoTable />
        <Pagination>{items}</Pagination>
      </Container>
    </>
  );
};

export default Main;
