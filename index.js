const http = require('http');
const os = require("os");
const process = require("process");
const fs = require("fs");

const port = 3000;
const server = http.createServer((req, res) => {
    console.log('New connection');
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Hello World</h1>');
});

function infoSystem(){
    console.log('---- Información inicial del sistema ----');
    console.log('Nombre del host:', os.hostname());
    console.log('Directorio:', os.homedir());
    console.log('Plataforma:', os.platform());
    console.log('Arquitectura:', process.arch);
    console.log('Versión Node js:', process.version);
}

function infoSystemP(){
    console.log('---- Información periodica del sistema ----');
    console.log('Uso de CPU:', process.cpuUsage());
    console.log('Uso de memoria:', process.memoryUsage());
    console.log('Tiempo que el sistema lleva activo:', os.uptime());
    console.log('Tiempo que lleva ejecutándose node.js:', process.uptime());
}

function readConfig(){
    try{
        const configInfo = fs.readFileSync('config.json', 'utf-8');
        return JSON.parse(configInfo);
    } catch(err){
        console.error('Error obteniendo la información del archivo de configuración', err);
        return {interval: 5};
    }
}

server.listen(port, () => {
    console.log(`Server running at port ${port}`);
    infoSystem();
    const {interval} = readConfig();
    setInterval(infoSystemP, interval * 1000);
});