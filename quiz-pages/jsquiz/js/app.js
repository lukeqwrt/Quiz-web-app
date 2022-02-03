const start_btn = document.querySelector(".start_btn button")
const info_box = document.querySelector(".info_box")
const exit_btn = document.querySelector(".buttons .quit")
const continue_btn = document.querySelector(".buttons .restart")
const quiz_box = document.querySelector(".quiz_box")
const option_list = document.querySelector(".option_list");
const timeCount = quiz_box.querySelector(".timer_second")
const timeline = quiz_box.querySelector("header .time_line")
const timeOff = quiz_box.querySelector("header .time_text")


//
start_btn.onclick = () => {
    info_box.classList.add("activeinfo") //show the info box
}

exit_btn.onclick = () => {
    info_box.classList.remove("activeinfo") //hide the info box
    // console.log('hello')
}

continue_btn.onclick = () => {
    info_box.classList.remove("activeinfo") //hide the info box
    quiz_box.classList.add("activeQuiz") //show the quiz
    showQuestions(0)
    queCounter(1)
    startTimer(15)
    startTimerLine(0)
}

let que_count = 0;
let que_numb = 1;
let counter;
let counterLine;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;

const next_btn = quiz_box.querySelector('.next_btn')
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");


restart_quiz.onclick = () => {
    result_box.classList.remove("activeResult")
    quiz_box.classList.add("activeQuiz")


    que_count = 0;
    let que_numb = 1;
    let counter;
    let counterLine;
    let timeValue = 15;
    let widthValue = 0;
     userScore = 0;
    showQuestions(que_count)
    queCounter(que_numb)
    clearInterval(counter)
    startTimer(timeValue)
    clearInterval(counterLine)
    startTimerLine(widthValue)
    next_btn.style.display = "none"
    timeOff.textContent = "Time Left"

    form.classList.add('form_active')
    buttons_r.classList.remove('button_act')
}

quit_quiz.onclick = () => {
    window.location.reload();
}


const form = document.querySelector('.form')
const buttons_r = document.querySelector('.buttons_restart')
//if next button clicked
next_btn.onclick = () => {
    if(que_count < questions.length - 1){
        // console.log(counterLine)
        que_count++;
        que_numb++;
        showQuestions(que_count)
        queCounter(que_numb)
        clearInterval(counter)
        startTimer(timeValue)
        clearInterval(counterLine)
        startTimerLine(widthValue)
    
        next_btn.style.display = "none"
        timeOff.textContent = "Time Left"
        // console.log(que_count)
    }else{
        clearInterval(counter)
        clearInterval(counterLine)
        console.log('questions.completed')
        showResultBox();
      
       
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('namescore').add({
    name: form.name.value,
    score: userScore

});
form.name.value = "";
console.log('finish')
form.classList.remove('form_active')
buttons_r.classList.add('button_act')
// console.log(buttons)
})

// getting Questions and options from array

function showQuestions(index){
    const que_text = document.querySelector(".que_text");
 
    let que_tag = '<span>'+ questions[index].question +'</span>';
    let option_tag ='<div class="option">'+questions[index].options[0]+'<span></span></div>'+
                    '<div class="option">'+questions[index].options[1]+'<span></span></div>'+
                    '<div class="option">'+questions[index].options[2]+'<span></span></div>'+
                    '<div class="option">'+questions[index].options[3]+'<span></span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    const option = option_list.querySelectorAll(".option");
    for(let i = 0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
        // console.log(i)
    }
}

let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>'
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>'

function optionSelected(answer){
    clearInterval(counter)
    clearInterval(counterLine)
    let userans = answer.textContent;
    let correctAns = questions[que_count].answer;
    let allOptions = option_list.children.length;
    if(userans == correctAns){
        userScore += 1
        // console.log(userScore)
        answer.classList.add('correct')
        // console.log('answer is correct')
        answer.insertAdjacentHTML('beforeend', tickIcon);
    }else{
        answer.classList.add('incorrect')
        // console.log("answer is wrong")
        answer.insertAdjacentHTML('beforeend', crossIcon);
        //if answers is incorrect then auto 
        for(let i = 0; i < allOptions; i++){
            // console.log(option_list.children[i].textContent)
        
            if(option_list.children[i].textContent == correctAns){
         
                option_list.children[i].setAttribute("class", "option correct");
                option_list.children[i].insertAdjacentHTML('beforeend', tickIcon);
            }
            // console.log(i)
        }
    }
    for(let i = 0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled")

    }
    //once user seleccted disabled all options
    next_btn.style.display = "block"
}



function showResultBox(){
    info_box.classList.remove("activeinfo") //hide the info box
    quiz_box.classList.remove("activeQuiz") //show the quiz
    result_box.classList.add("activeResult") //show the result
    const scoreText = result_box.querySelector(".score_text");
    if(userScore > 3 ){
        let scoreTag = `<span>and congrats, you got <p class='myscore'>${userScore}</p> out of <p>${questions.length}</p></span>`
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore > 1 ){
        let scoreTag = `<span>and nice, You got <p class='myscore'>${userScore}</p> out of <p>${questions.length}</p></span>`
        scoreText.innerHTML = scoreTag;
    }
    else{
        let scoreTag = `<span>and sorry you only got <p class='myscore'>${userScore}</p> out of <p>${questions.length}</p></span>`
        scoreText.innerHTML = scoreTag;
    }

    
}


function startTimer(time){
    counter = setInterval(timer,1000)
    function timer(){
        timeCount.textContent = time
        time--;
        if(time < 9){
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero
        }
        if(time < 0){
            clearInterval(counter)
            timeCount.textContent = "00"
            timeOff.textContent = "Time Off"
            let correctAns = questions[que_count].answer;
            let allOptions = option_list.children.length;

            for(let i = 0; i < allOptions; i++){
                // console.log(option_list.children[i].textContent)
                if(option_list.children[i].textContent == correctAns){
             
                    option_list.children[i].setAttribute("class", "option correct");
                    option_list.children[i].insertAdjacentHTML('beforeend', tickIcon);
                }
                // console.log(i)
            }

            for(let i = 0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled")
        
            }
            next_btn.style.display = "block"
        }
    }
}
function startTimerLine(time){
    counterLine = setInterval(timer,29)
    function timer(){
        time += 1;
        timeline.style.width = time + "px"
        if(time > 549){
            clearInterval(counterLine)
        }
    }
}

function queCounter(index){
    const  bottom_ques_counter = quiz_box.querySelector(".total_que");
    let totalQuesCountTag = '<span><p>'+ index +'</p>of<p>'+ questions.length +'</p>Questions</span>';
    bottom_ques_counter.innerHTML =  totalQuesCountTag
}

const score_btn = document.querySelector('.score_btn')
const close_btn = document.querySelector('.close_btn')

const modal_score_container = document.querySelector('.modal_score_container')

modal_score_container.addEventListener('click', (e) => {
    if(e.target.classList.contains('modal_score_container')){
        modal_score_container.classList.remove('modal_active')
    }
})
score_btn.addEventListener('click', () => {
    modal_score_container.classList.add('modal_active')
})
close_btn.addEventListener('click', () => {
    modal_score_container.classList.remove('modal_active')
})


