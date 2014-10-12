using System.Collections.Generic;
using System.Web;
using System.Web.Optimization;

namespace AliseBrinumzeme
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            string[] SingleStyleInclude = new string[] {
                "~/Content/client/css/site.css"
            };

            #region Client

            Bundle ClientStyleBundle = new StyleBundle("~/Client/css")
                .Include(SingleStyleInclude);
            //.IncludeDirectory("~/Content/plugins/css/", "*.css", false)
            //.IncludeDirectory("~/Content/client/css/", "*.css", false);
            bundles.Add(ClientStyleBundle);

            Bundle ClientScriptBundle = new ScriptBundle("~/Client/js")
                .IncludeDirectory("~/Content/client/js/libraries", "*.js", false)
                .IncludeDirectory("~/Content/client/js/site", "*.js", false);
            bundles.Add(ClientScriptBundle);

            #endregion

            #region Admin
            StyleBundle adminStyleBundle = new StyleBundle("~/cssadmin");
            string[] adminStyleArray =
            {
                
                "~/content/admin/plugins/bootstrap/css/bootstrap.css",
                "~/content/admin/plugins/bootstrap/css/bootstrap-responsive.css",
                "~/content/admin/plugins/bootstrap/css/bootstrap-overrides.css",
                "~/content/admin/plugins/datatables/css/twitter-bootstrap-overrides.css",
                "~/content/admin/fonts/open-sans/stylesheet.css",
            };
            adminStyleBundle.Include(adminStyleArray).Orderer = new CustomBundleOrderer();
            adminStyleBundle.IncludeDirectory("~/content/admin/css/", "*.css");
            bundles.Add(adminStyleBundle);

            ScriptBundle adminScriptBundle = new ScriptBundle("~/jsadmin");
            string[] adminScriptArray =
            {
                "~/content/admin/plugins/jquery/jquery-2.1.1.min.js",
                "~/content/admin/plugins/jquery/jquery.validate.min.js",
                "~/content/admin/plugins/jquery/jquery.validate.unobtrusive.min.js",
                "~/content/admin/plugins/bootstrap/js/bootstrap.min.js",
                "~/content/admin/plugins/bootstrap/js/bootbox.min.js",
                "~/content/admin/plugins/datatables/js/jquery.dataTables.min.js",
                "~/content/admin/plugins/datatables/js/twitter-bootstrap-overrides.js"
            };
            adminScriptBundle.Include(adminScriptArray).Orderer = new CustomBundleOrderer();
            adminScriptBundle.IncludeDirectory("~/content/admin/js/", "*.js");
            bundles.Add(adminScriptBundle);
            #endregion

            BundleTable.EnableOptimizations = false;
        }
    }

    class CustomBundleOrderer : IBundleOrderer
    {
        public IEnumerable<BundleFile> OrderFiles(BundleContext context, IEnumerable<BundleFile> files)
        {
            return files;
        }
    }
}
