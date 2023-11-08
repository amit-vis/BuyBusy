
import List from "./List";
import Styles from "./styles.module.css"

export default function App() {
  return (
    <div>
      <h3 className={Styles.title}>Ecommerce Store</h3>
      <List />
    </div>
  );
}
