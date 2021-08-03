namespace HealthNut.Models
{
    public class Users
    {
        public int Id { get; set; }
        public string FirebaseUserId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public int GoalWeight { get; set; }
    }
}
