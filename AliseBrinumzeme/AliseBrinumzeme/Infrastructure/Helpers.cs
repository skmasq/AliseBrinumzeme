using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;

namespace AliseBrinumzeme.Infrastructure
{
    public static class Helpers
    {
        /// <summary>
        /// Serializes object to JSON format
        /// </summary>
        /// <param name="input">Object</param>
        /// <returns>JSON string</returns>
        public static string SerializeObject(Object input, bool debug = true)
        {
            string json = JsonConvert.SerializeObject(input, Formatting.Indented, new JsonSerializerSettings()
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                MaxDepth = 2
            });

            if (debug)
            {
                return "<pre style='font-family: Consolas;'>" + json + "</pre>"; // In order to preview in browser
            }

            return json;
        }

        /// <summary>
        /// Serializes Request.Form (NameValueCollection) to JSON format
        /// </summary>
        /// <param name="input">NameValueCollection</param>
        /// <returns>JSON string</returns>
        public static string SerializePostRequest(NameValueCollection post)
        {
            var dict = new Dictionary<string, string>();
            foreach (string key in post.Keys)
            {
                dict.Add(key, post[key]);
            }

            return SerializeObject(dict);
        }

        public static string CurrentBrowser
        {
            get
            {
                return HttpContext.Current.Request.Browser.Browser.ToLower();
            }
        }

        public static string GenerateSlug(string input)
        {
            // Remove accent
            byte[] bytes = System.Text.Encoding.GetEncoding("Cyrillic").GetBytes(input);
            string str = System.Text.Encoding.ASCII.GetString(bytes).ToLower();
            // Remove all invalid chars
            str = Regex.Replace(str, @"[^a-z0-9\s-]", "");
            // Convert multiple spaces to one space
            str = Regex.Replace(str, @"\s+", " ").Trim();
            // Cut and trim
            str = str.Substring(0, str.Length <= 45 ? str.Length : 45).Trim();
            // Replace spaces with line
            str = Regex.Replace(str, @"\s", "-");
            return str;
        }

        public static string GenerateKeyValue(string InputStream, string[] KeySeperator, string[] RowSeperator)
        {
            if (InputStream == null)
                return "";
            var rows = InputStream.Split(RowSeperator, StringSplitOptions.None);

            var result = new Dictionary<string, string>();

            foreach (string row in rows)
            {
                var Key = row.Split(KeySeperator, StringSplitOptions.None)[0];
                string Value = "";
                if (row.Split(KeySeperator, StringSplitOptions.None).Length > 1)
                {
                    Value = row.Split(KeySeperator, StringSplitOptions.None)[1];
                }
                if (!result.ContainsKey(Key))
                    result.Add(Key.Trim(), Value.Trim());
            }

            return SerializeObject(result, false);
        }
    }
}