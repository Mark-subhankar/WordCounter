import React, { useState } from "react";
import { toast } from "react-toastify";

export default function TextForm(props) {

    const [text, setText] = useState("");
    const [color, setColor] = useState("black");
    const [isBold, setIsBold] = useState(false);
    const [history, setHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [typingStartTime, setTypingStartTime] = useState(null);

    // convert to uppercase function
    const handleUpClick = () => {
        let newText = text.toUpperCase();
        setText(newText);
        props.showAlert("Converted to uppercase!", "success");
    };

    // convert to lowercase function
    const handleLoClick = () => {
        let newText = text.toLowerCase();
        setText(newText);
        props.showAlert("Converted to lowercase!", "success");
    };

    //clear text function
    const handleClearClick = () => {
        let newText = "";
        setText(newText);
        props.showAlert("Text Cleared!", "success");
    };

    const handleOnChange = (event) => {
        const newText = event.target.value;
        if (!typingStartTime) {
            setTypingStartTime(new Date());
        }
        setText(newText);
        addHistory(newText);
    };

    // text copyed function
    const handleCopy = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text);
            props.showAlert("Copied to Clipboard!", "success");
        } else {
            props.showAlert("Copy to clipboard is not supported in this browser.", "danger");
        }
    }

    // remove extra spaces of text function
    const handleExtraSpaces = () => {
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "));
        props.showAlert("Extra spaces removed!", "success");
    };

    // entire text first letter capitalise function 
    const handleCapitalizeWordClick = () => {
        let lowercase = text.toLowerCase();
        let words = lowercase.split(" ");
        let newWords = words.map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        });
        let newText = newWords.join(" ");
        setText(newText);
        props.showAlert("Your entire text first letter is capitalise", "success");
    };

    // text speak function
    const speak = () => {
        let msg = new SpeechSynthesisUtterance();
        msg.text = text;
        window.speechSynthesis.speak(msg);
        props.showAlert("Speak Enable", "success");
    };

    // text reverse function
    const reversed = () => {
        let splitWord = text.split("");

        let reverseWord = splitWord.reverse("");
        let joinedWords = reverseWord.join("");
        let newText = joinedWords;
        setText(newText);
        props.showAlert("Reversed Done", "success");
    };


    // line separated function
    const handleSPerLineClick = () => {
        let newText = text.replaceAll(".", "\n");
        setText(newText);
        props.showAlert("Line Separated Done", "success");
    };

    // text color function
    const handleColor = () => {
        let myColor = prompt("Enter your color name");
        setColor(myColor);
        props.showAlert(`Text color set to ${myColor}`, "success");
    };

    // text bold function
    const handleBoldClick = () => {
        setIsBold(!isBold);
        props.showAlert("Your entire text is bold", "success");
    };

    // text save as text.txt function  
    const handleSave = () => {
        if (text.length === 0) {
            toast.error("Text is empty. Nothing to save!");
            return;
        }

        const blob = new Blob([text], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "textfile.txt";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        props.showAlert("Text saved to device!", "success");
    };

    // text undo function
    const handleUndoClick = () => {
        if (historyIndex > 0) {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            setText(history[newIndex]);
        }
    };

    // text redo function
    const handleRedoClick = () => {
        if (historyIndex < history.length - 1) {
            const newIndex = historyIndex + 1;
            setHistoryIndex(newIndex);
            setText(history[newIndex]);
        }
    };

    // store text history function
    const addHistory = (newText) => {
        const newHistory = [...history.slice(0, historyIndex + 1), newText];
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
        setText(newText);
    };

    // calculate text typing time function
    const calculateTypingTime = () => {
        if (typingStartTime) {
            const endTime = new Date();
            const typingTimeInSeconds = (endTime - typingStartTime) / 1000;
            return typingTimeInSeconds;
        }

        return 0;
    };


    return ( <
        >
        <
        div className = "container"
        style = {
            { color: props.mode === "dark" ? "white" : "#042743" } } >
        <
        h1 className = "mb-4"
        style = {
            {
                textAlign: "center",
                fontSize: "30px",
                fontFamily: "Libre Baskerville",
            }
        } >
        { " " } <
        b > Welcome to WordCounter < /b>{" "} <
        /h1>{" "} <
        div className = "mb-3" >
        <
        textarea className = "form-control"
        value = { text }
        onChange = { handleOnChange }
        style = {
            {
                backgroundColor: props.mode === "dark" ? "#13466e" : "white",
                color: props.mode === "dark" ? "white" : color,
                fontWeight: isBold ? "bold" : "normal",
            }
        }
        id = "myBox"
        rows = "8" >
        { " " } <
        /textarea>{" "} <
        /div>{" "} <
        button disabled = { text.length === 0 }
        className = "btn btn-secondary mx-1 my-1"
        onClick = { handleClearClick } >
        { " " }
        Clear Text < i className = "fa-solid fa-trash" > < /i>{" "} <
        /button>{" "} <
        button disabled = { text.length === 0 }
        className = "btn btn-secondary mx-1 my-1"
        onClick = { handleCopy } >
        { " " }
        Copy Text < i className = "fa-solid fa-copy" > < /i>{" "} <
        /button>{" "} <
        button disabled = { text.length === 0 }
        className = "btn btn-secondary mx-1 my-1"
        onClick = { handleSave } >
        { " " }
        save Text < i className = "fa-solid fa-download" > < /i>{" "} <
        /button>{" "} <
        button disabled = { text.length === 0 }
        className = "btn btn-secondary mx-1 my-1"
        onClick = { reversed } >
        { " " }
        Reversed < i className = "fa-solid fa-backward" > < /i>{" "} <
        /button>{" "} <
        button type = "submit"
        disabled = { text.length === 0 }
        className = "btn btn-secondary mx-1 my-1"
        onClick = { speak } >
        { " " }
        speak < i className = "fa-solid fa-volume-high" / >
        <
        /button>{" "} <
        button disabled = { text.length === 0 }
        className = "btn btn-secondary mx-1 my-1"
        onClick = { handleSPerLineClick } >
        { " " }
        LineSeparate { " " } <
        /button>{" "} <
        button disabled = { text.length === 0 }
        className = "btn btn-secondary mx-1 my-1"
        onClick = { handleUndoClick } >
        { " " } <
        i className = "fa-solid fa-rotate-left" > < /i>{" "} <
        /button>{" "} <
        button disabled = { text.length === 0 }
        className = "btn btn-secondary mx-1 my-1"
        onClick = { handleRedoClick } >
        { " " } <
        i className = "fa-solid fa-rotate-right" > < /i>{" "} <
        /button>{" "} <
        button disabled = { text.length === 0 }
        className = "btn btn-secondary mx-1 my-1"
        onClick = { handleBoldClick } >
        { " " }
        Convert to Bold { " " } <
        /button>{" "} <
        button disabled = { text.length === 0 }
        className = "btn btn-secondary mx-1 my-1"
        onClick = { handleUpClick } >
        { " " }
        Convert to Uppercase { " " } <
        /button>{" "} <
        button disabled = { text.length === 0 }
        className = "btn btn-secondary mx-1 my-1"
        onClick = { handleLoClick } >
        { " " }
        Convert to Lowercase { " " } <
        /button>{" "} <
        button disabled = { text.length === 0 }
        className = "btn btn-secondary mx-1 my-1"
        onClick = { handleExtraSpaces } >
        { " " }
        Remove Extra Spaces { " " } <
        /button>{" "} <
        button disabled = { text.length === 0 }
        className = "btn btn-secondary mx-1 my-1"
        onClick = { handleCapitalizeWordClick } >
        { " " }
        First Letter to UpperCase { " " } <
        /button>{" "} <
        button disabled = { text.length === 0 }
        className = "btn btn-secondary mx-1 my-1"
        onClick = { handleColor } >
        { " " }
        Change Text Color < i className = "fa-solid fa-palette" > < /i>{" "} <
        /button>{" "} <
        /div>{" "} <
        div className = "container my-3"
        style = {
            {
                color: props.mode === "dark" ? "white" : "#042743",
                marginTop: "20px",
            }
        } >
        <
        h1 style = {
            { fontSize: "20px" } } > Your text summary - < /h1>{" "} <
        p >
        Given text, including the number of words - { " " } {
            text.split(/\s+/).filter((element) => {
                return element.length !== 0;
            }).length
        }, characters - { text.length }, sentences - { " " } {
            text.split(/[.!?]+/).filter((sentence) => sentence.trim() !== "")
                .length
        }, paragraphs - { " " } {
            text.split(/\n\s*\n/).filter((paragraph) => paragraph.trim() !== "")
                .length
        }, vowels - { " " } {
            text
                .toLowerCase()
                .split("")
                .filter((char) => "aeiou".includes(char)).length
        }, and consonants - { " " } {
            text
                .toLowerCase()
                .split("")
                .filter((char) => "bcdfghjklmnpqrstvwxyz".includes(char)).length
        } { " " } <
        /p>{" "} <
        div >
        <
        h1 style = {
            { fontSize: "20px" } } > { " " }
        Text Reading Time & Typing Time - { " " } <
        /h1>{" "} <
        p >
        You can read entire text in { " " } {
            0.008 *
                text.split(/\s+/).filter((element) => {
                    return element.length !== 0;
                }).length
        } { " " }
        Minutes and your typing time is { " " } {
            typingStartTime
                ?
                `${calculateTypingTime().toFixed(2)} seconds` :
                "0"
        } { " " } <
        /p>{" "} <
        /div>{" "} <
        div style = {
            { marginTop: "15px" } } >
        <
        h1 style = {
            { fontSize: "20px" } } > Preview - < /h1>{" "} <
        p style = {
            {
                backgroundColor: props.mode === "dark" ? "#13466e" : "#efe5e5",
                color: props.mode === "dark" ? "white" : color,
                fontWeight: isBold ? "bold" : "normal",
            }
        } >
        { " " } { text.length > 0 ? text : "Nothing to preview!" } { " " } <
        /p>{" "} <
        /div>{" "} <
        /div>{" "} <
        />
    );
}