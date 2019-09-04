import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeMonth,
  handleMonthVisible,
  collapseAllPanelsInMonth,
} from 'actions/schedulerActions';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Link from 'next/link';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    top: 0,
    zIndex: 100,
    transition: 'all 0.5s linear',
    width: '100vw',
    left: 0,
  },
  menuButton: {
    position: 'absolute',
    top: 8,
    left: 12,
    color: '#fff',
  },
  iconButton: {
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.30)',
    },
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 64,
  },
  paper: {
    background: 'rgba(0, 0, 0, 0.45)',
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
    background: '#fff',
    height: '36px',
    lineHeight: '36px',
    borderRadius: 4,
  },
  heading: {
    marginRight: 100,
    marginLeft: 80,
    color: ' #fff',
    fontSize: '2em',
  },
}));

const TopBar = () => {
  const { actualMonth } = useSelector(state => state.scheduler);
  const dispatch = useDispatch();

  const handleChangeMonth = val => {
    dispatch(handleMonthVisible(false));
    setTimeout(() => {
      dispatch(changeMonth(val));
    }, 150);
    setTimeout(() => {
      dispatch(handleMonthVisible(true));
    }, 300);
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper square elevation={4} classes={{ root: classes.paper }}>
        <div className={classes.menuButton}>
          <Link href="/">
            <IconButton
              color="inherit"
              aria-label="menu"
              classes={{ root: classes.iconButton }}
            >
              <MenuIcon />
            </IconButton>
          </Link>
        </div>
        <Container maxWidth="lg" classes={{ root: classes.toolbar }}>
          <Button
            onClick={() => handleChangeMonth(-1)}
            variant="contained"
            color="primary"
            className={classes.button}
          >
            <ArrowLeftIcon />
            Poprzedni
          </Button>
          <span className={classes.monthName}>{actualMonth}</span>
          <Button
            onClick={() => handleChangeMonth(1)}
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Następny
            <ArrowRightIcon />
          </Button>
          <Button
            onClick={() => dispatch(collapseAllPanelsInMonth(actualMonth))}
            variant="contained"
            color="secondary"
            className={classes.button}
          >
            Zwiń wszystkie
          </Button>
          <span className={classes.heading}>TERMINARZ USŁUG</span>
        </Container>
      </Paper>
    </div>
  );
};

export default TopBar;
