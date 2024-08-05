import { useDisclosure } from '@mantine/hooks';
import React from 'react';
import { AppShell } from '@mantine/core';
import './App.css';
import Navbar from './components/Navbar';
import Header from './components/Header';
import RouterSwitcher from './router/RouterSwitcher';
import BGComponent from './components/BGComponent';
import FooterComponent from './components/FooterComponent';

function App() {
  const [opened,{ toggle }] = useDisclosure(false);

  return (
    <AppShell
      header={{ height: 60 }}
      footer={{ height: 60 }}
      navbar={{ width: 300,breakpoint: 'sm',collapsed: { mobile: !opened } }}
      padding="md"
    >
      <Header toggle={toggle} opened={opened} />
      <Navbar />
      <AppShell.Main>
        <BGComponent>
          <RouterSwitcher />
        </BGComponent>
      </AppShell.Main>
      <FooterComponent />
    </AppShell>
  );
}

export default App;