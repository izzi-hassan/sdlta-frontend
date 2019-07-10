import React from 'react';
import { Button, IconButton, Snackbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { connect } from 'react-redux';

import { hideMessage } from '../redux/actions';

class Message extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: '',
            type: 'info',
            open: false,
            vertical: 'bottom',
            horizontal: 'center'
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.message === undefined || nextProps.message === null) {
            this.setState({open: false});
        } else {
            this.setState({...nextProps});
            this.setState({open: true});
        }
    }

    handleClose = () => {
        this.props.hideMessage();
    }

    render() {
        const { vertical, horizontal, open, message} = this.state;
        return (
            <div>
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={open}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{message}</span>}
                    action={[
                        <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
                            Close
                        </Button>,
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className="messageCloseButton"
                            onClick={this.handleClose}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    if (state.settings.message === null) {
        return {};
    }

    return state.settings.message;
};

export default connect(mapStateToProps, { hideMessage })( Message );