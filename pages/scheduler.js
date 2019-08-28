import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import App from 'components/Scheduler/App';
import Layout from 'components/Layout';

const useStyles = makeStyles(theme => {
  return {
    root: {
      backgroundImage: 'url(static/images/cork-board.png)',
    },
  };
});

export default function Index() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Layout>
        <Container maxWidth="lg">
          <App />
        </Container>
      </Layout>
    </div>
  );
}
