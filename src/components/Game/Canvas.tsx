// @ts-expect-error will add proper types to function later
export default function Canvas({ canvasRef, onMouseMove }) {
  return (
    <canvas className='absolute top-0 left-0 w-full h-full' id='game-canvas' ref={canvasRef}
      onMouseMove={onMouseMove}></canvas>
  )
}
