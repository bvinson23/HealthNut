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
    public class WorkoutsController : ControllerBase
    {
        private readonly IWorkoutsRepository _workoutsRepository;
        private readonly IUserRepository _userRepository;
        public WorkoutsController(IWorkoutsRepository workoutsRepository, IUserRepository userRepository)
        {
            _workoutsRepository = workoutsRepository;
            _userRepository = userRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var workouts = _workoutsRepository.GetAllUserWorkouts();
            return Ok(workouts);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var workout = _workoutsRepository.GetWorkoutById(id);
            if (workout == null)
            {
                return NotFound();
            }
            return Ok(workout);
        }

        [HttpPost]
        public IActionResult AddWorkout(Workouts workout)
        {
            var currentUser = GetCurrentUser();
            workout.UserId = currentUser.Id;

            _workoutsRepository.AddWorkout(workout);
            return CreatedAtAction("Get", new { id = workout.Id }, workout);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Workouts workout)
        {
            var currentUser = GetCurrentUser();
            if (workout.UserId != currentUser.Id)
            {
                return Unauthorized();
            }
            if (id != workout.Id)
            {
                return BadRequest();
            }

            _workoutsRepository.UpdateWorkout(workout);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _workoutsRepository.DeleteWorkout(id);
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
