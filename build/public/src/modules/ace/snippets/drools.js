define("ace/snippets/drools",["require","exports","module"],function(n,e,t){"use strict";e.snippetText='\nsnippet rule\n\trule "${1?:rule_name}"\n\twhen\n\t\t${2:// when...} \n\tthen\n\t\t${3:// then...}\n\tend\n\nsnippet query\n\tquery ${1?:query_name}\n\t\t${2:// find} \n\tend\n\t\nsnippet declare\n\tdeclare ${1?:type_name}\n\t\t${2:// attributes} \n\tend\n\n',e.scope="drools"});
//# sourceMappingURL=node_modules/ace-builds/src-min/snippets/drools.js.map