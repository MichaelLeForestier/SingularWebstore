using Context;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Service.Services; // Import your StoreItemService
using System;
using System.Threading.Tasks;
using Service.Service;
using Services;

namespace SingularStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoreItemsController : ControllerBase
    {
        private readonly SingularContext _context;
        private readonly StoreItemService _storeItemService; // Inject StoreItemService

        public StoreItemsController(SingularContext context, StoreItemService storeItemService)
        {
            _context = context;
            _storeItemService = storeItemService; // Initialize the StoreItemService
        }

        /// <summary>
        /// Create a new store item.
        /// </summary>
        /// <param name="storeItem">The store item to create.</param>
        [HttpPost("Create")]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(StoreItem))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> CreateStoreItem([FromBody] StoreItem storeItem)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    // Use the StoreItemService to create the store item
                    var createdStoreItem = await _storeItemService.CreateStoreItemAsync(storeItem);

                    // Return the created item
                    return CreatedAtAction("GetStoreItem", new { id = createdStoreItem.StoreItemId }, createdStoreItem);
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (DbUpdateException)
            {
                // Handle any potential database errors here
                return StatusCode(500, "Unable to save changes. Try again, and if the problem persists, see your system administrator.");
            }
        }


        /// <summary>
        /// Get store items with optional filters.
        /// </summary>
        /// <param name="searchString">Search string to filter by item title.</param>
        /// <param name="minPrice">Minimum price to filter by.</param>
        /// <param name="maxPrice">Maximum price to filter by.</param>
        [HttpGet("GetStoreItems")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<StoreItem>))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetStoreItems(
            [FromQuery] string? searchString = null,
            [FromQuery] decimal? minPrice = null,
            [FromQuery] decimal? maxPrice = null)
        {
            try
            {
                var storeItems = await _storeItemService.GetStoreItemsAsync(searchString, minPrice, maxPrice);
                return Ok(storeItems);
            }
            catch (Exception ex)
            {
                // Handle any exceptions here
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
    }
}
