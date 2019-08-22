import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  button: {
    margin: theme.spacing(1),
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  weekend: {
    color: '#E53935',
  },
  dayNumber: {
    minWidth: 20,
    textAlign: 'right',
    marginRight: '0.2em',
  },
  weekDay: {
    marginLeft: '0.2em',
    textTransform: 'uppercase',
  },
  panel: {
    background: '#FAFAFA',
  },
  panelExpanded: {
    background: '#EDEDED',
  },
}));

export default function SimpleExpansionPanel(props) {
  const classes = useStyles();
  const {
    daysInMonth,
    actualMonth,
    expandedDays,
    handlePanelsExpand,
    monthVisible,
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

      const isExpanded = expandedDays.includes(`${i + 1} ${actualMonth}`);

      days.push(
        <ExpansionPanel
          key={i}
          expanded={isExpanded}
          onChange={handlePanelsExpand(`${i + 1} ${actualMonth}`)}
          classes={{ root: isExpanded ? classes.panelExpanded : classes.panel }}
        >
          <ExpansionPanelSummary
            className={isWeekend() ? classes.weekend : null}
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${i}a-content`}
            id={`panel${i}a-header`}
          >
            <span className={classes.dayNumber}>{i + 1}</span>
            <span>|</span>
            <span className={classes.weekDay}>{weekDay}</span>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      );
    }
    return days;
  };

  return (
    <div className={classes.root}>
      <Fade in={monthVisible} timeout={300}>
        <div>{days()}</div>
      </Fade>
    </div>
  );
}
