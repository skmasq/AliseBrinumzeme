using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AliseBrinumzeme.Models;
using SimpleCrypto;
using System.Web.Security;

namespace AliseBrinumzeme.Areas.Admin.Controllers
{
    public class HomeController : Controller
    {
        MainDataContext _db = new MainDataContext();

        public ActionResult Index()
        {
            if (!this.CanAdminLogin) TempData["loginTooManyAttempts"] = true;
            if (this.Administrator == null) return View("Authorize");
            return RedirectToAction("index", "section");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Authorize(AdministratorModel a)
        {
            // Check if there are no failed login attempts in last 5 minutes
            if (!this.CanAdminLogin)
            {
                TempData["loginTooManyAttempts"] = true;
                return RedirectToAction("index", "home");
            }

            // If model is not validated return login view to show error messages (javascript disabled)
            if (!TryValidateModel(a))
            {
                return View("Authorize", a);
            }

            // Check if username exists, if not then log and show that login failed
            var admin = _db.Administrators.Where(x => x.Username == a.Username).SingleOrDefault();
            if (admin == null || admin.Username != a.Username)
            {
                TempData["loginFailed"] = true;
                return RedirectToAction("index", "home");
            }

            // Username exists, check if passwords match
            ICryptoService cryptoService = new PBKDF2();
            string hash = cryptoService.Compute(a.Password, admin.PasswordSalt);
            if (hash == admin.Password)
            {
                Session["adminId"] = admin.ID;
            }
            else
            {
                TempData["loginFailed"] = true;
            }

            // Login successfull
            FormsAuthentication.SetAuthCookie(a.Username, false);
            return RedirectToAction("index", "home");
        }

        public ActionResult Logout()
        {
            Session["adminId"] = null;
            return RedirectToAction("index", "home");
        }

        private AdministratorModel Administrator
        {
            get
            {
                // Get admin ID from session and return admin object, returns null if no admin object exists
                int adminId = Convert.ToInt32(Session["adminId"]);
                return _db.Administrators.Where(x => x.ID == adminId).FirstOrDefault();
            }
        }

        private bool CanAdminLogin
        {
            get
            {
                return true;
            }
        }
	}
}