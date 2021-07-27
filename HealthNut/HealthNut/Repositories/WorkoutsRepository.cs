﻿using HealthNut.Models;
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
