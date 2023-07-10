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
    // fetch('https://prca-dd7106876c30.herokuapp.com/analyze', {
      // fetch(`https://prca-dd7106876c30.herokuapp.com/results/${jobId}`)

    const handleAnalyze = async (formData) => {
        setIsLoading(true)
        handleClose()
        console.log({
            password: formData.password,
            github_repo: formData.repo,
            github_user: formData.githubUser,
        })
        fetch('http://127.0.0.1:5000/analyze', {
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
              const jobId = data.job_id;
              console.log(`Job ${jobId} started.`);
              const jobCheckIntervalId = setInterval(() => {
                fetch(`http://127.0.0.1:5000/results/${jobId}`, {
                  method: 'GET',
                })
                  .then((response) => {
                    if (response.status === 202) {
                      console.log('Job in progress');
                    } else if (response.ok) {
                      return response.json();
                    } else {
                      throw new Error('Network response was not ok');
                    }
                  })
                  .then((data) => {
                    if (data) {
                      console.log(data);
                      setAnalysis(data);
                      setIsLoading(false);
                      clearInterval(jobCheckIntervalId);
                    }
                  })
                  .catch((error) => {
                    console.log(error.message);
                    clearInterval(jobCheckIntervalId);
                  });
              }, 5000);
            })
            .catch(error => {
              setAnalysis({error: error.message});
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
