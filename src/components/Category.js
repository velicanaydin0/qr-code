import { useEffect } from "react";

function Category({ categories, filterItems }) {
  return (
    <div className="btn-container">


      {categories.map((category, i) => {
        return (
        <div>
          <button
            type="button"
            key={i}
            onClick={() => filterItems(category)}
            className="filter-btn"
          >

            <img width="300px" height="100px" src="https://cdn.yemek.com/mnresize/940/940/uploads/2016/02/sirloin-steak-tarifi.jpg" />
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
