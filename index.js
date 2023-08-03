let id = -1

document.querySelector("#form").addEventListener("submit",(e)=>{
    e.preventDefault()
    // POST data
    let value = document.querySelector("#value").value;
    console.log(value);
    
    data={
        img:document.querySelector("#img").value,
        name:document.querySelector("#name").value,
        course:document.querySelector("#course").value,
        grid:document.querySelector("#grid").value,
        number:document.querySelector("#number").value,
    }

    if(value == "submit"){
        fetch("http://localhost:8090/student",{
            method:"POST",
            headers:{"content-Type":"application/json"},
            body:JSON.stringify(data)
        })
    }
    else{
            fetch("http://localhost:8090/student/" + id,{
                method:"PATCH",
                headers:{"content-type":"application/json"},
                body:JSON.stringify(data)
            })
            document.querySelector("#img").value = ""
            document.querySelector("#name").value = ""
            document.querySelector("#course").value = "" 
            document.querySelector("#grid").value = ""
            document.querySelector("#number").value = ""
            document.querySelector("#value").value = "submit"    
        }

})

let output = (std) =>{
    document.querySelector("#ui").innerHTML=""
    std.map((ele)=>{
        let img = document.createElement("img")
        img.src=ele.img
        let name = document.createElement("h1")
        name.innerHTML=ele.name
        let course = document.createElement("h2")
        course.innerHTML=ele.course
        let grid = document.createElement("h3")
        grid.innerHTML=ele.grid
        let number = document.createElement("h3")
        number.innerHTML=ele.number

        let btn1 = document.createElement("button")
        btn1.innerHTML="DELETE"
        btn1.addEventListener("click",()=>{
            dlt(ele.id)
        })

        let btn2 = document.createElement("button")
        btn2.innerHTML="UPDATE"
        btn2.addEventListener("click",()=>{
            document.querySelector("#img").value = ele.img
            document.querySelector("#name").value = ele.name
            document.querySelector("#course").value = ele.course 
            document.querySelector("#grid").value = ele.grid
            document.querySelector("#number").value = ele.number
            document.querySelector("#value").value = "update"
            id=ele.id
        })

        let btndiv = document.createElement("div")
        btndiv.append(btn1,btn2)
        btndiv.setAttribute("class","btndiv")
        let div = document.createElement("div")
        div.append(img,name,course,grid,number,btndiv)
        document.querySelector("#ui").append(div)
    })

}

// DELETE data

let dlt =async (id) =>{
    fetch(`http://localhost:8090/student/${id}`,{
        method:"DELETE"
    })
} 


// get data

fetch("http://localhost:8090/student")
.then((ser)=>ser.json())
.then((data)=>output(data))
