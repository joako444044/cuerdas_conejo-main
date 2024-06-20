const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;
const Composite = Matter.Composite;
const Composites = Matter.Composites;
let engine;
let world;
var rope;
var group;
var fruit;
var active = false;
function preload() {
background_img = loadImage("./assets/background.png");
eat_animation = loadAnimation("./assets/eat_0.png","./assets/eat_1.png","./assets/eat_2.png","./assets/eat_3.png","./assets/eat_4.png");
blink_animation = loadAnimation("./assets/blink_1.png","./assets/blink_2.png","./assets/blink_3.png");
sad_animation = loadAnimation("./assets/sad_1.png","./assets/sad_1.png");

sonud_air = loadSound("./assets/sound_air.wav")
sound_back = loadSound("./assets/sound_background.mp3")
sound_eating = loadSound("./assets/sound_eating.mp3");
sound_sad = loadSound("./assets/sound_sad.wav");
sound_cut = loadSound("./assets/rope_cut.mp3");
}
function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    frameRate(80);
    engine = Engine.create();
    world = engine.world;
    ground = new Ground(width / 2,height - 20, width,20);
    if (/Android|iPad|iPhone/i.test(navigator.userAgent)){
    rope = new Rope(5,{x:width / 2, y:25});
    }else{
        rope = new Rope(7,{x:width / 2, y:25});
    }
    fruit = new Fruit(width/2 + 5, 30, 70, 70);

    Matter.Composite.add(rope,fruit);
    
    join = new Nudo(rope, fruit);
    bunny = createSprite(width / 2, height * 0.85);
    bunny.scale = 0.2
    bunny.addAnimation("blinking", blink_animation);
    bunny.addAnimation("eating", eat_animation);
    bunny.addAnimation("sad", sad_animation);
    btn_cut = createImg("./assets/cut_button.png");
    btn_cut.position(width / 2 - 20, 15);
    btn_cut.size(50,50);
    btn_cut.mouseClicked(cut);

    btn_blow = createImg("./assets/balloon.png");
    btn_blow.position(width / 2 - 75, 15);
    btn_blow.size(50,50);
    btn_blow.mouseClicked(blow);

    btn_silence = createImg("./assets/sound.png");
    btn_silence.position(50, 10);
    btn_silence.size(50,50);
    btn_silence.mouseClicked(swich);
    
    bunny.animation.frameDelay = 10;
}


function draw() {
    image(background_img, 0, 0,width,height);
    ground.show();
    rope.show();
    if (fruit){
    fruit.show();
    }
    Engine.update(engine);
    drawSprites();
    if (fruit && fruit.body.position.y > height - 35){
        bunny.changeAnimation("sad");
        World.remove(world,fruit.body);
        fruit = null;
        if (active){
            sound_sad.play();
        }
    }
    if (fruit && collition_with_bunny(fruit.body,bunny)){
        
        bunny.changeAnimation("eating");
        World.remove(world,fruit.body);
        fruit = null;
        bunny.animation.looping = false;
        if (active){
            sound_eating.play();
        }
    }
}

function cut(){
    rope.break();
    join.untie();
    if (active){
        sound_cut.play()
    }
}
function collition_with_bunny(fruit, bunny){
    distance = dist(fruit.position.x,fruit.position.y,bunny.position.x,bunny.position.y);
    if (distance <= 60){
        return true;
    }else{
        return false;
    }

}

function blow(){
    Body.applyForce(fruit.body, {x: fruit.body.position.x, y: fruit.body.position.y}, {x: 0.3 , y:0.1})
    if (active){
        sonud_air.play()
    }
}

function swich(){
    if (sound_back.isPlaying()){
      btn_silence.attribute("src","./assets/sound.png");
      sound_back.stop();
      active = false;
    }else{
        btn_silence.attribute("src","./assets/mute.png");
        sound_back.play();
        sound_back.setVolume(0.3);
        active = true;
    }
}