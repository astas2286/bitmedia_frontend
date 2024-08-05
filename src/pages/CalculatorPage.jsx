import React,{ useState,useEffect } from "react";
import { Box,Button,Container,Flex,Group,LoadingOverlay,Paper,Select,Slider,Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import axios from 'axios';
import { io } from 'socket.io-client';
import ModalCalcInfo from "../components/ModalsComponent.jsx";
import LogComponent from "../components/LogComponent.jsx";
import CalcResultsComponent from "../components/CalcResultsComponent.jsx";
import ErrorComponent from "../components/ErrorComponent.jsx";

function CalculatorPage() {
    const [logs,setLogs] = useState([]);
    const [prediction,setPrediction] = useState(null);
    const [error,setError] = useState(null);
    const [errorModalOpened,setErrorModalOpened] = useState(false);
    const [loading,setLoading] = useState(false);

    const bannerSizes = ['300x250','728x90','160x600','468x60'];
    const categories = ['Technology','Finance','Entertainment','Education','Health'];

    useEffect(() => {
        const socket = io(`${process.env.REACT_APP_BACKEND_URL}`, {
            rejectUnauthorized: false
          });

        socket.on('message',(message) => {
            setLogs((prevLogs) => [...prevLogs,message]);
        });

        return () => {
            socket.disconnect();
        };
    },[]);

    const form = useForm({
        initialValues: {
            banner_size: '300x250',
            category: 'Technology',
            budget: 10,
        },

        validate: {
            banner_size: (value) => (['300x250','728x90','160x600','468x60'].includes(value) ? null : 'Invalid banner size'),
            category: (value) => (['Technology','Health','Finance','Education','Entertainment'].includes(value) ? null : 'Invalid category'),
            budget: (value) => (value > 0 && value <= 10000 ? null : 'Invalid budget, must be between 1 and 10000'),
        },
    });

    const handleSubmit = async (values) => {
        try {
            setPrediction('Updating...');
            setLoading(true);
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/campaign`,values);
            setPrediction(response.data);
            setError(null);
            setErrorModalOpened(false);
        } catch (error) {
            console.error('Error fetching prediction:',error);
            setError(error.message);
            setErrorModalOpened(true);
        }
        finally {
            setLoading(false);
        }
    };

    const handleSliderChange = (value) => {
        form.setFieldValue('budget',value);
    };

    return (<>
        <Flex justify="center" align="center" direction={'column'}>
            <ErrorComponent error={error} setErrorModalOpened={setErrorModalOpened} errorModalOpened={errorModalOpened} />
            <Paper p="xl" mx="auto" maw={400} withBorder bg={'transparent'} mb={20}>
                <Flex justify="center" direction={'column'}>
                    <Container size="md" pb={25}>
                        <ModalCalcInfo />
                    </Container>
                    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                        <Box pos="relative">
                            <LoadingOverlay visible={loading} zIndex={10} overlayProps={{ radius: "sm",blur: 2 }} />

                            <Select
                                pb={15}
                                label="Choose Banner Size:"
                                withAsterisk
                                placeholder="Pick one"
                                data={bannerSizes}
                                clearable={true}
                                {...form.getInputProps('banner_size')}
                            />
                            <Select
                                pb={15}
                                label="Choose Category:"
                                withAsterisk
                                placeholder="Pick one"
                                data={categories}
                                clearable={true}
                                {...form.getInputProps('category')}
                            />
                            <Text size="sm" mt="xl" pb={10}>Choose your budget from 10 to 10000</Text>
                            <Box maw={400} mx="auto">
                                <Slider
                                    label={(value) => `$${value}`}
                                    min={10}
                                    max={10000}
                                    {...form.getInputProps('budget')}
                                    value={form.values.budget}
                                    onChange={handleSliderChange}
                                />
                                <Text mt="md" size="sm">
                                    Daily budget value: <b>${form.values.budget}</b>
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

            <CalcResultsComponent prediction={prediction} />
        </Flex>
    </>
    );
}

export default CalculatorPage;
