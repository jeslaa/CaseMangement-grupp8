//GET REQUEST
function getData() {
    fetch("https://fnd22-shared.azurewebsites.net/api/Cases")
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            document.getElementById("output").innerHTML = data
                .map(function (content) {
                    return `<div class="caseCard">
                <div class="sections">
                  <div class="api-data">ID: &nbsp; ${content.id}</div>
                  <div class="api-data2">DATE: &nbsp; ${content.created}</div>
                  <div class="api-data2">EMAIL: &nbsp; ${content.email}</div>
                </div>
                <div class="sections">
                  <div class="api-data">SUBJECT: &nbsp; ${content.subject}</div>
                  <div class="api-data2"><p id="dataApiKey">STATUS:</p> &nbsp; <p id="dataApiValue">${content.status.statusName}</p></div>
                  <div class="api-data2"><p id="dataApiKey">COMMENT:</p> &nbsp; <p id="dataApiValue">${content.message}</p></div>
                  </div>
                  <button class="edit-btn" onclick="editBtn()">Edit</button>
                  <button class="status-btn" onclick="statusPut('${content.id}', '${content.statusId}')">Save</button>
                  <button class="status-btn"">Cancel</button>
              </div>`;
                })
                .join("");
        })
        .catch((err) => {
            console.log(err);
        });
}

getData();

/*POST REQUEST*/
document.getElementById("addPost").addEventListener("submit", addPost);

function addPost(e) {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const body = document.getElementById("body").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    const subject = document.getElementById("subject").value;

    const data = {
        title,
        body,
        email,
        message,
        subject,
    };

    fetch("https://fnd22-shared.azurewebsites.net/api/Cases", {
        method: "POST",
        headers: {
            Accept: "application/json, text/plain, *//*",
            "Content-type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => {
            console.log(err);
        });
}

//SUB-MENU
let subMenu = document.getElementById("subMenu");

function toggleMenu() {
    subMenu.classList.toggle("open-menu");
}

//DARK MODE
// check for saved 'darkMode' in localStorage
let darkMode = localStorage.getItem("darkMode");

const darkModeToggle = document.querySelector("#dark-mode-toggle");

const enableDarkMode = () => {
    // 1. Add the class to the body
    document.body.classList.add("darkmode");
    // 2. Update darkMode in localStorage
    localStorage.setItem("darkMode", "enabled");
};

const disableDarkMode = () => {
    // 1. Remove the class from the body
    document.body.classList.remove("darkmode");
    // 2. Update darkMode in localStorage
    localStorage.setItem("darkMode", null);
};

// If the user already visited and enabled darkMode
// start things off with it on
if (darkMode === "enabled") {
    enableDarkMode();
}

// When someone clicks the button
darkModeToggle.addEventListener("click", () => {
    // get their darkMode setting
    darkMode = localStorage.getItem("darkMode");

    // if it not current enabled, enable it
    if (darkMode !== "enabled") {
        enableDarkMode();
        // if it has been enabled, turn it off
    } else {
        disableDarkMode();
    }
});

//PUT REQUEST

document.querySelector("status-btn").addEventListener("click", statusPut());

function statusPut(id, status) {

    console.log(status);

    if(status == 3) {
        console.log('Avslutad');
        //Exit
    }else {

        fetch(`https://fnd22-shared.azurewebsites.net/api/Cases/${id}`, {
        method: "PUT",
        headers: {
            Accept: "application/json, text/plain, *//*",
            "Content-type": "application/json",
        },
        
        body: JSON.stringify({'id': id, 'statusId': parseInt(status) + 1}),

    })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => {
            console.log(err);
        });
    }
}

function editBtn () {
    console.log('editBtn')
}

//LIVE CLOCK
const span = document.getElementById("span");

function time() {
    let d = new Date();
    let s = d.getSeconds();
    let m = d.getMinutes();
    let h = d.getHours();
    span.textContent =
        ("0" + h).substr(-2) +
        ":" +
        ("0" + m).substr(-2) +
        ":" +
        ("0" + s).substr(-2);
}

setInterval(time, 1000);
