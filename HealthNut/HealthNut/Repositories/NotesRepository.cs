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
    public class NotesRepository : BaseRepository
    {
        public NotesRepository(IConfiguration configuration) : base(configuration) { }

        public List<Notes> GetAllUserNotes(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT n.Id, n.UserId, n.DateCreated, n.Content
                               u.Name, u.Email
                        FROM Notes n
                        JOIN Users u ON u.Id = n.UserId
                        WHERE u.FirebaseUserId = @FirebaseUserId
                    ";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);
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
