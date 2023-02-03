//init get request for API to get cases
function getData() {
    fetch("https://fnd22-shared.azurewebsites.net/api/Cases")
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            data.sort((a, b) => (b.created > a.created) ? 1 : -1);
            document.getElementById("output").innerHTML = data //Skriver ut all html i en div som kallas för output
                .map(function (content) { //Mappar värden till DOMen för varje "content" hämtad från APIn
                    return `
                    <div class="caseCard">
                        <div class="sections">
                            <!-- Left section -->
                            <div class="api-data2">
                                <a href="${`details.html?id=${content.id}`}" class="id-link" id="dataApiKey">ID:</label> &nbsp; <p id="dataApiValue">${content.id}</a>
                            </div>
                            <div class="api-data2">
                                <label id="dataApiKey">DATE:</label> &nbsp; <p id="dataApiValue">${content.created}</p>
                            </div>
                            <div class="api-data2">
                                <label id="dataApiKey - ">EMAIL:</label> &nbsp; <p contenteditable="true" id="email - ${content.id}">${content.email}</p>
                            </div>
                        </div>
                            <!-- Right section -->
                        <div class="sections">
                            <div class="api-data2">
                                <label id="dataApiKey">SUBJECT:</label> &nbsp; <p contenteditable="true" id="subject - ${content.id}">${content.subject}</p>
                            </div>
                            <div class="api-data2">
                                <label id="dataApiKey">STATUS:</label> &nbsp; <p id="status - ${content.id}">${content.status.statusName}</p>
                            </div>
                            <div class="api-data2">
                                <label id="dataApiKey">COMMENT:</label> &nbsp; <p contenteditable="true" id="message - ${content.id}">${content.message}</p>
                            </div>
                        </div>
                        <!-- Generates unique "buttons" for each "content" -->
                        <div id="buttons - ${content.id}">
                            <!-- displays buttons -->
                            <button class="editButton" id="editBtn - ${content.id}" onclick="editBtn('${content.id}')"> Edit </button>
                        </div>
                    </div>
                  `;
                })
                .join("");  //Samlar alla caseCards till en stor string som blir DOMen för korten
        })
        .catch((err) => {
            console.log(err);
        });
}
// init data
getData();

//Post request for adding a new case
function addPost() {

    //Value for post
    const title = document.getElementById("title").value;
    const body = document.getElementById("body").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    const subject = document.getElementById("subject").value;

    //Mapping values to object and stringfy for request 
    const requestData = JSON.stringify({
        title,
        body,
        email,
        message,
        subject
    });

    //Post fetch
    fetch("https://fnd22-shared.azurewebsites.net/api/Cases", {
        method: "POST",
        headers: {
            Accept: "application/json, text/plain, *//*",
            "Content-type": "application/json",
        },
        body: requestData,
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            window.location.reload();
        })
        .catch((err) => {
            console.log(err);
        });
}

//Pop-up modal for adding case
const subMenu = document.getElementById("subMenu");
function toggleMenu() {
    subMenu.classList.toggle("open-menu");
}

//Request that changes the mail, message and status
function putRequest(id) {

    //Gets text from elements
    const email = document.getElementById("email - " + id).innerText;
    const message = document.getElementById("message - " + id).innerText;

    //Gets value from select/option
    const status = getStatusFromDropDown(id);
    
    //Mapping data to keys for 
    const data = {
        "id": id,
        "message": message,
        "email": email,
        "statusId": status
    };

    // Put request
    fetch(`https://fnd22-shared.azurewebsites.net/api/Cases/${id}`, {
        method: "PUT",
        headers: {
            Accept:
                "application/json, text/plain, *//*",
            "Content-type": "application/json",
        },
        
        body: JSON.stringify(data),

    })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
}

//Gets status from dropdown
function getStatusFromDropDown(id) {
    // Get element for currently edited form
    const element = document.getElementById("form - " + id);
    // Gets selected option
    const value = element.options[element.selectedIndex].value;
    // Return status-value
    return value
}

//All card buttons
function editBtn(contentId) {

    const buttonId = "buttons - " + contentId
    //Tar bort edit kanppen och displayar alla knappar inom diven 
    document.getElementById("editBtn - " + contentId).style.display = 'none';
    // Render buttons for editing
    document.getElementById(buttonId).innerHTML = `
    <button class="saveBtn" id="saveBtn - ${contentId}" onclick="putRequest('${contentId}'); hideBtn('${contentId}'); refreshPage();">Save</button>
    <button class="cancelBtn" id="cancelBtn - ${contentId}" onclick="hideBtn('${contentId}')">Cancel</button>
    <div class="status" id="status - ${contentId}">
            <form action="/action_page.php">
                <label for="status - ${contentId}">Status:</label>
                    <select name="status - ${contentId}" id="form - ${contentId}" class="form">
                        <option value="1">Ej påbörjad</option>
                        <option value="2">Pågående</option>
                        <option value="3">Avslutad</option>
                    </select>
                <br><br>
            </form>
        </div>`;

    }

 //Exits edit-mode
function hideBtn(contentId) {
    const buttonId = "buttons - " + contentId
    // Removes buttons and adds a edit button
    document.getElementById(buttonId).innerHTML = `<button class="editButton" id="editBtn - ${contentId}" onclick="editBtn('${contentId}')"> Edit </button>`
}

function refreshPage() {
    setTimeout("location.reload(true);", 1000);
}
