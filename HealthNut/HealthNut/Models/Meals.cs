using System;

namespace HealthNut.Models
{
    public class Meals
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; }
        public int Calories { get; set; }
        public int MealCategoryId { get; set; }
        public MealCategories MealCategory { get; set; }
        public DateTime MealDate { get; set; }
    }
}
