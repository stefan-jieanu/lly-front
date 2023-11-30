import * as THREE from 'three';

class Scene {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  material: THREE.MeshBasicMaterial;
  geometry: THREE.BoxGeometry;
  cube: THREE.Mesh;
  hoverInfCallback: Function;

  constructor(canvasRef: any, inf: Function) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ canvas: canvasRef });
    this.renderer.setSize(500, 500);
    this.renderer.setClearColor(0xff0000);

    this.material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    this.cube = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.cube);

    this.camera.position.z = 5;

    this.hoverInfCallback = inf;
  }


  run() {
    requestAnimationFrame(this.run.bind(this));
    this.renderer.render(this.scene, this.camera);
  }

  doSomething() {
    this.material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    this.cube.material = this.material;
  }

  mouseMoveCallback(e: MouseEvent) {
    // e.clientX, e.clientY
  }
}

export { Scene }