var canvas,dog1,dog2,dog,milkImage,foodObj,database,foodStock,lastFed,feedtime,button1,button2,input,save,Name,bedroomImg,washroomImg,gardenImg,nameValue;

function preload () {
    dog1 = loadImage("images/dogImg.png");
    dog2 = loadImage("images/dogImg1.png");
    milkImage = loadImage("images/milk.png");
    bedroomImg = loadImage("images/Bed Room.png");
    washroomImg = loadImage("images/Wash Room.png");
    gardenImg = loadImage("images/Garden.png");
}

function setup () {
    
    canvas = createCanvas(1300,500);
    database = firebase.database();

    //read gameState from database
    readGameState = database.ref("gameState");
    readGameState.on("value",function(data){
      gameState = data.val();
    })

    dog = createSprite(1000,250,10,10);
    dog.addImage(dog1);
    dog.scale = 0.2;
    
    input = createInput("NAME DOG HERE");
    input.position(1150,70);
    
    save = createButton("SAVE NAME");
    save.position(1170,100);

    button2 = createButton("ADD FOOD");
    button2.position(1310,70);
    button2.mousePressed(addFoods);

    foodObj = new Food();
    
}

function draw () {  
  
    background(46,139,87);

    feedtime = database.ref("lastFed");
    feedtime.on("value",function(data){
      lastFed = data.val();
    })

    Name = input.value();
    save.mousePressed(function(){
      database.ref("/").update({Name:Name});
    })
    
    button1 = createButton("FEED " + Name);
    button1.position(1400,70);
    button1.mousePressed(feedDog);

    foodObj.getFoodStock();

    drawSprites();
    
    fill(255);
    textSize(15);

    if(lastFed >= 12){
      text("Last Fed : " + lastFed % 12 + " PM",350,30);
    } else if (lastFed === 0){
      text("Last Fed : NEVER",350,30);
    } else {
      text("Last Fed : " + lastFed + " AM",350,30);
    }

    currentTime = hour();

    if(currentTime === lastFed+1){
      updateGameState("playing");
      foodObj.garden();
    } else if(currentTime === lastFed+2){
      updateGameState("sleeping");
      foodObj.bedroom();
    } else if(currentTime>=lastFed+3 && currentTime <= lastFed+4){
      updateGameState("bathing");
      foodObj.washroom();
    } else {
      updateGameState("hungry");
      foodObj.display();
    }

    if(gameState !== "hungry"){
      button1.hide();
      button2.hide();
      dog.remove();
      input.hide();
      save.hide();
    } else {
      button1.show();
      button2.show();
      input.show();
      save.show();
      dog.addImage(dog1);
    }

}

function addFoods(){

  dog.addImage(dog1);
  foodStock++;
  
  database.ref("/").update({
    Food:foodStock
  })
  
}

function feedDog(){

  dog.addImage(dog2);
  foodObj.deductFood(foodStock);

  database.ref("/").update({
    Food:foodStock,
    lastFed:hour()
  })
  
}

function updateGameState (state) {

  database.ref("/").update({
      gameState:state
  })
  
}
