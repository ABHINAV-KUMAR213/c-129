leftWristX = 0;
rightWristX = 0;
leftWristY = 0;
rightWristY = 0;
score_leftWrist = 0;
score_rightWrist = 0;
function setup(){
    canvas = createCanvas(600, 500);
    canvas.center;

    video = createCapture(VIDEO) ;
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded(){
    console.log('posenet is innitialized');
}
function draw(){
    image(video, 0, 0, 600, 500);
    fill("lightblue");
    stroke("darkblue");
    if(score_rightWrist > 0.2){
        circle(rightWristX, rightWristY,20);
        if (rightWristY>0 && rightWristY<= 100 ){
            document.getElementById("speed").innerHTML = "Speed is 0.5x";
            song.rate(0.5); 
        }
        if(rightWristY>100 && rightWristY <= 200){
            document.getElementById("speed").innerHTML = "Speed is 1x";
            song.rate(1);
        }
        if(rightWristY>200 && rightWristY <= 300){
            document.getElementById("speed").innerHTML = "Speed is 1.5x";
            song.rate(1.5);
        }
        if(rightWristY>300 && rightWristY <= 400){
            document.getElementById("speed").innerHTML = "Speed is 2x";
            song.rate(2);
        }
        if (rightWristY>400 && rightWristY <= 500){
            document.getElementById("speed").innerHTML = "Speed is 2.5x";
            song.rate(2.5);
        }
    }
    if(score_leftWrist > 0.2){
        circle(leftWristX, leftWristY,20);
        InNumberleftWristY = Number(leftWristY);
        remove_decimals = floor( InNumberleftWristY);
        volume = remove_decimals/500;
        document.getElementById("volume").innerHTML = "Volume = "+ volume;
        song.setVolume(volume); 

    }
}
song = "";
function preload(){
    song = loadSound("music.mp3");
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function gotPoses(results){
    if (results.length < 0){
        console.log(results);
        score_leftWrist = results[0].pose.keypoints[9].score;
        score_rightWrist = results[0].pose.keypoints[10].score;
            leftWristX = results[0].pose.leftWrist.x;
            leftWristY = results[0].pose.leftWrist.y;
            console.log("leftWristX = " + leftWristX + "leftWristY = "+ leftWristY);

            rightWristX = results[0].pose.rightWrist.x;
            rightWristY = results[0].pose.rightWrist.y;
            console.log("rightWristX = "+ rightWrist + "rightWristY" + rightWristY);
    }
}