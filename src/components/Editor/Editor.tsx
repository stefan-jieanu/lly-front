import Canvas from "./Canvas"
import { Scene } from "../../gfx/gfx";
import { useRef, useEffect, useState } from "react";
import Controls from "./Controls";

export default function Editor() {
  const canvasRef = useRef(null);
  let app: Scene;
  const [hoverInfo, setHoverInfo] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (canvasRef) {
      app = new Scene(canvasRef.current, getFromCanvas);
      app.run();

      document.onmousemove();
    }

    return () => { }
  }, [canvasRef])

  const doSomething = () => {
    app.doSomething();
  }

  const getFromCanvas = (x: number, y: number) => {
    setHoverInfo({ x: x, y: y });
  }

  return (
    <div className="h-full">
      <div className='flex gap-10 h-full items-center justify-center'>
        <div>
          <Controls doSomething={doSomething} hoverInfo={hoverInfo} />
        </div>
        <div className=''>
          <Canvas canvasRef={canvasRef} />
        </div>
      </div>
    </div>
  )
}