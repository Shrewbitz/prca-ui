import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import video from '../media/prca-demo.mp4'

const About = ({ open, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>About PRCA</DialogTitle>
            <DialogContent>
                <DialogContentText marginBottom={2}>
                    PRCA will look through pull requests made by a user, it will
                    collect comments made by other users. The comments are sent
                    to gpt3.5 for analysis. We return all of the gpt3.5's
                    analysis to gpt3.5 to summarize. It will then return the
                    final feedback. The following is an example of the backend
                    workflow with text files to help visualize what is
                    happening.
                </DialogContentText>
                <video width="100%" controls>
                    <source src={video} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                {/* replace with your video */}
                {/* <iframe title="myVideo" width="560" height="315" src="./media/prca-example.mp4" 
        frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> */}
            </DialogContent>
        </Dialog>
    )
}

export default About
