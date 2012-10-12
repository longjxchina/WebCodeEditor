using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebCodeEditor.Models;

namespace WebCodeEditor.Controllers
{
    public class EditorController : Controller
    {
        //
        // GET: /Editor/

        public ActionResult Index()
        {
            LoadLanguage();

            return View();
        }

        private void LoadLanguage()
        {
            CodeMirrorLanguagesContext context = new CodeMirrorLanguagesContext();
            IEnumerable<CodeMirrorLanguage> lstData = context.List().OrderBy(lan => lan.Order);

            ViewBag.Language = new SelectList(lstData, "Value", "Name");
        }
    }
}
