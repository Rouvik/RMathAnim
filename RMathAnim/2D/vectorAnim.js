/**
 * Basic static non animated vector used to draw vectors to screen
 */
class RVector {
    /**
     * Create a RVector
     * @param {vec3} start The starting position vector to the vector
     * @param {vec3} end The ending position vector to the vector
     * @param {Object} [options={}] Options {color: vec3, arrowSize: number} used to descrive the vector
     */
    constructor(start, end, options = {}) {
        this.start = start;
        this.end = end;
        this.tip = end;

        this.vec = end.sub(start);
        this.dir = this.vec.norm();

        this.options = Object.assign({
            color: 'rgb(255, 0, 0)',
            arrowSize: 15
        }, options);

        this.leftArrowDir = new vec2((-0.866 * this.dir.x - 0.5 * this.dir.y) * this.options.arrowSize, (0.5 * this.dir.x - 0.866 * this.dir.y) * this.options.arrowSize);
        this.rightArrowDir = new vec2((-0.866 * this.dir.x + 0.5 * this.dir.y) * this.options.arrowSize, (-0.5 * this.dir.x - 0.866 * this.dir.y) * this.options.arrowSize);
    }

    /**
     * Draws the vector to the screen
     */
    update() {
        RGlobal.cxt.beginPath();
        RGlobal.cxt.strokeStyle = this.options.color;
        RGlobal.cxt.fillStyle = this.options.color;

        RGlobal.cxt.moveTo(this.start.x, this.start.y);
        RGlobal.cxt.lineTo(this.tip.x, this.tip.y);
        RGlobal.cxt.stroke();

        RGlobal.cxt.moveTo(this.tip.x, this.tip.y);
        RGlobal.cxt.lineTo(this.tip.x + this.leftArrowDir.x, this.tip.y + this.leftArrowDir.y);
        RGlobal.cxt.lineTo(this.tip.x + this.rightArrowDir.x, this.tip.y + this.rightArrowDir.y);
        RGlobal.cxt.fill();
    }
}

/**
 * Animated vector, extends the RAnimation class and uses combination this.RVector to implement RVector in it
 */
class RAVector extends RAnimation {
    /**
     * Creates an animated RVector
     * <p style="background: gold; border: 3px solid goldenrod; border-radius: 5px; padding: 5px;"><b>Note:</b> this.RVector is used to compose RVector class, all vector properties must be accessed from "this.RVector"</p>
     * @param {vec3} start The starting position vector to the vector
     * @param {vec3} end The ending position vector to the vector
     * @param {Object} [options={}] Options {color: vec3, arrowSize: number} used to descrive the vector
     */
    constructor(start, end, options = {}) {
        super();
        this.RVector = new RVector(start, end, options);
    }

    /**
     * Calls update of RAnimation to update the this.t_prime value, updates this.RVector.tip and then calls
     * this.RVector.update() to render the newly animated vector
     */
    update() {
        if (!super.update()) {
            this.RVector.tip = this.RVector.start.add(this.RVector.vec.mul(new vec2(this.t_prime)));
        }

        this.RVector.update();
    }
}

/**
 * Animated vector with changing hue
 */
class RAHueVector extends RAVector {
    /**
     * Creates a animated vector by extending RAVector
     * @param {vec3} start The starting position vector to the vector
     * @param {vec3} end The ending position vector to the vector
     * @param {Object} [options={}] Options {color: vec3, arrowSize: number} used to descrive the vector
     */
    constructor(start, end, options = {}) {
        super(start, end, Object.assign({
            maxHueAngle: Math.PI
        }, options));
        this.baseColor = RColorStrToVec(this.RVector.options.color);
        this.mag = this.RVector.vec.mag();
    }

    /**
     * Calls the RHueRotate() function to generate the rotated color and then draws the vector
     */
    update() {
        const colorVec = RHueRotate(this.baseColor, this.t_prime * this.RVector.options.maxHueAngle);
        this.RVector.options.color = `rgb(${colorVec.x}, ${colorVec.y}, ${colorVec.z})`;
        super.update();
    }
}