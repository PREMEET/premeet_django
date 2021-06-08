const ques_alert = document.getElementById('ques_alert');
const ques_x = document.getElementById('ques_x');
const ques_y = document.getElementById('ques_y');
const next_ques2 = document.getElementById('next2');
const webcam_click = window.parent.document.getElementById('webcam-click');
const LOOK_DELAY = 300;
let lookDirection = null;
let gaze_left = 0;
let gaze_right = 0;
let gaze_center = 0;
let gaze_bottom = 0;
let gaze_top = 0;
let face_positive = 0;
let face_neutral = 0;

// labelContainer = window.frames[0].document.getElementById("label-container");
// labelContainer.appendChild(document.createElement("div"));
// labelContainer.appendChild(document.createElement("div"));

function startGazing() {
    const TOP_CUTOFF = window.innerHeight / 4;
    const BOTTOM_CUTOFF = (window.innerHeight / 4) * 3;
    const LEFT_CUTOFF = window.innerWidth / 4;
    const RIGHT_CUTOFF = (window.innerWidth / 4) * 3;

    webgazer.setRegression('ridge').setTracker('clmtrackr').setGazeListener((data, timestamp) => {
        webcam_click.click();
        if (data === null) {
            /*처음 클릭 안하면 data가 NULL이기 때문에 좋료방지*/
            return;
        }
        ques_x.innerHTML = data.x.toFixed(3);
        ques_y.innerHTML = data.y.toFixed(3);
        if (data.x < LEFT_CUTOFF && lookDirection !== "LEFT") {
            startLookTime = timestamp;
            lookDirection = 'LEFT';
            gaze_left++;
        } else if (data.x > RIGHT_CUTOFF && lookDirection !== "RIGHT") {
            startLookTime = timestamp;
            lookDirection = 'RIGHT';
            gaze_right++;
        } else if (data.y < TOP_CUTOFF && lookDirection !== "TOP") {
            startLookTime = timestamp;
            lookDirection = 'TOP';
            gaze_top++;
        } else if (data.y > BOTTOM_CUTOFF && lookDirection !== "BOTTOM") {
            startLookTime = timestamp;
            lookDirection = 'BOTTOM';
            gaze_bottom++;
        } else if (data.x > LEFT_CUTOFF && data.x < RIGHT_CUTOFF && data.y > TOP_CUTOFF && data.x < BOTTOM_CUTOFF) {
            startLookTime = Number.POSITIVE_INFINITY;
            gaze_center++;
            lookDirection = null;
        }

        if (timestamp - startLookTime > LOOK_DELAY) {
            switch (lookDirection) {
                case "LEFT":
                    ques_alert.innerHTML = lookDirection;
                    break;
                case "RIGHT":
                    ques_alert.innerHTML = lookDirection;
                    break;
                case "TOP":
                    ques_alert.innerHTML = lookDirection;
                    break;
                case "BOTTOM":
                    ques_alert.innerHTML = lookDirection;
                    break;
            }
        } else
            ques_alert.innerHTML = "";
    }).begin();
    
    webgazer.showPredictionPoints(false);
}



let mediaRecorder;
let recordedBlobs;
let flag = 1;

function handleDataAvailable(event) {
    console.log('handleDataAvailable', event);
    if (event.data && event.data.size > 0) {
      recordedBlobs.push(event.data);
    }
}
function startRecording() {
    webgazer.showPredictionPoints(true);
    recordedBlobs = [];
    let options = {
        mimeType: 'video/webm;codecs=vp9,opus'
    };
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        console.error(`${options.mimeType} is not supported`);
        options = {
            mimeType: 'video/webm;codecs=vp8,opus'
        };
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
            console.error(`${options.mimeType} is not supported`);
            options = {
                mimeType: 'video/webm'
            };
            if (!MediaRecorder.isTypeSupported(options.mimeType)) {
                console.error(`${options.mimeType} is not supported`);
                options = {
                    mimeType: ''
                };
            }
        }
    }

    try {
        mediaRecorder = new MediaRecorder(window.parent.stream, options);
    } catch (e) {
        console.error('Exception while creating MediaRecorder:', e);
        errorMsgElement.innerHTML = `Exception while creating MediaRecorder: ${JSON.stringify(e)}`;
        return;
    }

    console.log('Created MediaRecorder', mediaRecorder, 'with options', options);
    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.start();
    console.log('MediaRecorder started', mediaRecorder);
}

function stopRecording() {
    mediaRecorder.stop();
    webgazer.showPredictionPoints(false);
}

function downloadRecord(id) {
    const blob = new Blob(recordedBlobs, {
        type: 'video/webm'
    });
    const url = window.URL.createObjectURL(blob);
    uploadToServer(blob,id,url);
    setTimeout(() => {
        window.URL.revokeObjectURL(url);
    }, 100);
}

function uploadToServer(blob,id,url) {
    console.log()
    let face_positive = document.getElementById('face_positive');
    let face_neutral = document.getElementById('face_neutral');
    let fd = new FormData(window.parent.document.getElementById("form"));
    fd.append('file', blob);
    fd.append('face_positive', face_positive.innerText);
    fd.append('face_neutral', face_neutral.innerText);
    fd.append('gaze_top', gaze_top);
    fd.append('gaze_bottom', gaze_bottom);
    fd.append('gaze_left', gaze_left);
    fd.append('gaze_right', gaze_right);
    fd.append('gaze_center', gaze_center);
    console.log(gaze_top);
    console.log(blob);
    $.ajax({
        url: "/next_question/"+id,
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
        success : function (response) {
            console.log(response);
            next_ques2.click();
            gaze_top = 0;
            gaze_bottom = 0;
            gaze_left = 0;
            gaze_right = 0;
            gaze_center = 0;
            face_neutral.innerText="0";
            face_positive.innerText="0";
        },
        error: function (jqXHR, textStaut, errorMesssage) {
            alert('Error' + JSON.stringify(errorMesssage));
        }
    });
}


/*toggle*/
class Togglebutton{
	constructor(container, itemCN, innerCN, className){
		this.container = container;
		this.itemCN = itemCN;
        this.innerCN = innerCN;
		this.items = container.querySelectorAll('.'+itemCN);
		this.className = className;
		container.addEventListener('click',this.toggle.bind(this));
	}
	toggle(event){
        let realTarget = event.target;
		let targetCL = realTarget.classList;
		if(!targetCL.contains(this.itemCN)){
            if(targetCL.contains(this.innerCN))
                realTarget = event.target.parentElement;
            else
                return;
        }
        targetCL = realTarget.classList;
        targetCL.toggle(this.className);
        if(!targetCL.contains(this.className)){
            webgazer.showVideoPreview(false).showPredictionPoints(false);
        }
        else{
            webgazer.showVideoPreview(true).showPredictionPoints(true);
        }
		
	}
}

