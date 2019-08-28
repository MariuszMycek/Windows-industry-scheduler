import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

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
    background: theme.palette.grey[50],
  },
  panelExpanded: {
    background: theme.palette.grey[200],
  },
  currentDay: {
    boxShadow: '0px 0px 3px 0px #ab47bc, inset 0px 0px 8px 0px #ab47bc',
  },
}));

const Day = props => {
  const classes = useStyles();
  const { actualMonth, handlePanelsExpand, isExpanded, i, currentDate } = props;
  const dayName = `${i + 1} ${actualMonth}`;
  const isToday = dayName === currentDate;
  return (
    <ExpansionPanel
      expanded={isExpanded}
      onChange={handlePanelsExpand(dayName)}
      classes={{
        root: clsx(
          classes.panel,
          { [classes.panelExpanded]: isExpanded },
          { [classes.currentDay]: isToday }
        ),
      }}
    >
      <ExpansionPanelSummary
        classes={{
          content: classes.summaryContent,
        }}
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel${i}a-content`}
        id={`panel${i}a-header`}
      >
        <DayHeading {...props} />
      </ExpansionPanelSummary>
      <ExpansionPanelDetails
        classes={{
          root: classes.detailsRoot,
        }}
      >
        <DayCards {...props} />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default Day;
