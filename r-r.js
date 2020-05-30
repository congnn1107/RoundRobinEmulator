/**
*Bài Tập Nhóm: Mô phỏng giải thuật Round-Robin
*Nhóm sinh viên:
*Nguyễn Ngọc Công - 611213
*Đặng Hồng Nhung - 611248
*Tô Thị Thủy - 611311
*/




//xếp lịch theo giải thuật round-robin xoay vòng
function RoundRobin(){
	
	//khai báo biến
	var pName = data[0];
	var pBurstTime = data[1];
	var pArrivalTime=[0,0,0,0];
	if(data.length>2) pArrivalTime=data[2];
	var quantum= parseInt(document.getElementById("q").value);
	if (quantum<=0 || isNaN(quantum)){
		alert("Không chấp nhận giá trị không hợp lệ!");
		return false;
	}

	var Time = 0;
	var logPName=[];
	var logRunTime=[];
	var readyQueue=[];
	var p=0;
	var temp=quantum;


	var exportRes=[];
	exportRes.push(pName);
	exportRes.push(pBurstTime.slice());
	exportRes.push(pArrivalTime);

	//in
	console.log("Processes:\t"+pName);
	console.log("Burst-Time:\t"+pBurstTime);
	console.log("Arrival-Time:"+pArrivalTime);
	console.log("Time-quantum:"+quantum);

	while(Time>=0){
		//console.log(Time);
		//điều kiện dừng
		if(sumArr(pBurstTime)==0) break;
	
		for(i=0;i<pName.length;i++){
		
			if(pBurstTime[i]==0 || readyQueue.find(e=>e==pName[i])!=undefined)continue;
		
			if(Time+temp>=pArrivalTime[i]){
				readyQueue.push(pName[i]);
			}
		}
	/*//in thử
	console.log("Hang doi: "+readyQueue);
	console.log("Thoi gian chay:" + pBurstTime);
	console.log("t+t:" + (Time+temp));
	*/
	
		logPName.push(pName[p]);
		if(pBurstTime[p]>quantum){
			logRunTime.push(quantum);
			Time+=quantum;
			pBurstTime[p]-=quantum;
			temp=quantum;
		
		}else{
			logRunTime.push(pBurstTime[p]);
			Time+=pBurstTime[p];
			temp=pBurstTime[p];
			pBurstTime[p]=0;
		
		}
		if(pBurstTime[p]>0)readyQueue.push(pName[p]);
		readyQueue.shift();
		p=RunningProcess(pName,readyQueue[0]);	
	}
//in kết quả lập lịch:
	console.log("Ket qua:"+logPName);

//Tính wait time:
	var logWaitTime=[0];//tính wait time theo bảng gantt
	temp=0;
	for(i=0;i<logPName.length;i++){
		temp+=logRunTime[i];
		logWaitTime.push(temp);
	}
//in kết quả
	console.log("wait-time:"+logWaitTime);


	var pWaitTime=[];//tính wait time cho các process
	for(i=0;i<pName.length;i++){
		let wt=0;
		for(j=logPName.length-1;j>=0;j--){
			if(pName[i]==logPName[j]){
				for(k = 0;k<j;k++){
					if(logPName[k]!=logPName[j]){
						wt+=logRunTime[k];
					}
				}
				break;
			}
		}
		pWaitTime.push(wt-pArrivalTime[i]);
	}
//in kết quả tính wait time
	console.log("P-wait-time:"+pWaitTime);
	console.log("wait-time trung binh:"+(sumArr(pWaitTime)/pWaitTime.length));

//turn around time = complete time - arrival time

	var pTurnAroundTime=[];//tính turn around time cho các process
	for(i=0;i<pName.length;i++){
	
		for(j=logPName.length-1;j>=0;j--){
			if(pName[i]==logPName[j]){
				pTurnAroundTime.push(logWaitTime[j+1]-pArrivalTime[i]);
				break;
			}
		}
	
	}
	// in kết quả tính turn around time
	console.log("turn around time:"+pTurnAroundTime);
	
	exportRes.push(pWaitTime);
	exportRes.push(pTurnAroundTime);
	exportRes.push(logPName);
	exportRes.push(logWaitTime);
	
	return exportRes;
}




//hàm hỗ trợ
//tìm ra process đang hoạt động
function RunningProcess(pName,name){
	for(i=0;i<pName.length;i++){
		if(pName[i]==name) return i;
	}
}
//tính tổng hàm
function sumArr(arr){
	let sum=0;
	for (i=0;i<arr.length;i++){
		sum+=arr[i];
	}
	return sum;
}