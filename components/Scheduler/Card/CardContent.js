import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { colorsForServices } from 'utils/colorsForServices';
import CardContent from '@material-ui/core/CardContent';
import clsx from 'clsx';

const useStyles = makeStyles({
  contentRoot: {
    marginTop: 5,
  },
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
    const { service } = styleProps;
    const serviceColor = colorsForServices(service);

    return {
      color: serviceColor.color,
      backgroundColor: serviceColor.backgroundColor,
      borderRadius: 11,
      padding: '3px 7px',
    };
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
});

const Content = props => {
  const { name, address, phone, service, additional, montage, label } = props;

  const montageVisible = service === 'Montaż PCV' || service === 'Montaż ALU';

  const styleProps = {
    service,
  };

  const classes = useStyles(styleProps);

  return (
    <CardContent classes={{ root: classes.contentRoot }}>
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

Content.propTypes = {
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  service: PropTypes.string.isRequired,
  additional: PropTypes.string.isRequired,
  montage: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default Content;
