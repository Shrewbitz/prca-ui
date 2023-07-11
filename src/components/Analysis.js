import React from 'react'
import { Box, Button, Paper, Typography } from '@mui/material/'

const Analysis = ({ analysisText, onAnalyzeAnother }) => {
    const formattedText = <React.Fragment>Unable to analyze user.</React.Fragment>
    if (typeof analysisText === 'string' || analysisText instanceof String) {
        const lines = String(analysisText).split('\n')
        formattedText = lines.map((line, index) => (
            <React.Fragment key={index}>
                {line}
                <br />
            </React.Fragment>
        ))
    }

    return (
        <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
            <Paper
                elevation={3}
                style={{ padding: '1em', marginBottom: '1em', width: '50%' }}
            >
                <Typography align="center" variant="h6" gutterBottom>
                    {' '}
                    Feedback{' '}
                </Typography>
                <Typography align="center">{formattedText}</Typography>
            </Paper>
            <Button
                variant="contained"
                color="primary"
                onClick={onAnalyzeAnother}
            >
                Analyze Another User
            </Button>
        </Box>
    )
}

export default Analysis

// .split('\\n').map((line, index) => <p key={index}>{line}</p>)}
