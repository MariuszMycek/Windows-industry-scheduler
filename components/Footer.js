import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    height: 50,
    background: '#3F51B5',
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <p>All rights reserved - Mariusz Mycek 2019</p>
    </div>
  );
};

export default Footer;
