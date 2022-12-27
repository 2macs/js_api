const API_KEY = 'qpWZx4ctmYlHlmeYXG9QKJ6YdCA';
const API_URL = "https://ci-jshint.herokuapp.com/api";
const resultsModal = new bootstrap.Modal(document.getElementById('resultsModal'));

//add an event listener for a button//
document.getElementById('status').addEventListener('click', e=> getStatus(e));

async function getStatus(e) {
    const queryString = `${API_URL}?api_key=${API_KEY}`;  //follow format required by api documentation //
    //fetch the query and assign it to response //
    const response = await fetch(queryString);
    const data = await response.json();
    if (response.ok){  //if no issue with the fetch command then response.ok property is set to true //
        console.log(data.expiry);  // logs the repsonse to the console //
    }
}
