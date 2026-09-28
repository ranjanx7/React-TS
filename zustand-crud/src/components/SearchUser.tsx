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
    <div className="search">
      <input
        type="text"
        placeholder="Search by name or email..."
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchUser;
