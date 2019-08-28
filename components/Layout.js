import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Footer from './Footer';

const useStyles = makeStyles(theme => ({
  root: {
    padding: 0,
    display: 'flex',
    height: '100vh',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
    marginBottom: 15,
  },
}));

const Layout = props => {
  const { children } = props;
  const classes = useStyles();

  return (
    <Container
      maxWidth={false}
      classes={{
        root: classes.root,
      }}
    >
      <div className={classes.content}>{children}</div>
      <Footer />
    </Container>
  );
};

export default Layout;
