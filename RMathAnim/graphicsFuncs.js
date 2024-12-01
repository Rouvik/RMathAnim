/**
 * Rotates the hue of a color vector by the provided angle in radians
 * @param {vec3} color The color value to rotate
 * @param {number} angle The angle by which to rotate
 * @returns {vec3} The vector containing the rotated color
 */
function RHueRotate(color, angle) {
    const a00 = 0.213 + Math.cos(angle) * 0.787 + Math.sin(angle) * -0.213,
        a01 = 0.715 + Math.cos(angle) * -0.715 + Math.sin(angle) * -0.715,
        a02 = 0.072 + Math.cos(angle) * -0.072 + Math.sin(angle) * 0.928,
        a10 = 0.213 + Math.cos(angle) * -0.213 + Math.sin(angle) * 0.143,
        a11 = 0.715 + Math.cos(angle) * 0.285 + Math.sin(angle) * 0.140,
        a12 = 0.072 + Math.cos(angle) * -0.072 + Math.sin(angle) * -0.283,
        a20 = 0.213 + Math.cos(angle) * -0.715 + Math.sin(angle) * 0.715,
        a21 = 0.715 + Math.cos(angle) * -0.715 + Math.sin(angle) * 0.715,
        a22 = 0.072 + Math.cos(angle) * 0.928 + Math.sin(angle) * 0.072;

    return new vec3(
        color.x * a00 + color.y * a01 + color.z * a02,
        color.x * a10 + color.y * a11 + color.z * a12,
        color.x * a20 + color.y * a21 + color.z * a22
    );
}

/**
 * Accepts a rgb(red, green, blue) color string and returns a vec3 with the extracted color information
 * <p style="background: gold; border: 3px solid goldenrod; border-radius: 5px; padding: 5px;"">Note: Quite a shaky function and might break with bad color input</p>
 * @param {string} color The color string to convert to vec3
 * @returns {vec3} The color vector generated from the input color string
 */
function RColorStrToVec(color) {
    const numbers = color.substring(color.indexOf('(') + 1, color.length - 1).split(',').map((e) => +e);
    return new vec3(...numbers);
}