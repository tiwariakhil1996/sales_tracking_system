using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using STS.Common;
using STS.BLL.Interface;
using Microsoft.AspNetCore.Http;
using STS.BLL.Service;
using System;
using Newtonsoft.Json.Serialization;
using Microsoft.Extensions.FileProviders;
using System.IO;
using STS.Hubs;

namespace STS
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddControllersWithViews();

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
            services.AddControllers()
                .AddNewtonsoftJson();

            // ---------  For SinglR  ---------
            services.AddSignalR();

            //Database Connectivity
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });

            STSSetting.ConnectionString = Configuration.GetSection("ConnectionString:STS").Value;



            //Send email for forgot password
            STSSetting.PrimaryDomain = Configuration.GetSection("EmailSettings:PrimaryDomain").Value;
            STSSetting.PrimaryPort = Configuration.GetSection("EmailSettings:PrimaryPort").Value;
            STSSetting.UsernameEmail = Configuration.GetSection("EmailSettings:UsernameEmail").Value;
            STSSetting.UsernamePassword = Configuration.GetSection("EmailSettings:UsernamePassword").Value;

            DependencyResolver(services);
        }






        private void DependencyResolver(IServiceCollection services)
        {
            //throw new NotImplementedException();

            //Services
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            services.AddSingleton<IAdmin, AdminServices>();
            services.AddSingleton<IClient, ClientServices>();
            services.AddSingleton<ISales, SalesServices>();
            services.AddSingleton<IProduct, ProductServices>();
            services.AddSingleton<ICategory_Subcategory, Category_SubcategoryServices>();
            services.AddSingleton<IActivity, ActivityServices>();
            services.AddSingleton<ICountry_State_City, Country_State_CityServices>();
            services.AddSingleton<IMail, MailServices>();
            services.AddSingleton<IResetPassword, ResetPasswordServices>();
            services.AddSingleton<IChat, ChatServices>();


        }






        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();

            //ToString access Documents Folder 

            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(
                        Path.Combine(Directory.GetCurrentDirectory(), "Documents")),
                        RequestPath = "/Documents"
            });

            // ---------  For SinglR  ---------
            app.UseSignalR(options =>
            {
                options.MapHub<MessageHub>("/MessageHub");
            });
             
            // -------------------------------

            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");
                    //spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}
