import "./App.css";
import Navbar from "./Component/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TextForm from "./Component/TextForm";
import About from "./Component/About";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Alert from "./Alert";
import { useState } from "react";

function App() {
    const [alert, setAlert] = useState(null);

    const showAlert = (message, type) => {
        setAlert({
            msg: message,
            type: type,
        });
        setTimeout(() => {
            setAlert(null);
        }, 1500);
    };
    return ( <
        >
        <
        Router >
        <
        Navbar / >
        <
        Alert alert = { alert }
        /> <ToastContainer / >
        <
        Routes >
        <
        Route exact path = "/"
        element = { < TextForm showAlert = { showAlert }
            />} / > { " " } <
            Route exact path = "/about"
            element = { < About / > }
            />{" "} <
            /Routes>{" "} <
            /Router>{" "} <
            />
        );
    }

    export default App;