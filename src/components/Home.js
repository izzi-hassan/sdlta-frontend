import React from 'react';
import { connect } from 'react-redux';
//import { doTransaction } from '../redux/actions';

import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@material-ui/core';

import TransactionDialog from './TransactionDialog';

import config from '../config/app';

class Home extends React.Component {
    constructor(props) {
      super(props);

      this.state = { 
          transaction: {},
          homeCurrencyAmount: 0,
          showDialog: false
      };
    }

    buyCurrency = (currency) => {
        this.setState({
            transaction: {...currency, type: 'buy'},
            showDialog: true
        });
    }

    sellCurrency = (currency) => {
        this.setState({
            transaction: {...currency, type: 'sell'},
            showDialog: true
        });
    }

    hideDialog = (e) => {
        this.setState({
            showDialog: false
        });
    }

    render () {
        return (
            <div>
                <Paper className="content-container">
                    <Table className="currency-table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Currency</TableCell>
                                <TableCell>Buy Rate ({config.home_currency_code})</TableCell>
                                <TableCell>Sell Rate ({config.home_currency_code})</TableCell>
                                <TableCell>Balance</TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.currencies.map(currency => (
                                <TableRow key={currency.code} className={currency.lowBalanceClass}>
                                    <TableCell>{currency.code}</TableCell>
                                    <TableCell>{currency.buyRate}&nbsp;</TableCell>
                                    <TableCell>{currency.sellRate}</TableCell>
                                    <TableCell>{currency.prettyBalance}</TableCell>
                                    <TableCell>{currency.code !== config.home_currency_code ? <Button onClick={() => this.buyCurrency(currency)}>Buy</Button> : '--' }</TableCell>
                                    <TableCell>{currency.code !== config.home_currency_code ? <Button onClick={() => this.sellCurrency(currency)}>Sell</Button> : '--' }</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
                <TransactionDialog
                    transaction={this.state.transaction}
                    homeCurrencyAmount={this.state.homeCurrencyAmount}
                    open={this.state.showDialog}
                    hideDialog={this.hideDialog}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    let curr = Object.values(state.currencies.currencies);

    const homeCurrency = state.currencies.currencies[config.home_currency_code];
    
    for (var i in curr) {
        if (curr[i].exchangeRate !== 1){
            curr[i].buyRate = curr[i].exchangeRate + curr[i].exchangeRate * state.settings.margin_percentage / 100;
            curr[i].sellRate = curr[i].exchangeRate + curr[i].exchangeRate * state.settings.margin_percentage / 100;
        } else {
            curr[i].buyRate = 1;
            curr[i].sellRate = 1;
        }

        console.log(curr[i]);
        
        curr[i].buyRate = curr[i].buyRate.toPrecision(config.exchange_rate_precision);
        curr[i].sellRate = curr[i].sellRate.toPrecision(config.exchange_rate_precision);

        if (curr[i].balance <= curr[i].initial_balance * config.low_balance_percentage / 100) {
            curr[i].lowBalanceClass = 'low-balance';
        } else {
            curr[i].lowBalanceClass = '';
        }

        curr[i].prettyBalance = curr[i].balance.toLocaleString();
    }
    return {
        currencies: curr,
        homeCurrency: homeCurrency,
        settings: state.settings
    };
};

export default connect(mapStateToProps)( Home );