import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    return ( <
        >
        <
        nav className = "navbar navbar-expand-lg bg-body-tertiary" >
        <
        div className = "container-fluid" >
        <
        Link className = "navbar-brand"
        to = "/"
        style = {
            { fontFamily: "Dancing Script" } } >
        WordCounter.com { " " } <
        /Link>{" "} <
        button className = "navbar-toggler"
        type = "button"
        databstoggle = "collapse"
        databstarget = "#navbarNav"
        ariacontrols = "navbarNav"
        ariaexpanded = "false"
        arialabel = "Toggle navigation" >
        <
        span className = "navbar-toggler-icon" > < /span>{" "} <
        /button>{" "} <
        div className = "collapse navbar-collapse"
        id = "navbarNav" >
        <
        ul className = "navbar-nav" >
        <
        li className = "nav-item" >
        <
        Link className = "nav-link active"
        ariacurrent = "page"
        to = "/" >
        Home { " " } <
        /Link>{" "} <
        /li>{" "} <
        li className = "nav-item" >
        <
        Link className = "nav-link active"
        ariacurrent = "page"
        to = "/about" >
        About { " " } <
        /Link>{" "} <
        /li>{" "} <
        /ul>{" "} <
        /div>{" "} <
        /div>{" "} <
        /nav>{" "} <
        />
    );
}