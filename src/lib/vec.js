class vec2 {
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

    add(v2) {
        let temp = new vec2(this);
        temp.x += v2.x;
        temp.y += v2.y;

        return temp;
    }

    sub(v2) {
        let temp = new vec2(this);
        temp.x -= v2.x;
        temp.y -= v2.y;

        return temp;
    }

    mul(v2) {
        let temp = new vec2(this);
        temp.x *= v2.x;
        temp.y *= v2.y;

        return temp;
    }

    div(v2) {
        let temp = new vec2(this);
        temp.x /= v2.x;
        temp.y /= v2.y;

        return temp;
    }

    dot(v2) {
        return this.x * v2.x + this.y * v2.y;
    }

    magSq() {
        return this.x * this.x + this.y * this.y;
    }

    mag() {
        return (this.x * this.x + this.y * this.y) ** 0.5;
    }

    norm() {
        let temp = new vec2(this);
        const mag = this.mag();
        temp.x /= mag;
        temp.y /= mag;

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

    clamp(min, max) {
        this.clampX(min, max);
        this.clampY(min, max);

        return this;
    }

    mapXYWithin(maxVec) {
        if (this.x > maxVec.x || this.y > maxVec.y) { // this is just a bad yet fast check, better to do if this.magSq() > value * value
            return this.norm().mul(maxVec);
        }

        return this;
    }

    toString() {
        return "(" + this.x + ", " + this.y + ")";
    }
}

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