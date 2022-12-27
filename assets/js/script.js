const API_KEY = 'qpWZx4ctmYlHlmeYXG9QKJ6YdCA';
const API_URL = "https://ci-jshint.herokuapp.com/api";
const resultsModal = new bootstrap.Modal(document.getElementById('resultsModal'));

//add an event listener for a button//
document.getElementById('status').addEventListener('click', e => getStatus(e));
document.getElementById('submit').addEventListener('click', e => postForm(e));

async function postForm(e){
    const form = new FormData(document.getElementById('checksform'));
    const response = await fetch(API_URL,{
        method:'POST',
        headers:{
            'Authorization': API_KEY,
        },
        body: form,
    })
}

async function getStatus(e) {
    const queryString = `${API_URL}?api_key=${API_KEY}`;  //follow format required by api documentation //
    //fetch the query and assign it to response //
    const response = await fetch(queryString);
    const data = await response.json();
    if (response.ok){  //if no issue with the fetch command then response.ok property is set to true //
        displayStatus(data);  //call displaystatus function //
    } else throw new Error(data.error);
}

function displayStatus(data) {
    let heading = 'API Key status';
    let results = `<div>Your key is valid until</div>`;
    results += `<div class="key-status">${data.expiry}</div>`;
    document.getElementById('resultsModalTitle').innerText = heading;
    document.getElementById('results-content').innerHTML = results;

    resultsModal.show();
}
