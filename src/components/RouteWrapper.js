import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

export default function RouteWrapper({
    component: Component,
    isPrivate,
    ...rest
}) {

    // TODO: Usar REDUX para alterar programaticamente o login
    const signed = false;

    // Se a routa for privada e usuario não logou
    if (isPrivate && !signed) {
        return <Redirect to="/" />;
    }

    // Se a rota e publica e usuario esta logado
    if (!isPrivate && signed) {
        return <Redirect to="/estagio" />;
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