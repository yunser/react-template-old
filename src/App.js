import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
// page
import Calculator from './views/Calculator'
import Home from './views/Home'
import About from './views/About'
// ui
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DraftsIcon from '@material-ui/icons/Drafts';
import HomeIcon from '@material-ui/icons/Home';
// import MenuIcon from '@material-ui/icons/Menu';
// import Footer from './Footer'

class PrimaryLayout extends Component {
    
    constructor(props) {
        super(props);
    }

    state = {
        title: '首页',
        open: false
    }

    hideDrawer = () => {
        console.log('隐藏内容')
        console.log(this)
        this.state.open = false
    }

    setTitle(title) {
        // this.setState('title', title)
    }

    render() {
        const {open, title} = this.state

        return (
            <div className="app">
                <header className="page-header">
                    <AppBar position="static" color="inherit">
                        <Toolbar>
                        <IconButton className={this.props.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                            <Typography variant="title" color="inherit">{ title }</Typography>
                        </Toolbar>
                    </AppBar>
                </header>
                这是首页
                <div className="page-body">
                    <Route path="/" exact component={Home} />
                    <Route path="/about" component={About} />
                    <Route path="/calculator" component={Calculator} />
                </div>
                <Drawer
                    anchor="left"
                    open={open}
                    onClose={this.hideDrawer}
                    className="page-drawer2"
                    >
                    <List className="list" component="nav">
                        <ListItem button component={Link} to="/" onClick={this.setTitle('计算器')}>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="首页" />
                        </ListItem>
                        <ListItem button component={Link} to="/calculator" onClick="setTitle('计算器')">
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
                </Drawer>
                <div
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
                </div>
            </div>
        )
    }
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
