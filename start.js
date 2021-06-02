const cp = require("child_process");

// start Angular
cp.exec("ng serve")

cp.on("data", (data) => {
    process.stdout.write(data)
})

// start database
cp.exec("json-server --watch db.json")

cp.on("data", (data) => {
    process.stdout.write(data)
})

