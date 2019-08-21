import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const useStyles = makeStyles(theme => ({
  background: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  root: {
    position: 'fixed',
    top: 0,
    zIndex: 100,
    transition: 'all 0.5s linear',
    width: '100%',
    left: 0,
  },
  button: {
    margin: theme.spacing(1),
    minWidth: 140,
  },
  monthName: {
    textTransform: 'uppercase',
    fontSize: 16,
    minWidth: 150,
    textAlign: 'center',
  },
}));

const TopBar = props => {
  const { actualMonth, changeMonth, collapseAllPanels } = props;

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper square elevation={4}>
        <Container maxWidth="lg" classes={{ root: classes.background }}>
          <Button
            onClick={() => changeMonth(-1)}
            variant="contained"
            color="primary"
            className={classes.button}
          >
            <ArrowLeftIcon />
            Poprzedni
          </Button>
          <span className={classes.monthName}>{actualMonth}</span>
          <Button
            onClick={() => changeMonth(1)}
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Następny
            <ArrowRightIcon />
          </Button>
          <Button
            onClick={() => collapseAllPanels(actualMonth)}
            variant="contained"
            color="secondary"
            className={classes.button}
          >
            Zwiń wszystkie
          </Button>
        </Container>
      </Paper>
    </div>
  );
};

TopBar.propTypes = {
  changeMonth: PropTypes.func,
  actualMonth: PropTypes.string,
};

export default TopBar;
