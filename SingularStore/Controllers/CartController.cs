using Microsoft.AspNetCore.Mvc;
using Service.Services;
using System.Threading.Tasks;

namespace SingularStore.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartController : ControllerBase
    {
        private readonly CartService _cartService;

        public CartController(CartService cartService)
        {
            _cartService = cartService;
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddToCart(string userEmail, int storeItemId, int quantity)
        {
            var success = await _cartService.AddToCartAsync(userEmail, storeItemId, quantity);

            if (success)
            {
                return Ok(new { Message = "Item added to the cart successfully." });
            }

            return BadRequest(new { Message = "Failed to add item to the cart." });
        }

        [HttpDelete("remove")]
        public async Task<IActionResult> RemoveFromCart(string userEmail, int storeItemId)
        {
            var success = await _cartService.RemoveFromCartAsync(userEmail, storeItemId);

            if (success)
            {
                return Ok(new { Message = "Item removed from the cart successfully." });
            }

            return BadRequest(new { Message = "Failed to remove item from the cart." });
        }

    
        [HttpGet("get-cart")]
        public async Task<IActionResult> GetCart(string userEmail)
        {
            try
            {
                var cartItems = await _cartService.GetCartAsync(userEmail);

                if (cartItems != null && cartItems.Any())
                {
                    // Assuming 'cartItems' is a list of Cart entities
                    // You may need to project this to a DTO if needed
                    return Ok(new { Message = "Cart fetched successfully.", CartItems = cartItems });
                }

                return NotFound(new { Message = "Cart not found or is empty." });
            }
            catch (Exception)
            {
                // Log the exception
                return StatusCode(500, new { Message = "Internal server error." });
            }
        }
    }
}
