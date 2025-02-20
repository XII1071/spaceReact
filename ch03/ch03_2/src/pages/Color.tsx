export default function Color() {
  return (
    // 무채색(검은색, 흰색): 접두사 색상명/불투명도
    // 유채색(무채색 제외 색): 접두사-색상명-채도/불투명도
    <div className="p-4 m-2 bg-sky-700">
      <h4 className="w-full p-4 text-3xl text-white">Color</h4>
      <div>
        <p className="text-white">Email address</p>
        <input
          type="email"
          name="email"
          id="email"
          className="text-gray-900 border-sky-200 border-4"
        />
        <p className="text-rose-500">This field is required</p>
      </div>
    </div>
  )
}
