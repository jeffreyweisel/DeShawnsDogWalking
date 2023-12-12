using System.Net;
using DeShawnsDogWalking.Models;
using DeShawnsDogWalking.Models.DTOs;

// List of dogs
List<Dog> dogs = new()
{
    new() { Id = 1, Name = "Baker", CityId = 1 },
    new() { Id = 2, Name = "Boomer", CityId = 2, WalkerId = 2 },
    new() { Id = 3, Name = "Max", CityId = 2, WalkerId = 3 },
    new() { Id = 4, Name = "Molly", CityId = 1},
    new() { Id = 5, Name = "Baxter", CityId = 1 },
    new() { Id = 6, Name = "Buddy", CityId = 2},
    new() { Id = 7, Name = "Bella", CityId = 2 },
    new() { Id = 8, Name = "Cash", CityId = 3},
    new() { Id = 9, Name = "Milo", CityId = 4, WalkerId = 7 },
    new() { Id = 10, Name = "Bear", CityId = 1, WalkerId = 6 },
    new() { Id = 11, Name = "Manny", CityId = 2, WalkerId = 3 },
    new() { Id = 12, Name = "Coco", CityId = 3}
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

//List of walkerCities
List<WalkerCities> walkerCities = new()
{
    new() { Id = 1, CityId = 1, WalkerId = 1},
    new() { Id = 2, CityId = 2, WalkerId = 2},
    new() { Id = 3, CityId = 3, WalkerId = 3},
    new() { Id = 4, CityId = 4, WalkerId = 4},
    new() { Id = 5, CityId = 1, WalkerId = 5},
    new() { Id = 6, CityId = 2, WalkerId = 6},
    new() { Id = 7, CityId = 2, WalkerId = 7},
    new() { Id = 8, CityId = 2, WalkerId = 1},
};

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

// POST new city
app.MapPost("/api/cities", (City city) =>
{
    // Assigns Id to new order
    city.Id = cities.Max(c => c.Id) + 1;

    cities.Add(city);


    return Results.Created($"/cities/{city.Id}", new CityDTO
    {
        Id = city.Id,
        Name = city.Name,

    });
});
// Get walkers
app.MapGet("/api/walkers", () =>
{
    return walkers.Select(w => new CityDTO
    {
        Id = w.Id,
        Name = w.Name
    });
});

// DELETE walker
app.MapDelete("/api/walkers/{id}", (int id) =>
{
    // Find the service ticket by ID
    Walker walkerToDelete = walkers.FirstOrDefault(w => w.Id == id);

    if (walkerToDelete == null)
    {
        return Results.NotFound();
    }

    // Remove the service ticket from list
    walkers.Remove(walkerToDelete);

    return Results.Ok(walkerToDelete);
});
// Get walkerCities w properties fully expanded
app.MapGet("/api/walkercities", () =>
{
    return walkerCities
    .Select(wC =>
    {
        var walker = walkers.FirstOrDefault(w => w.Id == wC.WalkerId);
        var city = cities.FirstOrDefault(c => c.Id == wC.CityId);

        return new WalkerCitiesDTO
        {
            Id = wC.Id,
            
            WalkerId = wC.WalkerId,
            CityId = wC.CityId,

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

// PUT to assign dog to walker
app.MapPut("/api/dogs/{id}", (int id, Dog dog) =>
{
   Dog dogToUpdate = dogs.FirstOrDefault(d => d.Id == id);

   if (dogToUpdate == null)
   {
       return Results.NotFound();
   }
   
   dogToUpdate.Name = dog.Name;
   dogToUpdate.WalkerId = dog.WalkerId;
   dogToUpdate.CityId = dog.CityId;
   
   return Results.Ok(dogToUpdate);
});

// DELETE dog
app.MapDelete("/api/dogs/{id}", (int id) =>
{
    // Find the service ticket by ID
    Dog dogToDelete = dogs.FirstOrDefault(d => d.Id == id);

    if (dogToDelete == null)
    {
        return Results.NotFound();
    }

    // Remove the service ticket from list
    dogs.Remove(dogToDelete);

    return Results.Ok(dogToDelete);
});

app.Run();
