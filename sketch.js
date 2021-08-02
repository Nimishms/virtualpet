var dog,sadDog,happyDog;
var foodS,addFood,foodStock;
var feed;
var foodObj;
var database;
var lastFed,fedTime;

function preload(){
  sadDog=loadImage("Dog.png");
  happyDog=loadImage("happy dog.png");

}

function setup() {
  database = firebase.database();
  createCanvas(1000,400);
  foodObj = new Food()
  foodStock = database.ref("food")
  foodStock.on("value",readStock);
  feed = createButton("feed the dog")
  feed.position(900,95)
  feed.mousePressed(feedDog)

  addFood = createButton("add food")
  addFood.position(1000,95)
  addFood.mousePressed(addFoods)
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

}

function draw() {
  background(46,139,87);
  foodObj.display();
  fedTime = database.ref("feedTime");
  fedTime.on("value",function(data){
    lastFed = data.val();
  })
  fill(255,255,254)
  textSize(15);
  if(lastFed>=12){
    text("last Fed:"+lastFed%12+"Pm",350,30)
  } 
else if(lastFed === 0){
text("last fed time: 12 Am",350,30)
} else{
  text("last Fed "+lastFed+"AM",350,30)
}
drawSprites();
}
function readStock(data){
  foodS = data.val()
  foodObj.updateFoodStock(foodS)
}

//function to read food Stock
function feedDog() {
dog.addImage(happyDog)
if(foodObj.getFoodStock()<=0) {
  foodObj.updateFoodStock(foodObj.getFoodStock()*0)
}
else {
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
}
database.ref('/').update({
  food:foodObj.getFoodStock(),feedTime:hour()

})


}

//function to update food stock and last fed time

//function to add food in stock
function addFoods(){
  foodS++
  database.ref("/").update({
    food:foodS
  })
}