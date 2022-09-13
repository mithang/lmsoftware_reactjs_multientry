using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebUseReactEntry.Controllers
{
    public class ReactController : Controller
    {
        // GET: ReactController
        public ActionResult Index()
        {
            return View();
        }

        // GET: ReactController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: ReactController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: ReactController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: ReactController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: ReactController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: ReactController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: ReactController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
