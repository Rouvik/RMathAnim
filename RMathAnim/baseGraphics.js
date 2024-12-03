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
        this._steps = steps;
        this.ti = 1 / this._steps;
        this.t = 0;
        this.t_prime = 0;
    }

    /**
     * Update steps when required and also update ti in the process as it depends on steps
     * @param {number} v The steps to set to
     */
    set steps(v) {
        this._steps = v;
        this.ti = 1 / this._steps;
    }

    /**
     * Returns the number of steps the animation requires
     */
    get steps() {
        return this._steps;
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

/**
 * Base Animation compositions class
 */
class RComposition {
    /**
     * Creates a composition to animate animatables in sequencial order and even if required merge animations
     * <div style="background: greenyellow; border: 3px solid green; border-radius: 5px; padding: 5px; overflow-x:auto;">
     * <b style="font-size: 1.3rem;">Composition ruleset:</b><br>
     * <pre>const obj = [
     * {
     *     animFn: tgt.update(),
     *     steps: tgt.steps + skipSteps,
     * },
     * {
     *     animFn: () => {
     *          tgt2.update();
     *          // some code for tgt2 and tgt3
     *          tgt3.update();
     *     },
     *     steps: Math.max(tgt2.steps, tgt3.steps),
     * },
     * {
     *     animFn: tgt4.update(),
     *     steps: 400
     * }];
     * </pre>
     * </div>
     * @param {Object} animRules The object containing the animation ruleset
     */
    constructor(animRules) {
        this.animRules = animRules;
        this.stepsDone = 0;
        this.currentAnimation = 0;

        // reset steps according to animation requirements
        for (let i = 0; i < this.animRules.length; i++) {
            if (!this.animRules[i].steps) {
                throw new Error("[RComposition Error] Bad animation rule set, missing steps");
            }

            this.animRules[i].skip = this.animRules[i].skip | 0;
        }
    }

    /**
     * Calls update on the animatables in sqeuencial order
     */
    update() {
        if (this.currentAnimation > (this.animRules.length - 1)) {
            for (const animation of this.animRules) {
                animation.func();
            }
            return;
        }

        for (let i = 0; i <= this.currentAnimation; i++) {
            this.animRules[i].func();
        }

        if (this.stepsDone++ >= this.animRules[this.currentAnimation].steps) {
            this.currentAnimation++;
            this.stepsDone = 0;
        }
    }
}