using System;
using System.Collections.Generic;
using System.IO.Compression;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace AliseBrinumzeme
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_BeginRequest()
        {
            // Do a permanent redirect if torontoclubscene.com is accessed instead of www.
            HttpApplication application = (HttpApplication)this;
            HttpContext context = application.Context;

            if (context.Request.Url.Host == "alisebrinumzeme.com")
            {
                context.Response.Clear();
                context.Response.Status = "301 Moved Permanently";
                context.Response.AddHeader("Location", "http://www.alisebrinumzeme.com" + context.Request.RawUrl);
            }

            context.Response.Filter = new GZipStream(context.Response.Filter, CompressionMode.Compress);
            HttpContext.Current.Response.AppendHeader("Content-encoding", "gzip");
            HttpContext.Current.Response.AppendHeader("Cache-Control", "max-age=31104000");
            HttpContext.Current.Response.Cache.VaryByHeaders["Accept-encoding"] = true;
        }

        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            //WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }
    }
}
