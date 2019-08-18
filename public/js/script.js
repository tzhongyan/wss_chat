(function() {
    let ws = new WebSocket('ws://localhost:3000');
    document.onreadystatechange = () => {
        ws.onmessage = event => {
            console.log(event.data);
        };
    }

    // send value to ws when clicked
    document.getElementById('send').onclick = () => {
        let text = document.getElementById('txt').value;
        ws.send(text);
    }
})();
