import React from 'react';
import { connect } from 'react-redux';
import { init, refreshRates } from '../redux/actions';

import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import Home from './Home';
import Admin from './Admin';

import '../styles/App.scss';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import theme from '../themes/yellow';

import Header from './Header';

class App extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
          activePage: 'home'
      };
    }

    componentDidMount() {
        this.props.init();
        this.props.refreshRates();
    }

    handleInit = () => {
    };

    render () {
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Header history={this.props.history} />
                <ConnectedRouter history={this.props.history} context={this.props.context}>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/admin" component={Admin} />
                    </Switch>
                </ConnectedRouter>
            </ThemeProvider>
        );
    }
}

const mapStateToProps = state => {
   return state;
};

export default connect(mapStateToProps, { init, refreshRates })( App );