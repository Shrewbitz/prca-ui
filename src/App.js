import React, { useState } from 'react'
import Form from './components/Form'
import Analysis from './components/Analysis'
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    CircularProgress,
    createTheme,
    ThemeProvider,
} from '@mui/material/'
import About from './components/About'

const theme = createTheme({
    palette: {
        primary: {
            main: '#B5DE68', // This is a green color
        },
        secondary: {
            main: '#ff5722', // This is an orange color
        },
    },
})

function App() {
    const [analysis, setAnalysis] = useState(null)
    const [open, setOpen] = useState(false)
    const [openAbout, setOpenAbout] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleAboutOpen = () => {
        setOpenAbout(true)
    }

    const handleAboutClose = () => {
        setOpenAbout(false)
    }

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    // const handleLoading = () => {
    //   setIsLoading(false);
    // }

    const handleAnalyze = async (formData) => {
        setIsLoading(true)
        handleClose()
        console.log({
            password: formData.password,
            github_repo: formData.repo,
            github_user: formData.githubUser,
        })
        fetch('https://prca-dd7106876c30.herokuapp.com/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                password: formData.password,
                github_repo: formData.repo,
                github_user: formData.githubUser,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Netwrok response was not ok')
                }
                return response.json()
            })
            .then((data) => {
                console.log(data)
                setAnalysis(data)
                setIsLoading(false)
            })
            .catch((error) => {
                setAnalysis({ error: error.message })
                setIsLoading(false)
            })
    }

    const handleAnalyzeAnother = () => {
        setAnalysis(null)
    }

    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" style={{ flexGrow: 1 }}>
                            PRCA: Pull Request Comment Analysis
                        </Typography>
                        <Button color="inherit" onClick={handleAboutOpen}>
                            About
                        </Button>
                        <About open={openAbout} onClose={handleAboutClose} />
                        <Button
                            color="inherit"
                            target="_blank"
                            href="https://github.com/Shrewbitz"
                        >
                            GitHub
                        </Button>
                    </Toolbar>
                </AppBar>
                <Box mt={5}>
                    {analysis ? (
                        <Analysis
                            analysisText={analysis}
                            onAnalyzeAnother={handleAnalyzeAnother}
                        />
                    ) : (
                        <Box display="flex" justifyContent="center" mt={5}>
                            {isLoading ? (
                                <CircularProgress size={36} />
                            ) : (
                                <>
                                    <Button
                                        size="large"
                                        center
                                        variant="contained"
                                        color="primary"
                                        onClick={handleClickOpen}
                                    >
                                        Begin
                                    </Button>
                                    <Dialog
                                        fullWidth
                                        open={open}
                                        onClose={handleClose}
                                    >
                                        <DialogTitle>
                                            Analyze Comments
                                        </DialogTitle>
                                        <DialogContent>
                                            <Form onAnalyze={handleAnalyze} />
                                        </DialogContent>
                                    </Dialog>
                                </>
                            )}
                        </Box>
                    )}
                </Box>
            </div>
        </ThemeProvider>
    )
}

export default App
