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
    public class WorkoutsRepository : BaseRepository
    {
        public WorkoutsRepository(IConfiguration configuration) : base(configuration) { }

        public List<Workouts> GetAllUserWorkouts(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT w.Id, w.UserId, w.[Name], w.CaloriesBurned, w.Duration,
                               u.Name AS UserName, u.Email
                        FROM Workouts w
                        JOIN Users u ON u.Id = w.UserId
                        WHERE u.FirebaseUserId = @FirebaseUserId
                    ";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);
                    var reader = cmd.ExecuteReader();
                    var workouts = new List<Workouts>();
                    while (reader.Read())
                    {
                        workouts.Add(NewWorkoutFromDb(reader));
                    }

                    reader.Close();

                    return workouts;
                }
            }
        }

        public Workouts GetWorkoutById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT w.Id, w.UserId, w.[Name], w.CaloriesBurned, w.Duration,
                               u.Name AS UserName, u.Email
                        FROM Workouts w
                        JOIN Users u ON u.Id = w.UserId
                        WHERE w.Id = @Id
                    ";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Workouts workout = null;
                    while (reader.Read())
                    {
                        if (workout == null)
                        {
                            workout = NewWorkoutFromDb(reader);
                        }
                    }

                    reader.Close();

                    return workout;
                }
            }
        }

        public void AddWorkout(Workouts workout)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Workouts (UserId, Name, CaloriesBurned, Duration)
                        OUTPUT INSERTED.ID
                        VALUES (@UserId, @Name, @CaloriesBurned, @Duration)
                    ";

                    DbUtils.AddParameter(cmd, "@UserId", workout.UserId);
                    DbUtils.AddParameter(cmd, "@Name", workout.Name);
                    DbUtils.AddParameter(cmd, "@CaloriesBurned", workout.CaloriesBurned);
                    DbUtils.AddParameter(cmd, "@Duration", workout.Duration);
                    workout.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void UpdateWorkout(Workouts workout)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Workouts
                            SET UserId = @UserId,
                                Name = @Name,
                                CaloriesBurned = @CaloriesBurned,
                                Duration = @Duration
                        WHERE Id = @Id
                    ";

                    DbUtils.AddParameter(cmd, "@UserId", workout.UserId);
                    DbUtils.AddParameter(cmd, "@Name", workout.Name);
                    DbUtils.AddParameter(cmd, "@CaloriesBurned", workout.CaloriesBurned);
                    DbUtils.AddParameter(cmd, "@Duration", workout.Duration);
                    DbUtils.AddParameter(cmd, "@Id", workout.Id);

                    cmd.ExecuteNonQuery();
                }    
            }
        }

        private Workouts NewWorkoutFromDb(SqlDataReader reader)
        {
            return new Workouts()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                UserId = DbUtils.GetInt(reader, "UserId"),
                Name = DbUtils.GetString(reader, "Name"),
                CaloriesBurned = DbUtils.GetInt(reader, "CaloriesBurned"),
                Duration = DbUtils.GetInt(reader, "Duration")
            };
        }
    }
}
