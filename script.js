const trivia_quiz = document.querySelector('#trivia_quiz');

trivia_quiz.addEventListener('click', () => {
    window.location.href = "./quiz-pages/jsquiz/index.html"
})

const toggle = document.querySelector('.toggle')
const bodyBg = document.querySelector('#bg')
const nav = document.querySelector('.nav_container')
toggle.addEventListener('click' , () => {
    bodyBg.classList.toggle('darkMode')
    nav.classList.toggle('nav_active')
    
    const list = document.querySelectorAll('[fontColor]')
    if(bodyBg.classList.contains('darkMode')){
        // list.style.color = "D6D6D6"
        list.forEach(i => {
            i.style.color = "#D6D6D6";
        })
    }else{
        list.forEach(i => {
            i.style.color = "#000";
        })
    }
})