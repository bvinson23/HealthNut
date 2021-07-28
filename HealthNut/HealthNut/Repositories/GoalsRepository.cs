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
    public class GoalsRepository : BaseRepository, IGoalsRepository
    {
        public GoalsRepository(IConfiguration configuration) : base(configuration) { }

        public List<Goals> GetAllUserGoals(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT g.Id, g.UserId, g.Weight, g.TargetDate, g.DateComplete,
                               u.Name, u.Email
                        FROM Goals g
                        JOIN Users u ON u.Id = g.UserId
                        WHERE u.FirebaseUserId = @FirebaseUserId
                    ";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);
                    var reader = cmd.ExecuteReader();
                    var goals = new List<Goals>();
                    while (reader.Read())
                    {
                        goals.Add(NewGoalFromDb(reader));
                    }

                    reader.Close();

                    return goals;
                }
            }
        }

        public Goals GetGoalById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT g.Id, g.UserId, g.Weight, g.TargetDate, g.DateComplete,
                               u.Name, u.Email
                        FROM Goals g
                        JOIN Users u ON u.Id = g.UserId
                        WHERE g.Id = @Id
                    ";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Goals goal = null;
                    while (reader.Read())
                    {
                        if (goal == null)
                        {
                            goal = NewGoalFromDb(reader);
                        }
                    }

                    reader.Close();

                    return goal;
                }
            }
        }

        public void AddGoal(Goals goal)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Goals (UserId, Weight, TargetDate, DateComplete)
                        OUTPUT INSERTED.ID
                        VALUES (@UserId, @Weight, @TargetDate, @DateComplete)
                    ";

                    DbUtils.AddParameter(cmd, "@UserId", goal.UserId);
                    DbUtils.AddParameter(cmd, "@Weight", goal.Weight);
                    DbUtils.AddParameter(cmd, "@TargetDate", goal.TargetDate);
                    DbUtils.AddParameter(cmd, "@DateComplete", goal.DateComplete);
                    goal.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void UpdateGoal(Goals goal)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Goals
                            SET UserId = @UserId,
                                Weight = @Weight
                                TargetDate = @TargetDate
                                DateComplete = @DateComplete
                        WHERE Id = @Id
                    ";

                    DbUtils.AddParameter(cmd, "@UserId", goal.UserId);
                    DbUtils.AddParameter(cmd, "@Weight", goal.Weight);
                    DbUtils.AddParameter(cmd, "@TargetDate", goal.TargetDate);
                    DbUtils.AddParameter(cmd, "@DateComplete", goal.DateComplete);
                    DbUtils.AddParameter(cmd, "@Id", goal.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteGoal(int goalId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM Goals WHERE Id = @goalId";
                    DbUtils.AddParameter(cmd, "@goalId", goalId);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        private Goals NewGoalFromDb(SqlDataReader reader)
        {
            return new Goals()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                UserId = DbUtils.GetInt(reader, "UserId"),
                Weight = DbUtils.GetInt(reader, "Weight"),
                TargetDate = DbUtils.GetDateTime(reader, "TargetDate"),
                DateComplete = DbUtils.GetDateTime(reader, "DateComplete")
            };
        }
    }
}
