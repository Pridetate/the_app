import { useState } from "react";
import Header from "./components/header";
import DetailsTable from "./components/table";

function App() {
  const [search, setSearch] = useState("");
  const [checked, setChecked] = useState(true);
  const handleSearch = (charactor: string) => {
    setSearch(charactor);
  };
  const handleChecked = (toggle: boolean) => {
    setChecked(toggle);
  };
  return (
    <div
      style={{
        backgroundColor: "#D8D8D8",
        height: "100%",
        display: "flex",
        flex: 1,
        flexDirection: "column",
      }}
    >
      <Header background_color="#343951" header_type="company" />
      <Header
        background_color="#FFFFFF"
        header_type="search"
        search={search}
        onSearch={handleSearch}
        checked={checked}
        onChecked={handleChecked}
      />
      <div style={{ width: "70%", alignSelf: "center", marginTop: 38 }}>
        <DetailsTable search={search} checked={checked} />
      </div>
    </div>
  );
}

export default App;
