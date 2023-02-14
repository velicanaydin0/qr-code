import Menu from "../components/Menu";
import Category from "../components/Category";
import { onSnapshot, query, orderBy } from "firebase/firestore";
import { movieCollectionRef } from "../db/firebase-collection";
import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCollection } from "../hooks/useCollection";

function Qrmenu() {
  const { user } = useAuthContext();

  let items = useCollection("qrmenu").documents;
  items = items && items.filter((item) => item.uid === user && user.uid);

  const allCategories = [
    ...new Set(items && items.map((item) => item.category)),
  ];
  const [menuItems, setMenuItems] = useState(items);

  const [categories, setCategories] = useState(allCategories);

  const filterItems = (category) => {
    setCategories(allCategories);
    if (category === "Categories") {
      setMenuItems(items);
      console.log(category);
      return;
    }
    const newItems = items.filter((item) => item.category === category);
    newItems.length < 1 ? setMenuItems(items) : setMenuItems(newItems);
  };

  return (
    <main>
      <section className="menu section">
        <div className="title">
          <h2>{user && user.displayName || user && user.uid}</h2>
        </div>
        <div className="underline"></div>
        <Category categories={categories} filterItems={filterItems} />
        <Menu items={menuItems} />
      </section>
    </main>
  );
}

export default Qrmenu;
