const URL = 'https://swapi.dev/api/';//root resource
const searchResult = document.querySelector('#searchResult');//parent element for search result
const searchError = document.querySelector('#searchError');//parent element for search error message
const render = (element, ParentElement) => {
    const resultElement = document.createElement('div');
    resultElement.innerHTML = `<h3>${element}</h3>`;
    ParentElement.append(resultElement);
}; // function for rendering search result in DOM inside parent element


//1
const getRequest = (url) => {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
        .then(data => render(data.name, searchResult))
        .catch(err => render(err.message, searchError))
}; //function for GET request

const requestURL = {
    category: '',
    number: 0,
}

const searchCategory = document.getElementById('objectCategory');
const onCategoryChange = searchCategory.addEventListener('change', () => {
    requestURL.category = searchCategory.value;
});

const searchNumber = document.getElementById('objectNumber');
const onNumberChange = searchNumber.addEventListener('change', () => {
    requestURL.number = searchNumber.value;
});

const searchButton = document.getElementById('searchButton');
const searchObject = searchButton.addEventListener('click', () => {
    const searchURL = URL + requestURL.category + '/' + requestURL.number + '/';
    getRequest(searchURL);
    searchCategory.value = '';
    searchNumber.value = '';
})
