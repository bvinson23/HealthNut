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
    public class NotesController : ControllerBase
    {
        private readonly INotesRepository _notesRepository;
        private readonly IUserRepository _userRepository;
        public NotesController(INotesRepository notesRepository, IUserRepository userRepository)
        {
            _notesRepository = notesRepository;
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
                var notes = _notesRepository.GetAllUserNotes(user);
                return Ok(notes);
            }
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
