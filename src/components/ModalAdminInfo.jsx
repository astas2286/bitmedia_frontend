import { useDisclosure } from '@mantine/hooks';
import { Modal,Button,List } from '@mantine/core';
import React from 'react';
import { IconInfoCircle } from '@tabler/icons-react';

export default function ModalAdminInfo() {
    const [opened,{ open,close }] = useDisclosure(false);

    return (
        <>
            <Modal opened={opened} title="Hey Admin! 🛠️" centered onClose={close} withCloseButton={false} p={"md"}>
                <p>Before you dive into the database settings, here are a few friendly tips and warnings:</p>
                <List type="ordered">
                    <List.Item><b>Caution with Updates:</b> Making frequent or large updates can affect system performance. Think before you set those numbers too high!</List.Item>
                    <List.Item><b>Patience is Key:</b> After submitting changes, avoid refreshing the page. The operations will continue in the background.</List.Item>
                    <List.Item><b>Monitor Logs:</b> Keep an eye on the logs for real-time updates on the process.</List.Item>
                    <List.Item><b>Contact Support:</b> If things go sideways, don’t hesitate to reach out.(telegram: @astas2286)</List.Item>
                </List>
                <h3>Happy managing! 🌟</h3>
            </Modal>
            <Button color='red' leftSection={<IconInfoCircle size={16} />} onClick={open}>Hey Admin READ it first!!!</Button>
        </>
    );
}