let progress = 0

function login(){

let name=document.getElementById("username").value

if(name===""){
alert("Enter your name")
return
}

localStorage.setItem("username",name)

document.getElementById("loginPage").style.display="none"

document.getElementById("app").style.display="block"

updateStreak()

displayLeaderboard()

}


function updateStreak(){

let today=new Date().toDateString()

let lastDay=localStorage.getItem("lastDay")

let streak=localStorage.getItem("streak") || 0

if(lastDay!==today){

streak++

localStorage.setItem("streak",streak)

localStorage.setItem("lastDay",today)

}

document.getElementById("streak").textContent="🔥 Streak: "+streak

}


function completeLesson(){

alert("Lesson Completed!")

updateLeaderboard()

}


function sendMessage(){

let input=document.getElementById("userInput").value

if(input==="") return

let chatBox=document.getElementById("chatBox")

let user=document.createElement("p")

user.className="user"

user.textContent="You: "+input

chatBox.appendChild(user)

let ai=document.createElement("p")

ai.className="ai"

ai.textContent="AI: Good sentence! Keep practicing."

chatBox.appendChild(ai)

document.getElementById("userInput").value=""

chatBox.scrollTop=chatBox.scrollHeight

}


function startVoice(){

const recognition=new webkitSpeechRecognition()

recognition.lang="en-US"

recognition.onresult=function(event){

let speech=event.results[0][0].transcript

document.getElementById("userInput").value=speech

}

recognition.start()

}


function updateLeaderboard(){

let name=localStorage.getItem("username")

let score=localStorage.getItem("streak") || 0

let board=JSON.parse(localStorage.getItem("leaderboard")) || []

board.push({name,score})

board.sort((a,b)=>b.score-a.score)

localStorage.setItem("leaderboard",JSON.stringify(board))

displayLeaderboard()

}


function displayLeaderboard(){

let board=JSON.parse(localStorage.getItem("leaderboard")) || []

let list=document.getElementById("leaderboard")

list.innerHTML=""

board.slice(0,5).forEach(player=>{

let li=document.createElement("li")

li.textContent=player.name+" - "+player.score

list.appendChild(li)

})

}
function startPronunciation(){

const target="hello how are you"

const recognition=new webkitSpeechRecognition()

recognition.lang="en-US"

recognition.onresult=function(event){

let spoken=event.results[0][0].transcript.toLowerCase()

document.getElementById("speechResult").textContent="You said: "+spoken

let score=calculateScore(spoken,target)

document.getElementById("score").textContent="Pronunciation Score: "+score+"%"

}

recognition.start()

}



function calculateScore(spoken,target){

let spokenWords=spoken.split(" ")

let targetWords=target.split(" ")

let correct=0

for(let i=0;i<targetWords.length;i++){

if(spokenWords[i]===targetWords[i]){

correct++

}

}

let percent=Math.floor((correct/targetWords.length)*100)

return percent

}