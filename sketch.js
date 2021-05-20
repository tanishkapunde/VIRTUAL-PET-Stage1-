//Create variables here
var dog,dogImg
var happyDog,happyDogImg;
var database;
var foodS;
var foodStock;
function preload(){
  //load images here
  dogImg = loadImage("dogImg.png");
  happyDogImg = loadImage("dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite(200,200,50,50);
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  foodStock.set(20);

  dog = createSprite(250,350,10,50);
  dog.addImage(dogImg);
  dog.scale = 0.2; 
}


function draw() {  
 backgrund(46,139,87);
 if(foodS!== undefined){
   textSize(20);
   fill(250);
   text("Note: Press UP ARROW to feed DRAGO milk",50,50);
   text("Food Remaining:"+foodS,150,150);
 }
 if (KeyWentDown(UP_ARROW)){
   writeStock(foodS);
   dog.addImage(happyDogImgS);
 }

 if(foodS === 0){
   foodS = 20; 
 }
  drawSprites();
  //add styles here

}

function writeStock(x){

  if(x<=0){
    x = 0;
  }
  else{
    x = x-1;
  }

  database.ref('/').update({
    Food:x
  })
}

function readStock(data){
  foodS = data.val();
}



