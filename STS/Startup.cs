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
using System.Net.Mail;
using System.Net;

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

            //services.Configure<SmtpConfig>(Configuration.GetSection("Smtp"));
            //services.AddMvc();


            ////mail
            //services.AddScoped<SmtpClient>((serviceProvider) =>
            //{
            //    var config = serviceProvider.GetRequiredService<IConfiguration>();
            //    return new SmtpClient()
            //    {
            //        Host = config.GetValue<String>("Email:Smtp:Host"),
            //        Port = config.GetValue<int>("Email:Smtp:Port"),
            //        Credentials = new NetworkCredential(
            //                config.GetValue<String>("Email:Smtp:Username"),
            //                config.GetValue<String>("Email:Smtp:Password")
            //            )
            //    };
            //});

            //services.AddMvc();

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Latest);

            ////this logic is convert the string to int when i am passed the category_id it is pass the as string but category_id is int then this service
            //is convert the string to int..
            services.AddControllers()
                           .AddNewtonsoftJson();

            services.AddControllersWithViews();

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
            services.AddControllers()
                .AddNewtonsoftJson();

 

            //Database Connectivity
            STSSetting.ConnectionString = Configuration.GetSection("ConnectionString:STS").Value;
            //Send email for forgot password
            STSSetting.PrimaryDomain = Configuration.GetSection("EmailSettings:PrimaryDomain").Value;
            STSSetting.PrimaryPort = Configuration.GetSection("EmailSettings:PrimaryPort").Value;
            STSSetting.UsernameEmail = Configuration.GetSection("EmailSettings:UsernameEmail").Value;
            STSSetting.UsernamePassword = Configuration.GetSection("EmailSettings:UsernamePassword").Value;

            DependencyResolver(services);



        }
        //Add the Interface and  Service 
        private void DependencyResolver(IServiceCollection services)
        {
            //throw new NotImplementedException();
            //services.AddMvc()
            //.AddJsonOptions(option => option.JsonSerializerOptions = new DefaultContractResolver());
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

            //This is used used for accessing the Documents folder for image display without the compile

            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(
                        Path.Combine(Directory.GetCurrentDirectory(), "Documents")),
                        RequestPath = "/Documents"
            });

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
