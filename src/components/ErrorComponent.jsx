import { IconX } from '@tabler/icons-react';
import { Modal, Notification, rem } from '@mantine/core';
import React from 'react';

export default function ErrorComponent({ error, setErrorModalOpened, errorModalOpened }) {
  const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;

  return (
    <Modal
      opened={errorModalOpened}
      onClose={() => setErrorModalOpened(false)}
      title="Something went wrong!"
    >
      {error && (
        <Notification icon={xIcon} color="red" title="Error" withCloseButton={false}>
          {error}
        </Notification>
      )}
    </Modal>
  );
}
