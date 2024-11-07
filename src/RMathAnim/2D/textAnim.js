/**
 * Animates a text onto the canvas
 */
class RAText extends RAnimation {
    /**
     * Creates an animated string RAText object
     * @param {string} content The string to render to the screen to animate
     * @param {number} x The x coordinate of the string
     * @param {number} y The y coordinate of the string
     * @param {number} [maxWidth=undefined] The max width of the string to be rendered, as per CanvasContext2D.strokeText requirements
     * @param {Object} [options={}] Options to configure the rendered string {backColorInit:vec3, backColorFinal:vec3, lineColor:string, maxLineDash:number, fontSize:number}
     */
    constructor(content, x, y, maxWidth = undefined, options = {}) {
        super();
        this.content = content;
        this.x = x;
        this.y = y;
        this.maxWidth = maxWidth;
        this.options = Object.assign({
            backColorInit: new vec3(0, 0, 0),
            backColorFinal: new vec3(255, 255, 255),
            lineColor: 'rgb(255, 255, 255)',
            maxLineDash: 100,
            fontSize: 50
        }, options);

        this.backColorFinalStr = `rgb(${this.options.backColorFinal.x}, ${this.options.backColorFinal.y}, ${this.options.backColorFinal.z})`;
    }
    
    /**
     * Renders the animated string
     */
    update() {        
        RGlobal.cxt.beginPath();
        
        if(super.update()) {            
            RGlobal.cxt.font = `${this.options.fontSize}px CMU Serif`;
            RGlobal.cxt.fillStyle = this.backColorFinalStr;            
            RGlobal.cxt.strokeStyle = this.options.lineColor;
            RGlobal.cxt.strokeText(this.content, this.x, this.y, this.maxWidth);
            RGlobal.cxt.fillText(this.content, this.x, this.y, this.maxWidth);
            return;
        }
        
        const fillColor = this.options.backColorInit.mul(new vec3(1 - this.t_prime)).add(this.options.backColorFinal.mul(new vec3(this.t_prime)));
        RGlobal.cxt.fillStyle = `rgb(${fillColor.x}, ${fillColor.y}, ${fillColor.z})`;
        RGlobal.cxt.strokeStyle = this.options.lineColor;
        RGlobal.cxt.font = `${this.options.fontSize}px CMU Serif`;

        RGlobal.cxt.setLineDash([this.t_prime * this.options.maxLineDash, this.options.maxLineDash]);
        RGlobal.cxt.strokeText(this.content, this.x, this.y, this.maxWidth);
        RGlobal.cxt.fillText(this.content, this.x, this.y, this.maxWidth);

        RGlobal.cxt.setLineDash([]); // reset line dash after call
    }
}