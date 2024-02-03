// @ts-expect-error will add types later
export default function ControlItem({ text, onClick }) {
  return (
    <div className="p-5 hover:bg-slate-700 transition-colors duration-200 ease-in-out cursor-pointer select-none" onClick={onClick}>
      <p className="text-white font-[consolas] text-xl">{text}</p>
    </div>
  )
}