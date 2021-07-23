using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HealthNut.Models
{
    public class Meals
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; }
        public int Calories { get; set; }
        public int MealCategoryId { get; set; }
    }
}
