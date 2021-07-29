using HealthNut.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
