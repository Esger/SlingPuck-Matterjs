import {
    inject,
    bindable
} from 'aurelia-framework';
import {
    EventAggregator
} from 'aurelia-event-aggregator';
import { MatterService } from '../services/matter-service';
// import { Puck } from './puck';

@inject(EventAggregator, MatterService)
export class GameScreenCustomElement {

    constructor(eventAggregator, matterService) {
        this.ea = eventAggregator;
        this._matterService = matterService;
        this._pucks = [];
        for (let i = 0; i < 10; i++) {
            this._pucks.push(i);
        }
    }

    attached() {
        const $arena = $('.arena');
        // const resizeObserver = window.ResizeObserver;
        // this._resizeObserver = new resizeObserver(_ => {
        //     this._collisionService.setLimits(this.$arena);
        // });
        // this._resizeObserver.observe(document.body);

        this._matterService.setWorld($arena, this._pucks);
    }

    detached() {
        // this._resizeObserver.disconnect();
    }

}
