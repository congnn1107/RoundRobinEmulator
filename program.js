/**
*Bài Tập Nhóm: Mô phỏng giải thuật Round-Robin
*Nhóm sinh viên:
*Nguyễn Ngọc Công - 611213
*Đặng Hồng Nhung - 611248
*Tô Thị Thủy - 611311
*/

var data=[];
var fileinput = document.getElementById("fileinput");
fileinput.addEventListener("change", function (e){getData();});

//lấy dữ liệu từ file
function getData(){
	let reader = new FileReader();
	reader.onload = function(e){
		let content= reader.result.split('\n');
		let pn = content[0].split(' ');
		data.push(pn);
		let bt=content[1].split(' ').map((x)=>parseInt(x));
		//console.log("sum bt: "+sumArr(bt));
		//kiểm tra phát hiện lỗi
		if(isNaN(sumArr(bt))){
			alert("File không đúng định dạng, vui lòng kiểm tra lại a!");
			return;
		}
		data.push(bt);
		let at=[];
		if(content.length>2){
			at = content[2].split(' ').map((x)=>parseInt(x));
			//kiểm tra phát hiện lỗi
			if(isNaN(sumArr(at)) || bt.length != at.length  || at.length!=pn.length){
				alert("File không đúng định dạng, vui lòng kiểm tra lại b!");
				return;
			}
			data.push(at);
		}
		//kiểm tra phát hiện lỗi
		if(content.length>3  || bt.length != pn.length){
			alert("File không đúng định dạng, vui lòng kiểm tra lại c!");
			return;
		}
		
		//thực thi tính toán lấy kết quả
		var res = RoundRobin();
		//xuất kết quả ra giao diện
		if(res!=false){
			ExportResult(res);
		}
	};
	reader.readAsText(fileinput.files[0]);
}
//xuất kết quả ra giao diện
function ExportResult(res){
	var resultZone = document.getElementById("ketqua");
	resultZone.innerHTML="";
	//bảng kết quả
	var resultTable = document.createElement("table");
	var str = "<tr><th>Process</th><th>Burst Time</th><th>Arrival Time</th><th>Waiting time</th><th>Turn around time</th></tr>";
	for(i = 0; i<res[1].length;i++){
		row = "<tr><td>"+res[0][i]+"</td><td>"+res[1][i]+"</td><td>"+res[2][i]+"</td><td>"+res[3][i]+"</td><td>"+res[4][i]+"</td></tr>";
		str+=row;
	}
	resultTable.innerHTML=str;
	resultZone.appendChild(resultTable);
	
	//wait time trung bình
	var averageOfWT=document.createElement("p");
	averageOfWT.innerHTML="<strong>Wait time trung bình</strong>: "+sumArr(res[3])/res[3].length;
	resultZone.appendChild(averageOfWT);
	//turn around time trung bình
	var averageOfWT=document.createElement("p");
	averageOfWT.innerHTML="<strong>Turn around time trung bình</strong>: "+sumArr(res[4])/res[4].length;
	resultZone.appendChild(averageOfWT);
	
	//vẽ gantt chart
	var h4 = document.createElement("h4");
	h4.innerHTML="Gantt Chart:"
	resultZone.appendChild(h4);
	
	var gantt = document.createElement("table");
	gantt.id="gantt";
	row="";
	for(i=5;i<res.length;i++){
		row += "<tr>";
		for(j = 0;j<res[i].length;j++){
			row = row + "<td>" + res[i][j] +"</td>";
		}
		row+="</tr>";
	}
	gantt.innerHTML=row;
	resultZone.appendChild(gantt);
}