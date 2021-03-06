export const addGuestCartItem = (product, quantity) => {
  console.log("product", product);
  if (window.localStorage.getItem("guest_cart")) {
    const gcToken = window.localStorage.getItem("guest_cart");
    const guestCart = JSON.parse(gcToken);
    console.log("GC", guestCart);
    const dup = guestCart.find((item) => item.product.id === product.id);
    console.log("dup", dup);
    if (dup) {
      dup.quantity += parseInt(quantity);
      guestCart.map((item) => {
        if (item.product.id === dup.product.id) {
          return dup;
        } else {
          return item;
        }
      });

      window.localStorage.setItem("guest_cart", JSON.stringify(guestCart));
    } else {
      guestCart.push({ product, quantity });
      window.localStorage.setItem("guest_cart", JSON.stringify(guestCart));
    }
  } else {
    window.localStorage.setItem(
      "guest_cart",
      JSON.stringify([{ product, quantity }])
    );
  }

  // console.log(window.localStorage.getItem("guest_cart"));
  //check local storage for cart
  //if there is a cart, json.parse the cart, then add to that, set the local storage with the new state of the cart
  //if no cart, set a cart with an array/ object of that item
  //instead of communicating with DB we commun with local storage --> local is new backend
  //grab guest cart from localstorage, instead of DB, then add it to the store
  //local storage is new DB
  //need to be able to CRUD localy stored cart (create, read, update (quantity), destroy)
};
