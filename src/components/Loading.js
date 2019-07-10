import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

class Loading extends React.Component {
    render() {
        return (
            <div className="loading-bar">
                <CircularProgress />
            </div>
        );
    }
}

export default Loading;