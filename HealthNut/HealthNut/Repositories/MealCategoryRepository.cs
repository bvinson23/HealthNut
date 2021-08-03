using HealthNut.Models;
using HealthNut.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace HealthNut.Repositories
{
    public class MealCategoryRepository : BaseRepository, IMealCategoryRepository
    {
        public MealCategoryRepository(IConfiguration configuration) : base(configuration) { }

        public List<MealCategories> GetMealCategories()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, [Name] FROM MealCategories";

                    var reader = cmd.ExecuteReader();
                    var categories = new List<MealCategories>();
                    while (reader.Read())
                    {
                        categories.Add(NewCategoryFromDb(reader));
                    }

                    reader.Close();

                    return categories;
                }
            }
        }

        private MealCategories NewCategoryFromDb(SqlDataReader reader)
        {
            return new MealCategories()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Name = DbUtils.GetString(reader, "Name"),
            };
        }
    }
}
