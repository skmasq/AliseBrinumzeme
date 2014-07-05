using System.Web;
using System.Web.Optimization;

namespace AliseBrinumzeme
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            string[] SingleScriptInclude = new string[] { };

            #region Client

            Bundle ClientStyleBundle = new StyleBundle("~/Client/css")
                .Include(SingleScriptInclude)
                .IncludeDirectory("~/Content/plugins/css/", "*.css", false)
                .IncludeDirectory("~/Content/client/css/", "*.css", false);
            bundles.Add(ClientStyleBundle);

            Bundle ClientScriptBundle = new ScriptBundle("~/Client/js")
                .Include(SingleScriptInclude)
                .IncludeDirectory("~/Content/client/js/libraries", "*.js", false)
                .IncludeDirectory("~/Content/client/js/site", "*.js", false);
            bundles.Add(ClientScriptBundle);

            #endregion

            #region Admin

            Bundle AdminStyleBundle = new StyleBundle("~/Admin/css")
                .Include(SingleScriptInclude)
                .IncludeDirectory("~/Content/plugins/css/", "*.css", false)
                .IncludeDirectory("~/Content/admin/css/", "*.css", false);
            bundles.Add(AdminStyleBundle);

            Bundle AdminScriptBundle = new ScriptBundle("~/Admin/js")
                .Include(SingleScriptInclude)
                .IncludeDirectory("~/Content/admin/js/", "*.js", false);
            bundles.Add(AdminScriptBundle);

            #endregion

            #region Plugins

            Bundle PluginsScriptBundle = new ScriptBundle("~/Plugins/js")
              .Include(SingleScriptInclude)
              .IncludeDirectory("~/Content/plugins/js/", "*.js", false);
            bundles.Add(PluginsScriptBundle);

            #endregion

            BundleTable.EnableOptimizations = false;
        }
    }
}
