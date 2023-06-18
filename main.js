
let inp = document.querySelector("input"),
btn = document.querySelector(".repos .head span"),
showData = document.querySelector(".repos .show-data");



btn.onclick = function(){
getdata();
};

function getdata(){

  if(inp.value === ""){
    showData.innerHTML = "<span>Enter a Valid UserName</span>";

  }
  else{

    let arrInp = [];

    for(let i = 0; i < inp.value.length; i++){
      console.log(inp.value[i])
      if(inp.value[i] !== " "){
        arrInp.push(inp.value[i]);
      }
    }

    fetch(`https://api.github.com/users/${arrInp.join("")}/repos`).then((result)=>{

    let data = result.json();

    return data;

    }).then((dt)=>{

      createNodes(dt,dt.length);
    })
  }

}//end of getdata function

function createNodes(data,count){

  console.log(data);

  showData.innerHTML = "";

  if(count === 0){
    showData.innerHTML = "<span>No Person With This Name</span>";
  }
  for(let i = 0; i < count; i++){

    //create child div
    let child = document.createElement("div");
    child.className = "child";

    //create the name of repo
    let name = document.createElement("span");
    name.className = "name";
    name.innerHTML = data[i]["name"];
    child.appendChild(name);

    //create stars + number of watching
    let stars = document.createElement("div");
    stars.classList.add("stars","one");

    let watch = document.createElement("span");
    watch.innerHTML = data[i]["stargazers_count"];
    console.log(watch)
    stars.innerHTML = "Stars: ";
    stars.appendChild(watch);
    child.appendChild(stars);

    //create visit link
    let visit = document.createElement("a");
    visit.className = "one";
    visit.innerHTML = "Visit";
    visit.href = data[i]["html_url"];
    visit.target = "_blank";
    child.appendChild(visit);

    //put child to showData

    showData.appendChild(child);

  }
}
//_________________________________________________________________________________________________


