using HealthNut.Models;
using System.Collections.Generic;

namespace HealthNut.Repositories
{
    public interface IMealsRepository
    {
        void AddMeal(Meals meal);
        void DeleteMeal(int mealId);
        List<Meals> GetAllUserMeals(string firebaseUserId);
        Meals GetMealById(int id);
        void UpdateMeal(Meals meal);
    }
}