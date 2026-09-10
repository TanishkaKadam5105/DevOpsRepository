const API_URL = "http://localhost:5000";

let myToken = null;


async function loadQueue() {

    try {

        const response = await fetch(`${API_URL}/queue`);

        const data = await response.json();


        console.log("Queue Data:", data);


        /*
         Adjust these properties if your backend
         uses different JSON names.
        */

        const currentToken =
            data.currentToken ??
            data.current ??
            data.nowServing ??
            1;


        const waitingTokens =
            data.waitingTokens ??
            data.queue ??
            [];


        document.getElementById("currentToken").innerText =
            currentToken;


        document.getElementById("nowServing").innerText =
            currentToken;


        document.getElementById("waitingCount").innerText =
            waitingTokens.length;


        document.getElementById("queueCountBadge").innerText =
            waitingTokens.length;


        displayQueue(waitingTokens);


        updatePosition(waitingTokens);

    }

    catch (error) {

        console.error(error);

        document.getElementById("queueList").innerHTML =
            `<p class="empty-queue">
                Backend connection unavailable
            </p>`;

    }

}


function displayQueue(tokens) {

    const queueList =
        document.getElementById("queueList");


    queueList.innerHTML = "";


    if (!tokens || tokens.length === 0) {

        queueList.innerHTML =
            `<p class="empty-queue">
                No users are currently waiting.
            </p>`;

        return;

    }


    tokens.forEach(token => {

        const tokenElement =
            document.createElement("div");


        tokenElement.className =
            "queue-token";


        tokenElement.innerText =
            `Token ${token}`;


        queueList.appendChild(tokenElement);

    });

}


async function generateToken() {

    const button =
        document.getElementById("generateButton");


    const message =
        document.getElementById("message");


    button.disabled = true;


    button.innerHTML =
        `<span>Generating Token...</span>`;


    try {

        const response =
            await fetch(`${API_URL}/token`, {

                method: "POST"

            });


        const data =
            await response.json();


        console.log("Token Data:", data);


        myToken =
            data.token ??
            data.tokenNumber ??
            data.number;


        document.getElementById("userToken").innerText =
            myToken;


        message.innerText =
            "Token generated successfully!";


        await loadQueue();

    }

    catch (error) {

        console.error(error);


        message.style.color =
            "#dc2626";


        message.innerText =
            "Unable to connect to the QueueEase backend.";

    }


    button.disabled = false;


    button.innerHTML = `
        <span>Generate New Token</span>
        <span class="arrow">→</span>
    `;

}


function updatePosition(waitingTokens) {

    if (!myToken) {

        document.getElementById("userPosition").innerText =
            "--";

        return;

    }


    const position =
        waitingTokens.indexOf(myToken);


    if (position !== -1) {

        document.getElementById("userPosition").innerText =
            position + 1;

    }

    else {

        document.getElementById("userPosition").innerText =
            "Serving";

    }

}


/* Load queue when application starts */

loadQueue();


/* Automatically refresh queue every 5 seconds */

setInterval(loadQueue, 5000);