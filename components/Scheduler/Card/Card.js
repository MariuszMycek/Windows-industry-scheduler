import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMenu from './CardMenu';
import CardContent from './CardContent';

const useStyles = makeStyles({
  root: {
    padding: 10,
    width: '25%',
  },
  card: {
    width: '100%',
    backgroundImage: 'url(static/images/lightpaperfibers.png)',
  },
  actions: {
    justifyContent: 'flex-end',
    paddingRight: 16,
    paddingTop: 0,
  },
});

const SimpleCard = props => {
  const { cardData } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent {...cardData} />
        <CardActions classes={{ root: classes.actions }}>
          <CardMenu {...props} />
        </CardActions>
      </Card>
    </div>
  );
};

export default SimpleCard;
