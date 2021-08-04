using HealthNut.Models;
using HealthNut.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace HealthNut.Repositories
{
    public class WorkoutsRepository : BaseRepository, IWorkoutsRepository
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
                        SELECT TOP 4 w.Id, w.UserId, w.[Name], w.CaloriesBurned, w.Duration, w.Date,
                               u.Name AS UserName, u.Email
                        FROM Workouts w
                        JOIN Users u ON u.Id = w.UserId
                        WHERE u.FirebaseUserId = @FirebaseUserId
                        ORDER BY w.Date DESC
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
                        SELECT w.Id, w.UserId, w.[Name], w.CaloriesBurned, w.Duration, w.Date,
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
                        INSERT INTO Workouts (UserId, Name, CaloriesBurned, Duration, Date)
                        OUTPUT INSERTED.ID
                        VALUES (@UserId, @Name, @CaloriesBurned, @Duration, @Date)
                    ";

                    DbUtils.AddParameter(cmd, "@UserId", workout.UserId);
                    DbUtils.AddParameter(cmd, "@Name", workout.Name);
                    DbUtils.AddParameter(cmd, "@CaloriesBurned", workout.CaloriesBurned);
                    DbUtils.AddParameter(cmd, "@Duration", workout.Duration);
                    DbUtils.AddParameter(cmd, "@Date", workout.Date);
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
                                Duration = @Duration,
                                Date = @Date
                        WHERE Id = @Id
                    ";

                    DbUtils.AddParameter(cmd, "@UserId", workout.UserId);
                    DbUtils.AddParameter(cmd, "@Name", workout.Name);
                    DbUtils.AddParameter(cmd, "@CaloriesBurned", workout.CaloriesBurned);
                    DbUtils.AddParameter(cmd, "@Duration", workout.Duration);
                    DbUtils.AddParameter(cmd, "@Date", workout.Date);
                    DbUtils.AddParameter(cmd, "@Id", workout.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteWorkout(int workoutId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM Workouts WHERE Id = @workoutId";
                    DbUtils.AddParameter(cmd, "@workoutId", workoutId);
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
                Duration = DbUtils.GetString(reader, "Duration"),
                Date = DbUtils.GetDateTime(reader, "Date"),
            };
        }
    }
}
