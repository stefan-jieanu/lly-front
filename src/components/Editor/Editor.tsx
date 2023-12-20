import Canvas from "./Canvas"
import { Scene } from "../../gfx/gfx";
import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import Controls from "./Controls";

export default function Editor() {
  const canvasRef = useRef(null);
  let app: Scene;
  const [hoverInfo, setHoverInfo] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (canvasRef) {
      app = new Scene(canvasRef.current);
      app.run();
      app.hoverInfCallback = getFromCanvas;
    }

    return () => { }
  }, [canvasRef])

  const getFromCanvas = (x: number, y: number) => {
    setHoverInfo({ x: x, y: y });
  }

  const doSomething = useCallback(() => {
    app.doSomething();
  }, [])

  const handleMouseMovement = useCallback((e: MouseEvent) => {
    e.preventDefault();

    app.mouseMoveCallback(e);
  }, [])

  return (
    <div className="h-full">
      <div className='flex gap-10 h-full items-center justify-center'>
        <div>
          <Controls doSomething={doSomething} hoverInfo={hoverInfo} />
        </div>
        <div className=''>
          <Canvas canvasRef={canvasRef} onMouseMove={handleMouseMovement} />
        </div>
      </div>
    </div>
  )
}