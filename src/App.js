
import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TheatersIcon from '@mui/icons-material/Theaters';

import MovieList from './pages/MovieList';
import HomePage from './pages/HomePage';
import ActorList from './pages/ActorList';


function App() {
  
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  

  return (
    <div className="App">
      
      <div className="AppBar-menu" >
    <AppBar position="static" color="grey">
                <Container maxWidth="xl" color="black" >
                    <Toolbar disableGutters>
                    <TheatersIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        }}
                    >
                        ElokuvaSivuBäkkäriProjekti
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                        >
                        <MenuIcon />
                        </IconButton>
                        <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                        }}
                        >
                        
                        <MenuItem onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">
                            <Button href={"/"} color="inherit" >Home</Button>
                        </Typography>
                        </MenuItem>
                        
                        <MenuItem onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">
                            <Button href={"/movies"} color="inherit" >Movies</Button>
                        </Typography>
                        </MenuItem>

                        <MenuItem onClick={handleCloseNavMenu}>
                        <Typography textAlign="center" >
                            <Button href={"/actors"} color="inherit" >Actors</Button>
                        </Typography>
                        </MenuItem>

                        </Menu>
                    </Box>
                    <TheatersIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        }}
                    >
                        ElokuvaSivuBäkkäriProjekti
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        
                        <Button href={"/"}
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'inherit', display: 'block' }}
                        >
                            Home   
                        </Button>
                       
                        <Button href={"/movies"}
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'inherit', display: 'block' }}
                        >
                            Movies
                        </Button>

                        <Button href={"/actors"}
                            onClick={handleCloseNavMenu} 
                            sx={{ my: 2, color: 'inherit', display: 'block' }} >
                            Actors
                        </Button>
                        
                    </Box>
                    </Toolbar>
                </Container>
            </AppBar>
    </div>

      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/movies" element={<MovieList />} />
        <Route path="/actors" element={<ActorList />} />
      </Routes>  
      </BrowserRouter>
    </div>
  );
}

export default App;
