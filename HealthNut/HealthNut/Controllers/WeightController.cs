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
    public class WeightController : ControllerBase
    {
        private readonly IWeightRepository _weightRepository;
        private readonly IUserRepository _userRepository;
        public WeightController(IWeightRepository weightRepository, IUserRepository userRepository)
        {
            _weightRepository = weightRepository;
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
                var weights = _weightRepository.GetAllUserWeights(user);
                return Ok(weights);
            }
        }

        [HttpGet("GetRecent")]
        public IActionResult GetMostRecentWeight()
        {
            var user = GetCurrentFirebaseUserId();
            if (user == null)
            {
                return Unauthorized();
            }
            else
            {
                var weight = _weightRepository.GetMostRecentWeight(user);
                return Ok(weight);
            }
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var weight = _weightRepository.GetWeightById(id);
            if (weight == null)
            {
                return NotFound();
            }
            return Ok(weight);
        }

        [HttpPost]
        public IActionResult AddWeight(Weight weight)
        {
            var currentUser = GetCurrentUser();
            weight.UserId = currentUser.Id;
            weight.RecordedDate = DateTime.Now;

            _weightRepository.AddWeight(weight);
            return CreatedAtAction("Get", new { id = weight.Id }, weight);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Weight weight)
        {
            var currentUser = GetCurrentUser();
            if (weight.UserId != currentUser.Id)
            {
                return Unauthorized();
            }
            if (id != weight.Id)
            {
                return BadRequest();
            }

            _weightRepository.UpdateWeight(weight);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _weightRepository.DeleteWeight(id);
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
