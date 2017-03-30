(function() {
      var userAgentInfo = navigator.userAgent;
      var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"
      ];
      var flag = true;
      for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
          flag = false;
          break;
        }
      }
      if(flag){
        var st=document.createElement("script");
        st.type="text/javascript";
        st.src="/static/js/canvas-nest.min.js";

        document.getElementById("bgscript-container").appendChild(st);
      }
    })();