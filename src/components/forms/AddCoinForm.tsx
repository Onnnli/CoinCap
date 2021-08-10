import React, { FC, useCallback } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';

import { walletActions } from '../../redux/wallet/walletActions';
import { IAccess } from '../../interfaces/access';

interface IAddCoinForm {
  chooseElem?: IAccess;
  onClose: () => void;
}

const AddCoinForm: FC<IAddCoinForm> = ({ chooseElem, onClose }) => {
  const dispatch = useDispatch();

  const schema = yup.object().shape({
    amount: yup
      .string()
      .required()
      .matches(/^(?!0\d)\d*(\.\d+)?$/, 'Is not in correct format'),
  });

  const handleSubmit = useCallback(
    values => {
      const totalPrice = Number(chooseElem?.priceUsd) * values.amount;

      dispatch(walletActions.addWallet(totalPrice));
      dispatch(walletActions.addWalletInfo(chooseElem, Number(values.amount)));
      onClose();
    },
    [dispatch, chooseElem, onClose]
  );

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={{ amount: '' }}
      validationSchema={schema}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formAmount">
            <Form.Label>Amount of currency</Form.Label>
            <Form.Control
              type="text"
              name="amount"
              value={values.amount}
              onChange={handleChange}
              isValid={touched.amount && !errors.amount}
              isInvalid={!!errors.amount}
              placeholder="0.00"
            />
            <Form.Control.Feedback type="invalid">
              {errors.amount}
            </Form.Control.Feedback>
          </Form.Group>
          <Button className="submit-button" variant="primary" type="submit">
            Add to wallet
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default AddCoinForm;
