import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Card from '../Card';

import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles({
  cards: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
  },
});

const DayCards = props => {
  const { expanded, cardsData, dayName } = props;
  const classes = useStyles();

  return (
    <Fade in={expanded} unmountOnExit>
      <div className={classes.cards}>
        {cardsData.map(cardData => (
          <Card key={cardData.id} cardData={cardData} dayName={dayName} />
        ))}
      </div>
    </Fade>
  );
};

DayCards.propTypes = {
  expanded: PropTypes.bool.isRequired,
  cardsData: PropTypes.array.isRequired,
  dayName: PropTypes.string.isRequired,
};

export default DayCards;
