/**
 * Dynamic Timeline for Albert Einstein Biography page
 * Author: Angela Zeng
 * Date: August 15, 2024
 */

class Timeline {
    constructor(events) {
        this.events = events;
        this.timelineContainer = document.getElementById('timeline');
        this.detailsContainer = document.getElementById('event-details');
        this.searchBar = document.getElementById('search-bar');
        this.searchButton = document.querySelector('button'); // Assuming there's only one button for search
    }

    // Method to display the timeline
    displayTimeline(events) {
        this.timelineContainer.innerHTML = ''; // Clear previous events

        events.forEach((event, index) => {
            const eventElement = document.createElement('div');
            eventElement.classList.add('timeline-event');
            eventElement.innerHTML = `
                <h4>${event.year}</h4>
                <p><strong>${event.title}</strong></p>
            `;
            eventElement.addEventListener('click', () => this.showEventDetails(index));
            this.timelineContainer.appendChild(eventElement);
        });
    }

    // Method to search events by keyword
    searchEvents() {
        const keyword = this.searchBar.value.toLowerCase();

        const filteredEvents = this.events.filter(event => 
            event.title.toLowerCase().includes(keyword) || 
            event.description.toLowerCase().includes(keyword)
        );

        this.displayTimeline(filteredEvents);
    }

    // Method to show detailed information about an event
    showEventDetails(index) {
        const event = this.events[index];
        this.detailsContainer.innerHTML = `
            <h3>${event.year} - ${event.title}</h3>
            <p>${event.description}</p>
            <button id="close-btn">Close</button>
        `;
        this.detailsContainer.style.display = 'block'; // Show the details modal
        document.getElementById('close-btn').addEventListener('click', this.closeEventDetails.bind(this));
    }

    // Method to close the event details modal
    closeEventDetails() {
        this.detailsContainer.style.display = 'none'; // Hide the details modal
    }

    // Initialize the timeline
    init() {
        this.displayTimeline(this.events); // Display the initial timeline
        this.searchButton.addEventListener('click', () => this.searchEvents());
    }
}

// Initialize the timeline with events
const timeline = new Timeline([
    { year: 1879, title: "Born in Ulm, Germany", description: "Albert Einstein was born in Ulm, Germany. This marked the beginning of the journey of one of the greatest minds in history." },
    { year: 1905, title: "Publishes the theory of relativity", description: "In 1905, often referred to as Einstein's 'Annus Mirabilis' or 'Miracle Year,' he published four groundbreaking papers that transformed the field of physics." },
    { year: 1921, title: "Wins the Nobel Prize in Physics", description: "Albert Einstein received the Nobel Prize in Physics in 1921 for his explanation of the photoelectric effect, which was pivotal in establishing quantum theory." },
    // Add more events as needed
]);

// Initialize the timeline on page load
document.addEventListener('DOMContentLoaded', () => {
    timeline.init();
});
