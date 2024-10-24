class AnimatedVector extends RAnimation {
    static cxt = null;

    constructor(start, end, options = {}) {
        super();

        this.options = Object.assign({
            color: 'rgb(255, 0, 0)',
            arrowSize: 15
        }, options);

        this.start = start;
        this.end = end;
        this.animPosVec = start;

        this.vec = end.sub(start);
        this.dir = this.vec.norm();
        this.leftArrowDir = new vec2((-0.866 * this.dir.x - 0.5 * this.dir.y) * this.options.arrowSize, (0.5 * this.dir.x - 0.866 * this.dir.y) * this.options.arrowSize);
        this.rightArrowDir = new vec2((-0.866 * this.dir.x + 0.5 * this.dir.y) * this.options.arrowSize, (-0.5 * this.dir.x - 0.866 * this.dir.y) * this.options.arrowSize);
    }

    static setContext(cxt) {
        if (!(cxt instanceof CanvasRenderingContext2D)) {
            throw new Error("[Animated Vector Error] Bad canvas rendering context: " + cxt);
        }

        AnimatedVector.cxt = cxt;
    }

    update() {        
        super.update();
        AnimatedVector.cxt.beginPath();
        AnimatedVector.cxt.strokeStyle = this.options.color;
        AnimatedVector.cxt.fillStyle = this.options.color;
        
        this.animPosVec = this.vec.mul(new vec2(this.t_prime));
        
        AnimatedVector.cxt.moveTo(this.start.x, this.start.y);
        AnimatedVector.cxt.lineTo(this.start.x + this.animPosVec.x, this.start.y + this.animPosVec.y);
        AnimatedVector.cxt.stroke();
        
        AnimatedVector.cxt.moveTo(this.start.x + this.animPosVec.x, this.start.y + this.animPosVec.y);
        AnimatedVector.cxt.lineTo(this.start.x + this.animPosVec.x + this.leftArrowDir.x, this.start.y + this.animPosVec.y + this.leftArrowDir.y);
        AnimatedVector.cxt.lineTo(this.start.x + this.animPosVec.x + this.rightArrowDir.x, this.start.y + this.animPosVec.y + this.rightArrowDir.y);
        AnimatedVector.cxt.fill();
    }
}