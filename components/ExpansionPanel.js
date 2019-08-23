import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Card from './Card';
import Chip from './Chip';

import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  addButtonWrapper: {
    position: 'absolute',
    right: 0,
    top: 4,
  },
  button: {
    margin: 0,
    minWidth: 140,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  summaryContent: {
    margin: 0,
    position: 'relative',
  },
  detailsRoot: {
    paddingTop: 0,
  },
  dayInfo: {
    margin: '12px 0',
    width: 60,
  },
  weekend: {
    color: theme.palette.error.main,
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
  chips: {
    display: 'flex',
    alignItems: 'center',
  },
  cards: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
  },
  panel: {
    background: theme.palette.grey[50],
  },
  panelExpanded: {
    background: theme.palette.grey[200],
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
    daysWithCards,
    addCard,
    cards,
    removeCardFromDay,
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

      days.push(
        <ExpansionPanel
          key={i}
          expanded={isExpanded}
          onChange={handlePanelsExpand(`${i + 1} ${actualMonth}`)}
          classes={{ root: isExpanded ? classes.panelExpanded : classes.panel }}
        >
          <ExpansionPanelSummary
            className={isWeekend() ? classes.weekend : null}
            classes={{ content: classes.summaryContent }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${i}a-content`}
            id={`panel${i}a-header`}
          >
            <div className={classes.dayInfo}>
              <span className={classes.dayNumber}>{i + 1}</span>
              <span>|</span>
              <span className={classes.weekDay}>{weekDay}</span>
            </div>
            <Fade in={!isExpanded} unmountOnExit>
              <div className={classes.chips}>
                {cardsData.map(cardData => (
                  <Chip key={cardData.id} title={cardData.title} />
                ))}
              </div>
            </Fade>
            <Fade in={isExpanded} unmountOnExit>
              <div className={classes.addButtonWrapper}>
                <Button
                  onClick={e => {
                    e.stopPropagation();
                    addCard(dayName);
                  }}
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  Dodaj
                </Button>
              </div>
            </Fade>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails classes={{ root: classes.detailsRoot }}>
            <Fade in={isExpanded} unmountOnExit>
              <div className={classes.cards}>
                {cardsData.map(cardData => (
                  <Card
                    key={cardData.id}
                    cardData={cardData}
                    removeCardFromDay={removeCardFromDay}
                    dayName={dayName}
                  />
                ))}
              </div>
            </Fade>
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
