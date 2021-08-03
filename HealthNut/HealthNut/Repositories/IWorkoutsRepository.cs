using HealthNut.Models;
using System.Collections.Generic;

namespace HealthNut.Repositories
{
    public interface IWorkoutsRepository
    {
        void AddWorkout(Workouts workout);
        void DeleteWorkout(int workoutId);
        List<Workouts> GetAllUserWorkouts();
        Workouts GetWorkoutById(int id);
        void UpdateWorkout(Workouts workout);
    }
}