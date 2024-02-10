import * as THREE from 'three';

export enum GameObjectType {
  None = 0,
  BasicTile
}

export abstract class GameObject {
    position: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
    type: GameObjectType = GameObjectType.None

    constructor() {

    }

    abstract update(): void;
    abstract getMesh(): THREE.Object3D;
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

  getMesh(): THREE.Object3D {
    return this.cube;
  }
}

export class BasicTile extends GameObject {
  material: THREE.MeshBasicMaterial;
  geometry: THREE.BoxGeometry;
  cube: THREE.Mesh;
  type: GameObjectType = GameObjectType.BasicTile;

  constructor(pos: THREE.Vector3) {
    super();
    const texture: THREE.Texture = new THREE.TextureLoader().load('/assets/Slate checker tile.png');
    this.material = new THREE.MeshBasicMaterial({map: texture});
    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    this.cube = new THREE.Mesh(this.geometry, this.material);

    this.cube.translateX(pos.x);
    this.cube.translateY(pos.y);
    this.cube.translateZ(pos.z);
  }

  update(): void { 
  }

  getMesh(): THREE.Object3D {
    return this.cube;
  }

}