const ques_alert = document.getElementById('ques_alert');
const ques_x = document.getElementById('ques_x');
const ques_y = document.getElementById('ques_y');
const LOOK_DELAY = 300;
let lookDirection = null;

function startGazing() {
    window.saveDataAcrossSessions = false;
    const TOP_CUTOFF = window.innerHeight / 4;
    const BOTTOM_CUTOFF = (window.innerHeight / 4) * 3;
    const LEFT_CUTOFF = window.innerWidth / 4;
    const RIGHT_CUTOFF = (window.innerWidth / 4) * 3;

    console.log(TOP_CUTOFF, BOTTOM_CUTOFF, LEFT_CUTOFF, RIGHT_CUTOFF);
    webgazer.setRegression('ridge').setTracker('clmtrackr').setGazeListener((data, timestamp) => {
        if (data === null) {
            /*처음 클릭 안하면 data가 NULL이기 때문에 좋료방지*/
            return;
        }
        ques_x.innerHTML = data.x.toFixed(3);
        ques_y.innerHTML = data.y.toFixed(3);
        if (data.x < LEFT_CUTOFF && lookDirection !== "LEFT") {
            startLookTime = timestamp;
            lookDirection = 'LEFT';
        } else if (data.x > RIGHT_CUTOFF && lookDirection !== "RIGHT") {
            startLookTime = timestamp;
            lookDirection = 'RIGHT';
        } else if (data.y < TOP_CUTOFF && lookDirection !== "TOP") {
            startLookTime = timestamp;
            lookDirection = 'TOP';
        } else if (data.y > BOTTOM_CUTOFF && lookDirection !== "BOTTOM") {
            startLookTime = timestamp;
            lookDirection = 'BOTTOM';
        } else if (data.x > LEFT_CUTOFF && data.x < RIGHT_CUTOFF && data.y > TOP_CUTOFF && data.x < BOTTOM_CUTOFF) {
            startLookTime = Number.POSITIVE_INFINITY;
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
}



let mediaRecorder;
let recordedBlobs;

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
    uploadToServer(blob,id);
    setTimeout(() => {
        window.URL.revokeObjectURL(url);
    }, 100);
}

function uploadToServer(blob,id) {
    let fd = new FormData(window.parent.document.getElementById("form"));
    fd.append('file', blob);
    fd.append('text', "hi");
    console.log(blob);
    $.ajax({
        url: "/next_question/"+id,
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
        error: function (jqXHR, textStaut, errorMesssage) {
            alert('Error' + JSON.stringify(errorMesssage));
        }
    });
}
