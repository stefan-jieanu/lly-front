// @ts-expect-error will add types later
export default function Controls({ doSomething, hoverInfo }) {
  return (
    <div className='p-2 rounded-lg border-2 border-black'>
      <button className='mb-6 text-white' onClick={() => doSomething()}>Click me!</button>
      <div>
        <h1 className='text-white'>Mouse Position</h1>
        <h1 className="text-white">{hoverInfo.x}, {hoverInfo.y}</h1>
      </div>
    </div>
  )
}