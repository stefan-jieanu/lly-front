// @ts-ignore
export default function Controls({ doSomething, hoverInfo }) {
  return (
    <div className='p-20 rounded-2xl shadow-[5px_5px_20px_0px_rgba(0,0,0,0.8)] bg-slate-900'>
      <button onClick={() => doSomething()}>Click me!</button>
      <h1 className="text-white">{hoverInfo.x}, {hoverInfo.y}</h1>
    </div>
  )
}