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

class AnimatedText extends RAnimation {
    static cxt = null;

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

        this.backColorFinalStr = `${this.options.backColorFinal.x}, ${this.options.backColorFinal.y}, ${this.options.backColorFinal.z}`;
    }

    static setContext(cxt) {
        if (!(cxt instanceof CanvasRenderingContext2D)) {
            throw new Error("[Animated Text Error] Bad canvas rendering context: " + cxt);
        }

        AnimatedText.cxt = cxt;
    }

    update() {
        AnimatedText.cxt.beginPath();
        
        if(super.update()) {
            AnimatedText.cxt.fillStyle = this.backColorFinalStr;
            AnimatedText.cxt.strokeStyle = this.options.lineColor;
            AnimatedText.cxt.strokeText(this.content, this.x, this.y, this.maxWidth);
            AnimatedText.cxt.fillText(this.content, this.x, this.y, this.maxWidth);
            return;
        }
        
        const fillColor = this.options.backColorInit.mul(new vec3(1 - this.t_prime)).add(this.options.backColorFinal.mul(new vec3(this.t_prime)));
        AnimatedText.cxt.fillStyle = `rgb(${fillColor.x}, ${fillColor.y}, ${fillColor.z})`;
        AnimatedText.cxt.strokeStyle = this.options.lineColor;
        AnimatedText.cxt.font = `${this.options.fontSize}px CMU Serif`;

        AnimatedText.cxt.setLineDash([this.t_prime * this.options.dashLineMax, this.options.dashLineMax]);
        AnimatedText.cxt.strokeText(this.content, this.x, this.y, this.maxWidth);
        AnimatedText.cxt.fillText(this.content, this.x, this.y, this.maxWidth);
    }
}