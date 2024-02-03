import ControlItem from "./ControlItem"

// @ts-expect-error will add types later
export default function Controls({ doSomething, hoverInfo }) {
  return (
    <div className='w-80 h-72 rounded-lg border-2 border-black bg-slate-800 shadow-[10px_10px_0px_rgb(0,0,0)] overflow-hidden'>
      {/* <button className='mb-6 text-white' onClick={() => doSomething()}>Click me!</button> */}
      <ControlItem text={'Change color'} onClick={() => doSomething()} />
      <div>
        <h1 className='text-white'>Mouse Position</h1>
        <h1 className="text-white">{hoverInfo.x}, {hoverInfo.y}</h1>
      </div>
    </div>
  )
}