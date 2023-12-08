namespace DeShawnsDogWalking.Models.DTOs;
public class WalkerCitiesDTO 
{
    public int Id { get; set; }
    public int WalkerId { get; set; }
    public int CityId { get; set; }
    public WalkerDTO Walker { get; set; }
     public CityDTO City { get; set; }
}