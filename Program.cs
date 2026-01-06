// In Program.cs or Startup.cs
using DairyERP.Data;
using DairyERP.Interfaces;
using DairyERP.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();

// Configure CORS - VERY IMPORTANT for React connection
builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactAppPolicy",
        builder =>
        {
            builder.WithOrigins("http://localhost:3000") // Your React app URL
                   .AllowAnyHeader()
                   .AllowAnyMethod()
                   .AllowCredentials();
        });
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactAppPolicy",
        builder =>
        {
            builder.WithOrigins(
                "http://localhost:3000",    // HTTP
                "https://localhost:3000"    // HTTPS (if React uses HTTPS)
            )
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
        });
});


// Other configurations...
builder.Services.AddDbContext<DairyDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Register services
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IFarmerService, FarmerService>();
builder.Services.AddScoped<ICollectionService, CollectionService>();

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();
app.UseRouting();


app.Use(async (context, next) =>
{
    var origin = context.Request.Headers["Origin"].ToString();
    var method = context.Request.Method;
    var path = context.Request.Path;

    Console.WriteLine($"CORS Request: {method} {path} from {origin}");

    await next();
});

// Use CORS policy - MUST be after UseRouting() and before UseAuthorization()
app.UseCors("ReactAppPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();