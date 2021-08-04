using HealthNut.Models;
using HealthNut.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace HealthNut.Repositories
{
    public class WeightRepository : BaseRepository, IWeightRepository
    {
        public WeightRepository(IConfiguration configuration) : base(configuration) { }

        public List<Weight> GetAllUserWeights(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT w.Id, w.UserId, w.CurrentWeight, w.RecordedDate,
                               u.Name, u.Email
                        FROM Weight w
                        JOIN Users u ON u.Id = w.UserId
                        WHERE u.FirebaseUserId = @FirebaseUserId
                    ";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);
                    var reader = cmd.ExecuteReader();
                    var weights = new List<Weight>();
                    while (reader.Read())
                    {
                        weights.Add(NewWeightFromDb(reader));
                    }

                    reader.Close();

                    return weights;
                }
            }
        }

        public Weight GetWeightById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT w.Id, w.UserId, w.CurrentWeight, w.RecordedDate,
                               u.Name, u.Email
                        FROM Weight w
                        JOIN Users u ON u.Id = w.UserId
                        WHERE w.Id = @Id
                    ";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Weight weight = null;
                    while (reader.Read())
                    {
                        if (weight == null)
                        {
                            weight = NewWeightFromDb(reader);
                        }
                    }

                    reader.Close();

                    return weight;
                }
            }
        }

        public Weight GetMostRecentWeight(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT TOP 1 w.Id, w.UserId, w.CurrentWeight, w.RecordedDate,
                               u.Name, u.Email
                        FROM Weight w
                        JOIN Users u ON u.Id = w.UserId
                        WHERE u.FirebaseUserId = @FirebaseUserId
                        ORDER BY w.RecordedDate DESC
                    ";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);
                    var reader = cmd.ExecuteReader();
                    Weight weight = null;
                    while (reader.Read())
                    {
                        if (weight == null)
                        {
                            weight = NewWeightFromDb(reader);
                        }
                    }

                    reader.Close();

                    return weight;
                }
            }
        }

        public void AddWeight(Weight weight)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Weight (UserId, CurrentWeight, RecordedDate)
                        OUTPUT INSERTED.ID
                        VALUES (@UserId, @CurrentWeight, @RecordedDate)
                    ";

                    DbUtils.AddParameter(cmd, "@UserId", weight.UserId);
                    DbUtils.AddParameter(cmd, "@CurrentWeight", weight.CurrentWeight);
                    DbUtils.AddParameter(cmd, "@RecordedDate", weight.RecordedDate);
                    weight.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void UpdateWeight(Weight weight)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Weight
                            SET UserId = @UserId,
                                CurrentWeight = @CurrentWeight,
                                RecordedDate = @RecordedDate
                        WHERE Id = @Id
                    ";

                    DbUtils.AddParameter(cmd, "@UserId", weight.UserId);
                    DbUtils.AddParameter(cmd, "@CurrentWeight", weight.CurrentWeight);
                    DbUtils.AddParameter(cmd, "@RecordedDate", weight.RecordedDate);
                    DbUtils.AddParameter(cmd, "@Id", weight.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteWeight(int weightId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM Weight WHERE Id = @WeightId";
                    DbUtils.AddParameter(cmd, "@WeightId", weightId);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        private Weight NewWeightFromDb(SqlDataReader reader)
        {
            return new Weight()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                UserId = DbUtils.GetInt(reader, "UserId"),
                CurrentWeight = DbUtils.GetInt(reader, "CurrentWeight"),
                RecordedDate = DbUtils.GetDateTime(reader, "RecordedDate")
            };
        }
    }
}
