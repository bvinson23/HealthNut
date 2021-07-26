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
    public class MealsRepository : BaseRepository, IMealsRepository
    {
        public MealsRepository(IConfiguration configuration) : base(configuration) { }

        public List<Meals> GetAllUserMeals(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT m.Id, m.UserId, m.[Name], m.Calories, m.MealCategoryId,
                               mc.Name AS CategoryName,
                               u.Name AS UserName, u.Email
                        FROM Meals m
                        JOIN MealCategories mc on mc.Id = m.MealCategoryId
                        JOIN Users u ON u.Id = m.UserId
                        WHERE u.FirebaseUserId = @FirebaseUserId
                    ";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);
                    var reader = cmd.ExecuteReader();
                    var meals = new List<Meals>();
                    while (reader.Read())
                    {
                        meals.Add(NewMealFromDb(reader));
                    }

                    reader.Close();

                    return meals;
                }
            }
        }

        public Meals GetMealById(int id, string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT m.Id, m.UserId, m.[Name], m.Calories, m.MealCategoryId,
                               mc.Name AS CategoryName,
                               u.Name AS UserName, u.Email
                        FROM Meals m
                        JOIN MealCategories mc on mc.Id = m.MealCategoryId
                        JOIN Users u ON u.Id = m.UserId
                        WHERE m.Id = @Id AND u.FirebaseUserId = @FirebaseUserId
                    ";

                    DbUtils.AddParameter(cmd, "@Id", id);
                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);

                    var reader = cmd.ExecuteReader();

                    Meals meal = null;
                    while (reader.Read())
                    {
                        if (meal == null)
                        {
                            meal = NewMealFromDb(reader);
                        }
                    }

                    reader.Close();

                    return meal;
                }
            }
        }

        public void AddMeal(Meals meal)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Meals (UserId, Name, Calories, MealCategoryId)
                        OUTPUT INSERTED.ID
                        VALUES (@UserId, @Name, @Calories, @MealCategoryId)
                    ";

                    DbUtils.AddParameter(cmd, "@UserId", meal.UserId);
                    DbUtils.AddParameter(cmd, "@Name", meal.Name);
                    DbUtils.AddParameter(cmd, "@Calories", meal.Calories);
                    DbUtils.AddParameter(cmd, "@MealCategoryId", meal.MealCategoryId);
                    meal.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void UpdateMeal(Meals meal)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Meals
                            SET UserId = @UserId,
                                Name = @Name,
                                Calories = @Calories,
                                MealCategoryId = @MealCategoryId
                        WHERE Id = @Id
                    ";

                    DbUtils.AddParameter(cmd, "@UserId", meal.UserId);
                    DbUtils.AddParameter(cmd, "@Name", meal.Name);
                    DbUtils.AddParameter(cmd, "@Calories", meal.Calories);
                    DbUtils.AddParameter(cmd, "@MealCategoryId", meal.MealCategoryId);
                    DbUtils.AddParameter(cmd, "@Id", meal.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteMeal(int mealId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM Meals WHERE Id = @mealId";
                    DbUtils.AddParameter(cmd, "@mealId", mealId);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        private Meals NewMealFromDb(SqlDataReader reader)
        {
            return new Meals()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                UserId = DbUtils.GetInt(reader, "UserId"),
                Name = DbUtils.GetString(reader, "Name"),
                Calories = DbUtils.GetInt(reader, "Calories"),
                MealCategoryId = DbUtils.GetInt(reader, "MealCategoryId"),
                MealCategory = new MealCategories()
                {
                    Id = DbUtils.GetInt(reader, "MealCategoryId"),
                    Name = DbUtils.GetString(reader, "CategoryName")
                }
            };
        }
    }
}
