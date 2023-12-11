using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace Domain.Entities
{
    public class Cart
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CartId { get; set; }

        [Required]
        public string UserName { get; set; }

        [Required]
        public int StoreItemId { get; set; }

        [Required]
        public int Quantity { get; set; }

        // You can add other properties or relationships as needed
    }


}
