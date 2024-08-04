import { useEffect, useMemo, useReducer } from "react";
import Guitar from "./components/Guitar";
import Header from "./components/Header";
import { cartReducer, initialState } from "./reducers/cart-reducer";

function App() {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const isEmpty = useMemo(() => state.cart.length === 0, [state.cart]);
  const cartTotal = useMemo(
    () =>
      state.cart.reduce((total, item) => total + item.quantity * item.price, 0),
    [state.cart]
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <>
      <Header
        cart={state.cart}
        dispatch={dispatch}
        isEmpty={isEmpty}
        cartTotal={cartTotal}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {state.data.map((guitar) => (
            <Guitar key={guitar.id} guitar={guitar} dispatch={dispatch} />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
