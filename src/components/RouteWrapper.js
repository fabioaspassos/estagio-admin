import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

import { useAuth } from '../providers/AuthProvider';

export default function RouteWrapper({
    component: Component,
    isPrivate,
    ...rest
}) {
    const { user } = useAuth();
    const signed = user.signed;
    
    // Se a rota for privada e usuario nao logou
    if (isPrivate && !signed) {
        console.log('nao logado');
        return <Redirect to='/login' />;
    }

    // Se a rota for publica e usuario esta logado
    if (!isPrivate && signed) {
        console.log('logado');
        return <Redirect to='/estagio' />;
    }

    return <Route {...rest} component={Component} />;
}

RouteWrapper.prototype = {
    isPrivate: PropTypes.bool,
    component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired
}

RouteWrapper.defaulProps = {
    isPrivate: false
}