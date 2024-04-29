let resetbutton;

function setup() {
  
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("cover");
  cover

//   load background image
  bg = loadImage('images/yard.jpg');
  
//   load garden images
  img1 = loadImage('images/1.png');
  img2 = loadImage('images/2.png');
  img3 = loadImage('images/3.png');
  img4 = loadImage('images/4.png');
  img5 = loadImage('images/5.png');
  img6 = loadImage('images/6.png');
  img7 = loadImage('images/7.png');
  img8 = loadImage('images/8.png');
  img9 = loadImage('images/9.png');
  possumpic = loadImage('images/10.png');
  imgarray = [img1, img2, img3, img4, img5, img6, img7, img8, img9];


 

//   load leaf image
  leaf = loadImage('images/leaf.png');
}

function draw() {
  background(bg);

  saveButton = createButton("save image");
  saveButton.class("button");
  saveButton.id("save");
//   saveButton.center('horizontal');
//   saveButton.style("font-size", "22px");
  saveButton.mousePressed(saveIMG);

  noLoop();
}

function saveIMG() {
    save("cover.png");
  }

function mouseClicked() {
//   random image position
  x = random(0, windowWidth);
  y = random(100, windowHeight/2);
  
//   random image number and size
  imgnum = int(random(0, 10));  
  // imgnum = 9;
  imgsize = int(random(4,10));
  

//   not possum
  if(imgnum != 9){

    imgfile = imgarray[imgnum];
//     place leaf
    side = int(random(0,2));
//     put on right side
    if (side===0){
      image(leaf, (x+leaf.width/imgsize/1.8), y+random(150,250), leaf.width/imgsize, leaf.height/imgsize);
    }
//     put on left side
    else{
      push();
      scale(-1, 1);
      image(leaf, -(x+leaf.width/imgsize), y+random(150,250), leaf.width/imgsize, leaf.height/imgsize);
      pop();
    }
    
//    place stem
      stroke(0, int(random(50,150)), int(random(30,60)));
      strokeWeight(3);
      linex = x + (imgfile.width / imgsize / 2);
      liney = y + (imgfile.height / imgsize / 2);
      line(linex, windowHeight, linex, liney);
    
//     place image
      image(imgfile, x, y, imgfile.width / imgsize, imgfile.height / imgsize);

  }
  
//   if the possum is there it eats the flowers!
  else{
    print('possum!')
    possumsetup();
    frameRate(1);
  }
  
}


function possumsetup(){
  x_possum = windowWidth;
  clear();
  background(bg);
  y_possum = 3*windowHeight/4;
  movepossum();
  setTimeout(makebutt, 3000);
  
}

function movepossum(){
  if (x_possum > (0 - possumpic.width)) {
    background(bg); 
    push();
    fill(255);
    textAlign(CENTER);
    textSize(60);
    text("The possum has \n trashed your garden!", windowWidth/2, windowHeight/4);
    pop();
    x_possum = possum(x_possum, y_possum);
    setTimeout(movepossum, 1);
  }
}

function possum(x,y){
  x = x-4;
  // frameRate(1);
  
  poss = image(possumpic, x, y, possumpic.width / 2, possumpic.height / 2);
  
  // poss.remove();
  return(x);
  
}

function makebutt(){
  resetbutton = createButton("Plant a new garden");
  resetbutton.class("button");
  resetbutton.position(0, windowHeight/2);
  resetbutton.mousePressed(resetdrawing);
}

function resetdrawing(){
  // clear();
  // background(bg);
  resetbutton.remove();
  clear();
  background(bg);
  resetbutton.remove();
  background(bg);
}
