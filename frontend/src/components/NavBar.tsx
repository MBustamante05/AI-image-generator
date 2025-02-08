import { useState } from "react";

type Props = {
  onSearch: (s: string) => void;
};

function NavBar({ onSearch }: Props) {
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(search);
      setSearch("");
    }
  }
  return (
    <nav className="flex justify-between align-center mb-10">
      <h1 className="text-3xl font-bold text-blue-50">
        Code<span className="text-blue-400">Craft</span>
      </h1>
      <input
        type="text"
        className="outline-none px-4 py-2 border border-gray-300 rounded-full bg-gray-200 text-black w-1/3"
        placeholder="Search for images..."
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => handleSearch(e)}
        value={search}
      />
      <div className="flex gap-3 align-center">
        <button className="px-6 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 cursor-pointer font-semibold transition duration-300 ease-in-out">
          Sign up
        </button>
        <button className="px-6 py-2 border-1 rounded font-semibold cursor-pointer hover:text-teal-400">
          Login
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
