import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import Category from "./Category";
import Menu from "./Menu";

function Page({ items, item, categorySorted }) {
  const { user } = useAuthContext();


  items = items && items.filter((a) => item.uid === a.uid);

  const allCategories = [
    ...new Set(items && items.map((item) => item.category)),
  ];
  const [menuItems, setMenuItems] = useState(items);
  const [filtered, setFiltered] = useState(false);
  const [categoryVisible, setCategoryVisible] = useState(true);

  const [categories, setCategories] = useState(allCategories);

  const filterItems = (category) => {
    setCategories(allCategories);
    if (category === "Categories") {
      setMenuItems(items);
      return;
    }
    setFiltered(true)
    setCategoryVisible(false)
    const newItems = items.filter((item) => item.category === category);
    newItems.length < 1 ? setMenuItems(items) : setMenuItems(newItems);
  };

  
  return (
    <main>
      {user &&  <Link to="/admin">
        <button
                  className="btn btn-secondary"
                  
                >
                   <i className="fa fa-angle-double-left"> </i> Back to Admin Panel
                </button></Link>}
     
      <section className="menu section">
        <div className="title">
          <img src={require("../assets/images/lizboon.jpeg")} alt="Lizboon"/>
        </div>
        <div className="underline"></div>
        <p></p>
        {categoryVisible && categorySorted != null && <Category categories={categorySorted[0].name} filterItems={filterItems} items={items} /> }
        {!categoryVisible && <div className="geri-don-tusu" onClick={() => {setCategoryVisible(true); setFiltered(false)}}>
          Menüye Dön
        </div>}
        <p></p>
        {filtered && <Menu items={menuItems} /> }
      </section>
    </main>
  );
}

export default Page;
