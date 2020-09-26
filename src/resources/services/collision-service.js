export class CollisionService {

    constructor() {
        this._limits = {};
    }

    setLimits($arena) {
        this._limits = {
            right: $arena.width(),
            bottom: $arena.height(),
            left: 0,
            top: 0
        };
    }

    getLimits() {
        return this._limits;
    }
}