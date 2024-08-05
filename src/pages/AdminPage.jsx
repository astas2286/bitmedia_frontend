import React,{ useState,useEffect } from "react";
import { Box,Button,Container,Flex,Group,Paper,Slider,Text,NumberInput,Rating,LoadingOverlay } from '@mantine/core';
import { useForm } from '@mantine/form';
import axios from 'axios';
import { io } from 'socket.io-client';
import ModalAdminInfo from "../components/ModalAdminInfo.jsx";
import LogComponent from "../components/LogComponent.jsx";
import ErrorComponent from "../components/ErrorComponent.jsx";

function AdminPage() {
  const [logs,setLogs] = useState([]);
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(false);
  const [errorModalOpened,setErrorModalOpened] = useState(false);

  useEffect(() => {
    const socket = io(`${process.env.REACT_APP_BACKEND_URL}`);

    socket.on('message',(message) => {
      setLogs((prevLogs) => [...prevLogs,message]);
    });

    return () => {
      socket.disconnect();
    };
  },[]);

  const form = useForm({
    initialValues: {
      impressions: 2000000,
      clickRate: 30,
      numWorkers: 8,
    },

    validate: {
      impressions: (value) => (value >= 0 && value <= 3000000 ? null : 'Invalid number of impressions'),
      clickRate: (value) => (value >= 0 && value <= 100 ? null : 'Invalid click rate'),
      numWorkers: (value) => (value >= 1 && value <= 8 ? null : 'Invalid number of workers'),
    },
  });

  
  const handleInitializeDB = async (values) => {
    setLogs([]);
    setLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/initialize-db`,values);
      console.log(response.data);
      
    } catch (error) {
      console.error('Error initializing database:',error);
      setError(error.message);
      setErrorModalOpened(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSliderChange = (name,value) => {
    form.setFieldValue(name,value);
  };

  return (
    <>

      <Flex justify="center" align="center" direction={'column'}>
        <ErrorComponent error={error} setErrorModalOpened={setErrorModalOpened} errorModalOpened={errorModalOpened} />
        <Paper p="xl" mx="auto" maw={400} withBorder bg={'transparent'} mb={20}>
          <Flex justify="center" direction={'column'}>
            <Container size="md" pb={25}>
              <ModalAdminInfo />
            </Container>
            <form onSubmit={form.onSubmit((values) => handleInitializeDB(values))}>
              <Box pos="relative">
                <LoadingOverlay visible={loading} zIndex={10} overlayProps={{ radius: "sm",blur: 2 }} />
                <Box maw={400} mx="auto">
                  <Text size="sm" mt="xl" pb={10}>Set impressions qty from 0 to 3000000</Text>
                  <Slider
                    label={(value) => `${value}`}
                    min={0}
                    max={3000000}
                    {...form.getInputProps('impressions')}
                    value={form.values.impressions}
                    onChange={(value) => handleSliderChange('impressions',value)}
                  />
                  <NumberInput
                    size="xs"
                    radius="xs"
                    label="Impressions"
                    description="Input the number of impressions"
                    placeholder="Enter number of impressions"
                    min={0}
                    max={3000000}
                    value={form.values.impressions}
                    onChange={(value) => handleSliderChange('impressions',value)}
                  />
                  <Text mt="md" size="sm">
                    Impressions value: <b>{form.values.impressions}</b>
                  </Text>
                </Box>
                <Box maw={400} mx="auto">
                  <Text size="sm" mt="xl" pb={10}>Set click rate from 0% to 100%</Text>
                  <Slider
                    label={(value) => `${value}%`}
                    min={0}
                    max={100}
                    {...form.getInputProps('clickRate')}
                    value={form.values.clickRate}
                    onChange={(value) => handleSliderChange('clickRate',value)}
                  />
                  <NumberInput
                    size="xs"
                    radius="xs"
                    label="Click Rate"
                    description="Input the click rate"
                    placeholder="Enter click rate"
                    min={0}
                    max={100}
                    value={form.values.clickRate}
                    onChange={(value) => handleSliderChange('clickRate',value)}
                  />
                  <Text mt="md" size="sm">
                    Click rate value: <b>{form.values.clickRate}%</b>
                  </Text>
                </Box>
                <Box maw={400} mx="auto">
                  <Text size="sm" mt="xl" pb={10}>Set number of workers</Text>
                  <Rating
                    value={form.values.numWorkers}
                    onChange={(value) => handleSliderChange('numWorkers',value)}
                    count={8}
                    color="red"
                  />
                  <Text mt="md" size="sm">
                    Number of workers: <b>{form.values.numWorkers}</b>
                  </Text>
                </Box>
                <Group justify="center" mt="md" pb={20}>
                  <Button type="submit">Submit</Button>
                </Group>
              </Box>

            </form>
          </Flex>
        </Paper>
            {logs.length > 0 && (<LogComponent logs={logs} />)}
      </Flex>
    </>
  );
}

export default AdminPage;
