function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    	console.log(this);
      		total(this);
      	}
  };
  xhttp.open("GET", "population.xml", true);
  xhttp.send();
}

function total(xml) {
  var i;
  var xmlDoc = xml.responseXML;
  console.log(xmlDoc);
  var barData ={
	    labels: [],
	    datasets: [{
	      label: '總人口數',
	      data: []},
	      {label: '男性人口數',
	      backgroundColor: "rgba(151, 187, 205, 0.5)",
	      data: [],},
	      {label: '女性人口數',
	      backgroundColor: "rgba(255, 99, 132, 0.5)",
	      data: [],
	    }]
	  };
	//取得xml檔欄位
  var x = xmlDoc.getElementsByTagName("row_item");
  for (i = 0; i < x.length; i++) {
    //資料
	barData.labels.push(x[i].getElementsByTagName("年度")[0].childNodes[0].nodeValue);
	//total
	barData.datasets[0].data[i]=x[i].getElementsByTagName("總人口數")[0].childNodes[0].nodeValue;
	//boy
	barData.datasets[1].data[i]=x[i].getElementsByTagName("男性人數")[0].childNodes[0].nodeValue;
	//gril
	barData.datasets[2].data[i]=x[i].getElementsByTagName("女性人數")[0].childNodes[0].nodeValue;
  }
  	//地圖回到花蓮縣
  	document.getElementById("map").src= "https://www.google.com/maps/embed/v1/place?key=AIzaSyCMMeH6lqYwWrj3dCV0F9jjMW6XoJdNm60&q=花蓮縣"
  	document.getElementById("map").style.display= "block";
  	//產生長條圖
    var ctx = document.getElementById('myChart');
	var myChart = new Chart(ctx, {
	  type: 'bar',
	  data: barData,
	  potion:{
	  	responsive: false,
	  }
	});
}