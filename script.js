const startButton = document.getElementById("start-btn")
const nextButton = document.getElementById("next-btn")
const questionContainer = document.getElementById("question-container")
const questionElement = document.getElementById("question")
const answerButtons = document.getElementById("answer-buttons")
const resultsContainer = document.getElementById("results-container")
const scoreText = document.getElementById("score")


let shuffledQuestions, currentQuestionIndex

let score = 0

startButton.addEventListener("click", startExam)
nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    setNextQuestion()
})

function shuffle(array){
    return array.sort(() => Math.random() - 0.5)
}

function ResetStats(){
    score = 0
}

function startExam(){
    ResetStats()
    console.log("Starting")
    startButton.classList.add("hide")

    shuffledQuestions = shuffle(questions)
    currentQuestionIndex = 0

    questionContainer.classList.remove("hide")
    resultsContainer.classList.add("hide")

    setNextQuestion()
}

function FinishExam(){
    startButton.removeEventListener("click", FinishExam)
    startButton.addEventListener("click", startExam)

    questionContainer.classList.add("hide")
    resultsContainer.classList.remove("hide")

    scoreText.innerText = `${score}/${GetTotalMarks(questions)} ${Math.round(score / GetTotalMarks(questions) * 1000)/10}%`
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

    if (correct) {score++}

    setStatusClass(document.body, correct)
    Array.from(answerButtons.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide")
    } else {
        startButton.innerText = "Finish"
        startButton.classList.remove("hide")
        startButton.removeEventListener("click", startExam)
        startButton.addEventListener("click", FinishExam)
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

function GetTotalMarks(questions){
    return questions.length
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