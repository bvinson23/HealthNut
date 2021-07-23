using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HealthNut.Models
{
    public class Users
    {
        public int Id { get; set; }
        public string FirebaseUserId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
    }
}
