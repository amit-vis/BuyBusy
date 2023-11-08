import Listitem from "./item.module.css";

export default function Item({ item }) {
  return (
    <div className={Listitem.container}>
      <h3 className={Listitem.title}>{item.title}</h3>
      <img src={item.image} alt={item.title} className={Listitem.image} />
      <p>
        <strong className={Listitem.price}>${item.price}</strong>
      </p>
      <p>{item.description}</p>
    </div>
  );
}
