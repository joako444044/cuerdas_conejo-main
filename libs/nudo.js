class Nudo{
    constructor(BodyA,BodyB){
       var lastSegment = BodyA.body.bodies.length - 2;
       this.nudo = Constraint.create({
        bodyA: BodyA.body.bodies[lastSegment],
        pointA: { x: 0, y: 0 },
        bodyB: BodyB.body,
        pointB: { x: 0, y: 0 },
        length: 30,
        stiffness: 0.8
       });
       World.add(world,this.nudo);
    }

   untie(){
    World.remove(world,this.nudo);
   }
}