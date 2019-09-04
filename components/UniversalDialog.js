import React from 'react';
import { useSelector } from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import CardInputForm from './Forms/CardInputForm';

const UniversalDialog = () => {
  const { dialogOpened, dialogContent } = useSelector(state => state.scheduler);

  const content = () => {
    switch (dialogContent) {
      case 'CardInputForm': {
        return <CardInputForm />;
      }
      default:
        return;
    }
  };

  return (
    <Dialog open={dialogOpened} aria-labelledby="form-dialog-title">
      <DialogContent>{content()}</DialogContent>
    </Dialog>
  );
};

export default UniversalDialog;
