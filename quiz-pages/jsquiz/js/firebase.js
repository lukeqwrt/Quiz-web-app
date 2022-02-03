// const db = firebase.firestore();

const name_list = document.querySelector('.name_list')

//getting realdata when logged in
db.collection('namescore').orderBy('score').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.reverse().forEach((change,index) => {
        if(change.type == 'added'){
            let number = index + 1;
            renderScores(change.doc, number);
        }
        // else if(change.type == 'removed'){
        //     let li = roomsList.querySelector('[data-id=' + change.doc.id + ']')
        //     roomsList.removeChild(li);
        // }
    })
});


function renderScores(doc, index){
    let scorelist = document.createElement('div')
    scorelist.classList.add('name_score')
    var scoreTag = `
    <span class="name">${index}. ${doc.data().name}</span>
    <span class="score">${doc.data().score}/5</span>
    `
    scorelist.innerHTML = scoreTag
    name_list.appendChild(scorelist)
}