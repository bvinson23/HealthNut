using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HealthNut.Models
{
    public class Weight
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int CurrentWeight { get; set; }
        public DateTime RecordedDate { get; set; }
    }
}
