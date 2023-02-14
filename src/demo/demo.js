import Category from "../components/Category";
import Menu from "../components/Menu";
import items from "../db/data";
import { useState } from "react";

const allCategories = [...new Set(items.map((item) => item.category))];
function App() {
  const [menuItems, setMenuItems] = useState(items);
  const [categories, setCategories] = useState(allCategories);

  const filterItems = (category) => {
    if (category === "all") {
      setMenuItems(items);
      return;
    }
    const newItems = items.filter((item) => item.category === category);
    setMenuItems(newItems);
  };
  return (
    <main>
      <section className="menu section">
        <div className="title">
          <h2>QR Menu</h2>
        </div>
        <div className="underline"></div>
        <Category categories={categories} filterItems={filterItems} />
        <Menu items={menuItems} />
      </section>
    </main>
  );
}

export default App;
