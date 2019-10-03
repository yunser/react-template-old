import React, { Component, useState, useEffect } from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
// page
import Calculator from './views/Calculator'
import Home from './views/Home'
import About from './views/About'
// ui
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import DraftsIcon from '@material-ui/icons/Drafts'
import HomeIcon from '@material-ui/icons/Home'
import InfoIcon from '@material-ui/icons/Info'
import MoreIcon from '@material-ui/icons/MoreVert'

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem'

// import MenuIcon from '@material-ui/icons/Menu';
// import Footer from './Footer'
import './App.css'
import { blue, red } from '@material-ui/core/colors';

function PrimaryLayout(props) {
    const [ open, setOpen ] = React.useState(window.innerWidth >= 800)
    const [ drawerType, setDrawerType ] = React.useState(window.innerWidth >= 800 ? 'inner' : 'mask')
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    
    const [anchorEl, setAnchorEl] = React.useState(null);

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    // let setState = state => {
    //     setState(state)
    // }
    
    function hideDrawer() {
        console.log('隐藏内容')
        setOpen(false)
        // setState({
        //     open: false
        // })
    }

    useEffect(() => {
        console.log('useEffect')
        let onResize
        window.addEventListener('resize', onResize = () => {
            console.log('resize')
            setWindowWidth(window.innerWidth)
            setDrawerType(window.innerWidth > 800 ? 'inner' : 'mask')
        })
        return () => {
            window.removeEventListener('resize', onResize)
        }
    }, [])
    
    function Side() {
        return (
            <div className="ui-page-side-content">
                <div className="side-header">
                    {/* {windowWidth} */}
                    <img className="logo" src="http://localhost:8082/static/img/counter.svg" />
                </div>
                <List className="list" component="nav">
                    <ListItem button component={Link} to="/">
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="首页" />
                    </ListItem>
                    {/* <ListItem button component={Link} to="/calculator">
                        <ListItemIcon>
                            <DraftsIcon />
                        </ListItemIcon>
                        <ListItemText primary="计算器" />
                    </ListItem> */}
                    <ListItem button component="a" href="https://project.yunser.com/products/c209e7809fa511e99df48144af4c96c0" target="_blank">
                        <ListItemIcon>
                            <InfoIcon />
                        </ListItemIcon>
                        <ListItemText primary="关于" />
                    </ListItem>
                </List>
            </div>
        )
    }
    
    function toggleDrawer() {
        setOpen(!open)
        // setState({
        //     open: !open
        // })
    }
    
    return (
        <div className="app">
            <div className="ui-page">
                <header className="ui-page-header">
                    <AppBar position="static">
                        <Toolbar>
                            <div className="ui-toolbar">
                                <div className="ui-toolbar-left">
                                    <IconButton className={props.menuButton} color="inherit" onClick={toggleDrawer}>
                                        <MenuIcon />
                                    </IconButton>
                                    <Typography variant="title" color="inherit">记分</Typography>
                                </div>
                                <div className="ui-toolbar-right">
                                    {/* <IconButton color="inherit" aria-label="menu">
                                        <MenuIcon />
                                    </IconButton> */}
                                    {/* <IconButton color="inherit" aria-label="menu">
                                        <MoreIcon onClick={handleClick} />
                                    </IconButton> */}
                                </div>
                            </div>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                                <MenuItem onClick={handleClose}>Logout</MenuItem>
                            </Menu>
                        </Toolbar>
                    </AppBar>
                </header>
                <div className="ui-page-body">
                    <div className="ui-page-side" style={{left: (drawerType === 'inner' && open) ? 0 : -256}}>
                        <Side />
                    </div>
                    {drawerType === 'mask' &&
                        <Drawer
                            anchor="left"
                            open={open}
                            classes={{
                                width: 320,
                            }}
                            onClose={hideDrawer}
                            className="page-drawer2"
                            >
                            <Side />
                        </Drawer>
                    }

                    <div className="ui-page-content" style={{paddingLeft: (drawerType === 'inner' && open) ? 256 : 0}}>
                        <Route path="/" exact component={Home} />
                        <Route path="/about" component={About} />
                        <Route path="/calculator" component={Calculator} />
                    </div>
                </div>
                {/* <div
                    anchor="left"
                    variant="permanent"
                    open={true}
                    className="page-drawer"
                    >
                    <List component="nav">
                        <ListItem button component={Link} to="/">
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="首页" />
                        </ListItem>
                        <ListItem button component={Link} to="/calculator">
                            <ListItemIcon>
                                <DraftsIcon />
                            </ListItemIcon>
                            <ListItemText primary="计算器" />
                        </ListItem>
                        <ListItem button component={Link} to="/about">
                            <ListItemIcon>
                                <DraftsIcon />
                            </ListItemIcon>
                            <ListItemText primary="关于" />
                        </ListItem>
                    </List>
                </div> */}
    
            </div>
        </div>
    )
}

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <PrimaryLayout />
            </BrowserRouter>
        )
    }
}

export default App;
