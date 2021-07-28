using HealthNut.Models;
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
    public class GoalsController : ControllerBase
    {
        private readonly IGoalsRepository _goalsRepository;
        private readonly IUserRepository _userRepository;
        public GoalsController(IGoalsRepository goalsRepository, IUserRepository userRepository)
        {
            _goalsRepository = goalsRepository;
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
                var goals = _goalsRepository.GetAllUserGoals(user);
                return Ok(goals);
            }
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var goal = _goalsRepository.GetGoalById(id);
            if (goal == null)
            {
                return NotFound();
            }
            return Ok(goal);
        }

        [HttpPost]
        public IActionResult AddGoal(Goals goal)
        {
            var currentUser = GetCurrentUser();
            goal.UserId = currentUser.Id;

            _goalsRepository.AddGoal(goal);
            return CreatedAtAction("Get", new { id = goal.Id }, goal);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Goals goal)
        {
            var currentUser = GetCurrentUser();
            if (goal.UserId != currentUser.Id)
            {
                return Unauthorized();
            }
            if (id != goal.Id)
            {
                return BadRequest();
            }

            _goalsRepository.UpdateGoal(goal);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _goalsRepository.DeleteGoal(id);
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
