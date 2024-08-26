// Adding an event listener to the "Search" button
document.getElementById('wiki-search-btn').addEventListener('click', function() {
    // Get the user's search input
    const userQuery = document.getElementById('wiki-search-input').value;
    // Creating the search query and combining "Albert Einstein" with the user's input
    const searchQuery = `Albert Einstein ${userQuery}`;
    if (userQuery) {
        // Call the function to fetch data from Wikipedia using the search query
        fetchWikipediaData(searchQuery);
    }
});

/**
 * Function to fetch data from Wikipedia using the API.
 * Documentation Reference: https://www.mediawiki.org/wiki/API:Main_page
 * Accessed: August 24, 2024
 */
function fetchWikipediaData(query) {
    // Create the Wikipedia API URL
    const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`;

    /**
     * Using Fetch API to request data from the Wikipedia API.
     * Reference: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
     * Accessed: August 24, 2024
     */
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Call the function to show the search results
            displayWikipediaResults(data.query.search);
        })
        .catch(error => {
            // Console log any errors and display an error message to the user
            console.error('Error fetching Wikipedia data:', error);
            document.getElementById('wiki-results').innerHTML = '<p>Error fetching data from Wikipedia.</p>';
        });
}

/**
 * Function to display the fetched Wikipedia results.
 * Reference: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 * Accessed: August 24, 2024
 */
function displayWikipediaResults(results) {
    // Get the container where the search results will be displayed
    const resultsContainer = document.getElementById('wiki-results');
    // Clear previous search results
    resultsContainer.innerHTML = '';
    // Check if there's any results
    if (results.length === 0) {
        // If no results are found, display the following message
        resultsContainer.innerHTML = '<p>No results found.</p>';
        return;
    }
    // Loop through each result in the results array
    results.forEach(result => {
        // Create a new div element to hold the result
        const resultItem = document.createElement('div');
        resultItem.classList.add('wiki-result-item');
        
        // Add the article title, snippet, and a link
        resultItem.innerHTML = `
            <h3>${result.title}</h3>
            <p>${result.snippet}...</p>
            <a href="https://en.wikipedia.org/wiki/${encodeURIComponent(result.title)}" target="_blank">Read more</a>
        `;
        
        // Add the result item to the results container
        resultsContainer.appendChild(resultItem);
    });
}
