import {
    inject,
    bindable
} from 'aurelia-framework';
import {
    EventAggregator
} from 'aurelia-event-aggregator';
import { CollisionService } from '../services/collision-service';

@inject(EventAggregator, CollisionService)
export class GameScreenCustomElement {

    constructor(eventAggregator, collisionService) {
        this.ea = eventAggregator;
        this._collisionService = collisionService;
    }

    attached() {
        this.$arena = $('.arena');
        const resizeObserver = window.ResizeObserver;
        this._resizeObserver = new resizeObserver(_ => {
            this._collisionService.setLimits(this.$arena);
        });
        this._resizeObserver.observe(document.body);
        setTimeout(() => {
            this._collisionService.setLimits(this.$arena);
        });
    }

    detached() {
        this._resizeObserver.disconnect();
    }

}
