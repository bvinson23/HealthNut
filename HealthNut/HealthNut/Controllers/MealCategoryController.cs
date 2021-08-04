using HealthNut.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace HealthNut.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MealCategoryController : ControllerBase
    {
        private readonly IMealCategoryRepository _mealCategoryRepository;
        public MealCategoryController(IMealCategoryRepository mealCategoryRepository)
        {
            _mealCategoryRepository = mealCategoryRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var categories = _mealCategoryRepository.GetMealCategories();
            return Ok(categories);
        }
    }
}
