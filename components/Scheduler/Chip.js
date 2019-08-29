import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { colorsForServices } from 'utils/colorsForServices';
import Chip from '@material-ui/core/Chip';
import Avatar from './Avatar';

const useStyles = makeStyles(theme => ({
  chip: styleProps => {
    const { service } = styleProps;
    const serviceColor = colorsForServices(service);

    return {
      margin: 5,
      fontSize: 16,
      backgroundColor: serviceColor.backgroundColor,
      color: serviceColor.color,
    };
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
