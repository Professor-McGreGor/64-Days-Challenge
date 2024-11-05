class Question {
    constructor(text, type, options, correctAnswer, points = 1) {
        this.text = text;
        this.type = type; // 'multiple-choice', 'true-false', or 'text'
        this.options = options;
        this.correctAnswer = correctAnswer;
        this.points = points;
    }

    checkAnswer(userAnswer) {
        if (this.type === 'text') {
            return userAnswer.toLowerCase().trim() === this.correctAnswer.toLowerCase().trim();
        }
        return userAnswer === this.correctAnswer;
    }
}

class QuizGame {
    constructor() {
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.playerName = '';
        this.gameHistory = [];
    }

    addQuestion(question) {
        this.questions.push(question);
    }

    startGame(playerName) {
        this.playerName = playerName;
        this.currentQuestionIndex = 0;
        this.score = 0;
        console.log(`Welcome to the Quiz Game, ${this.playerName}!`);
        this.displayNextQuestion();
    }

    displayNextQuestion() {
        if (this.currentQuestionIndex < this.questions.length) {
            const question = this.questions[this.currentQuestionIndex];
            console.log(`\nQuestion ${this.currentQuestionIndex + 1} (${question.points} points):`);
            console.log(question.text);
            
            if (question.type !== 'text') {
                console.log('\nOptions:');
                question.options.forEach((option, index) => {
                    console.log(`${index + 1}. ${option}`);
                });
            }
        } else {
            this.endGame();
        }
    }

    submitAnswer(answer) {
        const currentQuestion = this.questions[this.currentQuestionIndex];
        const isCorrect = currentQuestion.checkAnswer(answer);
        
        if (isCorrect) {
            this.score += currentQuestion.points;
            console.log('Correct! 🎉');
        } else {
            console.log(`Wrong! The correct answer was: ${currentQuestion.correctAnswer}`);
        }

        this.currentQuestionIndex++;
        this.displayNextQuestion();
    }

    endGame() {
        const totalPoints = this.questions.reduce((sum, q) => sum + q.points, 0);
        const percentage = (this.score / totalPoints) * 100;
        
        const gameResult = {
            playerName: this.playerName,
            score: this.score,
            totalPoints: totalPoints,
            percentage: percentage,
            date: new Date()
        };
        
        this.gameHistory.push(gameResult);

        console.log('\n=== Game Over ===');
        console.log(`Player: ${this.playerName}`);
        console.log(`Final Score: ${this.score}/${totalPoints} (${percentage.toFixed(1)}%)`);
        this.displayGrade(percentage);
    }

    displayGrade(percentage) {
        let grade;
        if (percentage >= 90) grade = 'A';
        else if (percentage >= 80) grade = 'B';
        else if (percentage >= 70) grade = 'C';
        else if (percentage >= 60) grade = 'D';
        else grade = 'F';

        console.log(`Grade: ${grade}`);
    }

    getGameHistory() {
        return this.gameHistory;
    }
}

// Create a new quiz game
const quiz = new QuizGame();

// Add some sample questions
quiz.addQuestion(new Question(
    'What is the capital of France?',
    'text',
    [],
    'Paris',
    2
));

quiz.addQuestion(new Question(
    'Which planet is known as the Red Planet?',
    'multiple-choice',
    ['Venus', 'Mars', 'Jupiter', 'Saturn'],
    'Mars',
    1
));

quiz.addQuestion(new Question(
    'Is JavaScript a compiled language?',
    'true-false',
    ['True', 'False'],
    'False',
    1
));

quiz.addQuestion(new Question(
    'What is 2 + 2 × 2?',
    'multiple-choice',
    ['6', '8', '10', '12'],
    '8',
    1
));
