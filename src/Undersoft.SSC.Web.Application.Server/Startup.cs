using Undersoft.SDK.Service.Application;
using Undersoft.SDK.Service.Application.DataServer;

namespace Undersoft.SSC.Web.Application.Server;

using Infrastructure.Persistance.Stores;
using Undersoft.SSC.Infrastructure.Persistance.Stores;

public class Startup
{
    public IConfiguration Configuration { get; }

    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public void ConfigureServices(IServiceCollection services)
    {
        services
            .AddApplicationSetup()
            .ConfigureApplication(true, AppDomain.CurrentDomain.GetAssemblies())        
            .AddDataServer<IEventStore>(
                DataServerTypes.All,
                builder =>
                    builder.AddDataServices<AppEventStore>()
            );
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        app.UseInternalProvider()
           .UseApplicationSetup(env)
           .UseDataMigrations()
           .UseDataServices()
           .MapFallbackToFile("/index.html");             
    }
}
