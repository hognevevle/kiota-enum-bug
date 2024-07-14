using System.Runtime.Serialization;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;

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

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", ([FromQuery] TestEnum x) =>
    {
        return new WeatherForecastData
        {
            SomeEnum = x,
            Date = DateTime.UtcNow
        };
    })
.WithName("GetWeatherForecast")
.WithOpenApi();

app.Run();

class WeatherForecastData
{
    public TestEnum SomeEnum { get; set; }
    public DateTime Date { get; set; }
}

[JsonConverter(typeof(JsonStringEnumConverter))]
enum TestEnum
{
    New,
    Old
}