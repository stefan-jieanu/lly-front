import { OrthographicCamera, Vector2 } from 'three'

export class CameraController {
  camera: OrthographicCamera;
  mouseDown: number[] = [0, 0, 0, 0, 0];
  mousePrevPos: Vector2 = new Vector2(0, 0);
  moveSpeed: number = 1;
  updateTo: Vector2 = new Vector2(0, 0);
  zoomSpeed = 0.0001;

  constructor(canvasRef: HTMLCanvasElement) {
    const aspectRatio = window.innerWidth / window.innerHeight;
    this.camera = new OrthographicCamera( -aspectRatio, aspectRatio, 1, -1, 0.1, 100 )

    this.camera.zoom = 0.15;
    this.camera.translateY(5);
    this.camera.rotateY(-135 * Math.PI / 180);
    this.camera.rotateX(-30 * Math.PI / 180);
    this.camera.updateProjectionMatrix();

    canvasRef.addEventListener('mousedown', (e) => this.mouseDownCallback(e));
    canvasRef.addEventListener('mouseup', (e) => this.mouseUpCallback(e));
    canvasRef.addEventListener('mousemove', (e) => this.mouseMoveCallback(e));
    canvasRef.addEventListener('wheel', (e) => this.wheelCallback(e));
  }

  mouseDownCallback(e: MouseEvent) {
    this.mouseDown[e.button] = 1;
  }

  mouseUpCallback(e: MouseEvent) {
    this.mouseDown[e.button] = 0;

    this.updateTo = new Vector2(0, 0);
  }

  mouseMoveCallback(e: MouseEvent) {
    if (this.mouseDown[0]) {
      this.updateTo.x = (this.mousePrevPos.x - e.clientX) * this.moveSpeed;
      this.updateTo.y = (e.clientY - this.mousePrevPos.y) * this.moveSpeed;
    }
    
    this.mousePrevPos = new Vector2(e.clientX, e.clientY);
  }

  wheelCallback(e: WheelEvent) {
    this.camera.zoom = this.camera.zoom + e.deltaY * -this.zoomSpeed;
    this.camera.updateProjectionMatrix();

    // Clamp zoom in a reasonable range
    // @ts-expect-error need a proper math lirary at some point
    const clamp = (num, min, max) => {return Math.min(Math.max(num, min), max)};
    this.camera.zoom = clamp(this.camera.zoom, 0.1, 0.2);
  }

  moveCamera(dt: number) {
    this.camera.translateX(this.updateTo.x * dt);
    this.camera.translateY(this.updateTo.y * dt);

    this.updateTo = new Vector2(0, 0);
  }

  update(dt: number) {
    this.moveCamera(dt);
  }

  getCamera(): OrthographicCamera {
    return this.camera;
  }
}