import * as D from '../data'

export default function Tailwindcss() {
  return (
    <div className="bg-black/70">
      <h4 className="w-full p-4 text-3xl text-white">Tailwindcss</h4>
      <p className="italic text-gray-50 line-clamp-3">{D.randomParagraphs(10)}</p>
      <button className="btn btn-primary" style={{textTransform: 'none'}}>
        Button
      </button>
    </div>
  )
}
