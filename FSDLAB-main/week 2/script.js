// Questions database

let questions = [

    {
        question: "What does HTML stand for?",
        answers: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Home Tool Markup Language",
            "Hyperlink Text Management Language"
        ],
        correct: 0
    },


    {
        question: "Which language is used for web styling?",
        answers: [
            "Python",
            "CSS",
            "Java",
            "C++"
        ],
        correct: 1
    },


    {
        question: "Which keyword creates a variable in JavaScript?",
        answers: [
            "var",
            "int",
            "variable",
            "string"
        ],
        correct: 0
    },


    {
        question: "Which method prints output in console?",
        answers: [
            "print()",
            "console.log()",
            "display()",
            "write()"
        ],
        correct: 1
    }

];


// Variables

let currentQuestion = 0;
let score = 0;
let time = 30;
let timer;


// Selecting HTML elements

let questionElement = document.getElementById("question");
let answersElement = document.getElementById("answers");
let nextButton = document.getElementById("next");
let scoreElement = document.getElementById("score");
let timerElement = document.getElementById("timer");


// Load question

function loadQuestion(){

    let q = questions[currentQuestion];

    questionElement.innerHTML = q.question;

    answersElement.innerHTML = "";


    q.answers.forEach(function(answer,index){


        let button = document.createElement("button");

        button.innerHTML = answer;


        button.onclick = function(){

            checkAnswer(index);

        };


        answersElement.appendChild(button);


    });


}


// Check answer

function checkAnswer(selected){


    let correctAnswer = questions[currentQuestion].correct;


    if(selected === correctAnswer){

        score++;

        scoreElement.innerHTML = "Score: " + score;

    }


}


// Next question

nextButton.onclick = function(){


    currentQuestion++;


    if(currentQuestion < questions.length){

        loadQuestion();

    }

    else{

        endQuiz();

    }


};



// Timer function

function startTimer(){


    timer = setInterval(function(){


        time--;

        timerElement.innerHTML =
        "Time Left: " + time + " seconds";


        if(time <= 0){

            clearInterval(timer);

            endQuiz();

        }


    },1000);


}



// End quiz

function endQuiz(){


    clearInterval(timer);


    document.querySelector(".quiz-container").innerHTML = `

    <h1>Quiz Completed!</h1>

    <h2>Your Score: ${score}/${questions.length}</h2>

    `;


}



// Start quiz

loadQuestion();

startTimer();