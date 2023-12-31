import * as THREE from 'three'
import { memo, useCallback, useEffect, useRef } from 'react';
import { Scene } from '../../gfx/gfx';

// @ts-ignore
export default function Canvas({ canvasRef, onMouseMove }) {
  return (
    <div>
      <canvas className='border-2 border-black rounded-lg' id='game-canvas' ref={canvasRef}
        onMouseMove={onMouseMove}></canvas>
    </div>
  )
};
