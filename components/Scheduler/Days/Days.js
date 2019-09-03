import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { useSelector } from 'react-redux';

import Day from './Day';

import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles({
  days: {
    width: '100%',
  },
});

const Days = () => {
  const classes = useStyles();

  const { actualMonth, monthVisible } = useSelector(state => state.scheduler);

  const daysInMonth = moment(actualMonth, 'MMMM[ ]YYYY').daysInMonth();

  const days = () => {
    const days = [];

    for (let i = 0; i < daysInMonth; i++) {
      days.push(<Day key={i} index={i}></Day>);
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
