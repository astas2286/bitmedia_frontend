import { useDisclosure } from '@mantine/hooks';
import { Modal,Button } from '@mantine/core';
import React from 'react';
import { IconInfoCircle } from '@tabler/icons-react';

export default function ModalCalcInfo() {
  const [opened,{ open,close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} title="Hello! 😀🙃😇" centered onClose={close} withCloseButton={false} p={"md"}>
        Welcome to the Ad Campaign Recommendation Page! Here, you can easily get tailored insights to optimize your advertising campaigns. To begin, select your preferred banner size, category, and budget. Once submitted, our system will analyze the data and provide you with estimates on impressions, clicks, unique users, and a recommended bid to help you achieve the best results. If you have any questions or need further assistance, please reach out to our support team. Happy advertising!
      </Modal>
      <Button leftSection={<IconInfoCircle size={16} />} onClick={open}>Click here and learn more</Button>
    </>
  );
}