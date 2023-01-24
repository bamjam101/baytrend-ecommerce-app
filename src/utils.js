export function getItemCount(cartItem) {
    return cartItem.reduce((count, cartItem) => cartItem.quantity + count, 0);
}