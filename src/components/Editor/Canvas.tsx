// @ts-expect-error will add proper types to function later
export default function Canvas({ canvasRef, onMouseMove }) {
  return (
      <canvas className='border-2 border-black rounded-lg' id='game-canvas' ref={canvasRef}
        onMouseMove={onMouseMove}></canvas>
  )
}
