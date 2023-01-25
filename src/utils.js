export function getItemCount(cartItem) {
    return cartItem.reduce((count, cartItem) => cartItem.quantity + count, 0);
}

export function calculateSubtotal(cartItem) {
    return cartItem.reduce((sum, { product, quantity }) => product.price * quantity + sum, 0);
}