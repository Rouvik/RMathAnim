/**
 * 2 dimentional vectors
 */
class vec2 {
    /**
     * Creates a vec2
     * <div style="background: greenyellow; border: 3px solid green; border-radius: 5px; padding: 5px;">
     * <b style="font-size: 1.3rem;">Info:</b><br>
     * vec2 behaviour:
     * <ul>
     * <li>If x is a <b>vec2</b>, then it behaves as a copy constructor</li>
     * <li>If x is a <b>number</b> and y is undefined then it behaves as if new vec2(x, x) eg. -> new vec2(5) == new vec2(5, 5)</li>
     * <li>If <b>x and y are both numbers</b> then x is treated as x component of the vector and y as y component</li>
     * </ul>
     * </div>
     * @param {vec2_or_number} x Read details above for proper behaviour disclosure
     * @param {number} y The y component of the vector
     */
    constructor(x, y) {
        if (x instanceof vec2) {
            this.x = x.x;
            this.y = x.y;
        }
        else if (typeof x === "number") {
            this.x = x;
            if (typeof y === "number") {
                this.y = y;
            }
            else {
                this.y = x;
            }
        }
        else {
            throw new Error("[vec2 Error] Bad constructor parameters: (x: " + x + ", y: " + y + ")");
        }
    }

    /**
     * Adds a vector to this and returns it
     * @param {vec2} v2 The components of the other vector to add
     * @returns A vec2 with this.x_i + v2.x_i
     */
    add(v2) {
        let temp = new vec2(this);
        temp.x += v2.x;
        temp.y += v2.y;

        return temp;
    }

    /**
     * Subtracts a vector from this and returns it
     * @param {vec2} v2 The components of the other vector to subtract
     * @returns A vec2 with this.x_i - v2.x_i
     */
    sub(v2) {
        let temp = new vec2(this);
        temp.x -= v2.x;
        temp.y -= v2.y;

        return temp;
    }

    /**
     * Multiplies a vector to this and returns it
     * @param {vec2} v2 The components of the other vector to multiply
     * @returns A vec2 with this.x_i * v2.x_i
     */
    mul(v2) {
        let temp = new vec2(this);
        temp.x *= v2.x;
        temp.y *= v2.y;

        return temp;
    }

    /**
     * Divides a vector from this and returns it
     * <p style="background: crimson; border: 3px solid darkred; color: white; border-radius: 5px; padding: 5px;"><b>Warning:</b> This function does not check for division by zero, thus might end up with NaNs so use with caution</p>
     * @param {vec2} v2 The components of the other vector to divide
     * @returns A vec2 with this.x_i / v2.x_i
     */
    div(v2) {
        let temp = new vec2(this);
        temp.x /= v2.x;
        temp.y /= v2.y;

        return temp;
    }

    /**
     * Performs dot product of a vector to this and returns it
     * @param {vec2} v2 The components of the other vector to dot
     * @returns A vec2 with this.x * v2.x + this.y * v2.y
     */
    dot(v2) {
        return this.x * v2.x + this.y * v2.y;
    }

    /**
     * The magnitude square of the vector
     * @returns The square of magnitude of the vector
     */
    magSq() {
        return this.x * this.x + this.y * this.y;
    }

    /**
     * The magnitude of the vector
     * @returns The magnitude of the vector
     */
    mag() {
        return (this.x * this.x + this.y * this.y) ** 0.5;
    }

    /**
     * Normalized vector
     * @returns Normalises the vector and returns it
     */
    norm() {
        let temp = new vec2(this);
        const mag = this.mag();
        temp.x /= mag;
        temp.y /= mag;

        return temp;
    }

    /**
     * Clamps the x component of vector
     * @param {number} min The minimum bound of x
     * @param {number} max The maximum bound of x
     * @returns The clamped vector
     */
    clampX(min, max) {
        if (this.x < min) {
            this.x = min;
        }
        else if (this.x > max) {
            this.x = max;
        }

        return this;
    }

    /**
     * Clamps the y component of vector
     * @param {number} min The minimum bound of y
     * @param {number} max The maximum bound of y
     * @returns The clamped vector
     */
    clampY(min, max) {
        if (this.y < min) {
            this.y = min;
        }
        else if (this.y > max) {
            this.y = max;
        }

        return this;
    }
    
