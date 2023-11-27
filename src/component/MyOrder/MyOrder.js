import { useValue } from "../../contextData";
import "../../App.css";
import Style from "./MyOrder.module.css";


function MyOrder() {
    // import all the things from the context Data
    const { myOrders, userName, googleSignIn } = useValue();

    // show the data only for signed user
    const currentUserEmail = userName.userEmail || googleSignIn;
    const userOrders = myOrders.filter(orderItem => orderItem.userEmail === currentUserEmail);

    // import the date year month
    const dateTime = new Date();
    const year = dateTime.getFullYear();
    const month = dateTime.getMonth() + 1;
    const date = dateTime.getDate();

    return (
        <>
        {/* show all the placed order here */}
            <div className="App">
                <h1>Your Orders</h1>
                {userOrders.map((orderItem, index) => {
                // Calculate total for each order
                const total = Object.values(orderItem).reduce((acc, data) => {
                    if (typeof data === 'object' && data !== null && 'itemPrice' in data && 'quantity' in data) {
                        return acc + (data.itemPrice * data.quantity);
                    }
                    return acc;
                }, 0);
                        return(<div key={index}>
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
                                <tfoot>
                            <tr>
                                <td colSpan="3">Total:</td>
                                <td>{total}</td>
                            </tr>
                        </tfoot>

                            </table>
                        </div>
                    );
                    })}
            </div>
        </>
    );
}

export default MyOrder;

