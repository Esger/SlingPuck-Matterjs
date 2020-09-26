import {
    inject,
    bindable
} from 'aurelia-framework';
import {
    EventAggregator
} from 'aurelia-event-aggregator';
import { TouchService } from '../services/touch-service';
import { ScreenService } from '../services/screen-service';
import { SnakeService } from '../services/snake-service';
import { SnackService } from '../services/snack-service';
import { MazeService } from '../services/maze-service';

@inject(EventAggregator, TouchService, ScreenService, SnakeService, SnackService, MazeService)

export class GameScreenCustomElement {

    constructor(eventAggregator, touchService, screenService, snakeService, snackService, mazeService) {
        this.ea = eventAggregator;
        this.touchService = touchService;
        this._screenService = screenService;
    }

    attached() {
        let self = this;
        let $body = $('body');
        this.arenaWidth = this._screenService.roundToSpriteSize($body.width() * 0.95);
        this.arenaHeight = this._screenService.roundToSpriteSize($body.height() * 0.95);
        this.$arena = $('.arena');
        setTimeout(() => {
            this.touchService.setAreaSize(this.$arena);
            this._screenService.setDomVars(this.$arena);
        });
    }

}
