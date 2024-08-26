/**
 * Interactive Quiz for Albert Einstein Educational Resources page
 * Author: Angela Zeng
 * Date: August 15, 2024
 */

// Class to represent the quiz
class Quiz {
    constructor(questions) {
        this.questions = questions;
        this.score = 0;
        this.currentQuestionIndex = 0;
        this.timer = null;
        this.timeLeft = 30;
    }

    // Method to randomize the order of questions
    randomizeQuestions() {
        for (let i = this.questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
        }
    }

    // Method to display a question
    displayQuestion() {
        const questionContainer = document.getElementById('question');
        const optionsContainer = document.getElementById('options-container');
        const currentQuestion = this.questions[this.currentQuestionIndex];

        questionContainer.textContent = currentQuestion.question;
        optionsContainer.innerHTML = ''; // Clear previous options

        currentQuestion.options.forEach(option => {
            const optionBtn = document.createElement('button');
            optionBtn.textContent = option;
            optionBtn.onclick = () => this.checkAnswer(option);
            optionsContainer.appendChild(optionBtn);
        });
    }

    // Method to check the answer
    checkAnswer(selectedOption) {
        const correctAnswer = this.questions[this.currentQuestionIndex].answer;
        if (selectedOption === correctAnswer) {
            this.score++;
            alert("Correct!");
        } else {
            alert("Incorrect!");
        }
        this.updateScore();
        this.nextQuestion();
    }

    // Method to update the score display
    updateScore() {
        document.getElementById('current-score').textContent = this.score;
    }

    // Method to start the timer for each question
    startTimer() {
        this.timeLeft = 30;
        document.getElementById('time').textContent = this.timeLeft;
        this.timer = setInterval(() => {
            this.timeLeft--;
            document.getElementById('time').textContent = this.timeLeft;
            if (this.timeLeft <= 0) {
                clearInterval(this.timer);
                this.nextQuestion();
            }
        }, 1000);
    }

    // Method to display the next question or end the quiz if all questions are answered
    nextQuestion() {
        clearInterval(this.timer);
        this.currentQuestionIndex++;
        if (this.currentQuestionIndex < this.questions.length) {
            this.displayQuestion();
            this.startTimer();
        } else {
            alert("Quiz completed! Your final score is: " + this.score);
            this.stopQuiz();
        }
    }

    // Method to start the quiz
    startQuiz() {
        document.getElementById('start-btn').style.display = 'none';
        document.getElementById('stop-btn').style.display = 'block';
        document.getElementById('quiz-container').style.display = 'block';
        this.score = 0;
        this.currentQuestionIndex = 0;
        this.updateScore();
        this.displayQuestion();
        this.startTimer();
    }

    // Method to stop the quiz
    stopQuiz() {
        clearInterval(this.timer);
        document.getElementById('quiz-container').style.display = 'none';
        document.getElementById('start-btn').style.display = 'block';
        document.getElementById('stop-btn').style.display = 'none';
    }
}

// Initialize the quiz with questions
const quiz = new Quiz([
    {
        question: "What year was Albert Einstein born?",
        options: ["1879", "1880", "1881", "1882"],
        answer: "1879"
    },
    {
        question: "Which theory is Albert Einstein famous for?",
        options: ["Theory of Evolution", "Theory of Relativity", "Quantum Theory", "Big Bang Theory"],
        answer: "Theory of Relativity"
    },
    {
        question: "What is the famous equation derived by Einstein?",
        options: ["E = mc^2", "F = ma", "a^2 + b^2 = c^2", "PV = nRT"],
        answer: "E = mc^2"
    },
    {
        question: "In which country was Albert Einstein born?",
        options: ["Germany", "USA", "Switzerland", "Austria"],
        answer: "Germany"
    },
    {
        question: "For what discovery did Albert Einstein win the Nobel Prize in Physics in 1921?",
        options: ["General Theory of Relativity", "Special Theory of Relativity", "Photoelectric Effect", "Theory of Brownian Motion"],
        answer: "Photoelectric Effect"
    }
]);

// Initialize the quiz on page load
document.addEventListener('DOMContentLoaded', () => {
    quiz.randomizeQuestions();
});

// Event listeners for starting and stopping the quiz
document.getElementById('start-btn').addEventListener('click', () => quiz.startQuiz());
document.getElementById('stop-btn').addEventListener('click', () => quiz.stopQuiz());
