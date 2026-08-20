import api from "./api";

export const placeOrder = async (cropId, quantity) => {
  const response = await api.post("/api/orders", {
    cropId: cropId,
    quantity: Number(quantity),
  });

  return response.data;
};

export const getMyOrders = async () => {
  const response = await api.get("/api/orders/my-orders");

  return response.data;
};