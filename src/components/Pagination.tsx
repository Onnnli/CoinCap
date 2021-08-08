import React, { FC } from 'react';
import { Button } from 'react-bootstrap';

interface IPagination {
  viewMore: () => void;
}

const Pagination: FC<IPagination> = ({ viewMore }) => {
  return (
    <Button onClick={viewMore} variant="success">
      View more
    </Button>
  );
};

export default Pagination;
