import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  removeCard,
  removeCardFromDay,
  editCard,
  showAddCardForm,
} from 'actions/schedulerActions';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '../Avatar';

const useStyles = makeStyles(theme => {
  return {
    delete: {
      color: theme.palette.error.main,
    },
    menuWrapper: {
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-end',
    },
    avatarWrapper: {
      marginRight: 115,
    },
  };
});

const CardMenu = props => {
  const { cardData, dayName } = props;
  const { service, confirmed, reserved } = cardData;
  const avatarProps = {
    service,
    confirmed,
    reserved,
  };

  const dispatch = useDispatch();

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function deleteCard() {
    dispatch(removeCardFromDay(dayName, cardData.id));
    dispatch(removeCard(cardData.id));
    handleClose();
  }
  function handleEditCard() {
    dispatch(editCard(cardData));
    dispatch(showAddCardForm(dayName));
    handleClose();
  }

  return (
    <div className={classes.menuWrapper}>
      <div className={classes.avatarWrapper}>
        <Avatar {...avatarProps} />
      </div>
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
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleEditCard}>Edytuj</MenuItem>
        <MenuItem onClick={handleClose} disabled>
          Przenieś
        </MenuItem>
        <MenuItem onClick={deleteCard} classes={{ root: classes.delete }}>
          Usuń kartę
        </MenuItem>
      </Menu>
    </div>
  );
};

CardMenu.propTypes = {
  cardData: PropTypes.object.isRequired,
  dayName: PropTypes.string.isRequired,
};

export default CardMenu;
