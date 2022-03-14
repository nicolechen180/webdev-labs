const ws = window.WebSocket || window.MozWebSocket;

// shortcut:
const qs = document.querySelector.bind(document);
let connection;
let username = "";
    
const initializeConnection = ev => {
    const url = qs('#server').value;
    connection = new ws(url);
    console.log(`Connecting to ${url}...`);

    connection.onopen = () => {
        // fires when the server message received indicating an open connection
        console.log("WebSocket connection is open.");
        utils.showLogin();
    };
    
    connection.onclose = () => {
        // fires when the server message received indicating a closed connection
        console.log("WebSocket connection is closed.");
        alert('Socket server disconnected!');
    };
    
    connection.onerror = e => {
        // fires when the server indicates a websocket error
        console.error("WebSocket error observed:", e);
    };
    
    
    connection.onmessage = e => {
        const data = JSON.parse(e.data);
        console.log(data);
        switch(data.type) {
            case "login":
                // a user has just logged in
                // display new user list
                displayUsers(data.users)
                break;
            case "disconnet":
                // a user has logged off
                // display new user list
                displayUsers(data.users);
                break;
            case "chat":
                // a user has sent a message
                // add the message to the chat
                displayNewChat(data);
                break;
            default:
                console.log('message not recognized');
        }

        /***********************************************************
         * Client-Side Logic: Your Job 
         ***********************************************************
         * Respond to the messages that are sent back to the server:
         * 
         *   1. If the data.type is "login" or "disconnent", 
         *      display the list of logged in users in the 
         *      #users-list div (right-hand panel).
         * 
         *   2. If data.type is "chat", append the chat message 
         *      to the #chat div (main panel).
         ************************************************************/

    };
};

const displayUsers = (username) => {
    const userList = `
    <ul>
        ${username.map( username => `<li>${username}</li>`).join('')}
    </ul>
    `
    qs('#users-list').innerHTML = userList;
}

const displayNewChat = (chatMessage) => {
    if (chatMessage.username === username) {
        // if the username is the same as my own, display on right
        const newMessage = `<div class="right"><strong>You:</strong> ${chatMessage.text}</div>`
        qs('#chat').insertAdjacentHTML("beforeend", newMessage)
    } else {
        // else, display on left 
        const newMessage = `<div class="left"><strong>${chatMessage.username}</strong> ${chatMessage.text}</div>`
        qs('#chat').insertAdjacentHTML("beforeend", newMessage)
    }
}


// code that sends messages to the server:
const notify = {
    sendChat: () => {
        // take what your user typed into the message textbox
        // and send it to the server:
        if (qs("#message").value !== "") {
            connection.send(JSON.stringify({
                type: "chat",
                text: qs("#message").value,
                username: username
            }));
            qs("#message").value = "";
        }
    },

    logout: () => {
        if (!connection) {
            return;
        }
        connection.send(JSON.stringify({
            type: "disconnect",
            username: username
        }));
    },

    login: () => {
        // login to the server with the username typed into the chat:
        username = qs("#name").value;
        if (!username) {
            return;
        }
        if (!connection) {
            return;
        }

        // log into server:
        connection.send(JSON.stringify({
            type: "login",
            username: username
        }));

        // update UI:
        utils.showChatInterface();
    }
};

const utils = {
    resetApp: () => {
        connection = null;
        utils.showElements(['#ws-status']);
        utils.hideElements(
            ['#name-display', '#chat-container', '#send-container', '#status']);
        qs("#chat").innerHTML = '';
    },

    showLogin: () => {
        utils.hideElements(['#step1']);
        utils.showElements(['#step2', '#ws-status']);
        qs("#ws-status").textContent = "Connected";
    },

    showChatInterface: () => {
        qs("#name-display").textContent = `Signed in as ${username}.`;
        utils.hideElements(['#step2']);
        utils.showElements(
            ['#name-display', '#chat-container', '#send-container', '#status']);
    },

    showElements: elements => {
        document.querySelectorAll(elements).forEach(elem => {
            elem.classList.remove('hidden');
        })
    },
    hideElements: elements => {
        document.querySelectorAll(elements).forEach(elem => {
            elem.classList.add('hidden');
        })
    }
};


qs('#connect').addEventListener('click', initializeConnection);
qs("#set-name").addEventListener("click", notify.login);
qs('#send').addEventListener('click', notify.sendChat);
// logout when the user closes the tab:
window.addEventListener('beforeunload', notify.logout);