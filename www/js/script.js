var devReady = false;
document.addEventListener("deviceready", onDeviceReady, false); // always put this line of code when using phonegap
	var db; 
//creating the function ondeviceready
function onDeviceReady (){
	alert("Device Ready");
	devReady = true;
	

	// name of db, verion of db, tag name, size of db
	db=window.openDatabase("HealthDB", "1.0", "Simple Demo", 2*1024*1024);
	// createDB-> Create Database methods
	// errorCB-> Error database methods
	// sucessCB-> Database successfully created
	db.transaction(createDB, errorCB, successCB); 
}

// tx is the refering to the create database function
function createDB(tx){
	//dont use autoincrement when creating a table
    tx.executeSql('CREATE TABLE IF NOT EXISTS userinfo(id INT, name TEXT, age TEXT, gender TEXT, weight TEXT, height TEXT)');
} 

// display alert if there is an error when database is not running or table is not created
function errorCB(err){
    alert("SQL Error: "+err.code); 
}

// display alert if table created
function successCB(){
    alert("Database & Table Created"); 
} 

//creating function when clicking button submit
function submitForm(){ 
 
	db.transaction(insertDB, errorCB);
	
	// change the page,slide to page 2
	$.mobile.changePage("#pagetwo", {reverse:false, transition:"slide"}); 
 
  return false; 
} 

// defining the insertDB function
function insertDB(tx){
    var name_c=$("[name='name']").val();
	var age_c=$("[name='age']").val();
	var gender_c=$('input[name=gender]:checked').val()
	var weight_c=$("[name='slider_1']").val();
	var height_c=$("[name='slider_2']").val();
	
 
   var sql='INSERT INTO userinfo (name,age,gender,weight,height) VALUES (?,?,?,?,?)'; 
 
   tx.executeSql(sql,[name_c,age_c,gender_c,weight_c,height_c], successQueryDB, errorCB); 
 
} 

// creating the function successQueryDB where we use a select command
function successQueryDB(tx){
    alert("Record added in DB");
	tx.executeSql('SELECT * FROM userinfo where rowid = 1 ', [], renderListCB, errorCB) ;
} 

//creating the renderListCB callback
// results is the parameter name for the select command
function renderListCB(tx, results){
    var htmlString = ' ';
	var htmlweight = ' ';
	var htmlheight = ' ';
    var len = results.rows.length; 
 
   for(var i=0; i<len;i++){
	   htmlString+='<h3 class="ui-bar ui-bar-a">Hi '+results.rows.item(i).name+'</h3>';
	   } 
	   
	for(var i=0; i<len;i++){
	   htmlweight+='<input type="number" ng-model="weight_kg" name="weight" id="weight_kg" value="'+results.rows.item(i).weight+'" class="form-control"> ';
	   } 

	for(var i=0; i<len;i++){
	   htmlweight+='<input type="number" ng-model="height_cm" name="height" id="height_cm" value="'+results.rows.item(i).height+'" class="form-control"> ';
	   }
	
	//displaying the rows  in the id resultList in index.html
   $('#username').html(htmlString);
   $('#weight').html(htmlweight);
    $('#height').html(htmlheight);  
}


//calculateBMI 
function calculateBmi() {
var weight = document.bmiForm.weight.value
var height = document.bmiForm.height.value
if(weight > 0 && height > 0){	
var finalBmi = weight/(height/100*height/100)
var finalBmi = Math.round(finalBmi);
document.bmiForm.bmi.value = finalBmi
if(finalBmi < 18.5){
document.bmiForm.meaning.value = "Underweight."
}
if(finalBmi > 18.5 && finalBmi < 25){
document.bmiForm.meaning.value = "Healthy."
}
if(finalBmi > 25){
document.bmiForm.meaning.value = "Overweight."
}
}
else{
alert("Please Fill in everything correctly")
}
}


//local storage


function view(){
	if(devReady){
	var blood = localStorage.getItem('blood');
	
	//alert("User Details - Name: "+name+ "Age: "+age+ "Email: "+email);
	document.getElementById('viewRegistered').innerHTML ="<p>name:"+name+ "<br>"+"age:"+age+"<br>"+"email: "+email+"</p>"

	}
}
//creating function save
function save(){
	alert(devReady);
	if(devReady == true){ // check if device is ready everytime calling a function

		var blood = document.getElementById('blood').value;
		
		if (typeof(Storage) !== "undefined")
			{   

		localStorage.setItem('blood', blood);

			}
			else{
				alert("Error: No Storage mechanism");
			}
		}
	else{
		alert("Device is not ready yet");
	}
}
