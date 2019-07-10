import React from 'react';

import { 
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Container,
    TextField,
    InputAdornment,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Hidden
} from '@material-ui/core';

import { connect } from 'react-redux';
import { doTransaction, transactionSuccess, transactionFailure } from '../redux/actions';

import config from '../config/app';
import { calculateTransactionEffect } from '../redux/helpers/currencyHelper';

class TransactionDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            transaction: {
                amount: 0,
                buying: true,
                exchangeRate: 0,
                commissionRate: 0,
                minCommissionAmount: 0,
                surchargeAmount: 0
            },
            result: {
                transactionCurrencyBalanceChange: 0,
                homeCurrencyBalanceChange: 0,
                commission: 0,
                payReceiveAmount: 0
            },
            canTransact: false
        };
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.transaction === undefined || nextProps.transaction.type === undefined) {
            return;
        }
        
        let transaction = {...nextProps.transaction};
        transaction = {
            ...transaction,
            amount: this.state.transaction.amount,
            buying: transaction.type === 'buy',
            exchangeRate: transaction.buying ? Number(transaction.buyRate) : Number(transaction.sellRate),
            commissionRate: nextProps.settings.commission_percentage,
            minCommissionAmount: nextProps.settings.minimum_commission,
            surchargeAmount: nextProps.settings.surcharge
        }

        this.setState({
            transaction: transaction,
            result: calculateTransactionEffect(transaction)
        });
    }

    handleClose = event => {
        this.props.hideDialog();
    }

    handleAmountChange = event => {
        let thisTransaction = {
            ...this.state.transaction,
            amount: event.target.value
        };

        const result = calculateTransactionEffect(thisTransaction);
        result.commission = result.commission.toLocaleString();
        result.payReceiveAmount = result.payReceiveAmount.toLocaleString();

        this.setState({
            transaction: thisTransaction,
            result: result
        });
    }

    handleTransaction = (e) => {
        this.props.doTransaction(this.state.transaction);
        // @TODO: Handle Error
        this.props.transactionSuccess();
        this.props.hideDialog();
    }

    render() {
        return (
            <div>
                <Dialog
                    open={this.props.open}
                    onClose={this.handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                        {this.state.transaction.buying ? "Customer is BUYING " + this.state.transaction.code : "Customer is SELLING " + this.state.transaction.code}
                    </DialogTitle>
                    <DialogContent>
                    
                    <Hidden mdDown>
                        <DialogContentText>
                            The values displayed when you click Execute will be used, even if rate is refreshed while processing.
                        </DialogContentText>
                    </Hidden>

                    <Container className="transaction-form-container">
                        <TextField
                            label={this.state.transaction.buying ? "Pay Customer " : "Receive from Customer"}
                            id="amount"
                            value={this.state.transaction.amount}
                            onChange={this.handleAmountChange}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">{this.props.transaction.code}</InputAdornment>,
                            }}
                            required={true}
                            autoFocus
                        />

                        <Table className="currency-table">
                            <TableHead>
                                <TableRow>
                                    <Hidden mdDown>
                                        <TableCell>Exchange Rate</TableCell>
                                        <TableCell>Commission Amount</TableCell>
                                    </Hidden>
                                    <TableCell>
                                        {this.state.transaction.buying ? "Receive from Customer" : "Pay Customer"}
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <Hidden mdDown>
                                        <TableCell>
                                            {this.state.transaction.exchangeRate}<br />
                                            {this.state.transaction.buying ? config.home_currency_code + " / " + this.state.transaction.code : this.state.transaction.code + " / " + config.home_currency_code}
                                        </TableCell>
                                        <TableCell>
                                            {this.state.result.commission}&nbsp;{config.home_currency_code}
                                        </TableCell>
                                    </Hidden>
                                    <TableCell>
                                        {this.state.result.payReceiveAmount}&nbsp;
                                        {config.home_currency_code}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Container>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleTransaction} color="primary" autoFocus>
                        Execute
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state;
};

export default connect(mapStateToProps, { doTransaction, transactionFailure, transactionSuccess })( TransactionDialog );