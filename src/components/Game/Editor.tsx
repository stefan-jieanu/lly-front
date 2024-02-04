import Canvas from "./Canvas"
import { Scene } from "../../gfx/gfx";
import { useRef, useEffect, useState, useCallback } from "react";
import Controls from "./Controls";

export default function Editor() {
  const canvasRef = useRef(null);
  let app: Scene | null = null;
  const [hoverInfo, setHoverInfo] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (canvasRef.current) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // app!.doSomething();
  }, [app])

  const handleMouseMovement = useCallback((e: MouseEvent) => {
    e.preventDefault();

    app!.mouseMoveCallback(e);
  }, [app])

  return (
    <div className='flex gap-6 h-full px-5 items-center justify-center'>
      <div className='flex-auto z-10 w-72'>
        <Controls doSomething={doSomething} hoverInfo={hoverInfo} />
      </div>
      <Canvas canvasRef={canvasRef} onMouseMove={handleMouseMovement} />
    </div>
  )
}