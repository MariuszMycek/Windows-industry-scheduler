import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

import Day from './Day';

import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles({
  days: {
    width: '100%',
  },
});

const Days = props => {
  const classes = useStyles();
  const {
    daysInMonth,
    actualMonth,
    expandedDays,
    monthVisible,
    daysWithCards,
    cards,
  } = props;

  const days = () => {
    const days = [];

    for (let i = 0; i < daysInMonth; i++) {
      const weekDay = moment(
        `${i + 1} ${actualMonth}`,
        'D[ ]MMMM[ ]YYYY'
      ).format('ddd');

      const isWeekend = () => {
        if (weekDay === 'sob' || weekDay === 'ndz') return true;
        return false;
      };

      const dayName = `${i + 1} ${actualMonth}`;

      const isExpanded = expandedDays.includes(dayName);

      const hasCards = daysWithCards.find(day => day.dayName === dayName);

      const cardsData = hasCards
        ? hasCards.cards.map(cardId => cards.find(card => card.id === cardId))
        : [];

      const dayProps = {
        isWeekend,
        isExpanded,
        dayName,
        cardsData,
        weekDay,
        i,
      };

      days.push(<Day key={i} {...props} {...dayProps}></Day>);
    }
    return days;
  };

  return (
    <div className={classes.days}>
      <Fade in={monthVisible} timeout={300}>
        <div>{days()}</div>
      </Fade>
    </div>
  );
};

export default Days;
