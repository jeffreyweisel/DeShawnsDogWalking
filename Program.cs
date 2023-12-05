using System.Net;
using DeShawnsDogWalking.Models;
using DeShawnsDogWalking.Models.DTOs;

// List of dogs
List<Dog> dogs = new()
{
    new() { Id = 1, Name = "Baker", CityId = 1 },
    new() { Id = 2, Name = "Boomer", CityId = 2, WalkerId = 2 },
    new() { Id = 3, Name = "Max", CityId = 3, WalkerId = 3 },
    new() { Id = 4, Name = "Molly", CityId = 4, WalkerId = 4 },
    new() { Id = 5, Name = "Baxter", CityId = 4 },
    new() { Id = 6, Name = "Annie", CityId = 2, WalkerId = 6 },
    new() { Id = 7, Name = "Bella", CityId = 3, WalkerId = 1 },
    new() { Id = 8, Name = "Cash", CityId = 1, WalkerId = 2 },
    new() { Id = 9, Name = "Milo", CityId = 4, WalkerId = 7 },
    new() { Id = 10, Name = "Bear", CityId = 1, WalkerId = 6 },
    new() { Id = 11, Name = "Manny", CityId = 2, WalkerId = 3 },
    new() { Id = 12, Name = "Coco", CityId = 1}
};

// List of walkers
List<Walker> walkers = new()
{
    new() { Id = 1, Name = "Keith" },
    new() { Id = 2, Name = "Zach" },
    new() { Id = 3, Name = "Amanda" },
    new() { Id = 4, Name = "Samantha" },
    new() { Id = 5, Name = "Jeffrey"},
    new() { Id = 6, Name = "Hannah"},
    new() { Id = 7, Name = "Jordan"}
};

// List of cities
List<City> cities = new()
{
    new() { Id = 1, Name = "Nashville"},
    new() { Id = 2, Name = "Murfreesboro"},
    new() { Id = 3, Name = "Chattanooga"},
    new() { Id = 4, Name = "Memphis"},

};

// List of walkerCities
// List<WalkerCities> walkerCities = new()
// {
//     new() { Id = 1, CityId = 1, WalkerId = 1},
//     new() { Id = 2, CityId = 2, WalkerId = 1},
// };

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Get welcome message
app.MapGet("/api/hello", () =>
{
    return new { Message = "Welcome to DeShawn's Dog Walking" };
});

// Get cities
app.MapGet("/api/cities", () =>
{
    return cities.Select(c => new CityDTO
    {
        Id = c.Id,
        Name = c.Name
    });
});

// Get all dogs with properties fully expanded
app.MapGet("/api/dogs", () =>
{
    return dogs
    .Select(d =>
    {
        var walker = walkers.FirstOrDefault(w => w.Id == d.WalkerId);
        var city = cities.FirstOrDefault(c => c.Id == d.CityId);

        return new DogDTO
        {
            Id = d.Id,
            Name = d.Name,
            WalkerId = d.WalkerId,
            CityId = d.CityId,

            Walker = walker == null ? null : new WalkerDTO
            {
                Id = walker.Id,
                Name = walker.Name,

            },
            City = city == null ? null : new CityDTO
            {
                Id = city.Id,
                Name = city.Name,
            }
        };
    });
});

// Get dogs by Id to show details
app.MapGet("/api/dogs/{id}", (int id) =>
{
    Dog dog = dogs.FirstOrDefault(d => d.Id == id);

    if (dog == null)
    {
        return Results.NotFound();
    }

    var walker = walkers.FirstOrDefault(w => w.Id == dog.WalkerId);
    var city = cities.FirstOrDefault(c => c.Id == dog.CityId);


    return Results.Ok(new DogDTO
    {
        Id = dog.Id,
        Name = dog.Name,
        WalkerId = dog.WalkerId,
        Walker = walker == null ? null : new WalkerDTO
        {
            Id = walker.Id,
            Name = walker.Name,

        },
        CityId = dog.CityId,
        City = city == null ? null : new CityDTO
        {
            Id = city.Id,
            Name = city.Name
        }
    });
});

// Post new dog to database
app.MapPost("/api/dogs", (Dog dog) =>
{
    // Assigns Id to new order
    dog.Id = dogs.Max(d => d.Id) + 1;

    dogs.Add(dog);

    var walker = walkers.FirstOrDefault(w => w.Id == dog.WalkerId);
    var city = cities.FirstOrDefault(c => c.Id == dog.CityId);

    return Results.Created($"/dogs/{dog.Id}", new DogDTO
    {
        Id = dog.Id,
        Name = dog.Name,
        WalkerId = dog.WalkerId,
        CityId = dog.CityId,
        Walker = walker == null ? null : new WalkerDTO
        {
            Id = walker.Id,
            Name = walker.Name,

        },
        City = city == null ? null : new CityDTO
        {
            Id = city.Id,
            Name = city.Name,
        }

    });
});

app.Run();
