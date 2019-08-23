import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardMenu from './CardMenu';

const useStyles = makeStyles({
  root: {
    padding: 10,
    width: '25%',
  },
  card: {
    width: '100%',
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
  serviceType: styleProps => ({
    color: styleProps.serviceType === 'montaż' ? 'red' : 'blue',
  }),
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

const SimpleCard = props => {
  const serviceType = 'montaż';
  const styleProps = {
    serviceType: serviceType,
  };
  const classes = useStyles(styleProps);

  const [expanded, setExpanded] = React.useState(false);

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <h3 className={classes.name}>
            Klient:<span className={classes.desc}>Jan Kowalski</span>
          </h3>
          <div className={classes.info}>
            <p className={classes.infoItem}>
              Adres:
              <span className={classes.desc}>Mogilska 12/298</span>
            </p>
            <p className={classes.infoItem}>
              Telefon:
              <span className={classes.desc}>123 465 654</span>
            </p>
            <p className={classes.infoItem}>
              Rodzaj usługi:
              <span className={`${classes.desc} ${classes.serviceType}`}>
                Dostawa
              </span>
            </p>
            {serviceType === 'montaż' ? (
              <p className={classes.infoItem}>
                Rodzaj montażu:<span className={classes.desc}>Szwedzkie</span>
              </p>
            ) : null}
            <p className={classes.infoItem}>
              Dodatkowe informacje:
              <span className={classes.additionalInfoText}>
                Lorem ipsum dolor sit amet
              </span>
            </p>
          </div>
        </CardContent>
        <CardActions classes={{ root: classes.actions }}>
          <CardMenu {...props} />
        </CardActions>
      </Card>
    </div>
  );
};

export default SimpleCard;
