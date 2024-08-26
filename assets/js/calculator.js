/**
 * Time Dilation Calculator for Educational Resources page
 * Author: Angela Zeng
 * Date: August 15, 2024
 */

// Speed of light constant (in meters per second)
const speedOfLight = 299792458;

// TimeDilationCalculator class to handle the time dilation calculations and display.
class TimeDilationCalculator {
    constructor(speedOfLight) {
        this.speedOfLight = speedOfLight;
        this.speedInput = document.getElementById('speed-input');
        this.resultContainer = document.getElementById('result');
        this.calculateButton = document.getElementById('calculate-btn');
        this.init();
    }

    /**
     * Method to calculate time dilation based on input speed.
     * @param {number} speed - The speed of the object.
     * @returns {string} - The time dilation factor or an error message.
     */
    calculateTimeDilation(speed) {
        if (speed >= this.speedOfLight) {
            return "Speed must be less than the speed of light.";
        }
        // Calculate time dilation factor using the formula
        const timeDilation = 1 / Math.sqrt(1 - Math.pow(speed / this.speedOfLight, 2));
        return `Time dilation factor: ${timeDilation.toFixed(10)}`;
    }

    // Method to display the result of the time dilation calculation.
    displayResult() {
        // Get the speed input from the user
        const speed = parseFloat(this.speedInput.value);

        // Validate the input and display the result or an error message
        if (isNaN(speed) || speed <= 0) {
            this.resultContainer.textContent = "Please enter a valid speed.";
        } else {
            const result = this.calculateTimeDilation(speed);
            this.resultContainer.textContent = result;
        }
    }

    // Initialize the event listener for the calculate button.
    init() {
        this.calculateButton.addEventListener('click', () => this.displayResult());
    }
}

// Initialize the TimeDilationCalculator on page load
document.addEventListener('DOMContentLoaded', () => {
    new TimeDilationCalculator(speedOfLight);
});
