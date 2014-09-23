/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:

  
  
 
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
		 document.querySelector("#Location").addEventListener("click", showMyLocation);
		
    },
	
	
	

	
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
		app.loadBooks();
    },
	
	
	
	
	
	
	loadBooks:function(){
		    var request=new XMLHttpRequest();
			 request.open("GET", "https://dl.dropboxusercontent.com/u/887989/MAD9135/2014-09-11/books.json/" , true);
			 
			 request.onreadystatechange=function(){
				  
				   if(request.readyState===4){
					      if(request.status===200||request.status===0){
							    //console.log("response: "+ request.responseText);
								
								var books=JSON.parse(request.responseText);
								for(var i=0; i<books.length; i++ ){
										var tmp = books[i];
									   // console.log(tmp["Edition Author"]);
									    
										var bookDiv=document.getElementById("books");
                                      bookDiv.innerHTML=books[0].Title;
									  
									}
								
								
								
							  }
					   }
				 };
				 request.send();
		
		},
	
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

 function showMyLocation() {
	 
	 successCallback = function (position){
		
		console.log("success");
		// var msg="You are at latitude = "+ position.coords.latitude + " longititude = " + position.coords.longitude;
		 
		 var Req=new XMLHttpRequest();
		 
		 Req.open("GET", 
		 	"http://open.mapquestapi.com/geocoding/v1/reverse?" + "key=Fmjtd|luur2hurn0%2Cbg%3Do5-9wasly&location=" +position.coords.latitude + "," + 
			position.coords.longitude, true);
			
			//console.log("working");
		 Req.onreadystatechange = function() {
						
		     if (Req.readyState == 4) {
					if (Req.status == 200 || Req.status == 0) {
						console.log(Req.responseText);
						var obj = JSON.parse(Req.responseText);
						var city = document.getElementById("city");
						city.value = obj.results[0].locations[0].adminArea5;
					}
			 }
		};
		
		
		Req.send();
		alert("You are at latitude = "+ position.coords.latitude + " longititude = " + position.coords.longitude +"   "+city.value); 
		 //alert(msg);
	 };
	 errorCallback = function(error){
		 alert(error.code);
		};
		
		
	 navigator.geolocation.getCurrentPosition(successCallback,errorCallback);
		}
		