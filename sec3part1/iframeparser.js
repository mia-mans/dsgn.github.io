// const spreadsheetId = '1IUga9eTb2WBsDgjNIUycdQzlG5n3zHHgWcrQ0PyYax4';
//     var iframeUrl = '';
//     function sheet() {
//         fetch(`https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:json`)
//             .then(res => res.text())
//             .then(text => {
//                 const json = JSON.parse(text.substring(47).slice(0, -2));
//                 iframeUrl = json.table.rows[0].c[0].v;
//             });
//         document.getElementById('magicIframe').src = iframeUrl;
//     };
//     window.onload = function(e) {
//         setTimeout(() => {
//             sheet();
//         }, "2000")

//     };


// const spreadsheetId = '1IUga9eTb2WBsDgjNIUycdQzlG5n3zHHgWcrQ0PyYax4k';
// var iframeUrl = '';

// function sheet() {
//     fetch(`https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:json`)
//         .then(res => res.text())
//         .then(text => {
//             const json = JSON.parse(text.substring(47).slice(0, -2));
//             iframeUrl = json.table.rows[0].c[0].v;
//             document.getElementById('magicIframe').src = iframeUrl;
//             console.log("In scope: " + iframeUrl);
//         });

//         console.log("Not in scope: " + iframeUrl);
// };

// window.onload = function(e) {
//     setTimeout(() => {
//         sheet();
//     }, "2000")

// };


// // get all iframes that were parsed before this tag
// var iframes = document.getElementsByTagName("iframe");

// for (let i = 0; i < iframes.length; i++) {
//     var url = iframes[i].getAttribute("src");
//     if (url.startsWith("https://docs.google.com/spreadsheet/d/")) {
//         // create div and replace iframe
//         let d = document.createElement('div');
//         d.classList.add("embedded-doc"); // optional
//         iframes[i].parentElement.replaceChild(d, iframes[i]);

//         // CORS request
//         var xhr = new XMLHttpRequest();
//         xhr.open('GET', url, true);
//         xhr.onload = function() {
//             // display response
//             d.innerHTML = xhr.responseText;
//         };
//         xhr.send();
//     }
// }

var iframes = document.getElementsByTagName("iframe");

for (let i = 0; i < iframes.length; i++) {
    var url = iframes[i].getAttribute("src");
    if (url.startsWith("https://docs.google.com/spreadsheets/d/")) {
        // create div and replace iframe
        let d = document.createElement('div');
        d.classList.add("embedded-spreadsheet"); // optional
        iframes[i].parentElement.replaceChild(d, iframes[i]);

        // Extract the spreadsheet ID
        var docId = url.split("/")[5];

        // Create Google Sheets API URL
        var sheetsApiUrl = "https://sheets.googleapis.com/v4/spreadsheets/" + docId + "/values/Sheet1?alt=json";

        // CORS request
        var xhr = new XMLHttpRequest();
        xhr.open('GET', sheetsApiUrl, true);
        xhr.onload = function() {
            // Check if request was successful
            if (xhr.status >= 200 && xhr.status < 300) {
                // Parse JSON response
                var response = JSON.parse(xhr.responseText);
                var values = response.values;

                // Create table HTML
                var tableHtml = "<table>";
                for (var j = 0; j < values.length; j++) {
                    tableHtml += "<tr>";
                    for (var k = 0; k < values[j].length; k++) {
                        tableHtml += "<td>" + values[j][k] + "</td>";
                    }
                    tableHtml += "</tr>";
                }
                tableHtml += "</table>";

                // Display table in the div
                d.innerHTML = tableHtml;
            } else {
                console.error("Failed to fetch spreadsheet data. Status code: " + xhr.status);
            }
        };
        xhr.send();
    }
}
