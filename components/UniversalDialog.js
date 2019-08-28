import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import CardInputForm from './Forms/CardInputForm';

const UniversalDialog = props => {
  const {
    dialogOpened,
    handleDialogClose,
    addCard,
    dialogContent,
    editedCardData,
    updateCard,
  } = props;

  const content = () => {
    switch (dialogContent) {
      case 'CardInputForm': {
        return (
          <CardInputForm
            addCard={addCard}
            handleDialogClose={handleDialogClose}
            dialogOpened={dialogOpened}
            editedCardData={editedCardData}
            updateCard={updateCard}
          />
        );
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
