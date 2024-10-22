/**
 * Define the AppearingTextOptions for the AppearingText function
 */
class AppearingTextOptions {
    /**
     * 
     * @param {string} content The string to print
     * @param {number} maxT Max value of t to target for, usually set to 100 and is fine
     * @param {vec3} backColorInit Vector representing the background color at the beginning of animation
     * @param {vec3} backColorFinal Vector representing the background color at the end of animation
     * @param {string} lineColor The line stroke color in a CSS string format
     */
    constructor(content, fontSize, backColorInit, backColorFinal, lineColor,  maxT) {
        this.text = content || '(null)';
        this.t = 0;
        this.ti = 0;
        this.maxT = maxT || 100;
        this._tInc = 1 / this.maxT;
        this.fontSize = fontSize || '50px';
        this.backColorInit = backColorInit || new vec3(0, 0, 0);
        this.backColorFinal = backColorFinal || new vec3(255, 255, 255);
        this.lineColor = lineColor || 'rgb(255, 255, 255)';
    }
}

/**
 * Draws a nice animated text to canvas
 * @param {AppearingTextOptions} textOptions Options to use to display the animated text
 */
function AppearingText(textOptions, x, y, maxWidth) {
    cxt.beginPath();
    if (textOptions.t > textOptions.maxT) {
        cxt.setLineDash([]);
        cxt.strokeStyle = textOptions.lineColor;
        cxt.fillStyle = `rgb(${textOptions.backColorFinal.x}, ${textOptions.backColorFinal.y}, ${textOptions.backColorFinal.z})`;
        cxt.strokeText(textOptions.text, x, y, maxWidth);
        cxt.fillText(textOptions.text, x, y, maxWidth);
        return;
    }

    
    let fillColor = textOptions.backColorInit.mul(new vec3(1 - textOptions.ti)).add(textOptions.backColorFinal.mul(new vec3(textOptions.ti += textOptions._tInc)));
    cxt.fillStyle = `rgb(${fillColor.x}, ${fillColor.y}, ${fillColor.z})`;
    cxt.strokeStyle = textOptions.lineColor;
    
    cxt.font = `${textOptions.fontSize} CMU Serif`;

    cxt.setLineDash([textOptions.t++, textOptions.maxT]);
    cxt.strokeText(textOptions.text, x, y, maxWidth);
    cxt.fillText(textOptions.text, x, y, maxWidth);
}