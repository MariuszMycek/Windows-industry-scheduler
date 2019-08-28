import React from 'react';
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
  const classes = useStyles();
  const { removeCardFromDay, isExpanded, cardsData, dayName, editCard } = props;

  return (
    <Fade in={isExpanded} unmountOnExit>
      <div className={classes.cards}>
        {cardsData.map(cardData => (
          <Card
            key={cardData.id}
            cardData={cardData}
            removeCardFromDay={removeCardFromDay}
            dayName={dayName}
            editCard={editCard}
          />
        ))}
      </div>
    </Fade>
  );
};

export default DayCards;
