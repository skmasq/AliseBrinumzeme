namespace AliseBrinumzeme.Infrastructure.RequireAuthorization
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;
    using System.Web.Mvc;

    public class RequireAuthorization : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            // Check if session isAdmin exists
            Boolean authorized = HttpContext.Current.Session["adminId"] != null;

            // If not redirect to index
            if (!authorized)
            {
                filterContext.Result = new RedirectResult("/admin");
            }
        }
    }
}