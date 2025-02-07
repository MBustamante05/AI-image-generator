function NavBar() {
  return (
    <nav className="flex justify-between align-center mb-10">
      <h1 className="text-3xl font-bold text-indigo-100">Code<span className="text-indigo-600">Craft</span></h1>
      <input type="text" className="outline-none px-4 py-2 border border-gray-300 rounded-full bg-gray-200 text-black w-1/3" placeholder="Search for images..."/>
      <div className="flex gap-3 align-center">
        <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer font-semibold transition duration-300 ease-in-out">Sign up</button>
        <button className="px-6 py-2 border-1 rounded font-semibold cursor-pointer hover:text-blue-400">Login</button>
      </div>
    </nav>
  )
}

export default NavBar