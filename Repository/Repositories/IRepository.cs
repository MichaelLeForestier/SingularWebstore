using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Repository.Repositories
{
    public interface IRepository<TEntity, TType> where TEntity : class
    {
        // Retrieve a single entity by its ID
        TEntity GetById(TType id);

        // Retrieve all entities
        IEnumerable<TEntity> GetAll();

        // Retrieve entities based on a predicate
        IEnumerable<TEntity> Find(Expression<Func<TEntity, bool>> predicate);

        // Create a new entity
        void Add(TEntity entity);

        // Create multiple entities
        void AddRange(IEnumerable<TEntity> entities);

        // Update an existing entity
        void Update(TEntity entity);

        // Update multiple existing entities
        void UpdateRange(IEnumerable<TEntity> entities);

        // Delete an entity
        void Delete(TEntity entity);

        // Delete multiple entities
        void DeleteRange(IEnumerable<TEntity> entities);
    }
}
