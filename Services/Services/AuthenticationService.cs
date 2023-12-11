using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Domain.DTO;
using Domain.Entities; // Import your domain entities
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Services
{
    public class AuthenticationService
    {
        private readonly UserManager<EmployeeUser> _userManager;
        private readonly IConfiguration _configuration;

        public AuthenticationService(UserManager<EmployeeUser> userManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _configuration = configuration;
        }

        public async Task<string> Register(RegisterDto request)
        {
            var userByEmail = await _userManager.FindByEmailAsync(request.Email);
            
            if (userByEmail is not null)
            {
                throw new ArgumentException($"User with email {request.Email} already exists.");
            }

            EmployeeUser user = new()
            {
                UserName=request.Email,
                Email = request.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                FirstName = request.Name,
                LastName= request.Surname,
                Password=request.Password,
                AddressType=request.AddressType,
                StreetAddress=request.StreetAddress,
                Suburb=request.Suburb,
                City=request.CityTown,
                PostalCode=request.PostalCode,
                PhoneNumber=request.PhoneNumber
        // Add additional properties like Name, Surname, etc., as needed
    };

            var result = await _userManager.CreateAsync(user, request.Password);

            if (!result.Succeeded)
            {
                throw new ArgumentException($"Unable to register user {request.Email} errors: {GetErrorsText(result.Errors)}");
            }

            return await Login(new LoginDto { Email = request.Email, Password = request.Password });
        }

        public async Task<string> Login(LoginDto request)
        {
            var user = await _userManager.FindByNameAsync(request.Email);

            if (user is null)
            {
                user = await _userManager.FindByEmailAsync(request.Email);
            }

            if (user is null || !await _userManager.CheckPasswordAsync(user, request.Password))
            {
                throw new ArgumentException($"Unable to authenticate user {request.Email}");
            }

            var authClaims = new List<Claim>
            {
                new(ClaimTypes.Email, user.Email),
                new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                // Add additional claims as needed
            };

            var token = GetToken(authClaims);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private JwtSecurityToken GetToken(IEnumerable<Claim> authClaims)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddHours(3),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256));

            return token;
        }

        private string GetErrorsText(IEnumerable<IdentityError> errors)
        {
            return string.Join(", ", errors.Select(error => error.Description).ToArray());
        }
    }
}
