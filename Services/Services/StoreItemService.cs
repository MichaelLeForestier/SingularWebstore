using Context;
using Domain.Entities; // Import your domain entity class
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Service.Services
{
    public class StoreItemService
    {
        private readonly SingularContext _context;

        public StoreItemService(SingularContext context)
        {
            _context = context;
        }

        public async Task<StoreItem> CreateStoreItemAsync(StoreItem storeItem)
        {
            if (storeItem == null)
            {
                throw new ArgumentNullException(nameof(storeItem));
            }

            // Optionally perform additional business logic/validation here

            // Add the new item to the database
            _context.StoreItems.Add(storeItem);
            await _context.SaveChangesAsync();

            return storeItem;
        }

        public async Task<IEnumerable<StoreItem>> GetStoreItemsAsync(string? searchString = null, decimal? minPrice = null, decimal? maxPrice = null)
        {
            // Get all products from the StoreItem table
            var query = _context.StoreItems.AsQueryable();

            // Apply filters based on the provided parameters
            // Filter by title if searchString is provided
            if (!string.IsNullOrEmpty(searchString))
            {
                // Use EF.Functions.Like to perform SQL-like query for string matching
                query = query.Where(s => EF.Functions.Like(s.Title, $"%{searchString}%"));
            }
            if (minPrice.HasValue)
            {
                query = query.Where(p => p.Price >= minPrice.Value);
            }

            if (maxPrice.HasValue)
            {
                query = query.Where(p => p.Price <= maxPrice.Value);
            }

            // Execute the query and return the results
            return await query.ToListAsync();
        }
        public async Task<bool> DeleteStoreItemAsync(int storeItemId)
        {
            // Find the store item by ID
            var storeItem = await _context.StoreItems.FindAsync(storeItemId);

            if (storeItem == null)
            {
                // If the item is not found, return false
                return false;
            }

            try
            {
                // Remove the store item from the context
                _context.StoreItems.Remove(storeItem);

                // Save changes to the database
                await _context.SaveChangesAsync();

                // Return true to indicate successful deletion
                return true;
            }
            catch (Exception)
            {
                // Handle any exceptions, log them, and return false
                return false;
            }
        }


    }

}
