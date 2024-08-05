import React from "react"
import { Paper,Text } from "@mantine/core"

const LogComponent = ({ logs }) => {
    return (
        <Paper withBorder shadow="md" p="4" mb={20} maw={400} mah={110} bg={'blue'}>
            <Text size="sm" fw={700}>Logs</Text>
            <div style={{ maxHeight: '80px',overflow: 'hidden' }}>
                {logs.slice().reverse().map((log,index) => (
                    <div style={{ fontSize: '10px' }} key={index}>{log}...</div>
                ))}
            </div>
        </Paper>
    )
}
export default LogComponent