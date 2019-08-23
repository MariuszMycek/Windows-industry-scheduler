import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => {
  return {
    delete: {
      color: theme.palette.error.main,
    },
  };
});

const SimpleMenu = props => {
  const { removeCardFromDay, cardData, dayName } = props;
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function deleteCard() {
    removeCardFromDay(dayName, cardData.id);
    handleClose();
  }

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Opcje
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Edytuj</MenuItem>
        <MenuItem onClick={handleClose}>Przenieś</MenuItem>
        <MenuItem onClick={deleteCard} classes={{ root: classes.delete }}>
          Usuń kartę
        </MenuItem>
      </Menu>
    </div>
  );
};

export default SimpleMenu;
