/**
 * Animated polygon rendering class
 */
class RAPoly extends RAnimation {
    /**
     * Creates an RAPoly object to render animated polygons to screen
     * @param {Array} points An array of x, y coordinates placed side by side for the polygon, eg = [x0, y0, x1, y1, x2, y2, ..., xn, yn]
     * @param {Object} options Options to control the looks of the polygon {lineColor: string, backColor: vec3, maxAlpha: number(0 - 1)}
     */
    constructor(points, options = {}) {
        super();
        this.points = points;

        let totalStroke = 0;
        let i = 0
        for (; i < this.points.length - 2; i += 2) {
            totalStroke += ((this.points[i + 2] - this.points[i]) ** 2 + (this.points[i + 3] - this.points[i + 1]) ** 2) ** 0.5;
        }

        totalStroke += ((this.points[0] - this.points[i]) ** 2 + (this.points[1] - this.points[i + 1]) ** 2) ** 0.5;        

        this.options = Object.assign({
            lineColor: 'rgb(255, 0, 128)',
            backColor: new vec3(115, 0, 255),
            maxAlpha: 0.25,
            totalStroke
        }, options);

        this.options.computedBackColor = `rgba(${this.options.backColor.x}, ${this.options.backColor.y}, ${this.options.backColor.z}, ${this.options.maxAlpha})`;
    }

    /**
     * Renders the polygon to the screen
     */
    update() {
        RGlobal.cxt.beginPath();
        if(!super.update()) {
            RGlobal.cxt.setLineDash([this.t_prime * this.options.totalStroke , this.options.totalStroke]);
            RGlobal.cxt.fillStyle = this.options.computedBackColor;
        }
        else {
            RGlobal.cxt.fillStyle = `rgba(${this.options.backColor.x}, ${this.options.backColor.y}, ${this.options.backColor.z}, ${this.t_prime * this.options.maxAlpha})`;
        }

        RGlobal.cxt.strokeStyle = this.options.lineColor;

        RGlobal.cxt.moveTo(this.points[0], this.points[1]);
        
        for (let i = 2; i < this.points.length; i += 2) {
            RGlobal.cxt.lineTo(this.points[i], this.points[i + 1]);
        }
        
        RGlobal.cxt.lineTo(this.points[0], this.points[1]);

        RGlobal.cxt.stroke();
        RGlobal.cxt.fill();

        RGlobal.cxt.setLineDash([]); // reset line dash
    }
}