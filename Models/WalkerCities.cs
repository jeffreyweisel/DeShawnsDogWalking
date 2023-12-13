namespace DeShawnsDogWalking.Models;
public class WalkerCities 
{
    public int Id { get; set; }
    public int WalkerId { get; set; }
    public int CityId { get; set; }
    public City City { get; set;}
}