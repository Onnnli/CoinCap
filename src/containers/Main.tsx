import React, { FC, useCallback, useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import CoinList from '../components/CoinList';
import Header from '../components/header/Header';
import { appActions } from '../redux/app/appActions';
import ModalWrapper from '../components/modals/ModalWrapper';
import AddCoinForm from '../components/forms/AddCoinForm';
import { IAssets } from '../interfaces/assets';

const Main: FC = () => {
  const dispatch = useDispatch();

  const maxLimit: number = 2000;
  const [limit, setLimit] = useState<number>(20);
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
    setLimit(limit + 20);
  }, [setLimit, limit]);

  return (
    <>
      <Header />
      <section className="main-section">
        <Container>
          <div className="wrapper">
            <CoinList clickAdd={openForm} />
            {limit <= maxLimit && (
              <Button className="coin-list__pagination" onClick={handleClick}>
                View more
              </Button>
            )}
          </div>
        </Container>
      </section>

      <ModalWrapper
        title={chooseElem?.name}
        show={visible}
        onHide={() => setVisible(false)}
      >
        <AddCoinForm
          chooseElem={chooseElem}
          onClose={() => setVisible(false)}
        />
      </ModalWrapper>
    </>
  );
};

export default Main;
