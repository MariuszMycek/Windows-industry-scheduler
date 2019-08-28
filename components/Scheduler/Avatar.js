import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const useStyles = makeStyles(theme => ({
  avatar: styleProps => {
    const { common, avatars, text } = theme.palette;
    const { service } = styleProps;
    console.log(theme);

    const avatarStyle = {
      width: 32,
      height: 32,
      backgroundColor: avatars.darkGrey,
      color: service === 'Dostawa' ? text.primary : common.white,
    };
    switch (service) {
      case 'Montaż PCV':
        avatarStyle.backgroundColor = avatars.blue;
        break;

      case 'Montaż ALU':
        avatarStyle.backgroundColor = avatars.red;
        break;

      case 'Montaż ZABUDOWA':
        avatarStyle.backgroundColor = avatars.green;
        break;

      case 'Dostawa':
        avatarStyle.backgroundColor = avatars.lightGrey;
    }
    return avatarStyle;
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
