import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { colorsForServices } from 'utils/colorsForServices';
import Avatar from '@material-ui/core/Avatar';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const useStyles = makeStyles(theme => ({
  avatar: styleProps => {
    const { service } = styleProps;
    const serviceColor = colorsForServices(service);

    return {
      width: 32,
      height: 32,
      backgroundColor: serviceColor.backgroundColor,
      color: serviceColor.color,
    };
  },
}));

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

export default AvatarElement;
