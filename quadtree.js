class Point {
    constructor (x, y, userData ){
    this .x = x;
    this .y = y;
    this . userData = userData ;
    }
}
class Rectangle {
    constructor(x, y, w, h) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
    }
  
    get left() {
      return this.x - this.w / 2;
    }
  
    get right() {
      return this.x + this.w / 2;
    }
  
    get top() {
      return this.y - this.h / 2;
    }
  
    get bottom() {
      return this.y + this.h / 2;
    }
  
    contains(point) {
      return (point.x >= this.x - this.w &&
        point.x <= this.x + this.w &&
        point.y >= this.y - this.h &&
        point.y <= this.y + this.h);
    }
  
  
    intersects(range) {
      return !(range.x - range.w > this.x + this.w ||
        range.x + range.w < this.x - this.w ||
        range.y - range.h > this.y + this.h ||
        range.y + range.h < this.y - this.h);
    }
  }

class QuadTree {
    constructor ( boundary , capacity){
        this . boundary = boundary ; // Rectangle
        this . capacity = capacity; // capacidad maxima de cada cuadrante
        this . points = []; // vector , almacena los puntos a almacenar
        this . divided = false ;
        this.child = [];
    }
    // divide el quadtree en 4 quadtrees
    subdivide() {
        let x = this.boundary.x;
        let y = this.boundary.y;
        let w = this.boundary.w / 2;
        let h = this.boundary.h / 2;
    
        let ne = new Rectangle(x + w, y - h, w, h);
        this.northeast = new QuadTree(ne, this.capacity);
        let nw = new Rectangle(x - w, y - h, w, h);
        this.northwest = new QuadTree(nw, this.capacity);
        let se = new Rectangle(x + w, y + h, w, h);
        this.southeast = new QuadTree(se, this.capacity);
        let sw = new Rectangle(x - w, y + h, w, h);
        this.southwest = new QuadTree(sw, this.capacity);
    
        this.divided = true;
      }
      insert(point) {
        if (!this.boundary.contains(point)) {
          return ;
        }
    
        if (this.points.length < this.capacity) {
          this.points.push(point);
          return true;
        }else{
          if (!this.divided) {
            this.subdivide();
          }
          this.northeast.insert(point);
          this.northwest.insert(point);
          this.southeast.insert(point);
          this.southwest.insert(point);
        }
        return (this.northeast.insert(point) || this.northwest.insert(point) ||
          this.southeast.insert(point) || this.southwest.insert(point));
      }
    show () {
        stroke (255) ;
        strokeWeight (1) ;
        noFill () ;
        rectMode ( CENTER );
        rect( this . boundary .x, this . boundary .y, this . boundary .w*2 , this . boundary .h *2) ;
        if( this . divided ){
          this . northeast . show () ;
          this . northwest . show () ;
          this . southeast . show () ;
          this . southwest . show () ;
        }
        for (let p of this . points ){
          strokeWeight (4) ;
          point (p.x, p.y);
        }
    }
}
