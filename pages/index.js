import React from 'react';
import Container from '@material-ui/core/Container';
import App from 'components/App';
import Layout from 'components/Layout';

export default function Index() {
  return (
    <Layout>
      <Container maxWidth="lg">
        <App />
      </Container>
    </Layout>
  );
}
