import React from 'react';
import Container from '@material-ui/core/Container';
import Layout from 'components/Layout';
import Link from 'next/link';
import AppBar from 'components/AppBar';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';

export default function Index() {
  return (
    <Layout>
      <AppBar />
      <Container maxWidth="md" style={{ marginTop: 80 }}>
        <h2>
          Witaj w aplikacji do planowania i zarządzania usługami w branży
          okiennej
        </h2>
        <h4>
          Aby przejść do wersji demonstracyjnej aplikacji - kliknij przycisk
          poniżej.
        </h4>
        <Link href="/scheduler">
          <Button color="primary" variant="outlined">
            Terminarz
          </Button>
        </Link>
        <h4>
          Aby powrócić do strony głównej kliknij ikonę
          <span style={{ margin: '0 5px' }}>
            <MenuIcon />
          </span>
          w lewym górnym rogu.
        </h4>
        <h4>
          W obecnej chwili aplikacja nie jest podłączona do żadnej bazy danych.
          Wprowadzone dane znikają po zamknięciu przeglądarki lub odświeżeniu
          strony. Nie są też dostępne wszystkie funkcjonalności przewidziane w
          dalszych wydaniach aplikacji.
        </h4>
      </Container>
    </Layout>
  );
}
