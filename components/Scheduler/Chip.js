import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { colorsForServices } from 'utils/colorsForServices';
import Chip from '@material-ui/core/Chip';
import Avatar from './Avatar';

const useStyles = makeStyles(theme => ({
  chip: styleProps => {
    const { service } = styleProps;
    const { backgroundColor, color } = colorsForServices(service);

    return {
      margin: 5,
      fontSize: 16,
      backgroundColor,
      color,
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

  const avatarProps = {
    service,
    confirmed,
    reserved,
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
      avatar={<Avatar {...avatarProps} />}
    />
  );
};

ChipBadge.propTypes = {
  cardData: PropTypes.object.isRequired,
};

export default ChipBadge;
