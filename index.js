const URL = 'https://swapi.dev/api/';//root resource
const searchResult = document.querySelector('#searchResult');//parent element for search result
const searchError = document.querySelector('#searchError');//parent element for search error message
//object for searched category and number
const requestURL = {
    category: '',
    number: 0,
};

// function for rendering search result in DOM inside parent element
const render = (element, ParentElement) => {
    if (!element) ParentElement.innerHTML = ``;
    else if (element instanceof Error) ParentElement.innerHTML = `<h3>Error: ${element.message}</h3>`;
    else if (requestURL.category === 'films') ParentElement.innerHTML = `<h3>Title: ${element.title}</h3>`;
    else ParentElement.innerHTML = `<h3>Name: ${element.name}</h3>`;
};

//function for GET request and rendering result or error message
const getRequest = (url) => {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
        .then(data => {
            render(data, searchResult);
            render('', searchError);
        })
        .catch(err => {
            render(err, searchError);
            render('', searchResult)
        })
};

//read category value from input and assign it to object property
const searchCategory = document.getElementById('objectCategory');
const onCategoryChange = searchCategory.addEventListener('change', () => {
    requestURL.category = searchCategory.value;
});

//read number value from input and assign it to object property
const searchNumber = document.getElementById('objectNumber');
const onNumberChange = searchNumber.addEventListener('change', () => {
    requestURL.number = searchNumber.value;
});

//create final url for request and execute request function
const searchButton = document.getElementById('searchButton');
const searchObject = searchButton.addEventListener('click', () => {
    const searchURL = URL + requestURL.category + '/' + requestURL.number + '/';
    getRequest(searchURL);
});