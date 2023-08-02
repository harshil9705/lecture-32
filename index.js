
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

document.querySelector("#form").addEventListener("submit",(e)=>{
    e.preventDefault()
    data={
        img:document.querySelector("#img").value,
        name:document.querySelector("#name").value,
        course:document.querySelector("#course").value,
        grid:document.querySelector("#grid").value,
        number:document.querySelector("#number").value,
    }

    // POST data

    fetch("http://localhost:8090/student",{
        method:"POST",
        headers:{"content-Type":"application/json"},
        body:JSON.stringify(data)
    })
    .then((pera)=>pera.json())
    .then((res)=>console.log(res))
})