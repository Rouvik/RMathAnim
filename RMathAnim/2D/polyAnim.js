/**
 * Static polygon rendering class
 */
class RPoly {
    /**
     * Creates an RPoly object to render static polygons to screen
     * @param {Array} points An array of x, y coordinates placed side by side for the polygon, eg = [x0, y0, x1, y1, x2, y2, ..., xn, yn]
     * @param {vec2} [translate=new vec2(0, 0)] The position vector to translate to before drawing the polygon
     * @param {Object} [options={}] Options to control the looks of the polygon {lineColor: string, backColor: vec3, maxAlpha: number(0 - 1)}
     */
    constructor(points, translate = new vec2(0, 0), options = {}) {
        this.points = points;
        this.translate = translate;

        this.options = Object.assign({
            lineColor: 'rgb(255, 0, 128)',
            backColor: new vec3(115, 0, 255),
            maxAlpha: 0.25
        }, options);

        this.options.backColorGenerated = `rgba(${this.options.backColor.x}, ${this.options.backColor.y}, ${this.options.backColor.z}, ${this.options.maxAlpha})`;
    }

    /**
     * Renders the polygon to the screen
     */
    update() {
        RGlobal.cxt.beginPath();
        RGlobal.cxt.strokeStyle = this.options.lineColor;
        RGlobal.cxt.fillStyle = this.options.backColorGenerated;

        RGlobal.cxt.translate(this.translate.x, this.translate.y);
        
        RGlobal.cxt.moveTo(this.points[0], this.points[1]);
        
        for (let i = 2; i < this.points.length; i += 2) {
            RGlobal.cxt.lineTo(this.points[i], this.points[i + 1]);
        }
        
        RGlobal.cxt.lineTo(this.points[0], this.points[1]);
        
        RGlobal.cxt.stroke();
        RGlobal.cxt.fill();

        RGlobal.cxt.translate(-this.translate.x, -this.translate.y);
    }
}


/**
 * Animated polygon rendering class
 */
class RAPoly extends RAnimation {
    /**
     * Creates an RAPoly object to render animated polygons to screen
     * <p style="background: gold; border: 3px solid goldenrod; border-radius: 5px; padding: 5px;"><b>Note:</b> this.RPoly is used to compose the static RPoly components to the RAPoly animation class, all properties to RPoly must be accessed from "this.RPoly"</p>
     * 
     * @param {Array} points An array of x, y coordinates placed side by side for the polygon, eg = [x0, y0, x1, y1, x2, y2, ..., xn, yn]
     * @param {vec2} [translate=new vec2(0, 0)] The position vector to translate to before drawing the polygon
     * @param {Object} [options={}] Options to control the looks of the polygon {lineColor: string, backColor: vec3, maxAlpha: number(0 - 1)}
     */
    constructor(points, translate = new vec2(0, 0), options = {}) {
        super();

        this.RPoly = new RPoly(points, translate, options);
        
        let totalStroke = 0;
        let i = 0
        for (; i < this.RPoly.points.length - 2; i += 2) {
            totalStroke += ((this.RPoly.points[i + 2] - this.RPoly.points[i]) ** 2 + (this.RPoly.points[i + 3] - this.RPoly.points[i + 1]) ** 2) ** 0.5;
        }

        totalStroke += ((this.RPoly.points[0] - this.RPoly.points[i]) ** 2 + (this.RPoly.points[1] - this.RPoly.points[i + 1]) ** 2) ** 0.5;

        this.RPoly.options.totalStroke = totalStroke;
    }
    /**
     * Renders the polygon to the screen
     */
    update() {
        if(!super.update()) {
            this.RPoly.backColorGenerated = `rgba(${this.RPoly.options.backColor.x}, ${this.RPoly.options.backColor.y}, ${this.RPoly.options.backColor.z}, ${this.RPoly.options.maxAlpha * this.t_prime})`;
            RGlobal.cxt.setLineDash([this.t_prime * this.RPoly.options.totalStroke, this.RPoly.options.totalStroke]);
        }

        this.RPoly.update();
        
        RGlobal.cxt.setLineDash([]); // reset line dash after call
    }
}