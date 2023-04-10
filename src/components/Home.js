import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function Home() {
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">MY TRAINING APP</Typography>
                </Toolbar>
            </AppBar>
            <img src="https://cdn.pixabay.com/photo/2016/02/08/11/24/homepage-1186348__340.jpg" alt="homepage" />
        </div>
    );
}

export default Home;
