import {
    inject,
    bindable
} from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { BindingSignaler } from 'aurelia-templating-resources';

@inject(BindingSignaler, EventAggregator)

export class DragService {

    constructor(bindingSignaler, eventAggregator) {
        this.bnds = bindingSignaler;
        this._ea = eventAggregator;
        this._dragStartPos = {};
        this._dragEndPos = {};
        this._isDragged = false;
    }

    getClientPos(event) {
        const clientPos = {
            x: (event.touches) ? event.touches[0].clientX : event.clientX,
            y: (event.touches) ? event.touches[0].clientY : event.clientY
        };
        return clientPos;
    }

    _setDistance(x, y) {
        this._distance = {
            x: x,
            y: y
        };
    }

    getDistance() {
        return this._distance;
    }

    _setStartPos(x, y) {
        this._dragStartPos = {
            x: x,
            y: y
        };
    }

    getStartPos() {
        return this._dragStartPos;
    }

    _setEndPos(x, y) {
        this._dragEndPos = {
            x: x,
            y: y
        };
    }

    getEndPos() {
        return this._dragEndPos;
    }

    getIsDragged() {
        return this._isDragged;
    }

    startDrag(event) {
        if (!this._isDragged) {
            this._isDragged = true;
            const clientPos = this.getClientPos(event);
            const container = event.target.offsetParent;
            const startX = clientPos.x - container.offsetLeft;
            const startY = clientPos.y - container.offsetTop;
            this._setStartPos(startX, startY);
            this._distance = undefined;
            this._dragEndPos = undefined;
        }
    }

    doDrag(event) {
        if (this._isDragged) {
            const clientPos = this.getClientPos(event);
            this.dx = clientPos.x - this._dragStartPos.x;
            this.dy = clientPos.y - this._dragStartPos.y;
            this._setDistance(this.dx, this.dy);
        }
    }

    stopDrag() {
        this._setEndPos(this._dragStartPos.x + this._distance.x, this._dragStartPos.y + this._distance.y);
        // this._setDistance(0, 0);
        this._isDragged = false;
    }

    dragTreshold(distance = 19) {
        return ((Math.abs(this._dragEndPos.x - this._dragStartPos.x) > distance) || (Math.abs(this._dragEndPos.y - this._dragStartPos.y) > distance));
    }
}
