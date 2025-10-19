// Дані вікторини
const questions = [
    {
        question: " В якому році було засновано групу Gorillaz",
        image: "https://media.readdork.com/wp-content/uploads/2025/09/Gorillaz-The-Mountain-Press-Image.jpg", // Припустимо, у вас є файл 'kyiv.jpg' в папці
        answers: [
            { text: "2001", correct: false },
            { text: "1998", correct: true },
            { text: "1000-7", correct: false },
            { text: "1999", correct: false },
        ]
    },
    {
        question: "Cкільки раз мінявся персонаж Noodle",
        image: "https://i.ytimg.com/vi/v2sFvnMRSIk/hqdefault.jpg",
        answers: [
            { text: "5", correct: false },
            { text: "2", correct: false },
            { text: "не мінявся", correct: false },
            { text: "4", correct: true },
        ]
    },
    {
        question: "Най популярніший альбом Gorillaz",
        image: "https://variety.com/wp-content/uploads/2022/08/gorillazzz.jpg?w=1000&h=563&crop=1",
        answers: [
            { text: "Plastic Beach", correct: false },
            { text: "The Fall", correct: false },
            { text: "Demon Days", correct: true },
            { text: "Humanz", correct: false },
        ]
    },
    {
        question: "Як звати вокаліста гурту",
        image: "https://donttakefake.com/wp-content/uploads/2020/09/gorillaz-dtf-magazine.jpg",
        answers: [
            { text: "Ruslle", correct: false },
            { text: "2-D", correct: true },
            { text: "Noodle", correct: false },
            { text: "Murdoc", correct: false },
        ]
    },
    {
        question: "Як Нудл потрапила до гурту Gorillaz?",
        image: "https://64.media.tumblr.com/17cf5ce0ba727f018d9e844de84d75af/48a72c24e82d13aa-95/s540x810/80f8afc9f464da895d7d736dfc9dc0567d301801.gifv",
        answers: [
            { text: "Була подругою Мердока", correct: false },
            { text: "Прийшла на кастинг", correct: false },
            { text: "Була фанаткою 2-D", correct: false },
            { text: "ї знайшли в коробці поштою", correct: true },
        ]
    },
    {
        question: "Який персонаж мав проблеми з головою після автокатастрофи?",
        image: "https://img.ixbt.site/live/topics/preview/00/06/45/26/c765168180.jpg",
        answers: [
            { text: "Ruslle", correct: false },
            { text: "2-D", correct: true },
            { text: "Noodle", correct: false },
            { text: "Murdoc", correct: false },
        ]
    },
    {
        question: "У якому альбомі Нудл повертається до гурту після тривалої відсутності?",
        image: "https://pyxis.nymag.com/v1/imgs/b65/64a/6a724eeb9afb10c46f9684b2a1849b87c2-gorillaz.rhorizontal.w700.jpg",
        answers: [
            { text: "The Fall", correct: false },
            { text: "Demon Days", correct: false },
            { text: "Plastic Beach", correct: true },
            { text: "Humanz", correct: false },
        ]
    },
    {
        question: "Який учасник гурту народилася в Японії?",
        image: "https://podrobnosti.ua/media/pictures/2017/4/28/thumbs/740x415/virtualnaja-rok-gruppa-gorillaz-vypustila-novyj-albom-posle-semi-let-molchanija_rect_8917450b60f91b49def369a2f4f0e433.jpeg",
        answers: [
            { text: "Murdoc", correct: false },
            { text: "2-D", correct: false },
            { text: "Noodle", correct: true },
            { text: "Ruslle", correct: false },
        ]
    }
   
];


// Змінні для керування вікториною
let currentQuestionIndex = 0;
let score = 0;


// Отримання DOM-елементів
const body = document.body;
const quizBox = document.getElementById('quiz-box');
const resultBox = document.getElementById('result-box');
const questionText = document.getElementById('question-text');
const questionImage = document.getElementById('question-image');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');
const restartButton = document.getElementById('restart-button');
const scoreText = document.getElementById('score-text');
const progressIndicator = document.getElementById('progress');
const themeToggleButton = document.getElementById('theme-toggle');


// --- Функції логіки вікторини ---


/**
 * Завантажує поточне питання та варіанти відповідей.
 */
function showQuestion() {
    resetState(); // Очищення попередніх станів


    const currentQuestion = questions[currentQuestionIndex];
    const questionNumber = currentQuestionIndex + 1;
   
    // Оновлення тексту питання та індикатора прогресу
    questionText.innerText = currentQuestion.question;
    progressIndicator.innerText = `Питання ${questionNumber} з ${questions.length}`;


    // Додавання зображення (якщо є)
    if (currentQuestion.image) {
        questionImage.src = currentQuestion.image;
        questionImage.style.display = 'block';
    } else {
        questionImage.style.display = 'none';
        questionImage.src = '';
    }


    // Створення кнопок для відповідей
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn', 'answer-btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct; // Зберігаємо правильну відповідь у data-атрибуті
        }
        button.addEventListener('click', selectAnswer);
        answerButtons.appendChild(button);
    });
}


/**
 * Очищення стану (кнопки відповідей, приховування кнопки "Наступне")
 */
function resetState() {
    nextButton.disabled = true;
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}


/**
 * Обробка вибору відповіді користувачем.
 * @param {Event} e - Подія кліку
 */
function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";


    // Візуалізація результату
    if (isCorrect) {
        selectedButton.classList.add('correct');
        score++;
    } else {
        selectedButton.classList.add('incorrect');
    }


    // Блокування всіх кнопок після вибору
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add('correct'); // Підсвічуємо правильну відповідь
        }
        button.disabled = true;
    });


    // Активація кнопки "Наступне питання"
    nextButton.disabled = false;
}


/**
 * Перехід до наступного питання або показ результатів.
 */
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}


/**
 * Відображення кінцевого результату.
 */
function showResult() {
    quizBox.style.display = 'none';
    resultBox.style.display = 'block';
    scoreText.innerText = `Ви відповіли правильно на ${score} з ${questions.length} питань. Молодець!`;
}


/**
 * Ініціалізація вікторини.
 */
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultBox.style.display = 'none';
    quizBox.style.display = 'block';
    showQuestion();
}


// --- Функція зміни теми ---


/**
 * Перемикання між світлою та темною темою.
 */
function toggleTheme() {
    if (body.classList.contains('light-theme')) {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        themeToggleButton.innerText = "Світла тема";
    } else {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        themeToggleButton.innerText = "Темна тема";
    }
}


// --- Обробники подій ---


nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz(); // Початок заново після показу результату
    }
});


restartButton.addEventListener('click', startQuiz);
themeToggleButton.addEventListener('click', toggleTheme);


// Початковий запуск
startQuiz();

