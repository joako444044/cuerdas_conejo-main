class Fruit{
    constructor(x, y, width, height){
       var options = {
           restitution:0.5
        };
        this.body = Bodies.rectangle(x, y, width, height, options);
        this.w = width;
        this.h = height;
        World.add(world, this.body);
        this.apple_img = loadImage("./assets/melon.png");
    }

    show(){
        var pos = this.body.position;
        push();
        strokeWeight(1);
    fill("black");
    imageMode(CENTER);
    image(this.apple_img, pos.x, pos.y, this.w, this.h);
        pop();
    }
}