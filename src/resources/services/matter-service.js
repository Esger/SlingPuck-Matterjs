import { inject } from 'aurelia-framework';
import {
    EventAggregator
} from 'aurelia-event-aggregator';
import Matter from 'matter-js';

@inject(Matter)
export class MatterService {
    constructor(matter) {
        this._matter = matter;
        this.Engine = matter.Engine;
        this.Render = matter.Render;
        this.World = matter.World;
        this.Bodies = matter.Bodies;
    }

    setWorld($world, pucks) {
        $world = $world || $('body');

        this._engine = this.Engine.create();
        this._render = this.Render.create({
            element: $world[0],
            engine: this._engine
        });

        this._ground = this.Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

        this.World.add(this._engine.world, [this._ground]);
        pucks.forEach(puck => {
            this._puck = this.Bodies.circle(200, 200, 50);
            this.World.add(this._engine.world, [this._puck]);
        });

        this.Engine.run(this._engine);

        this.Render.run(this._render);
    }
}