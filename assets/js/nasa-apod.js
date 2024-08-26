/**
 * JS to get and display the NASA Astronomy Picture of the Day (APOD).
 * API Documentation: https://api.nasa.gov/
 * Accessed: August 24, 2024
 */

document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'DEMO_KEY'; // Using NASA's demo API key

    // Create the URL for the API request using the demo API key
    const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

    /**
     * Using Fetch API to request data from the NASA APOD API.
     * Reference: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
     * Accessed: August 24, 2024
     */
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Get the container element
            const apodContainer = document.getElementById('nasa-apod');
            
            // Insert the APOD html
            apodContainer.innerHTML = `
                <h4>${data.title}</h4>
                <img src="${data.url}" alt="${data.title}" style="max-width:10%;">
                <p>${data.explanation}</p>
            `;
        })
        .catch(error => {
            // Handle any errors that happen when fetching
            console.error('Error fetching the NASA APOD:', error);
        });
});
