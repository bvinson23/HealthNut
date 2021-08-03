using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HealthNut.Models
{
    public class Workouts
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; }
        public int CaloriesBurned { get; set; }
        public int Duration { get; set; }
        public DateTime Date { get; set; }
    }
}
