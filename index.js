const express = require("express");
const app = express();
const fs = require("fs");

//Write file
app.get("/write-file",(req, res)=>{
    fs.writeFile("./public/output.txt", "This is a test message.",(err)=>{
        if(err){
            return res.status(500).send("Failed to write file.")
        }
        res.send("<h1>File written successfully</h1>")
    })
});

//Read file
app.get("/read-file",(req, res)=>{
    fs.readFile("./public/output.txt",(err, data)=>{
        if(err){
            return res.status(500).send("File not found")
        }
        res.setHeader("Content-Type", "text/plain")
        res.send(data)
    })
});

//Append file
app.get("/append-file",(req, res)=>{
    fs.appendFile("./public/output.txt", "\nNew line append." ,(err)=>{
        if(err){
            return res.status(500).send("Failed to append file.")
        }
        res.send("Content Appended.")
    })
});

//Delete file
app.get("/delete-file",(req, res)=>{
    fs.unlink("./public/output.txt", (err)=>{
        if(err){
            return res.status(500).send("Failed to delete file.")
        }
        res.send("File deleted successfully.")
    })
});

//Read a folder / directry 
app.get("/read-folder",(req, res)=>{
    fs.readdir("./public", (err, files)=>{
        if(err){
            console.log(err)
            return;
        }

        files.forEach(file =>{
            console.log(file)
        })
        res.send("File deleted successfully.")
    })
});

//file rename
app.get("/rename-file",(req, res)=>{
    fs.rename("./public/output.txt", "./public/new-output.txt", (err)=>{
        if(err){
            return res.status(500).send("Failed to rename file.")
        }
        res.send("File rename successfully.")
    })
});

//Stream data
app.get("/stream-text",(req, res)=>{
    const fileStream = fs.createReadStream("./public/new-output.txt")
    fileStream.on("open", ()=>{
        fileStream.pipe(res)
    })

    fileStream.on("error", ()=>{
        res.status(500).send("File not found or error reading file.")
    })
});

//Create Folder
app.get("/create-folder",(req, res)=>{
    fs.mkdir("./public/myFolder", (err)=>{
        if(err){
            return res.status(500).send("Error creating folder.")
        }
        res.send("Folder creating Successfully.")
    })
});

//Rename Folder
app.get("/rename-folder",(req, res)=>{
    fs.rename("./public/myFolder", "./public/renamedFolder", (err)=>{
        if(err){
            return res.status(500).send("Error renamed folder.", err)
        }
        res.send("Renamed folder Successfully.")
    })
});

//Delete folder
app.get("/delete-folder",(req, res)=>{
    fs.rmdir("./public/renamedFolder", (err)=>{
        if(err){
            return res.status(500).send("Error deleting folder.", err)
        }
        res.send("Folder deleted Successfully.")
    })
});

//Read pdf file
app.get("/read-pdf",(req, res)=>{
    fs.readFile("./public/Final CV.pdf", (err, data)=>{
        if(err){
            return res.status(500).send("PDF not found.", err)
        }
        res.setHeader("Content-Type", "application/pdf")
        res.send(data)
    })
});

//Read json file
app.get("/read-json",(req, res)=>{
    fs.readFile("./public/data.json", (err, data)=>{
        if(err){
            return res.status(500).send("JSON not found.", err)
        }
        res.setHeader("Content-Type", "application/json")
        res.send(data)
    })
});

//Write JSON
app.get("/write-json",(req, res)=>{
    const filePath = "./public/data.json"
    const data = { name: "Salman Khan", email: "salman@gmail.com", age: 20 }
    fs.writeFile(filePath, JSON.stringify(data),(err)=>{
        if(err){
            return res.status(500).send("Faild to write JSON file.", err)
        }
        
        res.send("JSON File written successfully.")
    })
})

//Append JSON
app.get("/append-json",(req, res)=>{
    const filePath = "./public/data.json"
    const newData = { name: "Saru Khan", email: "saru@gmail.com", age: 22 }

    fs.readFile(filePath, (err, data)=>{
        if(err){
            return res.status(500).send("Faild to read JSON file.", err)
        }
        
        let jsonData;
        jsonData = JSON.parse(data)

        if(!Array.isArray(jsonData)){
            jsonData = [jsonData]
        }
        jsonData.push(newData)

        fs.writeFile(filePath, JSON.stringify(jsonData),(err)=>{
        if(err){
            return res.status(500).send("Faild to write JSON file.", err)
        }
        
        res.send("JSON File appended successfully.")
    })
    })

    
})

//Read image-file
app.get("/read-image",(req, res)=>{
    fs.readFile("./public/chote.jpg", (err, data)=>{
        if(err){
            return res.status(500).send("Image not found.", err)
        }
        res.setHeader("Content-Type", "image/jpg")
        res.send(data)
    })
})

//Read video-file
app.get("/read-video",(req, res)=>{
    fs.readFile("./public/earth.mp4", (err, data)=>{
        if(err){
            return res.status(500).send("Video not found.", err)
        }
        res.setHeader("Content-Type", "video/mp4")
        res.send(data)
    })
})

//Gettinf Information

app.get("/file-info",(req, res)=>{
    fs.stat("./public/earth.mp4", (err, stats)=>{
        if(err){
            return res.status(500).send("File not found.", err)
        }
        
        res.send(stats.size + "bytes")
        console.log("File : " + stats.isFile());
        console.log("Folder : " + stats.isDirectory());
    })
});

//file exists

app.get("/file-exists",(req, res)=>{
    fs.access("./public/earth4455.mp4", (err, data)=>{
        if(err){
            res.send("File does not exist")
        }
        
        res.send("File Exists")
    })
});

app.listen(3000,()=>{
    console.log("Server is runing on port 3000");
})