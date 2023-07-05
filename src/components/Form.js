import React, { useState } from 'react'
import { Button, TextField, Grid, Box } from '@mui/material/'
const Form = ({ onAnalyze }) => {
    const [repo, setRepo] = React.useState('')
    const [githubUser, setGithubUser] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!repo || !githubUser || !password) {
            setError('Please fill in all the required fields.')
        }
        await onAnalyze({ repo, githubUser, password })
    }

    return (
        <Box p={2}>
            <form onSubmit={handleSubmit}>
                <Grid spacing={2} container direction="column">
                    <Grid item>
                        <TextField
                            label="Github Repository"
                            placeholder="https://github.com/facebook/react-native"
                            value={repo}
                            onChange={(e) => setRepo(e.target.value)}
                            variant="outlined"
                            required
                            error={!!error}
                            helperText={error}
                            fullWidth
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            spacing={2}
                            label="Github User"
                            placeholder="CoolProgrammer29"
                            value={githubUser}
                            onChange={(e) => setGithubUser(e.target.value)}
                            variant="outlined"
                            required
                            error={!!error}
                            helperText={error}
                            fullWidth
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            type="password"
                            label="PRCA password"
                            placeholder=""
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            variant="outlined"
                            required
                            error={!!error}
                            helperText={error}
                            fullWidth
                        />
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            fullWidth
                        >
                            Analyze
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    )
}

export default Form
