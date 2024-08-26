// Adding an event listener to the "Search" button
document.getElementById('search-books-btn').addEventListener('click', function() {
    // Get the user's search input
    const userQuery = document.getElementById('book-query').value;
    // Creating the search query and combining "Albert Einstein" with the user's input
    const query = `Albert Einstein ${userQuery}`;
    // Creating the Google Books API URL
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=5`;

    /**
     * Fetching data from the Google Books API.
     * Documentation Reference: https://developers.google.com/books/docs/v1/getting_started
     * Accessed: August 24, 2024
     */

    // Use the Fetch API to send a request to the Google Books API
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Get the container where the search results will be displayed
            const bookResults = document.getElementById('book-results');
            // Clear previous search results
            bookResults.innerHTML = '';
            // Check if the API returned any books
            if (data.items) {
                // Loop through each book in the results
                data.items.forEach(item => {
                    // Get the book's title, author(s), and the link
                    const bookTitle = item.volumeInfo.title;
                    const bookAuthor = item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown Author';
                    const bookLink = item.volumeInfo.infoLink;
                    // Adding HTML for each book and add it to the results container
                    bookResults.innerHTML += `
                        <div class="book-item">
                            <h4>${bookTitle}</h4>
                            <p>Author: ${bookAuthor}</p>
                            <a href="${bookLink}" target="_blank">More Info</a>
                        </div>
                    `;
                });
            } else {
                // If no books were found, display the following message
                bookResults.innerHTML = '<p>No books found for this search term.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching book data:', error);
            /**
             * Using Fetch API to request data.
             * Documentation Reference: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
             * Accessed: August 24, 2024
             */
        });
});
