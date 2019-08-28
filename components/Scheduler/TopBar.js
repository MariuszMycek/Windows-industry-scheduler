import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

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
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 64,
  },
  paper: {
    background: theme.palette.grey[200],
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
}));

const TopBar = props => {
  const { actualMonth, changeMonth, collapseAllPanels } = props;

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.menuButton}>
        <Link href="/">
          <IconButton color="primary" aria-label="menu">
            <MenuIcon />
          </IconButton>
        </Link>
      </div>
      <Paper square elevation={4} classes={{ root: classes.paper }}>
        <Container maxWidth="lg" classes={{ root: classes.toolbar }}>
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
