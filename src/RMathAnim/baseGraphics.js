class RGlobal {
    static cxt = null;
    static sc = null;

    static setContext(cxt) {
        if (!(cxt instanceof CanvasRenderingContext2D)) {
            throw new Error("[RGlobal Error] Bad canvas context: " + cxt);
        }

        RGlobal.cxt = cxt;
    }

    static setCanvas(sc) {
        if (!(sccxt instanceof HTMLCanvasElement)) {
            throw new Error("[RGlobal Error] Bad canvas: " + sc);
        }

        RGlobal.sc = sc;
    }
}

class RAnimation {
    constructor(interpolerationFn = (x) => x, steps = 100) {
        this.interpolerationFn = interpolerationFn;
        this.ti = 1 / steps;
        this.t = 0;
        this.t_prime = 0;
    }

    update() {
        if (this.t > 1) {
            return true;
        }

        this.t_prime = this.interpolerationFn(this.t += this.ti);
        return false;
    }
}

class RAText extends RAnimation {
    constructor(content, x, y, maxWidth, options = {}) {
        super();
        this.content = content;
        this.x = x;
        this.y = y;
        this.maxWidth = maxWidth;
        this.options = Object.assign({
            backColorInit: new vec3(0, 0, 0),
            backColorFinal: new vec3(255, 255, 255),
            lineColor: 'rgb(255, 255, 255)',
            dashLineMax: 100,
            fontSize: 50
        }, options);

        this.backColorFinalStr = `rgb(${this.options.backColorFinal.x}, ${this.options.backColorFinal.y}, ${this.options.backColorFinal.z})`;
    }

    update() {        
        RGlobal.cxt.beginPath();
        
        if(super.update()) {            
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

        RGlobal.cxt.setLineDash([this.t_prime * this.options.dashLineMax, this.options.dashLineMax]);
        RGlobal.cxt.strokeText(this.content, this.x, this.y, this.maxWidth);
        RGlobal.cxt.fillText(this.content, this.x, this.y, this.maxWidth);

        RGlobal.cxt.setLineDash([]); // reset line dash after call
    }
}