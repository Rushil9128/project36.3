class Food {

    constructor () {
        this.foodStock = database.ref("Food");
        this.lastFed = database.ref("lastFed");
        this.foodStock = foodStock;
        this.image = loadImage("images/milk.png");
    }

    getFoodStock(){
        database.ref("Food").on("value", function (data){
            foodStock = data.val();
        })
    }

    updateFoodStock(stock){
        database.ref("/").update({
            foodStock:stock
        })
    }

    deductFood(x){
        if(x <= 0){
            x = 0;
        } else {
            x = x - 1;
        }
        database.ref("/").update({Food:x});
    }

    display(){
        var x = 80
        var y = 10;
        
        if(foodStock !== 0){
            for(var i = 0; i < foodStock; i++){
                if(i % 10 === 0){
                    x = 80;
                    y = y + 50;
                }
                image(this.image,x,y,50,50);
                x = x + 30;
            }
        }
    }

    bedroom () {
        background(bedroomImg);
        textSize(32);
        fill(0);
        stroke(0);
        strokeWeight(2);
        textFont("Georgia");
        text("Your pet is sleeping in the bedroom!",400,40);
    }

    washroom () {
        background(washroomImg,550,500);
        textSize(32);
        fill(0);
        stroke(0);
        strokeWeight(2);
        textFont("Georgia");
        text("Your pet is bathing in the washroom!",400,40);
    }

    garden () {
        background(gardenImg,550,500);
        textSize(32);
        fill(0);
        stroke(0);
        strokeWeight(2);
        textFont("Georgia");
        text("Your pet is playing in the garden!",400,40);
    }

}