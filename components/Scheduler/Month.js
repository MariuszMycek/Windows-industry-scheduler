import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Days from './Days';

const useStyles = makeStyles(theme => ({
  paperRoot: {
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

const Month = () => {
  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.paperRoot}>
        <Days />
      </Paper>
    </div>
  );
};

export default Month;
