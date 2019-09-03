import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import { handlePanelsExpand } from 'actions/schedulerActions';
import moment from 'moment';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import DayHeading from './DayHeading';
import DayCards from './DayCards';

const useStyles = makeStyles(theme => ({
  summaryContent: {
    margin: 0,
    position: 'relative',
  },
  detailsRoot: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  detailsRootCollapsed: {
    paddingBottom: 0,
  },
  panel: {
    background: '#f5ffff',
  },
  currentDay: {
    boxShadow: '0px 0px 3px 0px #ab47bc, inset 0px 0px 8px 0px #ab47bc',
  },
}));

const Day = props => {
  const { index } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const { currentDate } = useSelector(state => state.app);
  const { actualMonth, expandedDays, daysWithCards, cards } = useSelector(
    state => state.scheduler
  );

  const dayName = `${index + 1} ${actualMonth}`;
  const isToday = dayName === currentDate;
  const expanded = expandedDays.includes(dayName);
  const hasCards = daysWithCards.find(day => day.dayName === dayName);
  const cardsData = hasCards
    ? hasCards.cards.map(cardId => cards.find(card => card.id === cardId))
    : [];
  const weekDay = moment(
    `${index + 1} ${actualMonth}`,
    'D[ ]MMMM[ ]YYYY'
  ).format('ddd');
  const isWeekend = () => {
    if (weekDay === 'sob' || weekDay === 'ndz') return true;
    return false;
  };

  const panelExpandHandler = dayName => (event, isExpanded) => {
    dispatch(handlePanelsExpand(dayName, isExpanded));
  };

  const otherProps = {
    expanded,
    weekDay,
    isWeekend,
    dayName,
    cardsData,
    index,
  };

  return (
    <ExpansionPanel
      expanded={expanded}
      onChange={panelExpandHandler(dayName)}
      classes={{
        root: clsx(classes.panel, { [classes.currentDay]: isToday }),
      }}
    >
      <ExpansionPanelSummary
        classes={{
          content: classes.summaryContent,
        }}
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel${index}a-content`}
        id={`panel${index}a-header`}
      >
        <DayHeading {...otherProps} />
      </ExpansionPanelSummary>
      <ExpansionPanelDetails
        classes={{
          root: classes.detailsRoot,
        }}
      >
        <DayCards {...otherProps} />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

Day.propTypes = {
  index: PropTypes.number.isRequired,
};

export default Day;
