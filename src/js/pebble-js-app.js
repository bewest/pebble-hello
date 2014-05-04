function HTTPGET(url) {
	var req = new XMLHttpRequest();
	req.open("GET", url, false);
	req.send(null);
	return req.responseText;
}

function fetchCgmData(lastReadTime, lastBG) {

    var response;
    var req = new XMLHttpRequest();
    //req.open('GET', "https://000.000.000.000/pebbledata, true);
              
              
    //var req = new XMLHttpRequest();
    req.open("GET", 'https://api.mongolab.com/api/1/databases/babgdata/collections/brandon/535eb544ee8bca512e0f8178?apiKey=209xo9QUxy1z46DsreLQ3lvMnmbaNEMX', true);
    req.setRequestHeader("Content-Type", "application/json");
  
  
    //req.send(json);
  
  
 // {
 //   "_id": {
 //       "$oid": "535eb544ee8bca512e0f8178"
 //   },
 //   "device": "dexcom",
 //   "date": 1398715671000,
 //   "dateString": "04/28/2014 01:07:51 PM",
 //   "sgv": "199"
 //}/

  
  
    req.onload = function(e) {
        console.log(req.readyState);
        if (req.readyState == 4) {
            console.log(req.status);
            if(req.status == 200) {

                response = JSON.parse(req.responseText);
                console.log(response.sgv);
                Pebble.sendAppMessage({
                                   //   "icon":response[0].trend,
                                      "bg":response.sgv,
                                   //   "readtime":response[0].readtime,
                                   //   "alert":response[0].alert,
                                   //   "time": response[0].currenttime,
                                   //   "delta":response[0].delta
                                      });
            } else {

            }
        } else
        {

        }
    };
    req.send(null);
}

Pebble.addEventListener("ready",
                        function(e) {
                        console.log("connect: " + e.ready);
                        });

Pebble.addEventListener("appmessage",
                        function(e) {
                        console.log("Received message: " + JSON.stringify(e.payload));
                        fetchCgmData(e.payload.readtime, e.payload.bg);
                        });