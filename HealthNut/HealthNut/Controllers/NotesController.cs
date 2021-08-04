using HealthNut.Models;
using HealthNut.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;

namespace HealthNut.Controllers
{
    [Authorize]
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
            var notes = _notesRepository.GetAllUserNotes(user);
            return Ok(notes);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var note = _notesRepository.GetNoteById(id);
            if (note == null)
            {
                return NotFound();
            }
            return Ok(note);
        }

        [HttpPost]
        public IActionResult AddNote(Notes note)
        {
            var currentUser = GetCurrentUser();
            note.UserId = currentUser.Id;
            note.DateCreated = DateTime.Now;

            _notesRepository.AddNote(note);
            return CreatedAtAction("Get", new { id = note.Id }, note);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Notes note)
        {
            var currentUser = GetCurrentUser();
            if (note.UserId != currentUser.Id)
            {
                return Unauthorized();
            }
            if (id != note.Id)
            {
                return BadRequest();
            }

            _notesRepository.UpdateNote(note);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _notesRepository.DeleteNote(id);
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
