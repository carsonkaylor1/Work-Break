var clock, breakClock, workClock, interval, isWorkClock;
var minutes, seconds;
var isPaused;
var PRbtn = document.getElementById('pauseTimer');
var playbtn = document.getElementById('startTimer');
var continueBtn;
var alertStartSound = new sound('sounds/start_sound.mp3');
var alertEndSound = new sound('sounds/end_sound.mp3');


function start(){
    var wClock = document.getElementById('studyTime').value * 60;
    var bClock = document.getElementById('breakTime').value * 60;
    if(wClock > 0 && bClock > 0){
        workClock = wClock;
        breakClock = bClock;
    }
    else{
        if(workClock){
            document.getElementById('studyTime').value = workClock/60;
            document.getElementById('breakTime').value = breakClock/60;
        }      
    }
    isWorkClock = true;
    isPaused = false;
    PRbtn.innerHTML = '<i class="fas fa-pause"></i>';
    if(workClock && breakClock){
        playbtn.innerHTML = '<i class="fas fa-undo-alt"></i>';
        startTimer(workClock);
    }
}

function startTimer(timeValue){
        alertStartSound.play();
        PRbtn.disabled = false;
        playbtn.disabled = false;
        document.body.style.background = '#e52d27';
        document.body.style.background = '-webkit-linear-gradient(to right, #e52d27, #b31217)'
        document.body.style.background = 'linear-gradient(to right, #e52d27, #b31217)';
        document.getElementById('status').innerHTML = 'Work Time!'
        clearInterval(interval);
        clock = timeValue;
        interval = setInterval(function(){
        if(!isPaused){
            clock--;
            if (clock >= 0){     
                minutes = Math.floor(clock/60);
                seconds = Math.floor(clock%60);
                seconds < 10 ? seconds = '0' + seconds : seconds;
                document.getElementById('minutes').innerHTML = (minutes + ':' + seconds);
            }
            else{
                alertEndSound.play();
                PRbtn.disabled = true;
                playbtn.disabled = true;
                showContinueButton()
                clearInterval(interval);
                alert('Take a Break!');
                continueBtn.addEventListener('click', function(event){
                    insertTomato();
                    continueBtn.style.display = 'none';
                    startBreakTimer(breakClock);
                })
                
            }
        }
        else{
            clearInterval(interval);
            
        }
        }, 1000) 
}

function startBreakTimer(timeValue){
    alertStartSound.play();
    PRbtn.disabled = false;
    playbtn.disabled = false;
    document.body.style.background = '#dce35b';
    document.body.style.background = '-webkit-linear-gradient(to right, #45b649, #dce35b)'
    document.body.style.background = 'linear-gradient(to right, #45B649, #DCE35B)';
    document.getElementById('status').innerHTML = 'Woohoo Break Time!';
    clearInterval(interval);
    isWorkClock = false;
    clock = timeValue;
    interval = setInterval(function(){
        if(!isPaused){
            clock--;
            if (clock >= 0){     
                minutes = Math.floor(clock/60);
                seconds = Math.floor(clock%60);
                seconds < 10 ? seconds = '0' + seconds : seconds;
                document.getElementById('minutes').innerHTML = (minutes + ':' + seconds);
            }
            else{
                alertEndSound.play();
                PRbtn.disabled = true;
                playbtn.disabled = true;
                isWorkClock = true;
                showContinueButton();
                clearInterval(interval);
                alert('Time to Work!');
                continueBtn.addEventListener('click', function(event){
                    continueBtn.style.display = 'none';
                    startTimer(workClock);
                })
            }
        }
        else{
            clearInterval(interval);
        }
        }, 1000) 
}

function pauseTimer(){
    if(workClock && breakClock){
        if(!isPaused){
            PRbtn.innerHTML = '<i class="fas fa-play"></i>';
            isPaused = true;
        }
        else{
            PRbtn.innerHTML = '<i class="fas fa-pause"></i>';       
            isWorkClock ? startTimer(clock) : startBreakTimer(clock);
            isPaused = false;
        }
    }
}

function showContinueButton(){
    var destination = document.getElementById('continueDiv');
    continueBtn = document.createElement('button');
    continueBtn.innerHTML = 'Continue';
    destination.appendChild(continueBtn);
    continueBtnStyle = continueBtn.style;
    continueBtnStyle.fontSize = '24px';
    continueBtnStyle.border = 'none';
    continueBtnStyle.borderRadius = '8px';
    continueBtnStyle.padding = '4px 20px'
    continueBtnStyle.fontFamily = 'PT Mono, monospace';

}

function insertTomato(){
    var destination = document.getElementById('body');
    var newTomato = document.createElement('img');
    newTomato.src = 'https://i.imgur.com/DIoW5NE.png';
    destination.appendChild(newTomato);
    tomatoRandomPosition(newTomato);
}

function tomatoRandomPosition(tomatoAdded){
    var top = Math.floor((Math.random() * window.innerHeight)-100)+"px";
    var left = Math.floor((Math.random() * window.innerWidth)-100)+"px";
    console.log(top + ' ' + left);
    var tomatoStyle = tomatoAdded.style;
    tomatoStyle.position = 'absolute';
    tomatoStyle.top = top;
    tomatoStyle.left = left;
    tomatoStyle.height = Math.floor((Math.random() * 250) + 20)+"px";;
    tomatoStyle.zIndex = -1;
    
}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }

