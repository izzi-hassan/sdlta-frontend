import React from 'react';
import { connect } from 'react-redux';
import { init } from '../redux/actions';

import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@material-ui/core';

import config from '../config/app';

class Home extends React.Component {
    constructor(props) {
      super(props);

      this.state = { };
    }

    componentDidMount = () => {
        this.handleInit();
    }
  
    componentWillUnmount = () => {
  
    }

    handleInit = () => {
      this.props.init();
    };

    buyCurrency = () => {

    }

    sellCurrency = () => {
        
    }

    render () {
        return (
            <Paper>
                <Table className="currency-table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Currency</TableCell>
                            <TableCell>Buy Rate</TableCell>
                            <TableCell>Sell Rate</TableCell>
                            <TableCell>Balance</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.currencies.map(currency => (
                            <TableRow key={currency.code}>
                                <TableCell>{currency.code}</TableCell>
                                <TableCell>{currency.buyRate}</TableCell>
                                <TableCell>{currency.sellRate}</TableCell>
                                <TableCell>{currency.balance}</TableCell>
                                <TableCell><Button onClick={this.buyCurrency(currency.code)}>Buy</Button></TableCell>
                                <TableCell><Button onClick={this.sellCurrency(currency.code)}>Sell</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

const mapStateToProps = state => {
    let curr = Object.values(state.currencies.currencies);
    for (var i in curr) {
        if (curr[i].exchangeRate !== 1){
            curr[i].buyRate = (curr[i].exchangeRate * (100 + state.settings.margin_percentage) / 100).toPrecision(config.exchange_rate_precision);
            curr[i].sellRate = (curr[i].exchangeRate * (100 - state.settings.margin_percentage) / 100).toPrecision(config.exchange_rate_precision);
        } else {
            curr[i].buyRate = 1;
            curr[i].sellRate = 1;
        }
    }
    return {
        currencies: curr,
        settings: state.settings
    };
};

export default connect(mapStateToProps, { init })( Home );