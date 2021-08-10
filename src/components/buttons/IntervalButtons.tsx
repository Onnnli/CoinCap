import React, { FC, memo } from 'react';
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
      <Button
        active={interval === 'm1'}
        className="chart__btn"
        onClick={() => changeInterval('m1')}
      >
        1min
      </Button>
      <Button
        active={interval === 'm5'}
        className="chart__btn"
        onClick={() => changeInterval('m5')}
      >
        5min
      </Button>
      <Button
        active={interval === 'm15'}
        className="chart__btn"
        onClick={() => changeInterval('m15')}
      >
        15min
      </Button>
      <Button
        active={interval === 'm30'}
        className="chart__btn"
        onClick={() => changeInterval('m30')}
      >
        30min
      </Button>
      <Button
        active={interval === 'h1'}
        className="chart__btn"
        onClick={() => changeInterval('h1')}
      >
        1hr
      </Button>
      <Button
        active={interval === 'h2'}
        className="chart__btn"
        onClick={() => changeInterval('h2')}
      >
        2hr
      </Button>
      <Button
        active={interval === 'h6'}
        className="chart__btn"
        onClick={() => changeInterval('h6')}
      >
        6hr
      </Button>
      <Button
        active={interval === 'h12'}
        className="chart__btn"
        onClick={() => changeInterval('h12')}
      >
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

export default memo(IntervalButtons);
