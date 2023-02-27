//DATA//

//creamos los objetos//

const data = [ //variable con el array de preguntas//
    {
        question: "¿Cuantos anillos gano Bill Rusell a lo largo de su carrera??",

        choices: [
            "11",
            "8"
        ],
        answer: "11"
    },

    {
        question: "¿En que año se retiro Michael Jordan??",
        choices: [
            "2002",
            "2003"
        ],
        answer: "2003"
    },

    {
        question: "¿Cual era la posicion en la que jugaba Magic Jhonson?",
        choices: [
            "Base",
            "Escolta"
        ],
        answer: "Base"
    },

    {
        question: " ¿Con cuantos puntos batio Lebron James el record historico de anotacion en la NBA?",
        choices: [
            "38550",
            "38390"
        ],
        answer: "38390"
    },

    {
        question: "¿Cual fue la media de puntos por partido de Larry Bird a lo largo de su carrera?",
        choices: [
            "33",
            "20"
        ],
        answer: "20"
    },

    {
        question: "¿Cuantos campeonatos de la NBA consiguio Kobe Bryant?",
        choices: [
            "5",
            "4"
        ],
        answer: "5"
    },
];

//PREGUNTA// como conformamnos la pregunta

class Question {  //CLASE// definimos que tendra dentro el objeto Question
    constructor(text, choices, answer) { //metodo constructor para crear el objeto y decir al constructor que parametros va a recibir
        this.text = text //le decimos que queremos recibir a partir del objeto que estamos creando 
        this.choices = choices
        this.answer = answer
    }

    correctAnswer(choice) {  //METODO// definimos el metodo y le indicamos que opcion queremos. 
        return choice === this.answer // le indicamos que nos retorne TRUE si la eleccion escogida es igual a la respuesta
    }

}

//PREGUNTAS// creamos la variable con el fin de que recorra todo el array de preguntas y cada vez que finalize me pase un objeto nuevo

const questions = data.map( //tambien se puede hacer con un bucle for
    (question) => //le pido que por cada reccorrido del objeto, me pase un nuevo objeto
        new Question(question.question, question.choices, question.answer)
)

//QUIZ//



class Quiz {

    score = 0
    questionIndex = 0 // variable para indicar que empieza en la pregunta 0


    constructor(questions) { //recibira como parametro un array del objeto question//
        this.questions = questions
    }

    getQuestionIndex() { //Metodo que permite saber en que pregunta esta el usuario
        return this.questions[this.questionIndex]
    }

    isEnded() { //Metodo que nos permite dar por finalizado el Quiz
        return this.questions.length === this.questionIndex //Si la longitud de las preguntas es igual al questionIndex se da por finalizado
    }

    guess(answer) { // metodo que me permite pasar a la siguiente pregunta 
        console.log(answer)
        if (this.getQuestionIndex().correctAnswer(answer)) { // si de la pregunta actual, la respuesta es correcta..
            this.score++ //sumame un punto
        }

        this.questionIndex++ // me permite pasar a la siguiente pregunta

    }
}



//INTERFAZ// Es la encargada de interactuar con juego.html

class UI {
    constructor() { }

    showQuestion(text) { //recibira un texto como parametro
        const questionTitle = document.getElementById("question") // le indico que me pinte el texto en el ID question de juego.html
        questionTitle.innerHTML = text; // Le indicamos que coloque en el questionTitle el texto que esta recibiendo
    }

    showChoices(choices, callback) { //METODO// Recibe como parametro el array de opciones a elegir
        const choicesContainer = document.getElementById("choices") 
        choicesContainer.innerHTML="" // una vez empiza a recorrer de nuevo, limpia el choicesContainer para que no se sumen las opciones a las anteriores

        for (let i = 0; i < choices.length; i++) { //creamos un bucle que recorra las opciones y genere los botones necesarios
            const button = document.createElement('button') //creamos un boton
            button.innerText = choices[i] //Le indicamos que nos pinte las opciones del array y me devuelve el texto actual del boton
            button.className = "button" // con className creamos el estilo del boton
            button.addEventListener('click', () => callback(choices[i])) //creamos el addEventListener para que al hacer click se ejecute

            choicesContainer.append(button) 
        }
    }

    showScores(score){ // METODO// recibe como parametro un numero que es la puntuacion total
        const quizEndHtml= ` 
        <h1>Resultado</h1>
        <h2>Puntuacion: ${score}</h2> 
        `
        //concatenamos el resultado

        const element = document.getElementById('Quiz')
        element.innerHTML = quizEndHtml
    }

    showProgress(currentIndex,total) { // METODO// recibe como parametro la pregunta en la que estas y cuantas son en total∫
       const element = document.getElementById('progress')
        element.innerHTML = `Pregunta ${currentIndex} de ${total}`
    }




}

//APP//

const renderPage = (quiz, ui) => { //Declaramos la variable render Page con el fin de que cuando se conteste a la pregunta, pase a la proxima

    if(quiz.isEnded()){ // si el quiz a finalizado, muestrame el resultado
        ui.showScores(quiz.score)
    } else { // si no, continua pintando otra pregunta
    ui.showQuestion(quiz.getQuestionIndex().text) //METODO// le pedimos que del getQuestionIndex nos pinte la pregunta
    ui.showChoices(quiz.getQuestionIndex().choices, (currentChoice) => { //METODO// le pedimos que del getQuestionIndex nos pinte las opciones
        quiz.guess(currentChoice) //obtenemos el valor actual
        renderPage(quiz, ui) // volvemos a repintar la pregunta
    })
    ui.showProgress(quiz.questionIndex +1,quiz.questions.length) //
    }
}

function main() { //FUNCION PRINCIPAL//
    const ui = new UI() 
    const quiz = new Quiz(questions) //Ejecutamos la clase Quiz de las cuales espero questions
    renderPage(quiz, ui)

}

main();







