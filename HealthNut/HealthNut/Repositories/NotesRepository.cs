using HealthNut.Models;
using HealthNut.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HealthNut.Repositories
{
    public class NotesRepository : BaseRepository, INotesRepository
    {
        public NotesRepository(IConfiguration configuration) : base(configuration) { }

        public List<Notes> GetAllUserNotes()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT n.Id, n.UserId, n.DateCreated, n.Content,
                               u.Name, u.Email
                        FROM Notes n
                        JOIN Users u ON u.Id = n.UserId
                        ORDER BY n.Id DESC
                    ";

                    var reader = cmd.ExecuteReader();
                    var notes = new List<Notes>();
                    while (reader.Read())
                    {
                        notes.Add(NewNoteFromDb(reader));
                    }

                    reader.Close();

                    return notes;
                }
            }
        }

        public Notes GetNoteById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT n.Id, n.UserId, n.DateCreated, n.Content,
                               u.Name, u.Email
                        FROM Notes n
                        JOIN Users u ON u.Id = n.UserId
                        WHERE n.Id = @Id
                    ";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Notes note = null;
                    while (reader.Read())
                    {
                        if (note == null)
                        {
                            note = NewNoteFromDb(reader);
                        }
                    }

                    reader.Close();

                    return note;
                }
            }
        }

        public void AddNote(Notes note)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Notes (UserId, DateCreated, Content)
                        OUTPUT INSERTED.ID
                        VALUES (@UserId, @DateCreated, @Content)
                    ";

                    DbUtils.AddParameter(cmd, "@UserId", note.UserId);
                    DbUtils.AddParameter(cmd, "@DateCreated", note.DateCreated);
                    DbUtils.AddParameter(cmd, "@Content", note.Content);
                    note.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void UpdateNote(Notes note)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Notes
                            SET UserId = @UserId,
                                DateCreated = @DateCreated,
                                Content = @Content
                        WHERE Id = @Id
                    ";

                    DbUtils.AddParameter(cmd, "@UserId", note.UserId);
                    DbUtils.AddParameter(cmd, "@DateCreated", note.DateCreated);
                    DbUtils.AddParameter(cmd, "@Content", note.Content);
                    DbUtils.AddParameter(cmd, "@Id", note.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteNote(int noteId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM Notes WHERE Id = @noteId";
                    DbUtils.AddParameter(cmd, "@noteId", noteId);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        private Notes NewNoteFromDb(SqlDataReader reader)
        {
            return new Notes()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                UserId = DbUtils.GetInt(reader, "UserId"),
                DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                Content = DbUtils.GetString(reader, "Content")
            };
        }
    }
}
