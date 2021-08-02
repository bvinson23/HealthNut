using HealthNut.Models;
using System.Collections.Generic;

namespace HealthNut.Repositories
{
    public interface IWeightRepository
    {
        void AddWeight(Weight weight);
        void DeleteWeight(int weightId);
        List<Weight> GetAllUserWeights();
        //string firebaseUserId
        Weight GetWeightById(int id);
        Weight GetMostRecentWeight();
        void UpdateWeight(Weight weight);
    }
}