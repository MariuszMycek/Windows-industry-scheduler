import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { colorsForServices } from 'utils/colorsForServices';
import Avatar from '@material-ui/core/Avatar';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const useStyles = makeStyles({
  avatar: styleProps => {
    const { service } = styleProps;
    const { backgroundColor, color } = colorsForServices(service);

    return {
      width: 32,
      height: 32,
      backgroundColor,
      color,
    };
  },
});

const AvatarElement = props => {
  const { confirmed, reserved, service } = props;

  const styleProps = {
    service,
  };
  const classes = useStyles(styleProps);

  const content = confirmed ? (
    <CheckCircleOutlineIcon />
  ) : reserved ? (
    'R'
  ) : null;

  const avatar =
    confirmed || reserved ? (
      <Avatar classes={{ root: classes.avatar }}>{content}</Avatar>
    ) : null;

  return avatar;
};

Avatar.propTypes = {
  confirmed: PropTypes.bool,
  reserved: PropTypes.bool,
  service: PropTypes.string,
};

export default AvatarElement;