    /**
     * Clamps both the component of vector
     * @param {number} min The minimum bound of x, y
     * @param {number} max The maximum bound of x, y
     * @returns The clamped vector
     */
    clamp(min, max) {
        this.clampX(min, max);
        this.clampY(min, max);

        return this;
    }

    /**
     * Limits a vector from exceeding the maxVec values
     * @param {vec2} maxVec The limiting value of the vector
     * @returns The clamped vector
     */
    mapXYWithin(maxVec) {
        if (this.x > maxVec.x || this.y > maxVec.y) { // this is just a bad yet fast check, better to do if this.magSq() > value * value
            return this.norm().mul(maxVec);
        }

        return this;
    }

    /**
     * Returns the string representation of the vector as (x, y)
     * @returns The string representation of the vector
     */
    toString() {
        return "(" + this.x + ", " + this.y + ")";
    }
}

/**
 * 3 dimentional vectors, docs will come soon I hope 😅
 */
class vec3 {
    constructor(x, y, z) {
        if (x instanceof vec2 && typeof y == "number") {
            this.x = x.x;
            this.y = x.y;
            this.z = y;
        }
        else if (x instanceof vec3) {
            this.x = x.x;
            this.y = x.y;
            this.z = x.z;
        }
        else if (typeof x == "number" && y == undefined && z == undefined) {
            this.x = x;
            this.y = x;
            this.z = x;
        }
        else if (typeof x == "number" && typeof y == "number" && typeof z == "number") {
            this.x = x;
            this.y = y;
            this.z = z;
        }
        else {
            throw new Error(`[vec3 Error] Bad constructor parameters: (x:${x}, y:${y}, z:${z})`);
        }
    }

    addv2(v2) {
        let temp = new vec3(this);
        temp.x += v2.x;
        temp.y += v2.y;

        return temp;
    }

    add(v3) {
        let temp = new vec3(this);
        temp.x += v3.x;
        temp.y += v3.y;
        temp.z += v3.z;

        return temp;
    }

    subv2(v2) {
        let temp = new vec3(this);
        temp.x -= v2.x;
        temp.y -= v2.y;

        return temp;
    }

    sub(v3) {
        let temp = new vec3(this);
        temp.x -= v3.x;
        temp.y -= v3.y;
        temp.z -= v3.z;

        return temp;
    }

    mulv2(v2) {
        let temp = new vec3(this);
        temp.x *= v2.x;
        temp.y *= v2.y;

        return temp;
    }

    mul(v3) {
        let temp = new vec3(this);
        temp.x *= v3.x;
        temp.y *= v3.y;
        temp.z *= v3.z;

        return temp;
    }

    divv2(v2) {
        let temp = new vec3(this);
        temp.x /= v2.x;
        temp.y /= v2.y;

        return temp;
    }

    div(v3) {
        let temp = new vec3(this);
        temp.x /= v3.x;
        temp.y /= v3.y;
        temp.z /= v3.z;

        return temp;
    }

    dot(v3) {
        return this.x * v3.x + this.y * v3.y + this.z * v3.z;
    }

    magSq() {
        return this.x ** 2 + this.y ** 2 + this.z ** 2;
    }

    mag() {
        return (this.x ** 2 + this.y ** 2 + this.z ** 2) ** 0.5;
    }

    norm() {
        let temp = new vec3(this);
        const mag = this.mag();
        temp.x /= mag;
        temp.y /= mag;
        temp.z /= mag;

        return temp;
    }

    clampX(min, max) {
        if (this.x < min) {
            this.x = min;
        }
        else if (this.x > max) {
            this.x = max;
        }

        return this;
    }

    clampY(min, max) {
        if (this.y < min) {
            this.y = min;
        }
        else if (this.y > max) {
            this.y = max;
        }

        return this;
    }

    clampZ(min, max) {
        if (this.z < min) {
            this.z = min;
        }
        else if (this.z > max) {
            this.z = max;
        }

        return this;
    }

    clamp(min, max) {
        this.clampX(min, max);
        this.clampY(min, max);
        this.clampZ(min, max);

        return this;
    }

    toString() {
        return `(${this.x}, ${this.y}, ${this.z})`;
    }
}