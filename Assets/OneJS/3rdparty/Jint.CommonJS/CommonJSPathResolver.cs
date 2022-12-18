using System.Collections.Generic;
using System.IO;
using System.Linq;
using UnityEngine;

namespace Jint.CommonJS {
    public class CommonJSPathResolver : IModuleResolver {
#if UNITY_EDITOR
        private static readonly string
            WORKING_DIR = Path.Combine(Path.GetDirectoryName(Application.dataPath)!, "OneJS");
#else
        private static readonly string WORKING_DIR = Path.Combine(Application.persistentDataPath, "OneJS");
#endif

        private readonly IEnumerable<string> extensionHandlers;

        public CommonJSPathResolver(IEnumerable<string> extensionHandlers) {
            this.extensionHandlers = extensionHandlers;
        }

        public string ResolvePath(string moduleId, Module parent) {
            // if (!moduleId.StartsWith("."))
            // {
            //     throw new Exception($"Module path {moduleId} is not valid.  Internal modules are not supported at this time.");
            // }

            // var cwd = parent.filePath != null ? Path.GetDirectoryName(parent.filePath) : Environment.CurrentDirectory;
            var cwd = parent != null
                ? Path.GetDirectoryName(parent.filePath)
                : WORKING_DIR;
            var path = Path.GetFullPath(Path.Combine(cwd, moduleId));

            if (!moduleId.StartsWith(".")) {
                path = Path.Combine(WORKING_DIR, moduleId);
            }

            /*
             * - Try direct file in case an extension is provided
             * - if directory, return directory/index
             */
            var pathMappings = new[] { "ScriptLib/3rdparty/", "ScriptLib/", "Addons/", "Modules/", "node_modules/", "" };
            var found = false;
            foreach (var pm in pathMappings) {
                if (!moduleId.StartsWith("."))
                    path = Path.Combine(WORKING_DIR, pm + moduleId);

                if (Directory.Exists(path) && !File.Exists(path + ".js")) {
                    path = Path.Combine(path, "index");
                }

                if (!File.Exists(path)) {
                    foreach (var tryExtension in extensionHandlers.Where(i => i != "default")) {
                        string innerCandidate = path + tryExtension;
                        if (File.Exists(innerCandidate)) {
                            found = true;
                            path = innerCandidate;
                            break;
                        }
                    }
                } else {
                    found = true;
                }
                if (found)
                    break;
            }
            if (!found)
                throw new FileNotFoundException($"Module {path} could not be resolved.");
            var file = new FileInfo(path);
            // Debug.Log($"{moduleId} => {file.FullName}");
            return file.FullName;
        }
    }
}