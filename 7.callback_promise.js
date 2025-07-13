/*

A callback is a function passed into another function to execute later, usually after an async operation.
A Promise is an object that represents the result of an async operation. Unlike callbacks, Promises provide chaining, built-in error handling, and avoid issues like callback hell.
**pending**: Initial state

**fulfilled**: Operation completed successfully (✅ resolve called)

**rejected**: Operation failed (❌ reject called)
*/

// 👉 Exercise: Convert this callback-based function to Promise and then to async/await.

// function getUser(id, callback) {
//   setTimeout(() => {
//     callback(null, { id, name: "Warun" });
//   }, 1000);
// }

// Ans: Promise
/*
function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({ id, name: "Warun" });
    }, 1000);
  });
}*/

// getUser(12).then((data) => {
//     console.log(data);
// })

// Ans: Async Await

/*
(async function() {
    const data = await getUser(12);
    console.log(data);
})();*/


// Example: nested callbacks with error handling

/*
function getUser(id, callback) {
  setTimeout(() => {
    if (!id) return callback("User ID is required");
    callback(null, { id, name: "Warun" });
  }, 500);
}

function getOrders(user, callback) {
  setTimeout(() => {
    if (!user) return callback("User not found");
    callback(null, [{ orderId: 101 }, { orderId: 102 }]);
  }, 500);
}

function getShippingStatus(order, callback) {
  setTimeout(() => {
    if (!order) return callback("Order not found");
    callback(null, { orderId: order.orderId, status: "Shipped" });
  }, 500);
}

// Nested callbacks with error handling
getUser(1, (err, user) => {
  if (err) return console.error("Error in getUser:", err);

  console.log("User:", user);

  getOrders(user, (err, orders) => {
    if (err) return console.error("Error in getOrders:", err);

    console.log("Orders:", orders);

    getShippingStatus(orders[0], (err, status) => {
      if (err) return console.error("Error in getShippingStatus:", err);

      console.log("Shipping Status:", status);
    });
  });
});*/



// Example: Promises with error handling

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!id) return reject("User ID is required");
      resolve({ id, name: "Warun" });
    }, 500);
  });
}

function getOrders(user) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!user) return reject("User not found");
      resolve([{ orderId: 101 }, { orderId: 102 }]);
    }, 500);
  });
}

function getShippingStatus(order) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!order) return reject("Order not found");
      resolve({ orderId: order.orderId, status: "Shipped" });
    }, 500);
  });
}

// Promise chaining
/*
getUser(1)
  .then((user) => {
    console.log("User:", user);
    return getOrders(user).catch(err => {
      throw new Error("getOrders failed: " + err);
    });
  })
  .then((orders) => {
    console.log("Orders:", orders);
    return getShippingStatus(orders[0]).catch(err => {
      throw new Error("getShippingStatus failed: " + err);
    });
  })
  .then((status) => {
    console.log("Shipping Status:", status);
  })
  .catch((err) => {
    console.error("❌ Error:", err.message);
  });*/

(async function () {
  let user, orders, shippingStatus;

  try {
    user = await getUser(1);
    console.log("User:", user);
  } catch (err) {
    console.error("getUser failed:", err);
    return;
  }

  try {
    orders = await getOrders(user);
    console.log("Orders:", orders);
  } catch (err) {
    console.error("getOrders failed:", err);
    return;
  }

  try {
    shippingStatus = await getShippingStatus(orders[0]);
    console.log("Shipping Status:", shippingStatus);
  } catch (err) {
    console.error("getShippingStatus failed:", err);
    return;
  }
})();



