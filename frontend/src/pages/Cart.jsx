import { useDispatch, useSelector } from "react-redux";
import { asyncUpdateUser } from "../store/actions/userAction";

const Cart = () => {
  const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();

  const IncreaseCartHandler = (index, c) => {
    const copyUser = { ...user, cart: [...user.cart] };
    copyUser.cart[index] = {
      product: c.product,
      quantity: copyUser.cart[index].quantity + 1,
    };
    dispatch(asyncUpdateUser(copyUser.id, copyUser));
  };

  const DecreaseCartHandler = (index, product) => {
    const copyUser = { ...user, cart: [...user.cart] };
    if (copyUser.cart[index].quantity > 1) {
      copyUser.cart[index] = {
        product: product.product,
        quantity: copyUser.cart[index].quantity - 1,
      };
    } else {
      copyUser.cart.splice(index, 1); // Remove item from cart
    }
    dispatch(asyncUpdateUser(copyUser.id, copyUser));
  };

  const renderCart =
    user?.cart?.length > 0 ? (
      user.cart.map((c, index) => {
        return (
          <div key={c.product.id} className="p-2 flex bg-red-200 rounded-xl">
            <div className="flex w-[80%]  p-2 gap-5 rounded">
              <img
                className="w-[100px] h-[100px] object-cover"
                src={c.product.image}
                alt=""
              />
              <div>
                <h1 className="text-3xl text-red-500">{c.product.title}</h1>
                <h1>{c.product.description}</h1>
                <h1>{c.product.category}</h1>
              </div>
            </div>
            <div className="w-[20%]">
              <p className="text-center">
                <button
                  className="text-3xl cursor-pointer"
                  onClick={() => DecreaseCartHandler(index, c)}
                >
                  -
                </button>

                <span className="bg-[#808080c3] p-1 rounded mx-2">
                  {c.quantity}
                </span>

                <button
                  className="text-3xl cursor-pointer"
                  onClick={() => IncreaseCartHandler(index, c)}
                >
                  +
                </button>
              </p>
            </div>
          </div>
        );
      })
    ) : (
      <h1>Cart is empty</h1>
    );

  return (
    <div
      className="flex
  flex-col gap-5 p-3"
    >
      {renderCart}
    </div>
  );
};

export default Cart;
