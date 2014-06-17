using System.Web;
using System.Web.Optimization;

namespace AliseBrinumzeme
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            #region Script Bundles

            // Include all individual scripts here
            string[] SingleScriptInclude = new string[] { };

            // Include script directories here
            Bundle ScriptBundle = new ScriptBundle("~/Scripts")
                .Include(SingleScriptInclude)
                .IncludeDirectory("~/Content/js/libraries", "*.js", false)
                .IncludeDirectory("~/Content/js/site", "*.js", false);

            bundles.Add(ScriptBundle);

            #endregion

            #region Style Bundles

            // Include individual styles here
            string[] SingleStyleInclude = new string[] {
                "~/Content/css/site.css",
            };

            // Include style directories here
            Bundle StyleBundle = new StyleBundle("~/Styles")
                .Include(SingleStyleInclude);

            bundles.Add(StyleBundle);

            #endregion

            BundleTable.EnableOptimizations = false;
        }
    }
}
