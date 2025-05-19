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

class RAnimationInterpolation {
    static linear(x) {
        return x;
    }

    static easeInSine(x) {
        return 1 - Math.cos((x * Math.PI) / 2);
    }

    static easeOutSine(x) {
        return Math.sin((x * Math.PI) / 2);
    }

    static easeInOutSine(x) {
        return -(Math.cos(Math.PI * x) - 1) / 2;
    }

    static easeInQuad(x) {
        return x * x;
    }

    static easeOutQuad(x) {
        return 1 - (1 - x) * (1 - x);
    }

    static easeInOutQuad(x) {
        return x < 0.5 ? 2 * x * x : 1 - ((-2 * x + 2) ** 2) / 2;
    }

    static easeInCubic(x) {
        return x * x * x;
    }

    static easeOutCubic(x) {
        return 1 - ((1 - x) ** 3);
    }

    static easeInOutCubic(x) {
        return x < 0.5 ? 4 * x * x * x : 1 - ((-2 * x + 2) ** 3) / 2;
    }

    static easeInQuart(x) {
        return x * x * x * x;
    }

    static easeOutQuart(x) {
        return 1 - ((1 - x) ** 4);
    }

    static easeInOutQuad(x) {
        return x < 0.5 ? 2 * x * x : 1 - ((-2 * x + 2) ** 2) / 2;
    }

    static easeInQuint(x) {
        return x * x * x * x * x;
    }

    static easeOutQuint(x) {
        return 1 - ((1 - x) ** 5);
    }

    static easeInOutQuart(x) {
        return x < 0.5 ? 8 * x * x * x * x : 1 - ((-2 * x + 2) ** 4) / 2;
    }

    static easeInCirc(x) {
        x = Math.round(x * 100) / 100;  // avoid precision issues (x cannot be > 1.0)
        return 1 - (1 - x * x) ** 0.5;
    }
    
    static easeOutCirc(x) {
        return (1 - ((x - 1) ** 2)) ** 0.5;
    }

    static easeInOutCirc(x) {
        return x < 0.5
            ? (1 - (1 - ((2 * x) ** 2)) ** 0.5) / 2
            : ((1 - ((-2 * x + 2) ** 2)) ** 0.5 + 1) / 2;
    }

    static easeInExpo(x) {
        return x === 0 ? 0 : (2 ** (10 * x - 10));
    }

    static easeOutExpo(x) {
        return x === 1 ? 1 : 1 - (2 ** (-10 * x));
    }

    static easeInOutExpo(x) {
        return x === 0
            ? 0
            : x === 1
                ? 1
                : x < 0.5 ? (2 ** (20 * x - 10)) / 2
                    : (2 - (2 ** (-20 * x + 10))) / 2;
    }

    static easeInBack(x) {
        const c1 = 1.70158;
        const c3 = c1 + 1;

        return c3 * x * x * x - c1 * x * x;
    }

    static easeOutBack(x) {
        const c1 = 1.70158;
        const c3 = c1 + 1;

        return 1 + c3 * ((x - 1) ** 3) + c1 * ((x - 1) ** 2);
    }

    static easeInOutBack(x) {
        const c1 = 1.70158;
        const c2 = c1 * 1.525;

        return x < 0.5
            ? (((2 * x) ** 2) * ((c2 + 1) * 2 * x - c2)) / 2
            : (((2 * x - 2) ** 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
    }

    static easeInElastic(x) {
        const c4 = (2 * Math.PI) / 3;

        return x === 0
            ? 0
            : x === 1
                ? 1
                : -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4);
    }

    static easeOutElastic(x) {
        const c4 = (2 * Math.PI) / 3;

        return x === 0
            ? 0
            : x === 1
                ? 1
                : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
    }

    static easeInOutElastic(x) {
        const c5 = (2 * Math.PI) / 4.5;

        return x === 0
            ? 0
            : x === 1
                ? 1
                : x < 0.5
                    ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2
                    : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1;
    }

    static easeInBounce(x) {
        return 1 - RAnimationInterpoleration.easeOutBounce(1 - x);
    }

    static easeOutBounce(x) {
        const n1 = 7.5625;
        const d1 = 2.75;

        if (x < 1 / d1) {
            return n1 * x * x;
        } else if (x < 2 / d1) {
            return n1 * (x -= 1.5 / d1) * x + 0.75;
        } else if (x < 2.5 / d1) {
            return n1 * (x -= 2.25 / d1) * x + 0.9375;
        } else {
            return n1 * (x -= 2.625 / d1) * x + 0.984375;
        }
    }

    static easeInOutBounce(x) {
        return x < 0.5
            ? (1 - RAnimationInterpoleration.easeOutBounce(1 - 2 * x)) / 2
            : (1 + RAnimationInterpoleration.easeOutBounce(2 * x - 1)) / 2;
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

        this.#check();
    }

    static compose()
    {
        return new RComposition([]);
    }

    then(fn, steps)
    {
        if(typeof fn !== 'function')
        {
            throw new RCompositionError("Composition function must be of JS \'function\' type but found: " + typeof fn);
        }
        else if (typeof steps !== 'number') {
            throw new RCompositionError("Composition steps must be of \'number\' type but found: " + typeof steps);
        }

        this.animRules.push({func: fn, steps});

        return this;
    }

    #check()
    {
        // reset steps according to animation requirements
        for (let i = 0; i < this.animRules.length; i++) {
            if (!this.animRules[i].func && typeof this.animRules[i].func !== 'function') {
                throw new RCompositionError("Bad animation rule set, missing func, or invalid \'func\' type: " + typeof this.animRules[i].func);
            }
            else if (!this.animRules[i].steps && typeof this.animRules[i].steps !== 'number') {
                throw new RCompositionError("Bad animation rule set, missing steps, or invalid \'steps\' type: " + typeof this.animRules[i].steps);
            }
        }
    }

    /**
     * Calls update on the animatables in sequential order
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

class RCompositionError extends Error {
    constructor(message)
    {
        super(`[RComposition ERROR] ${message}`);
    }
}