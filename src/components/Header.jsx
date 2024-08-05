import { Flex,Burger,Button,useMantineColorScheme,useComputedColorScheme,AppShell } from '@mantine/core'
import React from 'react';
import { IconMoon, IconSun } from '@tabler/icons-react';

const Header = ({toggle, opened}) => {
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme('light');

    const toggleColorScheme = () => {
        setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark');
    };

    return (
        <AppShell.Header>
            <Flex justify="space-between" align="center" style={{ padding: '10px 20px' }}>
                <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                <div>{computedColorScheme === 'dark' ? '🦉' : '🦩'} Super Ad Manager</div>
                <Button size="sm" variant="link" onClick={toggleColorScheme}>
                    {computedColorScheme === 'dark' ? <IconSun /> : <IconMoon />}
                </Button>
            </Flex>
        </AppShell.Header>
    );
}

export default Header