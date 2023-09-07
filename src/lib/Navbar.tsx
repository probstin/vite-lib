
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, ListItemButton } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ links, children, appBrand }: any) => {
    const [mobileView, setMobileView] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();

    const handleResize = () => {
        if (window.innerWidth <= 600) {
            setMobileView(true);
        } else {
            setMobileView(false);
        }
    };

    React.useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const displayDesktop = () => (
        <Toolbar>
            {appBrandImage()}
            <div style={{ flexGrow: 1 }}>
                {links.map(({ title, path }: any) => (
                    <Typography variant="h6" key={title}>
                        <Link to={path} style={{ textDecoration: 'none', color: 'white', marginRight: '20px' }}>
                            {title}
                        </Link>
                    </Typography>
                ))}
            </div>
            {children}
        </Toolbar>
    );

    const displayMobile = () => (
        <Toolbar>
            <IconButton edge="start" color="inherit" onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
            </IconButton>
            <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <List>
                    {links.map(({ title, path }: any) => (
                        <ListItemButton key={title} onClick={() => {
                            navigate(path);
                            setDrawerOpen(false);
                        }}>
                            <ListItemText primary={title} />
                        </ListItemButton>
                    ))}
                </List>
            </Drawer>
            {appBrandImage()}
            <div style={{ flexGrow: 1 }} />
            {children}
        </Toolbar>
    );

    const appBrandImage = () => {
        if (appBrand?.image) {
            return (
                <img src={appBrand.image} alt={appBrand.title} style={{ marginRight: '10px', height: '40px' }} />
            );
        }
        return (
            <Typography variant="h6" style={{ marginRight: '20px' }}>
                {appBrand?.title || 'App'}
            </Typography>
        );
    };

    return (
        <AppBar position="sticky">
            {mobileView ? displayMobile() : displayDesktop()}
        </AppBar>
    );
};

export default Navbar;
