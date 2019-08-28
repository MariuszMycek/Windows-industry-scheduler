import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Days from './Days';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 85,
    background: 'none',
  },
  button: {
    margin: theme.spacing(1),
  },
  day: {},
}));

const Month = props => {
  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.root}>
        <Days {...props} />
      </Paper>
    </div>
  );
};

Month.propTypes = {};

export default Month;
