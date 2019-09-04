import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Footer from './Footer';

const useStyles = makeStyles({
  root: {
    padding: 0,
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
    marginBottom: 15,
  },
});

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

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
