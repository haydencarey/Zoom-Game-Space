import { Clock } from 'https://unpkg.com/three@0.117.0/build/three.module.js';

const clock = new Clock();

class Loop {
    constructor(camera, scene, renderer) {
        this.camera = camera;
        this.scene = scene;
        this.renderer = renderer;
        this.updatables = [];
    }

    start() {
        this.renderer.setAnimationLoop(() => {
            this.tick();
            // render a frame
            this.renderer.render(this.scene, this.camera);
        });
    }

    stop() {
        this.renderer.setAnimationLoop(null);
    }
    tick() {
        // //only call the GetDelta function once per frame!
        // const delta = clock.getDelta();

        // for (const object of this.updatables) {
        //     object.tick(delta);
        // }

        //code to update animations will go here

          // only call the getDelta function once per frame!
    const delta = clock.getDelta();

    // console.log(
    //   `The last frame rendered in ${delta * 1000} milliseconds`,
    // );

    for (const object of this.updatables) {
      object.tick(delta);
    }
    }
}

export { Loop }