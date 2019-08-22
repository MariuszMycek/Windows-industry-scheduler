import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: 0,
  },
  chip: {
    margin: '0 5px',
  },
}));

const ChipsArray = props => {
  const { title } = props;
  const classes = useStyles();
 
  return (
    <Chip
      // key={data.key}
      // icon={icon}
      label={title}
      className={classes.chip}
    />
  );
 
};

export default ChipsArray;
