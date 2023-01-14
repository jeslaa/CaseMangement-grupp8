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
                    <div class="api-data2">STATUS: &nbsp; ${content.status.statusName}</div>
                    <div class="api-data2">COMMENT: &nbsp; ${content.message}</div>
                    </div>
                    <button class="edit-btn" onclick="configureEditButton;">Edit</button>
                </div>`;
                })
                .join("");
        })
        .catch((err) => {
            console.log(err);
        });
}

getData();

/*STANDARD POST REQUEST USING FETCH*/
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

