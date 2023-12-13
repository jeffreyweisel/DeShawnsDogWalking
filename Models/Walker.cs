namespace DeShawnsDogWalking.Models;
public class Walker
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int CityId { get; set; }
    public List<City> Cities { get; set; } // Change this line
    public List<WalkerCities> WalkerCities {get; set;}
    
}