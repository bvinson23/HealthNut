using System;

namespace HealthNut.Models
{
    public class Notes
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateTime DateCreated { get; set; }
        public string Content { get; set; }
    }
}
