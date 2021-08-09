import React, { FC } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

interface IIntervalButtons {
  changeInterval: (key: string) => void;
  interval: string;
}

const IntervalButtons: FC<IIntervalButtons> = ({
  changeInterval,
  interval,
}) => {
  return (
    <ButtonGroup className="chart__block-btn">
      <Button className="chart__btn" onClick={() => changeInterval('m1')}>
        1min
      </Button>
      <Button className="chart__btn" onClick={() => changeInterval('m5')}>
        5min
      </Button>
      <Button className="chart__btn" onClick={() => changeInterval('m15')}>
        15min
      </Button>
      <Button className="chart__btn" onClick={() => changeInterval('m30')}>
        30min
      </Button>
      <Button className="chart__btn" onClick={() => changeInterval('h1')}>
        1hr
      </Button>
      <Button className="chart__btn" onClick={() => changeInterval('h2')}>
        2hr
      </Button>
      <Button className="chart__btn" onClick={() => changeInterval('h6')}>
        6hr
      </Button>
      <Button className="chart__btn" onClick={() => changeInterval('h12')}>
        12hr
      </Button>
      <Button
        className="chart__btn"
        active={interval === 'd1'}
        onClick={() => changeInterval('d1')}
      >
        1day
      </Button>
    </ButtonGroup>
  );
};

export default IntervalButtons;
