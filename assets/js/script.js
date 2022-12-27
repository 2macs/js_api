const API_KEY = 'qpWZx4ctmYlHlmeYXG9QKJ6YdCA';
const API_URL = "https://ci-jshint.herokuapp.com/api";
const resultsModal = new bootstrap.Modal(document.getElementById('resultsModal'));

//add an event listener for a button//
document.getElementById('status').addEventListener('click', e => getStatus(e));
document.getElementById('submit').addEventListener('click', e => postForm(e));


function processOptions(form) {
    let optArray = [];

    for (let e of form.entries()) {
        if (e[0] === "options") {
            optArray.push(e[1]);
        }
    }

    form.delete("options");

    form.append("options", optArray.join());

    return form;
}

async function postForm(e){
    const form = processOptions(new FormData(document.getElementById("checksform")));
    const response = await fetch(API_URL,{
        method:'POST',
        headers:{
            'Authorization': API_KEY,
        },
        body: form,
    });
    const data = await response.json(); //turn the data into JSON to prep for posting //
    if (response.ok){
        displayErrors(data);
    } else {
        displayException(data);
        throw new Error(data.error);
    }
}

function displayErrors(data){
    let heading = `JShint results for ${data.file}`;
    if(data.total_errors === 0){
        results = `<div class='no_errors'>No errors recorded, great work!</div>`;
    } else {
        results = `<div>Total errors: <span class="error_count">${data.total_errors}</span></div>`;
        for (let error of data.error_list) {
            results += `<div>At line <span class="line">${error.line}</span>, `;
            results += `column <span class="column">${error.col}:</span></div>`;
            results += `<div class="error">${error.error}</div>`;
        }
    }
    document.getElementById("resultsModalTitle").innerText = heading; //set the modal heading //
    document.getElementById("results-content").innerHTML = results; //set the modal content //
    resultsModal.show(); //display the modal //
}

async function getStatus(e) {
    const queryString = `${API_URL}?api_key=${API_KEY}`;  //follow format required by api documentation //
    //fetch the query and assign it to response //
    const response = await fetch(queryString);
    const data = await response.json();
    if (response.ok){  //if no issue with the fetch command then response.ok property is set to true //
        displayStatus(data);  //call displaystatus function //
    } else 
        displayException(data);
        throw new Error(data.error);
}

function displayStatus(data) {
    let heading = 'API Key status';
    let results = `<div>Your key is valid until</div>`;
    results += `<div class="key-status">${data.expiry}</div>`;
    document.getElementById('resultsModalTitle').innerText = heading;
    document.getElementById('results-content').innerHTML = results;

    resultsModal.show();
}

function displayException(data){
    let heading = `An exception occurred`;
    results = `<div>The API returned status code ${data.status_code}</div>`;
    results += `<div>Error no.: <strong>${data.error_no}</strong></div>`;
    results += `<div>Error text: <strong>${data.error}</strong></div>`;

    document.getElementById('resultsModalTitle').innerText = heading;
    document.getElementById('results-content').innerHTML = results;

    resultsModal.show();

}
