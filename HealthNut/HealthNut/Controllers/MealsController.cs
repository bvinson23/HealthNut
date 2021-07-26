using HealthNut.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace HealthNut.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MealsController : ControllerBase
    {
        private readonly IMealsRepository _mealsRepository;
        public MealsController(IMealsRepository mealsRepository)
        {
            _mealsRepository = mealsRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var user = GetCurrentUserProfile();
            if (user == null)
            {
                return Unauthorized();
            }
            else
            {
                var meals = _mealsRepository.GetAllUserMeals(user);
            return Ok(meals);
            }
        }

        private string GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            if (firebaseUserId != null)
            {
                return firebaseUserId;
            }
            else
            {
                return null;
            }
        }
    }
}
