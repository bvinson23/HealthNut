using HealthNut.Models;
using System.Collections.Generic;

namespace HealthNut.Repositories
{
    public interface INotesRepository
    {
        void AddNote(Notes note);
        void DeleteNote(int noteId);
        List<Notes> GetAllUserNotes();
        Notes GetNoteById(int id);
        void UpdateNote(Notes note);
    }
}