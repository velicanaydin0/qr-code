import MenuItem from "./menuItem/MenuItem";

function Menu({ items }) {
  if (!items || (items && Number(items.length) < 1)) {
    return null;
  }

  return (
    <div className='menu-list-container'>
      {items.map((item, i) => {
        const tempItem = item.data || item;
        return (
          <MenuItem
            key={i.toString()}
            {...tempItem}
          />
        );
      })}
    </div>
  );
}

export default Menu;
