import {Button} from '../../theme/daisyui'

export default function Basic() {
  return (
    <section className="mt-4 border-2 m-3 p-3">
      <h2 className="font-bold text-3xl text-center">Basic</h2>
      <div className="mt-4 flex justify-evenly">
        <button>button</button>
        <button className="bg-blue-500 hover:bg-amber-500 text-green-700 text-3xl font-bold py-2 px-4">
          button + tailwindcss
        </button>
        <button className="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900">
          Button
        </button>
        <button className="btn btn-primary">Button D</button>
        <button className="btn btn-secondary">button + daisyui</button>
        <Button className="btn btn-accent">Button + daisyui</Button>
      </div>
    </section>
  )
}
