import * as THREE from 'three';
import { GameObject, SimpleCube } from './GameObject';
import { EffectComposer } from 'three/examples/jsm/Addons.js';
import { RenderPixelatedPass } from 'three/examples/jsm/Addons.js';

class Scene {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  light: THREE.PointLight;
  ambientLight: THREE.AmbientLight;
  gameObjects: GameObject[] = [];
  composer: EffectComposer;
  hoverInfCallback: (x: number, y: number) => void = () => { console.error('Not implemented'); };

  constructor(canvasRef: HTMLCanvasElement) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.translateX(-1);
    this.renderer = new THREE.WebGLRenderer({ canvas: canvasRef, alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    console.log(canvasRef.width, canvasRef.height);
    this.renderer.setClearColor(0x1155aa, 1);

    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    this.scene.add(this.ambientLight);

    this.gameObjects.push(new SimpleCube());

    this.gameObjects.forEach(g => {
      this.scene.add(g.get());
    })

    this.light = new THREE.PointLight(0xffffff, 1, 10, 1);
    this.light.translateX(1);
    this.light.translateY(1);
    this.light.translateZ(2);
    this.scene.add(this.light);
    this.camera.position.z = 5;

    this.composer = new EffectComposer(this.renderer);
    this.composer.setSize(window.innerWidth, window.innerHeight);
    const renderPixelatedPass = new RenderPixelatedPass(5, this.scene, this.camera);
    this.composer.addPass(renderPixelatedPass);

    console.log('Initialized scene!');

    window.addEventListener('resize', () => this.resizeCallback());
  }


  run() {
    requestAnimationFrame(this.run.bind(this));

    this.gameObjects.forEach(g => {
      g.update();
    })

    // this.renderer.render(this.scene, this.camera);
    this.composer.render();
  }


  mouseMoveCallback(e: MouseEvent) {
    this.hoverInfCallback(e.clientX, e.clientY);
  }

  resizeCallback() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.composer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }
}

// doSomething() {
//   const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
//   this.material = new THREE.MeshStandardMaterial({ color: randomColor });
//   this.cube.material = this.material;
// }

export { Scene }