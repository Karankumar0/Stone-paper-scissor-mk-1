var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["3f2c1710-66f4-4992-b254-4bcf83f30dee","22189942-61be-470b-99c3-1a70a0b951d3","4b5c9392-bf86-4445-b7e1-12130a2993c1","52c68fed-981e-45b1-915c-0e5ad3580a0f","4cf80f60-a7ac-496e-bd83-15cb60c9bafe"],"propsByKey":{"3f2c1710-66f4-4992-b254-4bcf83f30dee":{"sourceSize":{"x":95,"y":95},"frameSize":{"x":95,"y":95},"frameCount":1,"frameDelay":4,"name":"Mystery","sourceUrl":"assets/v3/animations/VE4iHhs79kpKxnKN46nsnf651k9rW13Iik_1zxcIa-g/3f2c1710-66f4-4992-b254-4bcf83f30dee.png","size":3882,"version":"Zmq3xlpIszWZ8CGHewfHKTP4FOKO_xDp","looping":true,"loadedFromSource":true,"saved":true,"rootRelativePath":"assets/v3/animations/VE4iHhs79kpKxnKN46nsnf651k9rW13Iik_1zxcIa-g/3f2c1710-66f4-4992-b254-4bcf83f30dee.png"},"22189942-61be-470b-99c3-1a70a0b951d3":{"sourceSize":{"x":95,"y":95},"frameSize":{"x":95,"y":95},"frameCount":1,"frameDelay":4,"name":"Paper","sourceUrl":"assets/v3/animations/VE4iHhs79kpKxnKN46nsnf651k9rW13Iik_1zxcIa-g/22189942-61be-470b-99c3-1a70a0b951d3.png","size":4501,"version":"jYKyn4aT76aWck6R2F_1bFTrYhJTD00O","looping":true,"loadedFromSource":true,"saved":true,"rootRelativePath":"assets/v3/animations/VE4iHhs79kpKxnKN46nsnf651k9rW13Iik_1zxcIa-g/22189942-61be-470b-99c3-1a70a0b951d3.png"},"4b5c9392-bf86-4445-b7e1-12130a2993c1":{"sourceSize":{"x":512,"y":273},"frameSize":{"x":512,"y":273},"frameCount":1,"frameDelay":4,"name":"Start","sourceUrl":"assets/v3/animations/VE4iHhs79kpKxnKN46nsnf651k9rW13Iik_1zxcIa-g/4b5c9392-bf86-4445-b7e1-12130a2993c1.png","size":6134,"version":"VDp0AB1caKthGHtl5tQJRmPowMG8PgtH","looping":true,"loadedFromSource":true,"saved":true,"rootRelativePath":"assets/v3/animations/VE4iHhs79kpKxnKN46nsnf651k9rW13Iik_1zxcIa-g/4b5c9392-bf86-4445-b7e1-12130a2993c1.png"},"52c68fed-981e-45b1-915c-0e5ad3580a0f":{"sourceSize":{"x":95,"y":95},"frameSize":{"x":95,"y":95},"frameCount":1,"frameDelay":4,"name":"Scissors","sourceUrl":"assets/v3/animations/VE4iHhs79kpKxnKN46nsnf651k9rW13Iik_1zxcIa-g/52c68fed-981e-45b1-915c-0e5ad3580a0f.png","size":5628,"version":"zmA6tsNPzZjVxCfR.2ue1ni_5Th078hw","looping":true,"loadedFromSource":true,"saved":true,"rootRelativePath":"assets/v3/animations/VE4iHhs79kpKxnKN46nsnf651k9rW13Iik_1zxcIa-g/52c68fed-981e-45b1-915c-0e5ad3580a0f.png"},"4cf80f60-a7ac-496e-bd83-15cb60c9bafe":{"sourceSize":{"x":95,"y":95},"frameSize":{"x":95,"y":95},"frameCount":1,"frameDelay":12,"name":"Rock","sourceUrl":null,"size":5631,"version":"YHl7_EYrJuyLsSFQ82CL5zvOWWHVjDDn","looping":true,"loadedFromSource":true,"saved":true,"rootRelativePath":"assets/4cf80f60-a7ac-496e-bd83-15cb60c9bafe.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

//buttons
var chooseRock = createSprite(70,100);
chooseRock.setAnimation("Rock");
var choosePaper = createSprite(200,100);
choosePaper.setAnimation("Paper");
var chooseScissors = createSprite(330,100);
chooseScissors.setAnimation("Scissors");

//chosen item
var chosen = "none";
var chosenItem = createSprite(250, 172.5);
chosenItem.setAnimation("Mystery");
chosenItem.scale = 0.5;

//computer item
var computer = createSprite(80,300);
var choice = 0;
computer.setAnimation("Mystery");

//player item
var player = createSprite(320,300);
player.setAnimation("Mystery");

//start button
var start = createSprite(200,375);
var pressed = false;
start.setAnimation("Start");
start.scale = 0.3;

//winner selected
var winner = "not selected";

function draw() {
  //draw background
  background(200,200,200);
  
  //choosing text
  textSize(30);
  fill("black");
  text("Choose One:", 115,40);
  
  //what you chose
  textSize(25);
  text("You Chose:", 90, 180);
  
  //computer text
  text("Computer:",20,240);
  
  //player text
  text("You:",295,240);
  
  //dividing line
  fill(50,50,50);
  rect(0,200,400,10);
  
  //button function
  if(mousePressedOver(chooseRock)){
    chosen = "Rock";
    chosenItem.setAnimation("Rock");
    chosenItem.scale = 0.5;
  }
  if(mousePressedOver(choosePaper)){
    chosen = "Paper";
    chosenItem.setAnimation("Paper");
    chosenItem.scale = 0.5;
  }
  if(mousePressedOver(chooseScissors)){
    chosen = "Scissors";
    chosenItem.setAnimation("Scissors");
    chosenItem.scale = 0.5;
  }
  
  //start the duel
  if(mousePressedOver(start) && chosen !== "none" && pressed === false){
    player.setAnimation(chosen);
    choice = round(random(1,3));

    if(choice === 1){
      computer.setAnimation("Rock");
    }else if(choice === 2){
      computer.setAnimation("Paper");
    }else if(choice === 3){
      computer.setAnimation("Scissors");
    }
    pressed = true;
    
    if((chosen === "Rock" && choice === 1) || (chosen === "Paper" && choice === 2) || (chosen === "Scissors" && choice === 3)){
      winner = "none";
    }else if((chosen === "Rock" && choice === 2) || (chosen === "Paper" && choice === 3) || (chosen === "Scissors" && choice === 1)){
      winner = "computer";
    }else{
      winner = "player";
    }
    console.log(winner);
  }
  
  if(winner === "none"){
    textSize(50);
    text("Draw", 140,310);
  }else if(winner === "computer"){
    textSize(30);
    text("Computer\n   Wins!", 135,300);
  }else if(winner === "player"){
    textSize(30);
    text("You Win!", 140,310);
  }
  
  //end the press
  if(mouseWentUp()){
    pressed = false;
  }
  //draw sprites
  drawSprites();
}


// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
