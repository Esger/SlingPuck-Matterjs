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
        this._ds.stopDrag();
        const endPos = this._ds.getElementFinalPos();
        this._basePuckStyle = 'left: ' + (endPos.x) + 'px; top: ' + (endPos.y) + 'px;';
        this.puckStyle = this._basePuckStyle;
    }

    setTransformStyle() {
        const distance = this._ds.getDistance();
        this.puckStyle = this._basePuckStyle + 'transform: translate(' + distance.x + 'px, ' + distance.y + 'px)';
    }

    attached() {
    }

}
