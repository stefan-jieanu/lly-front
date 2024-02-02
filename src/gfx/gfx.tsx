import * as THREE from 'three';

class Scene {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  material: THREE.MeshStandardMaterial;
  geometry: THREE.BoxGeometry;
  cube: THREE.Mesh;
  light: THREE.PointLight;
  ambientLight: THREE.AmbientLight;
  hoverInfCallback: (x: number, y: number) => void = () => { console.error('Not implemented'); };

  constructor(canvasRef: HTMLCanvasElement) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ canvas: canvasRef, alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    console.log(canvasRef.width, canvasRef.height);
    this.renderer.setClearColor(0x1155aa, 1);

    this.material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    this.cube = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.cube);

    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    this.scene.add(this.ambientLight);

    this.light = new THREE.PointLight(0xffffff, 1, 10, 1);
    this.light.translateX(1);
    this.light.translateY(1);
    this.light.translateZ(2);
    this.scene.add(this.light);

    this.camera.position.z = 5;
    console.log('Initialized scene!');

    window.addEventListener('resize', () => this.resizeCallback());
  }


  run() {
    requestAnimationFrame(this.run.bind(this));

    this.cube.rotation.x += 0.01;
    this.cube.rotation.z += 0.001;
    this.cube.rotation.y += 0.005;

    this.renderer.render(this.scene, this.camera);
  }

  doSomething() {
    this.material = new THREE.MeshStandardMaterial({ color: 0x0000ff });
    this.cube.material = this.material;
  }

  mouseMoveCallback(e: MouseEvent) {
    this.hoverInfCallback(e.clientX, e.clientY);
  }

  resizeCallback() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }
}

export { Scene }