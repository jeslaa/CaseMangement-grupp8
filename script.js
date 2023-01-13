function getData() {
    fetch("https://fnd22-shared.azurewebsites.net/api/Cases")
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            document.getElementById("output").innerHTML = data
                .map(function (content) {
                    return `<div class="caseCard">
                  <div class="api-data">ID: &nbsp; ${content.id}</div>
                  <div class="api-data">DATE: &nbsp; ${content.created}</div>
                  <div class="api-data">EMAIL: &nbsp; ${content.email}</div>
                  <div class="api-data">STATUS: &nbsp; ${content.status.statusName}</div>
                </div>`;
                })
                .join("");
        })
        .catch((err) => {
            console.log(err);
        });
}

getData();

