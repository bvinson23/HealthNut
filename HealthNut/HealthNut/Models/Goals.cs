using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HealthNut.Models
{
    public class Goals
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Description { get; set; }
        public DateTime TargetDate { get; set; }
        public DateTime DateComplete { get; set; }
    }
}
