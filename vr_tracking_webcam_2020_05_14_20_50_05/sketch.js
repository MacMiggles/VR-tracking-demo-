let capture;
let poseNet;
let pose;
let video;
let label = "waiting...";
let classifier;
let modelURL = './tensorflow/';


function preload() {
  classifier = ml5.imageClassifier(modelURL + 'model.json');
}

function setup() {
  createCanvas(640, 520);
  // Create the video
  video = createCapture(VIDEO);
  video.hide();
  capture = createCapture(VIDEO);
  capture.hide();
  poseNet = ml5.poseNet(capture);
  poseNet.on("pose", gotPoses);

  classifyVideo();
}


function classifyVideo() {
  classifier.classify(video, gotResults);
}

function gotPoses(poses) {
  //console.log(pose);
  if (poses.length > 0) {
    pose = poses[0].pose;
  }
}

function draw() {
  background(0);

  // Draw the video
  image(video, 0, 0);

  // STEP 4: Draw the label
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  text(label, width / 2, height - 16);


  if(pose){
    fill(16,168,223);
//    ellipse(pose.nose.x, pose.nose.y, 10);
    ellipse(pose.leftElbow.x, pose.leftElbow.y, 10);
    ellipse(pose.rightElbow.x, pose.rightElbow.y, 10);
    ellipse(pose.leftShoulder.x, pose.leftShoulder.y, 10);
    ellipse(pose.rightShoulder.x, pose.rightShoulder.y, 10);
    ellipse(pose.leftWrist.x, pose.leftWrist.y, 10);
    ellipse(pose.rightWrist.x, pose.rightWrist.y, 10);
  }
  
  if(pose){
    let wristL = pose.leftWrist;
    let wristR = pose.rightWrist;
    let shoulderL = pose.leftShoulder;
    let shoulderR = pose.rightShoulder;
    
    let l = dist(wristL.x, wristL.y, shoulderL.x, shoulderL.y);
    let r = dist(wristR.x, wristR.y, shoulderR.x, shoulderR.y);
    
//    fill(l,0,0);
    fill(l, pose.leftWrist.x, pose.leftWrist.y);
    ellipse(pose.leftEye.x, pose.leftEye.y, 10);
//    fill(r,0,0);
    fill(r, pose.rightWrist.x, pose.rightWrist.y);
    ellipse(pose.rightEye.x, pose.rightEye.y, 10);

    
    // print z, x, y
//    console.log(l, wristL.x, wristL.y);
//    console.log(r, wristR.x, wristR.y);
//print label   
//    console.log(label);
    
  }  
}

function gotResults(error, results) {
  // Something went wrong!
  if (error) {
    console.error(error);
    return;
  }

  label = results[0].label;
  classifyVideo();
}
