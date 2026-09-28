import { useState } from "react";

interface SearchUserProps {
  setSearch: (value: string) => void;
}

function SearchUser({ setSearch }: SearchUserProps) {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;

    setValue(searchValue);
    setSearch(searchValue);
  };

  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <input
        type="text"
        placeholder="Search by name or email..."
        value={value}
        onChange={handleChange}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
      />
    </div>
  );
}

export default SearchUser;
