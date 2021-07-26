using HealthNut.Models;
using System.Collections.Generic;

namespace HealthNut.Repositories
{
    public interface IUserRepository
    {
        void Add(Users user);
        Users CheckUnique(Users user);
        void Delete(int id);
        List<Users> GetAllUsers();
        Users GetByFirebaseUserId(string firebaseUserId);
        Users GetUserById(int id);
        void Update(Users user);
    }
}