function Category({ categories, filterItems, items }) {
  return (
    <div className='btn-container'>
      {categories.map((category, i) => {
        const firstItem = items.find(function (item) {
          return item.category === category;
        });

        if (firstItem)
          return (
            <div
              onClick={() => filterItems(category)}
              style={{ backgroundImage: firstItem.img }}
              className='category-container'
            >
              <img src={firstItem.img} />
              <span>{category}</span>
            </div>
          );
      })}
    </div>
  );
}

export default Category;
