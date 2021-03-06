using System;

namespace HealthNut.Models
{
    public class Workouts
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; }
        public int CaloriesBurned { get; set; }
        public string Duration { get; set; }
        public DateTime Date { get; set; }
    }
}
