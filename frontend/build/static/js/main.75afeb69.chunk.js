(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{131:function(e,t,a){e.exports=a.p+"static/media/ding.2d524655.mp3"},132:function(e,t,a){e.exports=a.p+"static/media/waterdrop2.31a564d2.mp3"},133:function(e,t,a){e.exports=a.p+"static/media/computerError2.6583b7bd.mp3"},145:function(e,t,a){e.exports=a(271)},150:function(e,t,a){},151:function(e,t,a){},271:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),r=a(32),s=a.n(r),i=(a(150),a(151),a(135)),l=a(50),u=a.n(l),c=a(88),d=a(16),h=a(17),m=a(22),p=a(20),v=a(19),g=a(281),f=a(34),y=a(136),b=a(283),E=a(49),k=a(279),C=a(285),w=a(272),I=function(e){Object(p.a)(a,e);var t=Object(v.a)(a);function a(e){var n;return Object(d.a)(this,a),(n=t.call(this,e)).state={isLoading:!0},n.actionType=n.props.actionType,n.trade=n.props.trade,n.icon=n.props.icon,n.onHandleClick=n.props.onHandleClick,n.toggleLoading=n.toggleLoading.bind(Object(m.a)(n)),n}return Object(h.a)(a,[{key:"toggleLoading",value:function(){console.log("Toggle Loading..."),this.setState((function(e){return{isLoading:!e.isLoading}}))}},{key:"render",value:function(){var e;e=this.state.isLoading?o.a.createElement(o.a.Fragment,null,o.a.createElement(w.a.Content,{visible:!0},this.icon),o.a.createElement(w.a.Content,{hidden:!0},this.actionType)):o.a.createElement(o.a.Fragment,null,o.a.createElement(w.a.Content,{visible:!0},o.a.createElement(f.a,{name:"spinner"})),o.a.createElement(w.a.Content,{hidden:!0},"Loading"));var t=this;return o.a.createElement(w.a,{animated:"vertical",onClick:function(){t.onHandleClick(t,t.actionType,t.trade.seller.turnipCode,t.trade.buyer.turnipCode),t.toggleLoading()}},e)}}]),a}(n.Component),D=function(e){Object(p.a)(a,e);var t=Object(v.a)(a);function a(){return Object(d.a)(this,a),t.apply(this,arguments)}return Object(h.a)(a,[{key:"createActionButton",value:function(e,t,a){return o.a.createElement(I,{onHandleClick:this.props.onHandleClick,actionType:e,trade:t,icon:a})}},{key:"createTradeRow",value:function(e,t,a){if(!t)return o.a.createElement(o.a.Fragment,null,o.a.createElement(b.a.Cell,{style:{width:300},verticalAlign:"top"},"No Information."),o.a.createElement(b.a.Cell,null,"--"),o.a.createElement(b.a.Cell,null,"--"));var n="white";if(-1!==a&&this.prevState&&this.prevState.islands.length>a){var r;switch(e){case"seller":r=this.prevState.islands[a].seller;break;case"buyer":r=this.prevState.islands[a].buyer}r.turnipCode!==t.turnipCode&&(n="teal")}return o.a.createElement(o.a.Fragment,null,o.a.createElement(b.a.Cell,{style:{width:300},verticalAlign:"top"},o.a.createElement(E.a,{as:"a",color:n,ribbon:!0},o.a.createElement("a",{href:"https://turnip.exchange/island/"+t.turnipCode},t.name)),o.a.createElement("span",null,t.description),o.a.createElement("span",null,o.a.createElement("br",null),this.props.dodoCodes&&this.props.dodoCodes[t.turnipCode]?o.a.createElement(E.a,{as:"a",color:"green"},this.props.dodoCodes[t.turnipCode]):"")),o.a.createElement(b.a.Cell,null,o.a.createElement(E.a,{tag:!0},"$",t.turnipPrice)),o.a.createElement(b.a.Cell,null,this.props.yourPlaces&&this.props.yourPlaces[t.turnipCode]?this.props.yourPlaces[t.turnipCode]+"/"+t.maxQueue:t.queuedStr))}},{key:"createBody",value:function(e){console.log("Error: Empty body")}},{key:"render",value:function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement(k.a,{horizontal:!0},o.a.createElement(C.a,{as:"h4"},this.props.sectionIcon,this.props.sectionName)),o.a.createElement(b.a,{celled:!0,striped:!0},o.a.createElement(b.a.Header,null,o.a.createElement(b.a.Row,null,o.a.createElement(b.a.HeaderCell,{colSpan:"3"},"Daisy"),o.a.createElement(b.a.HeaderCell,{colSpan:"3"},"Tommy"),o.a.createElement(b.a.HeaderCell,null,"\xa0"))),this.createBody(this.props.trades,this.props.statuses,this.props.queueIDs)))}}]),a}(n.Component),S=function(e){Object(p.a)(a,e);var t=Object(v.a)(a);function a(){return Object(d.a)(this,a),t.apply(this,arguments)}return Object(h.a)(a,[{key:"createConditionRows",value:function(e,t){var a=this;return e.length<=0?o.a.createElement(b.a.Row,null,o.a.createElement(b.a.Cell,{colSpan:"7"},o.a.createElement(f.a,{name:"x"}),t)):e.map((function(e,t){return o.a.createElement(b.a.Row,null,a.createTradeRow("seller",e.seller,t),a.createTradeRow("buyer",e.buyer,t),o.a.createElement(b.a.Cell,null,a.createActionButton("join",e,o.a.createElement(f.a,{name:"angle double up"}))))}))}},{key:"createBody",value:function(e){if(e.length<=0)return o.a.createElement(b.a.Body,null,o.a.createElement(b.a.Row,null,o.a.createElement(b.a.Cell,{colspan:"7"},o.a.createElement(f.a,{name:"hourglass start"}),"Please wait...")));var t=e.filter((function(e){return e.buyer.turnipPrice>=300})),a=e.filter((function(e){return e.buyer.turnipPrice>=190&&e.buyer.turnipPrice<300}));return t.sort((function(e,t){return t.buyer.turnipPrice-e.buyer.turnipPrice})),a.sort((function(e,t){return t.buyer.turnipPrice-e.buyer.turnipPrice})),o.a.createElement(b.a.Body,null,o.a.createElement(b.a.Row,null,o.a.createElement(b.a.HeaderCell,{colSpan:"7"},o.a.createElement(f.a,{name:"announcement"}),"These ones are superb - Tommy's price > $300")),this.createConditionRows(t,"No good trades are available now."),o.a.createElement(b.a.Row,null,o.a.createElement(b.a.HeaderCell,{colSpan:"7"},o.a.createElement(f.a,{name:"dont"}),"These ones are less than ideal - Tommy's price ($190 - $300)")),this.createConditionRows(a,"No subpar trades are available now."))}}]),a}(D),j=a(280),T=function(e){Object(p.a)(a,e);var t=Object(v.a)(a);function a(){return Object(d.a)(this,a),t.apply(this,arguments)}return Object(h.a)(a,[{key:"render",value:function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement(k.a,{horizontal:!0},o.a.createElement(C.a,{as:"h4"},o.a.createElement(f.a,{name:"info circle"}),"Your Information")),o.a.createElement(j.a,{name:"Name",defaultValue:this.props.visitorName,onChange:this.props.onInfoChanged}))}}]),a}(n.Component),O=a(286),P=a(284),N=function(e){Object(p.a)(a,e);var t=Object(v.a)(a);function a(){return Object(d.a)(this,a),t.apply(this,arguments)}return Object(h.a)(a,[{key:"createStatusSegment",value:function(e){return console.log("Creating status segment"),o.a.createElement(O.a,null,e.action," - ",e.data)}},{key:"getStatusColor",value:function(e){switch(e){case"islandUpdated":return"purple";case"queueUpdated":return"olive";case"alert":return"red";default:return"grey"}}},{key:"getStatusMessage",value:function(e,t){switch(e.action){case"joined":return"joined queue.";case"islandUpdated":return e.data.description;case"queueUpdated":var a="you are not in the queue?";return e.data.visitors.map((function(e){for(var n in t)t[n]===e.$id&&(a="your place: "+e.place)})),a;case"alert":return e.data.message;default:return JSON.stringify(e)}}},{key:"getRibbonMessage",value:function(e){if(e.data.timestamp)return new Date(1e3*e.data.timestamp).toLocaleTimeString();switch(e.action){case"queueUpdated":case"joined":return o.a.createElement(f.a,{name:"thumbs up"});case"islandUpdated":return o.a.createElement(f.a,{name:"exclamation circle"});case"alert":return o.a.createElement(f.a,{name:"times circle"});default:return o.a.createElement(f.a,{name:"question circle"})}}},{key:"isSkippableStatus",value:function(e){switch(e.action){case"testing":return!0;default:return!1}}},{key:"createAccordion",value:function(e,t,a){if(a.length>0){var n=[{key:e,title:{content:o.a.createElement(E.a,{color:"grey",horizontal:!0},o.a.createElement(f.a,{name:"unordered list"}),t.name+"'s events")},content:a}];return o.a.createElement(P.a,{panels:n,exclusive:!1,defaultActiveIndex:[0],fluid:!0})}}},{key:"createStatusRows",value:function(e,t,a){var n=this,r=[],s=[];return t[e.seller.turnipCode]&&t[e.seller.turnipCode].reverse().map((function(e){return n.isSkippableStatus(e)?r:r.push(o.a.createElement(o.a.Fragment,null,o.a.createElement(O.a,{color:n.getStatusColor(e.action)},o.a.createElement(E.a,{color:n.getStatusColor(e.action),ribbon:!0},n.getRibbonMessage(e)),n.getStatusMessage(e,a))))})),t[e.buyer.turnipCode]&&t[e.buyer.turnipCode].reverse().map((function(e){return n.isSkippableStatus(e)?s:s.push(o.a.createElement(o.a.Fragment,null,o.a.createElement(O.a,{color:n.getStatusColor(e.action)},o.a.createElement(E.a,{color:n.getStatusColor(e.action),ribbon:!0},n.getRibbonMessage(e)),n.getStatusMessage(e,a))))})),o.a.createElement(b.a.Row,null,o.a.createElement(b.a.Cell,{colspan:"3",verticalAlign:"top"},this.createAccordion(e.seller.turnipCode,e.seller,r)),o.a.createElement(b.a.Cell,{colspan:"3",verticalAlign:"top"},this.createAccordion(e.buyer.turnipCode,e.buyer,s)),o.a.createElement(b.a.Cell,null))}},{key:"createBody",value:function(e,t,a){var n=this;return o.a.createElement(b.a.Body,null,e.map((function(e,r){return o.a.createElement(o.a.Fragment,null,o.a.createElement(b.a.Row,null,n.createTradeRow("seller",e.seller,-1),n.createTradeRow("buyer",e.buyer,-1),o.a.createElement(b.a.Cell,null,n.createActionButton("leave",e,o.a.createElement(f.a,{name:"angle double down"})))),o.a.createElement(b.a.Row,null,o.a.createElement(b.a.Cell,{colspan:"7"},"Status: ")),n.createStatusRows(e,t,a))})))}}]),a}(D),R=function(){function e(){Object(d.a)(this,e)}return Object(h.a)(e,null,[{key:"sleep",value:function(e){return console.log("Going to sleep for "+e+"ms"),new Promise((function(t){return setTimeout(t,e)}))}}]),e}(),B=a(130),Q=a.n(B),x=a(131),A=a.n(x),L=a(132),U=a.n(L),F=a(133),q=a.n(F),H=a(91),J=function(e){Object(p.a)(a,e);var t=Object(v.a)(a);function a(e){var n;Object(d.a)(this,a),n=t.call(this,e);var o=new y.a;return n.cookies=o,n.visitorIDs={},n.failedTrades={},o.get("tradeState")?(n.state={islands:[],visitorIDs:o.get("visitorIDs"),visitorName:o.get("visitorName"),yourTrades:o.get("yourTrades"),yourPlaces:o.get("yourPlaces"),turnipQueueIDs:o.get("turnipQueueIDs"),dodoCodes:{}},n.visitorIDs=o.get("visitorIDs")):n.state={islands:[],visitorName:"",yourPlaces:[],yourTrades:[],visitorIDs:{},dodoCodes:{},turnipQueueIDs:{}},n.state.statuses={},n.handlePing=n.handlePing.bind(Object(m.a)(n)),n.handleJoin=n.handleJoin.bind(Object(m.a)(n)),n.handleInfo=n.handleInfo.bind(Object(m.a)(n)),n.handleYourPlaces=n.handleYourPlaces.bind(Object(m.a)(n)),n.handleVisitorID=n.handleVisitorID.bind(Object(m.a)(n)),n.handleReconnect=n.handleReconnect.bind(Object(m.a)(n)),n.currentButtonElement=null,n}return Object(h.a)(a,[{key:"handleReconnect",value:function(){for(var e in this.visitorIDs){var t=this.visitorIDs[e];console.log("Trying to reconnect: ("+e+") - "+t),this.handleVisitorID(e,t)}}},{key:"handleVisitorID",value:function(e,t){console.log("handleVisitorID: "+e);var a=new WebSocket("wss://w92pvtybp7.execute-api.us-west-2.amazonaws.com/production"),n=this;return new Promise((function(o,r){a.onopen=function(n){var o={action:"join",turnipCode:e,visitorID:t};a.send(JSON.stringify(o))},a.onerror=function(e){console.log("Error opening ws connection"),console.log(e),r()},a.onmessage=function(t){console.log(t);var a=JSON.parse(t.data);switch(n.state.statuses[e]||(n.state.statuses[e]=[]),n.state.statuses[e].push({action:a.action,data:a.data}),n.setState({statuses:n.state.statuses}),console.log("Status Updated:"),console.log(n.state.statuses),a.action){case"joined":void 0!==a.data.visitorID&&(n.state.visitorID=a.data.visitorID,console.log("VisitorID obtained for ("+e+"): "+n.state.visitorID),n.visitorIDs[e]=a.data.visitorID,n.autoSave());break;case"queueUpdated":a.data.visitors.map((function(e){for(var t in n.state.turnipQueueIDs)n.state.turnipQueueIDs[t]===e.$id&&(console.log("[WS] visitor.place: "+e.place),n.state.yourPlaces||(n.state.yourPlaces={}),n.state.yourPlaces[t]=e.place,n.setState({yourPlaces:n.state.yourPlaces}))}));break;default:console.log("Unknown wss action: "+a.action)}console.log("done handling ws"),o()}}))}},{key:"handleYourPlaces",value:function(e,t,a){switch(e){case"update":t.yourPlace;break;case"remove":this.state.yourPlaces[a]&&delete this.state.yourPlaces[a];break;default:console.log("unknown your places' action type")}this.autoSave()}},{key:"handleJoin",value:function(e,t,a){if(console.log("Join: "+e),console.log(a),a.success){var n=this.state.turnipQueueIDs&&"undefined"!==this.state.turnipQueueIDs?this.state.turnipQueueIDs:{};n[t]=a.$id,console.log("Obtained IDs"),console.log(n),this.setState({turnipQueueIDs:n})}else this.failedTrades[t]=a.message}},{key:"handleGrab",value:function(){}},{key:"handlePing",value:function(e,t,a){console.log("Ping: "+e),console.log(a),!a.yourPlace&&a.onIsland&&(console.log("Uh-oh: you've lost your place "+e+":"+t),a.yourPlace="-1"),this.handleYourPlaces("update",a,t),console.log(this.state.yourPlaces),a.success&&(a.dodoCode?(this.state.dodoCodes[t]=a.dodoCode,this.playSound("ding")):console.log("no dodocode"))}},{key:"handleURLBase",value:function(){return console.log("handleURLbase"),window.location.href.indexOf("github")>=0?(console.log("github detected"),"https://stalk-business.herokuapp.com"):""}},{key:"handleFetch",value:function(e,t,a,n){fetch(this.handleURLBase()+e).then((function(e){return e.json()})).then((function(e){return n(t,a,e)}))}},{key:"handleQueue",value:function(){var e=Object(c.a)(u.a.mark((function e(t,a,n){var o,r,s,i;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log("handleFetch"),o=this.handleJoin,r=3e3,"grab"!==t&&"ping"!==t||(o=this.handlePing,r=0),a&&(s="/queue/action/"+t+"/turnipCode/"+a+"/visitorID/"+this.visitorIDs[a]+"/visitorName/"+this.state.visitorName,console.log("Fetch: "+s),this.handleFetch(s,"sell",a,o)),"join"!==t){e.next=8;break}return e.next=8,R.sleep(r);case 8:n&&(i="/queue/action/"+t+"/turnipCode/"+n+"/visitorID/"+this.visitorIDs[n]+"/visitorName/"+this.state.visitorName,console.log("Fetch: "+i),this.handleFetch(i,"buy",n,o)),"join"===t||"leave"===t?this.setTrades(t,a,n):this.getTrades();case 10:case"end":return e.stop()}}),e,this)})));return function(t,a,n){return e.apply(this,arguments)}}()},{key:"handleClick",value:function(){var e=Object(c.a)(u.a.mark((function e(t,a,n,o){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log(a+":"+n+":"+o),this.currentButtonElement=t,"join"!==a){e.next=13;break}return this.playSound("waterdrop"),this.state.statues||(this.state.status={}),this.state.statuses[n]||(this.state.statuses[n]=[{action:"testing",data:"ABCD"}]),this.state.statuses[o]||(this.state.statuses[o]=[{action:"testing",data:"ABCD"}]),console.log("Generating visitorID"),e.next=10,this.handleVisitorID(n,null);case 10:return console.log("Generating visitorID"),e.next=13,this.handleVisitorID(o,null);case 13:this.handleQueue(a,n,o);case 14:case"end":return e.stop()}}),e,this)})));return function(t,a,n,o){return e.apply(this,arguments)}}()},{key:"setTrades",value:function(e,t,a){var n,o;if("join"===e)if(this.state.islands.map((function(e){e.seller.turnipCode===t&&(n=e.seller),e.buyer.turnipCode===a&&(o=e.buyer)})),n||console.log("seller island not found"),o||console.log("buyer island not found"),this.failedTrades[t]||this.failedTrades[a]){console.log("Unable to add trade: "+t+" - "+a);var r,s,l=this.failedTrades[t]?this.failedTrades[t]:this.failedTrades[a],u=this.failedTrades[t]?t:a,c=Object(i.a)(this.state.islands);try{for(c.s();!(s=c.n()).done;){var d=s.value;if(d.seller.turnipCode===u){r=d.seller.name;break}if(d.seller.turnipCode===u){r=d.buyer.name;break}}}catch(m){c.e(m)}finally{c.f()}alert("Unable to join "+r+"'s queue: "+l),this.currentButtonElement.toggleLoading(),this.setTrades("leave",t,a)}else this.state.yourTrades.push({seller:n,buyer:o});else if("leave"===e){var h=-1;this.state.yourTrades.map((function(e,n){e.seller.turnipCode===t&&e.buyer.turnipCode===a&&(h=n)})),h>-1&&(console.log("Removing your trades: "+h),this.state.yourTrades.splice(h,1)),console.log("Removing visitorIDs"),this.visitorIDs&&(delete this.visitorIDs[t],delete this.visitorIDs[a]),console.log("Removing turnipQueueIDs"),this.state.turnipQueueIDs&&(delete this.state.turnipQueueIDs[t],delete this.state.turnipQueueIDs[a])}this.setState({yourTrades:this.state.yourTrades}),this.autoSave(),this.currentButtonElement.toggleLoading()}},{key:"notify",value:function(e){}},{key:"playSound",value:function(e){var t=document.getElementsByClassName("audio-element-error")[0];switch(e){case"ding":t=document.getElementsByClassName("audio-element-ding")[0];break;case"waterdrop":t=document.getElementsByClassName("audio-element-waterdrop")[0]}t.play()}},{key:"getTradesServer",value:function(){var e=this;fetch(this.handleURLBase()+"/getTrades").then((function(e){if(!e.ok)throw new Error("Network response was not ok");return e.json()})).then((function(t){e.setState({islands:t,visitorName:e.state.visitorName,visitorIDs:e.visitorIDs})})).catch((function(e){console.error("Error:",e)}))}},{key:"getTrades",value:function(){this.prevState=this.state,console.log("consolidating trades..."),this.notify(),this.getTradesServer()}},{key:"autoSave",value:function(){console.log("auto-saving trade states"),this.cookies.set("tradeState","activated",{path:"/"}),this.cookies.set("visitorIDs",this.visitorIDs,{path:"/"}),this.cookies.set("visitorName",this.state.visitorName,{path:"/"}),this.cookies.set("yourTrades",this.state.yourTrades,{path:"/"}),this.cookies.set("turnipQueueIDs",this.state.turnipQueueIDs,{path:"/"}),console.log("New values: "),console.log(this.cookies.cookies)}},{key:"autoPing",value:function(){var e=this;console.log("auto ping"),this.state.yourTrades.map((function(t){e.handleQueue("ping",t.seller.turnipCode,null),e.handleQueue("ping",null,t.buyer.turnipCode),e.handleQueue("grab",t.seller.turnipCode,null),e.handleQueue("grab",null,t.buyer.turnipCode)}))}},{key:"autoRefresh",value:function(){var e=this;setInterval((function(){e.getTrades(),e.autoSave(),e.autoPing()}),3e4)}},{key:"isDevelopment",value:function(){return(window.location.href.indexOf("localhost")>=0||window.location.href.indexOf("127.0.0.1")>=0)&&(console.log("localhost detected"),!0)}},{key:"initializeGA",value:function(){H.a.initialize("UA-166888774-1"),H.a.pageview("/stalk.business")}},{key:"componentDidMount",value:function(){this.handleReconnect(),this.getTrades(),this.autoRefresh(),this.isDevelopment()||this.initializeGA()}},{key:"handleInfo",value:function(e){switch(e.target.name){case"Name":this.state.visitorName=e.target.value;break;default:console.log("Warning: unknown event + "+e.target.name)}this.autoSave()}},{key:"handleClear",value:function(e){console.log("Clearing visitorID"),this.state.visitorIDs={},this.autoSave()}},{key:"render",value:function(){var e=this;return o.a.createElement(o.a.Fragment,null,o.a.createElement(g.a,null,o.a.createElement(Q.a,{ref:function(t){e.alertSound=t}}),o.a.createElement(T,{visitorName:this.state.visitorName,onInfoChanged:this.handleInfo.bind(this)}),o.a.createElement(N,{trades:this.state.yourTrades,yourPlaces:this.state.yourPlaces,dodoCodes:this.state.dodoCodes,statuses:this.state.statuses,queueIDs:this.state.turnipQueueIDs,sectionName:"Your Stalks",sectionIcon:o.a.createElement(f.a,{name:"dolly"}),onHandleClick:this.handleClick.bind(this)}),o.a.createElement(S,{trades:this.state.islands,queueIDs:this.state.turnipQueueIDs,onHandleClick:this.handleClick.bind(this),sectionName:"Stalk Market",sectionIcon:o.a.createElement(f.a,{name:"money bill alternate"})}),o.a.createElement("div",null,o.a.createElement("audio",{className:"audio-element-ding"},o.a.createElement("source",{src:A.a}))),o.a.createElement("div",null,o.a.createElement("audio",{className:"audio-element-error"},o.a.createElement("source",{src:q.a}))),o.a.createElement("div",null,o.a.createElement("audio",{className:"audio-element-waterdrop"},o.a.createElement("source",{src:U.a})))))}}]),a}(n.Component);var M=function(){return o.a.createElement("div",{className:"App"},o.a.createElement("div",null,o.a.createElement(J,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var V=document.createElement("link");V.rel="stylesheet",V.href="https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css",document.head.appendChild(V),s.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(M,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[145,1,2]]]);
//# sourceMappingURL=main.75afeb69.chunk.js.map