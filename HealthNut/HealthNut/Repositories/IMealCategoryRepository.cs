using HealthNut.Models;
using System.Collections.Generic;

namespace HealthNut.Repositories
{
    public interface IMealCategoryRepository
    {
        List<MealCategories> GetMealCategories();
    }
}