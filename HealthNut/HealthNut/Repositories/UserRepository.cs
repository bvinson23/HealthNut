using HealthNut.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HealthNut.Repositories;
using HealthNut.Utils;

namespace HealthNut.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(IConfiguration configuration) : base(configuration) { }

        public Users CheckUnique(Users user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "Select count(*) From users where Email = @email and Id != @id";
                    cmd.Parameters.AddWithValue("@email", user.Email);
                    cmd.Parameters.AddWithValue("@id", user.Id);
                    var value = cmd.ExecuteScalar();
                    if ((int)value > 0)
                    {
                        user.Email = user.Email + " !!Exists";
                    }
                }
            }
            return user;
        }

        public List<Users> GetAllUsers()
        {
            List<Users> AllUsers = new List<Users>();
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                         SELECT Id, FirebaseUserId, [Name], Email, GoalWeight
                          FROM Users
                    ";
                    var reader = cmd.ExecuteReader();
                    Users user = null;
                    while (reader.Read())
                    {
                        user = new Users()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Email = DbUtils.GetString(reader, "Email"),
                            GoalWeight = DbUtils.GetInt(reader, "GoalWeight"),
                        };
                        AllUsers.Add(user);
                    };
                    conn.Close();
                    return AllUsers;
                }
            }
        }

        public Users GetUserById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                         SELECT Id, FirebaseUserId, Name, Email, GoalWeight
                          FROM Users
                          WHERE Id = @id
                    ";
                    DbUtils.AddParameter(cmd, "@id", id);
                    var reader = cmd.ExecuteReader();
                    Users user = null;
                    while (reader.Read())
                    {
                        user = new Users()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Email = DbUtils.GetString(reader, "Email"),
                            GoalWeight = DbUtils.GetInt(reader, "GoalWeight"),
                        };
                    };
                    conn.Close();
                    return user;
                }
            }
        }

        public Users GetByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, FirebaseUserId, [Name], Email, GoalWeight
                          FROM Users
                         WHERE FirebaseUserId = @FirebaseuserId";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);

                    Users user = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        user = new Users()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Email = DbUtils.GetString(reader, "Email"),
                            GoalWeight = DbUtils.GetInt(reader, "GoalWeight"),
                        };
                    }
                    reader.Close();

                    return user;
                }
            }
        }

        public void Add(Users user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Users ([Name], Email, FirebaseUserId, GoalWeight)
                        OUTPUT INSERTED.ID
                        VALUES (@Name, @Email, @FirebaseUserId, @GoalWeight)
                    ";

                    DbUtils.AddParameter(cmd, "@Name", user.Name);
                    DbUtils.AddParameter(cmd, "@Email", user.Email);
                    DbUtils.AddParameter(cmd, "@FirebaseUserId", user.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@GoalWeight", user.GoalWeight);
                    user.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Users user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Users
                            SET Name = @Name,
                                Email = @Email
                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Name", user.Name);
                    DbUtils.AddParameter(cmd, "@Email", user.Email);
                    DbUtils.AddParameter(cmd, "@Id", user.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Users WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
