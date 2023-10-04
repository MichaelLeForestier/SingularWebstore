using Microsoft.AspNetCore.Identity;
using System;

namespace Domain.Entities
{
    public class EmployeeUser : IdentityUser
    {

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }

        public string Password { get; set; }
        public string AddressType { get; set; }
        public string StreetAddress { get; set; }
        public string Suburb { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }
        public string PhoneNumber { get; set; }

    }
}
