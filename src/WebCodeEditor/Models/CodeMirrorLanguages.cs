using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Linq;
using System.Linq.Expressions;

namespace WebCodeEditor.Models
{
    public class CodeMirrorLanguage
    {
        public string Name { get; set; }
        public string  Value { get; set; }
        public int Order { get; set; }
    }

    public class CodeMirrorLanguagesContext
    {
        private const string XML_PATH = "~/Xml/CodeMirrorLanguage.xml";

        public IEnumerable<CodeMirrorLanguage> List()
        {
            XElement doc = XElement.Load(HttpContext.Current.Server.MapPath(XML_PATH));

            IEnumerable<CodeMirrorLanguage> lstData = from lan in doc.Descendants("lan")
                                                      select new CodeMirrorLanguage
                                                      {
                                                          Name = lan.Value,
                                                          Value = lan.Attribute("value").Value,
                                                          Order = Convert.ToInt32(lan.Attribute("order").Value)
                                                      };

            return lstData;
        }
    }
}