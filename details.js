const id = new URLSearchParams(window.location.search).get('id')
console.log('id');

const BASE_URL = "https://fnd22-shared.azurewebsites.net/api/Cases/"

const output = document.querySelector('#output')

const getData = async () => {
    const res = await fetch(BASE_URL + id)
    const data = await res.json()

    console.log(data);
    
    output.appendChild(createCard(data))
}

getData()

const createCard = (data) => {
    const card = document.createElement('div')
    card.classList.add("card")

    const id = document.createElement('h2')
    id.innerText = 'ID:  '+ data.id
    
    const time = document.createElement('h2')
    time.innerText = 'CREATED:  '+ data.created

    const sub = document.createElement('p')
    sub.innerText = 'SUBEJCT:  '+ data.subject
    // sub.classList.add("ptag")

    const email = document.createElement('p')
    email.innerText = 'EMAIL:  '+ data.email
    
    const message = document.createElement('p')
    message.innerText = 'COMMENTS:  '+ data.message
    
    const statusid = document.createElement('p')
    statusid.innerText = 'STATUSID:  '+ data.statusId
    
    const statusN = document.createElement('p')
    statusN.innerText = 'STATUSNAME:  '+ data.status.statusName

    card.appendChild(id)
    card.appendChild(time)
    card.appendChild(sub)
    card.appendChild(email)
    card.appendChild(message)
    card.appendChild(statusid)
    card.appendChild(statusN)
    

    return card
}