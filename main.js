objects = [];
video = "";
status = "";


function setup(){
    canvas = createCanvas(380, 280);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
}

function draw(){
    image(video, 0, 0, 480, 380);
    if (status != "") {
        objectDetector.detect(gotResult);
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: object mentioned found";
            document.getElementById("number_of_objects").innerHTML = "Number of Objects detected are : " + objects.length;

            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            console.log(percent);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (inputValue == objects[i].label) {
                video.stop();
                speakdata = "Object detected : " + objects[i];
                speak();
            }
        }
    }
    
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    inputValue = document.getElementById("object_name").value;
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}


function speak(){
    var synth = window.speechSynthesis;
    var utterThis = new SpeechSynthesisUtterance(speakdata);
    synth.speak();
    
}