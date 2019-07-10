import React from 'react';
import { connect } from 'react-redux';
import { init, loading, refreshRates, showMessage } from '../redux/actions';

import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import Home from './Home';
import Admin from './Admin';

import '../styles/App.scss';

import { Container, CssBaseline, SnackbarContent } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import theme from '../themes/yellow';

import Header from './Header';
import Loading from './Loading';
import Message from './Message';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showLoading: true,
            refreshRate: 0,
            rateRefreshId: null
        };
    }

    componentDidMount() {
        this.props.loading();
        this.props.init();
        this.props.refreshRates();
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.refreshRate !== nextProps.exchange_refresh_rate) {
            if (this.state.rateRefreshId !== null) {
                clearTimeout(this.state.rateRefreshId);
                this.setState({rateRefreshId: null});
            }

            console.log(nextProps.exchange_refresh_rate);
            if (Number.parseFloat(nextProps.exchange_refresh_rate) ===  0) {
                this.setState({
                    refreshRate: 0,
                    rateRefreshid: null
                });
            } else {
                const rateRefreshId = setTimeout(this.props.refreshRates, nextProps.exchange_refresh_rate * 1000);
                this.setState({
                    refreshRate: nextProps.exchange_refresh_rate * 1000,
                    rateRefreshId: rateRefreshId
                })
            }
        }

        this.setState({ showLoading: nextProps.showLoading });
    }
    handleInit = () => {
    };

    render () {
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                { this.state.showLoading ? <Loading /> : null }
                <Container component="main" className="main-container" maxWidth="md">
                    <Header history={this.props.history} />
                    <SnackbarContent
                        className="error-message"
                        message="Rate Refresh is Disabled!"
                    >
                    </SnackbarContent>
                    <ConnectedRouter history={this.props.history} context={this.props.context}>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/admin" component={Admin} />
                        </Switch>
                    </ConnectedRouter>
                    <Message />
                </Container>
            </ThemeProvider>
        );
    }
}

const mapStateToProps = state => {
    return state.settings;
};

export default connect(mapStateToProps, { init, loading, showMessage, refreshRates })( App );