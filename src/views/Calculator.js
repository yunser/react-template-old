import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    menu: {
      width: 200,
    },
});

class Calculator extends Component {

    constructor(props) {
        super(props);
        // this.state = {value: 'Hello Runoob!'};
        this.handleChange = this.handleChange.bind(this);
    }

    state = {
        name: '',
        age: '',
        // tip
        open: false,
        vertical: 'top',
        horizontal: 'center',
        message: ''
    };
    
    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    };

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    run = e => {
        if (!this.state.name) {
            this.setState({
                message: '请输入姓名',
                open: true
            })
            return
        }
        if (!this.state.age) {
            this.setState({
                message: '请输入年龄',
                open: true
            })
            return
        }

    }

    render() {
        const { vertical, horizontal, open, message } = this.state

        return <div>
            <form className="form" noValidate autoComplete="off">
                <TextField
                    id="name"
                    label="姓名"
                    value={this.state.name}
                    onChange={this.handleChange('name')}
                    margin="normal"
                    InputLabelProps={{
                        shrink: true
                    }}
                    />
                <br/>
                <TextField
                    label="年龄"
                    value={this.state.age}
                    onChange={this.handleChange('age')}
                    type="number"
                    InputLabelProps={{
                        shrink: true
                    }}
                    margin="normal"
                    />
                <br/>
                <Button variant="contained" color="primary" onClick={this.run}>执行</Button>
            </form>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={this.handleClose}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                autoHideDuration={2000}
                message={<span id="message-id">{message}</span>}
                />
        </div>;
    }
}

export default Calculator
