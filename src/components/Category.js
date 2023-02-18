import { useEffect } from "react";

function Category({ categories, filterItems, items }) {
  return (
    <div className="btn-container">


      {categories.map((category, i) => {
        const firstItem = items.find(function (item){
          return item.category === category;
        });

        if(firstItem)
        return (
        <div>
          <button
            type="button"
            key={i}
            onClick={() => filterItems(category)}
            className="filter-btn"
          >

            <img width="100%" height="100%" src={firstItem.img} />
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
