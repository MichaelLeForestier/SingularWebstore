using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SingularStore.Controllers
{

    [ApiController]
    [Authorize]
    public class HomeController : ControllerBase
    {
        private readonly UserManager<EmployeeUser> _userManager;

        public HomeController(UserManager<EmployeeUser> userManager)
        {
            _userManager = userManager;
        }

        public EmployeeUser LoggedInUser
        {
            get
            {
                var user = _userManager.Users.FirstOrDefault(u => u.UserName == User.Identity.Name);
                return user;
            }
        }

    }
}
