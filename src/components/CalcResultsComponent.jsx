import { Box, Paper } from "@mantine/core"
import React from "react"

const CalcResultsComponent = ({prediction}) => {
  return (
    <Box>
    {prediction && (
        <Paper maw={500} p="md" withBorder shadow="md" bg={'blue'} >
            <h2>Your recomendations for Ad campaign are here!</h2>
            <div>impressions: <b>{prediction.impressions}</b></div>
            <div>clicks: <b>{prediction.clicks}</b></div>
            <div>uniqueUsers: <b>{prediction.uniqueUsers}</b></div>
            <div>recommendedBid: <b>${prediction.recommendedBid}</b></div>
        </Paper>
    )}
</Box>
  )
}
export default CalcResultsComponent