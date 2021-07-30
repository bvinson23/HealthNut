using HealthNut.Models;
using HealthNut.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace HealthNut.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class MealsController : ControllerBase
    {
        private readonly IMealsRepository _mealsRepository;
        private readonly IUserRepository _userRepository;
        public MealsController(IMealsRepository mealsRepository, IUserRepository userRepository)
        {
            _mealsRepository = mealsRepository;
            _userRepository = userRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var user = GetCurrentFirebaseUserId();
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

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var meal = _mealsRepository.GetMealById(id);
            if (meal == null)
            {
                return NotFound();
            }
            return Ok(meal);
        }

        [HttpPost]
        public IActionResult AddMeal(Meals meal)
        {
            var currentUser = GetCurrentUser();
            meal.UserId = currentUser.Id;

            _mealsRepository.AddMeal(meal);
            return CreatedAtAction("Get", new { id = meal.Id }, meal);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Meals meal)
        {
            var currentUser = GetCurrentUser();
            if (meal.UserId != currentUser.Id)
            {
                return Unauthorized();
            }
            if (id != meal.Id)
            {
                return BadRequest();
            }

            _mealsRepository.UpdateMeal(meal);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _mealsRepository.DeleteMeal(id);
            return NoContent();
        }

        private string GetCurrentFirebaseUserId()
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

        private Users GetCurrentUser()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
