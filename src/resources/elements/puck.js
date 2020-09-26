import {
    inject,
    bindable
} from 'aurelia-framework';
import {
    EventAggregator
} from 'aurelia-event-aggregator';
import { TouchService } from '../services/touch-service';
import { DragService } from '../services/drag-service';
import { ScreenService } from '../services/screen-service';

@inject(EventAggregator, TouchService, DragService, ScreenService)

export class PuckCustomElement {

    constructor(eventAggregator, touchService, dragService, screenService) {
        this._ea = eventAggregator;
        this._ds = dragService;
        this._touchService = touchService;
        this._screenService = screenService;
        this._basePuckStyle = 'left: calc(50% - 5vw); top: 75%;';
        this.puckStyle = this._basePuckStyle;
    }

    startDrag(event) {
        this._element = event.target;
        this._radius = this._element.offsetWidth / 2;
        this._ds.startDrag(event);
    }

    doDrag(event) {
        if (this._ds.getIsDragged()) {
            this._ds.doDrag(event);
            this.setTransformStyle();
        }
    }

    stopDrag() {
        if (this._ds.getIsDragged()) {
            this._ds.stopDrag();
            const endPos = this._ds.getElementFinalPos();
            this.setBasePuckStyle(endPos.x, endPos.y);
            this.addPuckStyle();
            setTimeout(_ => {
                this.shoot();
            });
        }
    }

    setTransformStyle() {
        const distance = this._ds.getDistance();
        const transformStyle = 'transform: translate(' + distance.x + 'px, ' + distance.y + 'px);';
        this.addPuckStyle(transformStyle);
    }

    addPuckStyle(additionalStyle = '') {
        this.puckStyle = this._basePuckStyle + additionalStyle;
    }

    setBasePuckStyle(x, y) {
        this._basePuckStyle = 'left: ' + x + 'px; top: ' + y + 'px;';
    }

    shoot() {
        const transitionStyle = 'transition: transform 0.5s ease-out;';
        this.addPuckStyle(transitionStyle);
        setTimeout(_ => {
            const shootingDistanceFactor = 5;
            const startPosition = this._ds.getElementStartPos();
            const distance = this._ds.getDistance();
            const targetDistance = {
                x: -distance.x * shootingDistanceFactor,
                y: -distance.y * shootingDistanceFactor
            };
            const newPosition = {
                x: startPosition.x + targetDistance.x,
                y: startPosition.y + targetDistance.y
            };
            $(this._element).one('transitionend', _ => {
                console.log('ready');
                this.setBasePuckStyle(newPosition.x, newPosition.y);
                this.addPuckStyle();
            });
            const transformStyle = 'transform: translate(' + targetDistance.x + 'px, ' + targetDistance.y + 'px);';
            this.addPuckStyle(transitionStyle + transformStyle);
        });
    }

    attached() {
    }

}
