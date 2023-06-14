var cname=document.getElementById("cname");
var ccategory=document.getElementById("ccategory");
var cprice=document.getElementById("cprice");
var cdescription=document.getElementById("cdescription");
var ccapacity=document.getElementById("ccapacity");
var addbtn=document.getElementById("addbtn");
// var courses=[]
var currentindex=0;
var data=document.getElementById("data");
var search=document.getElementById("search");
var update=document.getElementById("updatebtn");
var cnvalid = false;
var ccvalid = false;
var cpvalid = false;
var cdvalid = false;
var capacityvalid = false;

var courses;
if(JSON.parse(localStorage.getItem('courses') === null)){
courses=[];
}
else{
  courses=JSON.parse(localStorage.getItem('courses'));

}


displayData();

function checkinputs(){
  if(cnvalid && ccvalid && cpvalid && cdvalid && capacityvalid){
    addbtn.removeAttribute('disabled');
   
  }
  else{
    addbtn.setAttribute('disabled','disabled');

  }
}
// cname.classList.add("is-valid") to add class in js
// addbtn.disabled=true;
addbtn.onclick=function(event){
    event.preventDefault();
    
         addCourse();
         resetData();
         cprice.classList.remove("is-valid");
         cname.classList.remove("is-valid");
         ccategory.classList.remove("is-valid");
         cdescription.classList.remove("is-valid");
         ccapacity.classList.remove("is-valid");
         addbtn.disabled=true;
         displayData();
   
    console.log(courses)
}





function addCourse(){
    
    var course={
        cname:cname.value,
        ccategory:ccategory.value,
        cprice:cprice.value,
        cdescription:cdescription.value,
        ccapacity:ccapacity.value
        }
      
        
  
        courses.push(course);
       localStorage.setItem('courses',JSON.stringify(courses));
        
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          })
        
}



function resetData(){
cname.value=''
ccapacity.value=''
ccategory.value=''
cprice.value='' 
cdescription.value=''
}
function displayData(){
var result=``;
for(var i=0;i<courses.length;i++){
result+=`
<tr>
<td>${i+1}</td>
<td>${courses[i].cname}</td>
<td>${courses[i].ccategory}</td>
<td>${courses[i].cprice}</td>
<td>${courses[i].cdescription}</td>
<td>${courses[i].ccapacity}</td>
<td> <button class="btn btn-info" onclick="getItem(${i})"> updata </button></td>
<td> <button class="btn btn-danger" onclick="deleteCourse(${i})" > delete </button> </td>
</tr>


`
}
data.innerHTML=result

}

document.getElementById("delete").onclick=function(){

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
        
      }).then((result) => {
        
        if (result.isConfirmed) {
            courses=[];
           data.innerHTML=""
           localStorage.setItem('courses',JSON.stringify(courses));
           Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })


}

function deleteCourse(index){


    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
        
      }).then((result) => {
        
        if (result.isConfirmed) {
            courses.splice(index,1);
            displayData();
            localStorage.setItem('courses',JSON.stringify(courses));


          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })

}

search.onkeyup=function(){
    var result=``
  for(var i=0;i<courses.length;i++){
    if(courses[i].cname.toLowerCase().includes(search.value.toLowerCase())){
        result+=`
<tr>
<td>${i+1}</td>
<td>${courses[i].cname}</td>
<td>${courses[i].ccategory}</td>
<td>${courses[i].cprice}</td>
<td>${courses[i].cdescription}</td>
<td>${courses[i].ccapacity}</td>
<td> <button class="btn btn-info" onclick="getItem(${i})"> updata </button></td>
<td> <button class="btn btn-danger" onclick="deleteCourse(${i})" > delete </button> </td>
</tr>


`
    }
  }
  data.innerHTML=result
}

function getItem(index){
  currentindex=index;
 cname.value=courses[index].cname;
 ccategory.value=courses[index].ccategory;
 cprice.value=courses[index].cprice;
 cdescription.value=courses[index].cdescription;
 ccapacity.value=courses[index].ccapacity;
update.classList.replace('d-none','d-inline');
addbtn.style.display='none';
}

update.onclick=function(e){
  e.preventDefault();
  var course={
    cname:cname.value,
    ccategory:ccategory.value,
    cprice:cprice.value,
    cdescription:cdescription.value,
    ccapacity:ccapacity.value
    }
    var preName= courses[currentindex].cname;
  courses[currentindex].cname=course.cname;
  courses[currentindex].ccategory=course.ccategory;
  courses[currentindex].cdescription=course.cdescription;
  courses[currentindex].cprice=course.cprice;
  courses[currentindex].ccapacity=course.ccapacity;
  localStorage.setItem('courses',JSON.stringify(courses));
  displayData();

  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: `${preName} has update successfuly`,
    showConfirmButton: false,
    timer: 1500
  })
  resetData();

}


function validatecname(){
    var recname =/^[A-Z][a-z]{2,9}$/;
    if(recname.test(cname.value)) {
   
       document.getElementById("cnerror").innerHTML="";
       cname.classList.remove("is-invalid");
       cname.classList.add("is-valid");
       cnvalid=true;
    }
    
      else {
        
       cname.classList.remove("is-valid");
       cname.classList.add("is-invalid");
        document.getElementById("cnerror").innerHTML="* name must start capital and contains 3-9 character";
        cnvalid=false;
     
    }
    checkinputs();
}



function validatecc(){
 var reccategory=/^[A-Z][a-z]{2,20}$/;
 if(reccategory.test(ccategory.value)) {
    
    document.getElementById("ccerror").innerHTML="";
    ccategory.classList.remove("is-invalid");
    ccategory.classList.add("is-valid");
    ccvalid=true;
    
}

else {
          
    ccategory.classList.remove("is-valid");
    ccategory.classList.add("is-invalid");
    document.getElementById("ccerror").innerHTML="* invalid course category";
    ccvalid=false;
    
 }
 checkinputs();
}

function validateprice(){
  var reprice=/^[5-9][0-9]|100$/;
  if(reprice.test(cprice.value)){
    document.getElementById("perror").innerHTML="";
    cprice.classList.remove("is-invalid");
    cprice.classList.add("is-valid");
    cpvalid=true;
   
  }
  
  else{
    document.getElementById("perror").innerHTML="*price must between 50-100";
    ccategory.classList.remove("is-valid");
    cprice.classList.add("is-invalid");
    cpvalid=false;
  }
  checkinputs();
}

cdescription.onkeyup=function(){
  var redesc=/^[A-Z][A-Za-z0-9]{2,120}$/;
 if(redesc.test(cdescription.value)) {
    
    document.getElementById("derror").innerHTML="";
    cdescription.classList.remove("is-invalid");
    cdescription.classList.add("is-valid");
    cdvalid=true;
    
}

else {
          
    cdescription.classList.remove("is-valid");
    cdescription.classList.add("is-invalid");
    document.getElementById("derror").innerHTML="*  course description must start capital letter and character between 3-120";
    cdvalid=false;
    
 }
 checkinputs();
}

ccapacity.onkeyup=function(){
  var recap=/^[0-9]{3,4}$/;
  if(recap.test(ccapacity.value)){
    document.getElementById("caerror").innerHTML="";
    ccapacity.classList.remove("is-invalid");
    ccapacity.classList.add("is-valid");
    capacityvalid=true;
   
  }
  
  else{
    document.getElementById("caerror").innerHTML="*capacity must between 100-9999";
    ccapacity.classList.remove("is-valid");
    ccapacity.classList.add("is-invalid");
    capacityvalid=false;
  }
  checkinputs();
}

