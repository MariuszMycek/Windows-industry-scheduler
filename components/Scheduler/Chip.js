import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Avatar from './Avatar';

const useStyles = makeStyles(theme => ({
  chip: styleProps => {
    const { chips, common } = theme.palette;
    const { service } = styleProps;

    const chipStyle = {
      margin: 5,
      fontSize: 16,
      backgroundColor: chips.lightGrey,
      color: service === 'Dostawa' ? common.white : null,
    };
    switch (service) {
      case 'Montaż PCV':
        chipStyle.backgroundColor = chips.blue;
        break;

      case 'Montaż ALU':
        chipStyle.backgroundColor = chips.red;
        break;

      case 'Montaż ZABUDOWA':
        chipStyle.backgroundColor = chips.green;
        break;

      case 'Dostawa':
        chipStyle.backgroundColor = chips.darkGrey;
    }
    return chipStyle;
  },
}));

const ChipBadge = props => {
  const {
    name,
    address,
    montage,
    label,
    service,
    confirmed,
    reserved,
  } = props.cardData;

  const styleProps = {
    service,
  };

  const classes = useStyles(styleProps);

  const chipLabel = label
    ? `${label} ${montage ? `(${montage})` : ''}`
    : `${name}${address ? `, ${address}` : ''} ${
        montage ? `(${montage})` : ''
      }`;

  return (
    <Chip
      label={chipLabel}
      classes={{ root: classes.chip }}
      avatar={
        <Avatar confirmed={confirmed} reserved={reserved} service={service} />
      }
    />
  );
};

export default ChipBadge;
