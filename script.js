function getData() {
    fetch("https://fnd22-shared.azurewebsites.net/api/Cases")
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            document.getElementById("output").innerHTML = data
                .map(function(content) {
                    return `<div class="caseCard">
                  <div class="api-data">ID: &nbsp; ${content.id}</div>
                  <div class="api-data">DATE: &nbsp; ${content.created}</div>
                  <div class="api-data">EMAIL: &nbsp; ${content.email}</div>
                  <div class="api-data">STATUS: &nbsp; ${content.status.statusName}</div>
                  <div class="api-data">COMMENT: &nbsp; ${content.message}</div>
                  <button class="edit-btn">Edit</button>
                </div>`;
                })
                .join("");
        })
        .catch((err) => {
            console.log(err);
        });
}

getData();

/*function getData() {
    fetch("https://fnd22-shared.azurewebsites.net/api/Cases")
        .then((res) => res.json())
        .then((data) => {
            const outputEl = document.getElementById("output");
            for (const item of data) {
                const div = document.createElement("div");
                div.innerHTML = item.id;
                outputEl.appendChild(div);
            }
        })
        .catch((err) => {
            console.log(err);
        });
}
getData();*/


/*STANDARD POST REQUEST USING FETCH*/
document.getElementById("addPost").addEventListener("submit", addPost);

function addPost(e) {
    e.preventDefault();

    let title = document.getElementById("title").value;
    let body = document.getElementById("body").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;
    let subject = document.getElementById("subject").value;

    fetch("https://fnd22-shared.azurewebsites.net/api/Cases", {
            method: "POST",
            email: 'Test@gmail.com',
            message: 'Fix this stuff',
            subject: 'Case',
            headers: {
                Accept: "application/json, text/plain, *//*",
                "Content-type": "application/json",
            },
            body: JSON.stringify({ title: title, body: body, email: email, message: message, subject: subject }),
        })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => {
            console.log(err);
        });
}
/*
let url = ('https://fnd22-shared.azurewebsites.net/api/Cases'), 

    let data = {
        email: 'Test@gmail.com',
        message: 'Fix this stuff',
        subject: 'Case',
        headers: {
            Accept: "application/json, text/plain, */
/*",
            "Content-type": "application/json",
        },
    }

    let options = {
        method:'PUT',
        body: JSON.stringify(data)

    }

    fetch(url, options)
        .then(res => console.log(res.status))


/*
function addPost(){
  fetch('https://fnd22-shared.azurewebsites.net/api/Cases')
    .then((res) => res.json())
    .then((data) => {
      let output = '<h2>Posts</h2>'
      data.foreach(function(post){
        output += `
        <div>
          <h3>${post.paths}</h3>
          <p>${post.components}</p>
          <p>${post.info}</p>
        </div>
        `
      });
      document.getElementById('output').innerHTML = output;
    })
    .catch((err) => {
      console.log(err)
    })
}

addPost()
*/