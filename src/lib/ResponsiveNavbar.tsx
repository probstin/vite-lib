import React from 'react';
import { Link, useRoutes } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Menu,
    MenuItem,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function ResponsiveNavbar({ links, searchComponent, brand }: any) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    const isMenuOpen = Boolean(anchorEl);

    const handleMenuOpen = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // Generate routes from links prop
    const routing = useRoutes(
        links.map((link: any) => ({
            path: link.path,
            element: <link.component />,
        }))
    );

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    {brand?.image ? (
                        <img src={brand.image} alt={brand.title} height="40px" />
                    ) : (
                        <Typography variant="h6">{brand.title}</Typography>
                    )}
                    {searchComponent && <div style={{ marginLeft: '1rem' }}>{searchComponent}</div>}
                    <div style={{ flexGrow: 1 }} />
                    {matches ? (
                        links.map((link: any, idx: any) => (
                            <Button key={idx} color="inherit" component={Link} to={link.path}>
                                {link.title}
                            </Button>
                        ))
                    ) : (
                        <IconButton color="inherit" onClick={handleMenuOpen}>
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Menu anchorEl={anchorEl} open={isMenuOpen} onClose={handleMenuClose}>
                        {links.map((link: any, idx: any) => (
                            <MenuItem key={idx} onClick={handleMenuClose} component={Link} to={link.path}>
                                {link.title}
                            </MenuItem>
                        ))}
                    </Menu>
                </Toolbar>
            </AppBar>
            {routing}
        </>
    );
}

export default ResponsiveNavbar;
