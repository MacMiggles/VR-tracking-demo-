let capture;
let poseNet;
let pose;


let video;
// For displaying the label
let label = "waiting...";
// The classifier
let classifier;
let modelURL = './tensorflow/';

// STEP 1: Load the model!
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

  // STEP 2: Start classifying
  classifyVideo();
}

// STEP 2 classify the videeo!
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

  // Pick an emoji, the "default" is train
//  let emoji = "🚂";
//  if (label == "Rainbow") {
//    emoji = "🌈";
//  } else if (label == "Unicorn") {
//    emoji = "🦄";
//  } else if (label == "Ukulele") {
//    emoji = "🎸";
//  }

  // Draw the emoji
  textSize(256);
//  text(emoji, width / 2, height / 2);
  
  if(pose){
    fill(16,168,223);
    ellipse(pose.nose.x, pose.nose.y, 10);
    ellipse(pose.leftElbow.x, pose.leftElbow.y, 10);
    ellipse(pose.rightElbow.x, pose.rightElbow.y, 10);
    ellipse(pose.leftShoulder.x, pose.leftShoulder.y, 10);
    ellipse(pose.rightShoulder.x, pose.rightShoulder.y, 10);
    ellipse(pose.leftWrist.x, pose.leftWrist.y, 10);
    ellipse(pose.rightWrist.x, pose.rightWrist.y, 10);
  }
  
 // find the difference betweeen wrist and sholder 
  if(pose){
    let wristL = pose.leftWrist;
    let wristR = pose.rightWrist;
    let shoulderL = pose.leftShoulder;
    let shoulderR = pose.rightShoulder;
    
    let l = dist(wristL.x, wristL.y, shoulderL.x, shoulderL.y);
    let r = dist(wristR.x, wristR.y, shoulderR.x, shoulderR.y);
 
// print z, x, y
    console.log(l, wristL.x, wristL.y);
    console.log(r, wristR.x, wristR.y);
//print label   
    console.log(label);
    
  }  
}

// STEP 3: Get the classification!
function gotResults(error, results) {
  // Something went wrong!
  if (error) {
    console.error(error);
    return;
  }
  // Store the label and classify again!
  label = results[0].label;
  classifyVideo();
}
