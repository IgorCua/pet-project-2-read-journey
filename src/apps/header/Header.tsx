import { NavLink, Outlet } from "react-router-dom"
import { PageWrapper } from "../../components/PageWrapper/PageWrapper"

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { theme } from "../../styles/themes";
import { Icon } from "../../components/icon/Icon";
import { 
    LogOffBtn, 
    Nav, 
    NavContainer, 
    UserContainer, 
    UserName
} from "./styled";
import React, { useState } from "react";
import { Backdrop } from "@mui/material";
import { useDispatch } from "react-redux";
import { store } from "../../redux/store";
import { userSignOut } from "../../redux/auth/operations";
import { useSelector } from "react-redux";
import { selectAuthUserName } from "../../redux/auth/selectors";

export type AppDispatch = typeof store.dispatch;

export function Header() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const userName = useSelector(selectAuthUserName);

    const handleModal = (event: React.MouseEvent<HTMLElement>) => {
        if(event.target === event.currentTarget)setIsModalOpen(!isModalOpen);
    }

    const handleLogOut = () => {
        dispatch(userSignOut());
        dispatch({type: 'SIGNOUT'});
    }

    return (
        <>
        <PageWrapper>
            <AppBar position="static" sx={{ 
                paddingRight: '20px', 
                paddingLeft: '20px', 
                borderRadius: '15px', 
                overflow: 'hidden',
                [theme.breakpoints.up('tablet')]: {
                    padding: '16px',
                }
            }}>
                <Container>
                    <Toolbar 
                        disableGutters
                        sx={{
                            justifyContent: 'space-between',
                            [theme.breakpoints.up('tablet')]: {
                                flexDirection: 'row'
                            }
                        }}>

                        <Box sx={{
                            flexGrow: 1,
                            display: 'flex',
                            [theme.breakpoints.up('tablet')]: {
                                flexGrow: 0,
                                gap: '4px',
                            }
                        }}>
                            <Icon iconName='#icon-logo' sx={{width: '32px', height: '17px'}}/>
                            <Typography
                                noWrap
                                sx={{
                                    fontWeight: 700,
                                    lineHeight: '18px', /* 100% */
                                    letterSpacing: '0.36px',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                    textTransform: 'uppercase',
                                    [theme.breakpoints.down('laptop')]:{
                                        display:'none'
                                    },
                                    [theme.breakpoints.up('laptop')]:{
                                        fontWeight: '700',
                                        display: "inline"
                                    } 
                                }}
                            >
                                Reading journey
                            </Typography>
                        </Box>

                        {/* nav box */}
                        <Box sx={{ 
                            flexGrow: 0,
                            display: 'flex', 

                            [theme.breakpoints.down('tablet')]:{
                                display:'none',
                                alignSelf: 'flex-end'
                            },
                            
                            [theme.breakpoints.up('tablet')]:{
                                marginLeft: '100px'
                            },
                            [theme.breakpoints.up('laptop')]:{
                                marginLeft: '-45px'
                            }  
                        }}>
                            <NavContainer>
                                <Nav>
                                    <NavLink to={'/recommended'} onClick={() => setIsModalOpen(false)}>
                                        <p>Home</p>
                                        <div/>
                                    </NavLink>
                                    <NavLink to={'/library'} onClick={() => setIsModalOpen(false)}>
                                        <p>My library</p>
                                        <div/>
                                    </NavLink>
                                </Nav>
                            </NavContainer>
                        </Box>
                        
                        {/* user icon, log out btn */}
                        <Box sx={{ 
                            flexGrow: 0, 
                            display: 'flex', 
                            flexDirection: 'row', 
                            alignItems: 'center' 
                        }}>
                            <IconButton sx={{ 
                                p: 0,
                                [theme.breakpoints.up('mobileS')]: {
                                    marginRight:'10px'
                                },
                                
                                [theme.breakpoints.up('tablet')]: {
                                    marginRight:'8px'
                                }
                            }}>
                                <UserContainer>
                                    {userName ? <Typography>{userName[0]}</Typography> : <p>N</p>}
                                </UserContainer>
                            </IconButton>

                            <UserName>{userName}</UserName>

                            <LogOffBtn 
                                onClick={handleLogOut}
                            >Log out</LogOffBtn>
                        </Box>
                        
                        {/* mobile nav with backdrop */}
                        <Box sx={{ 
                            zIndex: 1000,

                            [theme.breakpoints.up('tablet')]: {
                                display:'none',
                            } 
                        }}>
                            <IconButton
                                size="small"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={() => setIsModalOpen(true)}
                                color="inherit"
                                sx={{padding: '0'}}
                            >
                                <Icon iconName='#icon-burger-menu' sx={{width: '28px', height: '28px'}}/>
                            </IconButton>

                            <Backdrop 
                                open={isModalOpen}
                                onClick={handleModal}
                                sx={{
                                    minWidth: '280px',
                                    justifyContent: 'flex-end',
                                    [theme.breakpoints.up('tablet')]: {
                                        display:'none',
                                    } 
                                }}
                            >
                                <NavContainer>
                                    <IconButton
                                    size="small"
                                    aria-label="close navigation"
                                    aria-controls="menu-appbar"
                                    // aria-haspopup="true"
                                    onClick={() => setIsModalOpen(false)}
                                    color="inherit"
                                    sx={{width: '38px', height: '38px'}} 
                                    >
                                        <Icon 
                                            iconName='#icon-close' 
                                            sx={{width: '28px', height: '28px'}} 
                                        />
                                    </IconButton>
                                    <Nav>
                                        <NavLink to={'/recommended'} onClick={() => setIsModalOpen(false)}>
                                            <p>Home</p>
                                            <div/>
                                        </NavLink>
                                        <NavLink to={'/library'} onClick={() => setIsModalOpen(false)}>
                                            <p>My library</p>
                                            <div/>
                                        </NavLink>
                                    </Nav>
                                    <LogOffBtn 
                                        sx={{[theme.breakpoints.down('tablet')]: {display: 'block'}}} 
                                        onClick={handleLogOut}>Log out</LogOffBtn>
                                </NavContainer>
                            </Backdrop>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Outlet/>
        </PageWrapper>
        </>
    );
}