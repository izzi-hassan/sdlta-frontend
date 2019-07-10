import React from 'react';
import { connect } from 'react-redux';
import { updateSettings } from '../redux/actions';

import { Container, Paper, TextField, InputAdornment, Button } from '@material-ui/core';
import config from '../config/app';


class Admin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            exchange_refresh_rate: '',
            commission_percentage: '',
            surcharge: '',
            minimum_commission: '',
            margin_percentage: ''
        };

        if (props.exchange_refresh_rate !== null) {
            this.state = {...this.state, ...props};
        }

        console.log(this.state);

        this.handleChange = this.handleChange.bind(this);
    };

    componentWillReceiveProps(nextProps) {
        this.setState({ ...nextProps });
    }

    updateSettings = () => {
        this.props.updateSettings(this.state);
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    render () {
        return (
            <Paper className="content-container">
                <Container className="settings-form-container">
                    <TextField
                        label="Refresh Currency Rate"
                        id="exchange_refresh_rate"
                        value={this.state.exchange_refresh_rate}
                        onChange={this.handleChange}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">Seconds</InputAdornment>,
                        }}
                        required={true}
                    />

                    <br />

                    <TextField
                        label="Commission Rate"
                        id="commission_percentage"
                        value={this.state.commission_percentage}
                        onChange={this.handleChange}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">%</InputAdornment>,
                        }}
                        required={true}
                    />
                    
                    <br />

                    <TextField
                        label="Surcharge"
                        id="surcharge"
                        value={this.state.surcharge}
                        onChange={this.handleChange}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">{config.home_currency_code}</InputAdornment>,
                        }}
                        required={true}
                    />
                    
                    <br />

                    <TextField
                        label="Minimum Commission"
                        id="minimum_commission"
                        value={this.state.minimum_commission}
                        onChange={this.handleChange}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">{config.home_currency_code}</InputAdornment>,
                        }}
                        required={true}
                    />
                    
                    <br />

                    <TextField
                        label="Exchange Rate Margin"
                        id="margin_percentage"
                        value={this.state.margin_percentage}
                        onChange={this.handleChange}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">%</InputAdornment>,
                        }}
                        required={true}
                    />
                    
                    <br />
                    <br />
                    
                    <Button onClick={this.updateSettings}>Update Settings</Button>
                </Container>
            </Paper>
        );
    };
};

const mapStateToProps = state => {
    return state.settings;
};

export default connect(mapStateToProps, { updateSettings })( Admin );