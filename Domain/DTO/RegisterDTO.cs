using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Domain.DTO
{
    public class RegisterDto
    {

        [Required(ErrorMessage = "The Email field is required.")]
        [EmailAddress(ErrorMessage = "Invalid email address.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "The Password field is required.")]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} and at most {1} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        [DataType(DataType.Password)]
        public string ConfirmPassword { get; set; }

        [Required(ErrorMessage = "The Name field is required.")]
        public string Name { get; set; }

        [Required(ErrorMessage = "The Surname field is required.")]
        public string Surname { get; set; }

        [Required(ErrorMessage = "The Address Type field is required.")]
        public string AddressType { get; set; }

        [Required(ErrorMessage = "The Street Address field is required.")]
        public string StreetAddress { get; set; }

        [Required(ErrorMessage = "The Suburb field is required.")]
        public string Suburb { get; set; }

        [Required(ErrorMessage = "The City/Town field is required.")]
        public string CityTown { get; set; }

        [Required(ErrorMessage = "The Postal Code field is required.")]
        [RegularExpression(@"^\d{4,5}$", ErrorMessage = "Invalid postal code. Must be 5 digits.")]
        public string PostalCode { get; set; }
        [Required(ErrorMessage = "The Phone Number field is required.")]
        [Phone(ErrorMessage = "Invalid phone number.")]
        public string PhoneNumber { get; set; }
    }
}
