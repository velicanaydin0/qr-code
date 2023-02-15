import { useEffect } from "react";

function Category({ categories, filterItems, items }) {
  return (
    <div className="btn-container">


      {categories.map((category, i) => {
        const firstItem = items.find(function (item){
          return item.category === category;
        });
        return (
        <div>
          <button
            type="button"
            key={i}
            onClick={() => filterItems(category)}
            className="filter-btn"
          >

            <img width="300px" height="300px" src={firstItem.img} />
            <br/>
            {category}
            <br/>
          </button>
          <br/>
          </div>
        );
      })}
    </div>
  );
}

export default Category;
