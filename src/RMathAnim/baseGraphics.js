/**
 * A container class to store the CanvasRenderingContext2D and the HTMLCanvasElement to be referred by other animatables
 */
class RGlobal {
    static cxt = null;
    static sc = null;

    /**
     * Sets the canvas rendering context for RGlobal
     * @param {CanvasRenderingContext2D} cxt The CanvasRenderingContext2D to set to RGlobal.cxt
     */
    static setContext(cxt) {
        if (!(cxt instanceof CanvasRenderingContext2D)) {
            throw new Error("[RGlobal Error] Bad canvas context: " + cxt);
        }

        RGlobal.cxt = cxt;
    }

    /**
     * Sets the HTMLCanvasElement for RGlobal
     * @param {HTMLCanvasElement} sc The HTMLCanvasElement to set to RGlobal.sc
     */
    static setCanvas(sc) {
        if (!(sccxt instanceof HTMLCanvasElement)) {
            throw new Error("[RGlobal Error] Bad canvas: " + sc);
        }

        RGlobal.sc = sc;
    }
}

/**
 * Base animation controls class
 */
class RAnimation {
    /**
     * Creates an animation class, must be extended by other animatables to be used properly
     * @param {Function} [interpolerationFn=(x) => x] A bounded function on [0, 1] over which the animation will be mapped
     * @param {number} [steps=100] The number of steps for which the animation will be run
     */
    constructor(interpolerationFn = (x) => x, steps = 100) {
        this.interpolerationFn = interpolerationFn;
        this.ti = 1 / steps;
        this.t = 0;
        this.t_prime = 0;
    }

    /**
     * Updates the this.t_prime value with the properly mapped t value for animation
     * @returns true if the animation is over (used for optimisation)
     * @returns false if the animation is NOT over yet
     */
    update() {
        if (this.t > 1) {
            return true;
        }

        this.t_prime = this.interpolerationFn(this.t += this.ti);
        return false;
    }
}