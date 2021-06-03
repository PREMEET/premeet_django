// //Webgazer p5 Link
// //CLICK while looking at the cursor to launch sketch and begin training! 

// var myX; 
// var myY; 

// webgazer.setRegression('ridge').setTracker('clmtrackr').showPredictionPoints(true).setGazeListener(function(data, elapsedTime) {
//     if (data == null) {
//         return;
//     }
//     myX = data.x; //these x coordinates are relative to the viewport
//     myY = data.y; //these y coordinates are relative to the viewport
// }).begin();



// function setup() {
//     createCanvas(window.innerWidth, window.innerHeight);
//     background(234);
// }

// function draw() {
// 	background(234);
//     ellipse(myX, myY, 40, 40); 
// }

const ques_alert = document.getElementById('ques_alert');
const ques_x = document.getElementById('ques_x');
const ques_y = document.getElementById('ques_y');


const LOOK_DELAY = 1000;

let lookDirection = null;

function startGazing() {
    const TOP_CUTOFF = window.innerHeight / 4;
    const BOTTOM_CUTOFF = (window.innerHeight / 4) * 3;
    const LEFT_CUTOFF = window.innerWidth / 4;
    const RIGHT_CUTOFF = (window.innerWidth / 4) * 3;
    webgazer.setRegression('ridge').setTracker('clmtrackr').setGazeListener((data, timestamp) => {
        if (data === null ) {
            /*처음 클릭 안하면 data가 NULL이기 때문에 좋료방지*/
            return;
        }
        ques_x.innerHTML = data.x.toFixed(3);
        ques_y.innerHTML = data.y.toFixed(3);
        if (data.x < LEFT_CUTOFF && lookDirection !== "LEFT"){
            startLookTime = timestamp;
            lookDirection = 'LEFT';
        } else if (data.x > RIGHT_CUTOFF && lookDirection !== "RIGHT"){
            startLookTime = timestamp;
            lookDirection = 'RIGHT';
        } else if (data.y < TOP_CUTOFF && lookDirection !== "TOP"){
            startLookTime = timestamp;
            lookDirection = 'TOP';
        } else if (data.y > BOTTOM_CUTOFF && lookDirection !== "BOTTOM"){
            startLookTime = timestamp;
            lookDirection = 'BOTTOM';
        }
        else if (data.x > LEFT_CUTOFF && data.x < RIGHT_CUTOFF && data.y > TOP_CUTOFF && data.x < BOTTOM_CUTOFF){
            startLookTime = Number.POSITIVE_INFINITY;
            lookDirection = null;
        }
    
        if (timestamp - startLookTime > LOOK_DELAY) {
            switch (lookDirection){
                case "LEFT":
                    ques_alert.innerHTML=lookDirection;
                    break;
                case "RIGHT":
                    ques_alert.innerHTML=lookDirection;
                    break;
                case "TOP":
                    ques_alert.innerHTML=lookDirection;
                    break;
                case "BOTTOM":
                    ques_alert.innerHTML=lookDirection;
                    break;
            }
        }
        else
            ques_alert.innerHTML= "";
    }).begin();
    // webgazer.showVideoPreview(false).showPredictionPoints(false);
}