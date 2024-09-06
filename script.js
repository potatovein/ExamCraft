const startButton = document.getElementById("start-btn")
const nextButton = document.getElementById("next-btn")
const questionContainer = document.getElementById("question-container")
const questionElement = document.getElementById("question")
const answerButtons = document.getElementById("answer-buttons")

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener("click", startGame)
nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    setNextQuestion()
})

function shuffle(array){
    return array.sort(() => Math.random() - 0.5)
}

function startGame(){
    console.log("Starting")
    startButton.classList.add("hide")

    shuffledQuestions = shuffle(questions)
    currentQuestionIndex = 0

    questionContainer.classList.remove("hide")

    setNextQuestion()
}

function resetState(){
    clearStatusClass(document.body)
    nextButton.classList.add("hide")
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function setNextQuestion(){
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question){
    questionElement.innerText = question.question

    shuffle(question.answers).forEach(answer => {
        const button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("btn")

        if (answer.correct) {
            button.dataset.correct = answer.correct
        }

        button.addEventListener("click", selectAnswer)
        answerButtons.appendChild(button)
    })
}

function selectAnswer(e){
    let btn = e.target
    let correct = btn.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtons.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide")
    } else {
        startButton.innerText = "Restart"
        startButton.classList.remove("hide")
    }
}

function setStatusClass(element, correct){
    clearStatusClass(element)

    if (correct) {
        element.classList.add("correct")
    }else{
        element.classList.add("wrong")
    }
}

function clearStatusClass(element){
    element.classList.remove("correct")
    element.classList.remove("wrong")
}


function Question(question, answers, correctIndices){
    this.question = question
    this.answers = []

    if (typeof(correctIndices) == "number") { 
        correctIndices = [correctIndices]
    }

    for (let i = 0; i < answers.length; i++){
        this.answers[i] = {text: answers[i], correct: correctIndices.includes(i)}
    }
}

const questions = [
    new Question("What is the square root of 4?", [-1, -2, 2, 3], [1,2]),
    new Question("What is 3x3", [4, 9, 12, 16], 1),
    new Question("what is 4x12", [48, 32, 12], 0)
]