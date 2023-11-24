import { useValue } from "../../contextData";
import "../../App.css";
import Style from "./MyOrder.module.css";

function MyOrder() {
    const { myOrders } = useValue();
    console.log(myOrders)
    const dateTime = new Date();
    const year = dateTime.getFullYear();
    const month = dateTime.getMonth() + 1;
    const date = dateTime.getDate();

    return (
        <>
            <div className="App">
                <h1>Your Orders</h1>
                {myOrders.map((orderItem, index) => (
                    <div key={index}>
                        <h3>Ordered On: {year}-{month}-{date}</h3>
                        <table border="1px" className={Style.table}>
                            <thead className={Style.titleHeading}>
                                <tr>
                                    <th>Title</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.values(orderItem).map((order, id) => (
                                    <tr key={id}>
                                        <td>{order.itemName}</td>
                                        <td>{order.itemPrice}</td>
                                        <td>{order.quantity}</td>
                                        <td>{(order.itemPrice) * (order.quantity)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        </>
    );
}

export default MyOrder;

