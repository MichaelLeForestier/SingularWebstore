using Domain.Entities;
using Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Service
{
    public class UserService
    {
        private readonly IRepository<EmployeeUser, string> _userRepo;
        public UserService(IRepository<EmployeeUser, string> userRepo)
        {
            _userRepo = userRepo;
        }

        public List<EmployeeUser> GetAll()
        {
            return _userRepo.GetAll().ToList();
        }

    }
}
