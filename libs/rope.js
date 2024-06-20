class Rope{
    constructor(segments, pointA){
        this.segment = segments;
        this.pointA = pointA;
        const group = Body.nextGroup(true);
        const rect = Composites.stack(100,100,this.segment,1,1,1,function (x,y){
            return Bodies.rectangle(x,y,30,5,{collitionFilter:{group:group}});
        });
        this.body = Composites.chain(rect,0.1,0,-0.6,0,{stiffnes:0.1,lenght:0.8,render:{type:"line"}});
        World.add(engine.world,this.body);
        Composite.add(rect, [
            Constraint.create({
            pointA:this.pointA,
            bodyB:rect.bodies[0],
            pointB:{x:-25,y:0},
            length:10,
            stiffnes:0.1

        })]);

    }
    break() {
    
        //Matter.Composite.clear(this.rope,true);
        this.body = null;
      }
    
    show() {
        if (this.body != null) {
            for (let i = 0; i < this.body.bodies.length - 1; i++) {
                this.drawVertices(this.body.bodies[i].vertices);
            }
        }
    }
    drawVertices(vertices) {
        beginShape();
        fill("#FFF717");
        noStroke();
        for (let i = 0; i < vertices.length; i++) {
            vertex(vertices[i].x, vertices[i].y);
        }
        endShape(CLOSE);
    }

}