using Microsoft.EntityFrameworkCore;
using Domain.Entities;
using System;
using System.Linq;
using System.Threading.Tasks;
using Context;

namespace Service.Services
{
    public class CartService
    {
        private readonly SingularContext _context;

        public CartService(SingularContext context)
        {
            _context = context;
        }
        private int GenerateCartId()
        {
            // You may implement your own logic to generate a unique non-null CartId
            // For simplicity, you can use a random number, or you may use a sequence
            return new Random().Next(1, 9999);
        }
        public async Task<bool> AddToCartAsync(string userEmail, int storeItemId, int quantity)
        {
            try
            {
                // Find the store item by ID
                var storeItem = await _context.StoreItems.FindAsync(storeItemId);

                if (storeItem == null || quantity <= 0)
                {
                    // If the item is not found or quantity is invalid, return false
                    return false;
                }

                // Check if a cart exists for the user
                var cart = await _context.Carts
                    .FirstOrDefaultAsync(c => c.UserName == userEmail);

                if (cart == null)
                {
                    // If the cart doesn't exist, create a new one with a generated CartId
                    cart = new Cart { UserName = userEmail, CartId = GenerateCartId(),
                        StoreItemId = storeItemId,
                        Quantity = quantity,
                    };
                    _context.Carts.Add(cart);
                    // Save changes to the database
                    await _context.SaveChangesAsync();
                    return true;
                }

                // Check if the item is already in the cart
                var existingCartItem = await _context.Carts
                    .Where(c => c.UserName == userEmail && c.StoreItemId == storeItemId)
                    .FirstOrDefaultAsync();

                if (existingCartItem != null)
                {
                    // If the item is already in the cart, update the quantity
                    existingCartItem.Quantity = quantity;
                }
                else
                {
                    // If the item is not in the cart, add a new cart item
                    _context.Carts.Add(new Cart
                    {
                        UserName = userEmail,
                        StoreItemId = storeItemId,
                        Quantity = quantity,
                        CartId = GenerateCartId()
                    });
                }

                // Save changes to the database
                await _context.SaveChangesAsync();

                // Return true to indicate successful addition to the cart
                return true;
            }
            catch (Exception)
            {
                // Handle any exceptions, log them, and return false
                return false;
            }
        }

        public async Task<bool> RemoveFromCartAsync(string userEmail, int storeItemId)
        {
            try
            {
                var cartItem = await _context.Carts
                    .Where(c => c.UserName == userEmail && c.StoreItemId == storeItemId)
                    .FirstOrDefaultAsync();

                if (cartItem != null)
                {
                    // Remove the item from the cart
                    _context.Carts.Remove(cartItem);
                    await _context.SaveChangesAsync();
                    return true;
                }

                // Item not found in the cart
                return false;
            }
            catch (Exception)
            {
                // Handle any exceptions, log them, and return false
                return false;
            }
        }

        public class CartWithStoreItemDTO
        {
            public Cart CartItem { get; set; }
            public StoreItem StoreItem { get; set; }
        }

        public async Task<List<CartWithStoreItemDTO>> GetCartAsync(string userEmail)
        {
            try
            {
                // Fetch the cart items for the specified user
                var cartItems = await _context.Carts
                    .Where(c => c.UserName == userEmail)
                    .ToListAsync();

                // Create a list to hold the combined information
                var cartWithStoreItems = new List<CartWithStoreItemDTO>();

                // Iterate through each cart item and fetch store item details
                foreach (var cartItem in cartItems)
                {
                    // Find the store item by ID
                    var storeItem = await _context.StoreItems.FindAsync(cartItem.StoreItemId);

                    // Check if the store item exists
                    if (storeItem != null)
                    {
                        // Create a DTO with both cart and store item information
                        var cartWithStoreItemDTO = new CartWithStoreItemDTO
                        {
                            CartItem = cartItem,
                            StoreItem = storeItem
                        };

                        // Add the DTO to the list
                        cartWithStoreItems.Add(cartWithStoreItemDTO);
                    }
                }

                return cartWithStoreItems;
            }
            catch (Exception)
            {
                // Handle any exceptions, log them, and return an empty list
                return new List<CartWithStoreItemDTO>();
            }
        }

    }
}
