import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Chip from '../Chip';

import Fade from '@material-ui/core/Fade';

import { useDispatch } from 'react-redux';
import { showAddCardForm } from 'actions/schedulerActions';

const useStyles = makeStyles(theme => {
  return {
    addButtonWrapper: {
      position: 'absolute',
      right: 0,
      top: 4,
    },
    button: {
      margin: 0,
      minWidth: 140,
    },
    summaryWrapper: styleProps => ({
      height: !styleProps.expanded ? styleProps.height : 'auto',
      minHeight: 44,
      width: '100%',
      display: 'flex',
      transition: 'all 0.2s linear',
      position: 'relative',
    }),
    dayInfo: styleProps => ({
      margin: '12px 0',
      width: 60,
      color: styleProps.isWeekend ? theme.palette.error.main : null,
      fontWeight: 600,
    }),
    dayNumber: {
      minWidth: 20,
      textAlign: 'right',
      marginRight: '0.2em',
    },
    weekDay: {
      marginLeft: '0.2em',
      textTransform: 'uppercase',
    },
    chips: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      position: 'absolute',
      top: 0,
      left: 60,
      width: 'calc(100% - 70px)',
    },
  };
});

const DayHeading = props => {
  const { expanded, index, weekDay, cardsData, dayName, isWeekend } = props;

  const dispatch = useDispatch();

  const [height, setHeight] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.clientHeight);
    }
  });

  const styleProps = {
    isWeekend: isWeekend(),
    height: height,
    expanded,
  };

  const classes = useStyles(styleProps);

  return (
    <div className={classes.summaryWrapper}>
      <div className={classes.dayInfo}>
        <span className={classes.dayNumber}>{index + 1}</span>
        <span>|</span>
        <span className={classes.weekDay}>{weekDay}</span>
      </div>
      <Fade in={!expanded} unmountOnExit>
        <div className={classes.chips} ref={ref}>
          {cardsData.map(cardData => (
            <Chip key={cardData.id} cardData={cardData} />
          ))}
        </div>
      </Fade>
      <Fade in={expanded} unmountOnExit>
        <div className={classes.addButtonWrapper}>
          <Button
            onClick={e => {
              e.stopPropagation();
              dispatch(showAddCardForm(dayName));
            }}
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Dodaj
          </Button>
        </div>
      </Fade>
    </div>
  );
};

DayHeading.propTypes = {
  index: PropTypes.number.isRequired,
  expanded: PropTypes.bool.isRequired,
  weekDay: PropTypes.string.isRequired,
  cardsData: PropTypes.array.isRequired,
  dayName: PropTypes.string.isRequired,
  isWeekend: PropTypes.func.isRequired,
};

export default DayHeading;
