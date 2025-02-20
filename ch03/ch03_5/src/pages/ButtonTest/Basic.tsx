import {Button} from '../../theme/daisyui'

export default function Basic() {
  return (
    <section className="mt-4">
      <h2 className="font-bold text-3xl text-center">Basic</h2>
      <div className="mt-4 flex justify-evenly">
        <button>button</button>
        {/* prettier-ignore */}
        <button className=
          "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4">
          button + tailwindcss 
        </button>
        <button className="btn btn-primary">button + daisyui</button>
        <Button className="btn btn-primary">Button + daisyui</Button>
      </div>
    </section>
  )
}
