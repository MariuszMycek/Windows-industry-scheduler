import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  infoItem: {
    borderTop: '1px solid #EDEDED',
    margin: 0,
    padding: '0.5em 0',
    '&:last-child': {
      borderBottom: '1px solid #EDEDED',
    },
  },
  name: {},
  serviceType: styleProps => {
    const { avatars, common } = theme.palette;
    const { service } = styleProps;
    const serviceStyles = {
      color: service === 'Inne' ? null : common.white,
      backgroundColor: avatars.lightGrey,
      borderRadius: 11,
      padding: '3px 7px',
    };
    switch (service) {
      case 'Montaż PCV':
        serviceStyles.backgroundColor = avatars.blue;
        break;
      case 'Montaż ALU':
        serviceStyles.backgroundColor = avatars.red;
        break;
      case 'Montaż ZABUDOWA':
        serviceStyles.backgroundColor = avatars.green;
        break;
      case 'Dostawa':
        serviceStyles.backgroundColor = avatars.darkGrey;
    }
    return serviceStyles;
  },
  address: {},
  desc: {
    fontWeight: 'bold',
    marginLeft: '1em',
  },
  actions: {
    justifyContent: 'flex-end',
    paddingRight: 16,
    paddingTop: 0,
  },
  additionalInfoText: {
    display: 'block',
    fontWeight: '500',
  },
}));

const Content = props => {
  const { name, address, phone, service, additional, montage, label } = props;

  const montageVisible = service === 'Montaż PCV' || service === 'Montaż ALU';

  const styleProps = {
    service,
  };

  const classes = useStyles(styleProps);

  return (
    <CardContent>
      <h3 className={classes.name}>
        Klient:<span className={classes.desc}>{name}</span>
      </h3>
      <div className={classes.info}>
        <p className={classes.infoItem}>
          Adres:
          <span className={classes.desc}>{address}</span>
        </p>
        <p className={classes.infoItem}>
          Telefon:
          <span className={classes.desc}>{phone}</span>
        </p>
        <p className={classes.infoItem}>
          Usługa:
          <span className={clsx(classes.desc, classes.serviceType)}>
            {service}
          </span>
        </p>
        {montageVisible ? (
          <p className={classes.infoItem}>
            Rodzaj montażu:<span className={classes.desc}>{montage}</span>
          </p>
        ) : null}
        <p className={classes.infoItem}>
          Dodatkowe informacje:
          <span className={classes.additionalInfoText}>{additional}</span>
        </p>
        <p className={classes.infoItem}>
          Etykieta:
          <span className={classes.additionalInfoText}>{label}</span>
        </p>
      </div>
    </CardContent>
  );
};

export default Content;
