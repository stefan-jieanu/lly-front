import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/Addons.js';
import { RenderPixelatedPass } from 'three/examples/jsm/Addons.js';
import { World } from './World';
import { CameraController } from './CameraController';

class Scene {
  scene: THREE.Scene;
  cameraController: CameraController;
  renderer: THREE.WebGLRenderer;
  light: THREE.PointLight;
  ambientLight: THREE.AmbientLight;
  clock: THREE.Clock;
  composer: EffectComposer;
  world: World;
  hoverInfCallback: (x: number, y: number) => void = () => { console.error('Not implemented'); };

  constructor(canvasRef: HTMLCanvasElement) {
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({ canvas: canvasRef, alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x3f3f46, 1);

    this.cameraController = new CameraController(canvasRef);

    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    this.scene.add(this.ambientLight);

    this.light = new THREE.PointLight(0xffffff, 1, 10, 1);
    this.light.translateX(1);
    this.light.translateY(1);
    this.light.translateZ(2);
    this.scene.add(this.light);

    this.clock = new THREE.Clock();

    this.world = new World(this.scene);

    this.composer = new EffectComposer(this.renderer);
    this.composer.setSize(window.innerWidth, window.innerHeight);
    const renderPixelatedPass = new RenderPixelatedPass(5, this.scene, this.cameraController.getCamera());
    this.composer.addPass(renderPixelatedPass);

    console.log('Initialized scene!');

    window.addEventListener('resize', () => this.resizeCallback());
    canvasRef.addEventListener('mousemove', (e) => this.mouseMoveCallback(e));
  }


  run() {
    requestAnimationFrame(this.run.bind(this));

    const dt = this.clock.getDelta();

    this.cameraController.update(dt);
    this.composer.render();
  }


  mouseMoveCallback(e: MouseEvent) {
    this.hoverInfCallback(e.clientX, e.clientY);
  }

  async resizeCallback() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.composer.setSize(window.innerWidth, window.innerHeight);

    const aspectRatio = window.innerWidth / window.innerHeight;
    this.cameraController.getCamera().left = -aspectRatio;
    this.cameraController.getCamera().right = aspectRatio;
    this.cameraController.getCamera().updateProjectionMatrix();
  }
}

// doSomething() {
//   const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
//   this.material = new THREE.MeshStandardMaterial({ color: randomColor });
//   this.cube.material = this.material;
// }

export { Scene }