import * as THREE from 'three';
import { BasicTile, GameObject } from './GameObject';
// import { GameObjectType } from './GameObject';

export class World {
  scene: THREE.Scene;
  size: THREE.Vector3 = new THREE.Vector3(10, 1, 10);
  worldTiles: GameObject[][][];

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    
    // Generate the world
    this.worldTiles = [];
    for (let i = 0; i < this.size.x; i++) {
      this.worldTiles.push([]);
      for (let j = 0; j < this.size.y; j++) {
        this.worldTiles[i].push([]);
        for (let k = 0; k < this.size.z; k++) {
          // if ((Math.random() * (2 ** this.size.y)) < 3 ** j)
          //   continue;
          this.worldTiles[i][j].push(new BasicTile(new THREE.Vector3(i, j, k)));
        }
      }
    }

    for (let i = 0; i < this.size.x; i++) {
      for (let j = 0; j < this.size.y; j++) {
        for (let k = 0; k < this.size.z; k++) {
          if (this.worldTiles[i][j][k] != null)
            this.scene.add(this.worldTiles[i][j][k].getMesh());
        }
      }
    }
  }

  update(): void {

  }
}