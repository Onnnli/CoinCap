import React, { FC, useCallback, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import ChartList from '../components/CoinList';
import Header from '../components/header/Header';
import { appActions } from '../redux/app/appActions';
import ModalWrapper from '../components/modals/ModalWrapper';
import CoinAddForm from '../components/forms/CoinAddForm';
import Pagination from '../components/Pagination';
import { IAssets } from '../Interfaces/assets';

const Main: FC = () => {
  const dispatch = useDispatch();

  const maxLimit = 2000;
  const [limit, setLimit] = useState(10);
  const [visible, setVisible] = useState<boolean>(false);
  const [chooseElem, setChooseElem] = useState<IAssets | undefined>();

  useEffect(() => {
    dispatch(appActions.getAssets(limit));
  }, [dispatch, limit]);

  const openForm = useCallback(
    (e, elemList: IAssets) => {
      e.stopPropagation();
      setChooseElem(elemList);
      setVisible(true);
    },
    [setChooseElem, setVisible]
  );

  const handleClick = useCallback(() => {
    setLimit(limit + 10);
  }, [setLimit, limit]);

  return (
    <>
      <Header />
      <Container>
        <ChartList clickAdd={openForm} />
        {limit <= maxLimit && <Pagination viewMore={handleClick} />}
      </Container>
      <ModalWrapper show={visible} onHide={() => setVisible(false)}>
        <CoinAddForm chooseElem={chooseElem} />
      </ModalWrapper>
    </>
  );
};

export default Main;
