import "./index.css";

const MenuItem = ({ img, title, price, desc }) => {
  return (
    <div className='menu-item1'>
      <img
        src={img}
        alt={title}
      />
      <div className='menu-item-info'>
        <div className='menu-item-info-title'>
          <span>{title}</span>
          <span>{`${price}₺`}</span>
        </div>
        <div className='menu-item-info-title-content'>
          <span>{desc}</span>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
