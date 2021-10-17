import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
 
class ProtectRouteComponent extends Component {
    render() {
        const { isAuthenticated, component: Component, ...rest } = this.props;
        return (
            <div>
                {isAuthenticated ? <Component {...rest} /> : <Redirect to="/login" />}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

const ProtectRoute = connect(mapStateToProps)(ProtectRouteComponent);
 
export { ProtectRoute };