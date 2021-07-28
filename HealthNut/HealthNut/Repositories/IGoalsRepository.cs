using HealthNut.Models;
using System.Collections.Generic;

namespace HealthNut.Repositories
{
    public interface IGoalsRepository
    {
        void AddGoal(Goals goal);
        void DeleteGoal(int goalId);
        List<Goals> GetAllUserGoals(string firebaseUserId);
        Goals GetGoalById(int id);
        void UpdateGoal(Goals goal);
    }
}