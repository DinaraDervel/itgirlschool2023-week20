const URL = 'https://swapi.dev/api/';//root resource
const searchResult = document.querySelector('#searchResult');//parent element for search result
const searchError = document.querySelector('#searchError');//parent element for search error message
const loader = document.querySelector('.loader');
//object for searched category and number
const requestURL = {
    category: '',
    number: '',
};

// functions for rendering search result and errors in DOM inside parent element
const render = (element, ParentElement) => {
    if (!element) ParentElement.innerHTML = ``;
    else if (requestURL.category === 'films') ParentElement.innerHTML = `<h3>Title: ${element.title}</h3>`;
    else ParentElement.innerHTML = `<h3>Name: ${element.name}</h3>`;
};
const renderError = (error, ParentElement) => {
    if (!error) ParentElement.innerHTML = ``;
    else if (error instanceof Error) ParentElement.innerHTML = `<h3 style="color:red;">Error: Server is not available. ${error.message}</h3>`;
    else if (error === 404) ParentElement.innerHTML = `<h3 style="color:red;">Error: 404 Not Found</h3>`;
    else ParentElement.innerHTML = `<h3 style="color:red;">Error: ${error}</h3>`;
};

//function for GET request and rendering result or error message
const getRequest = (url) => {
    try {
        renderError('', searchError);
        render('', searchResult);
        loader.classList.remove('hidden');
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    return Promise.reject(response.status);
                }
                return response.json();
            })
            .then(data => {
                render(data, searchResult);
                renderError('', searchError);
                loader.classList.add('hidden');
            },
                reject => {
                    renderError(reject, searchError);
                    render('', searchResult);
                    loader.classList.add('hidden');

                });
    }
    catch (err) {
        renderError(err, searchError);
        render('', searchResult);
    }
    finally {
        console.log('Request sent');
    }
};

//read category value from input and assign it to object property
const searchCategory = document.getElementById('objectCategory');
searchCategory.addEventListener('change', () => {
    requestURL.category = searchCategory.value;
});

//read number value from input and assign it to object property
const searchNumber = document.getElementById('objectNumber');
searchNumber.addEventListener('change', () => {
    requestURL.number = searchNumber.value;
});

//create final url for request and execute request function
const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', () => {
    const searchURL = URL + requestURL.category + '/' + requestURL.number + '/';
    getRequest(searchURL);
});