import * as THREE from 'three';

export abstract class GameObject {
    position: THREE.Vector3 = new THREE.Vector3(0, 0, 0);

    constructor() {

    }

    abstract update(): void;

    abstract get(): THREE.Object3D;
}

export class SimpleCube extends GameObject {
  material: THREE.MeshStandardMaterial;
  geometry: THREE.BoxGeometry;
  cube: THREE.Mesh;

  constructor() {
    super();
    this.material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    this.cube = new THREE.Mesh(this.geometry, this.material);

    this.cube.translateY(1);
  }

  update() {
    this.cube.rotation.x += 0.01;
    this.cube.rotation.z += 0.001;
    this.cube.rotation.y += 0.005;
  }

  get(): THREE.Object3D {
    return this.cube;
  }
}