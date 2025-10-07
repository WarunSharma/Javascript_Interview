# Horizontal Scalling
It means running multiple instances of nodejs app.
- Using multiple cores on same machine.
- Using multiple machines (distributed).

## ✅ 1. Cluster Module (Built-in)
It allows to fork multiple worker processes (same code) on same machine to utilize all cores.

```javascript
// cluster.js
const cluster = require('cluster');
const express = require('express');
const os = require('os');
const http = require('http');

if (cluster.isPrimary) {
  const numCPUs = os.cpus().length;
  console.log(`Primary process ${process.pid} is running`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork(); // Restart on crash
  });
} else {
  const app = express() 
  // Worker processes share the same server port
  app.listen(3000, (req, res) => {
    res.end(`Handled by PID: ${process.pid}`);
  });
}
```

## ✅ 2. Child Process: spawn, fork, exec
child_process module allows to run independent nodejs scripts.
- spawn() – Run large external processes (e.g., downloading a file, encoding a video) and stream output in chunks.
```javascript
const { spawn } = require('child_process');

const ls = spawn('ls', ['-lh', '/usr']); // list directory

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`Child process exited with code ${code}`);
});

```

- exec() – Run small shell commands where you just need the final output.

```javascript
const { exec } = require('child_process');

exec('node -v', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`Node version: ${stdout}`);
});

```

- fork() – optimized to run Node.js modules.

```javascript
// main.js
const { fork } = require('child_process');
const child = fork('worker.js');

child.send({ task: 'compute' });
child.on('message', (msg) => console.log('From child:', msg));
```

```javascript
// worker.js
process.on('message', (msg) => {
  if (msg.task === 'compute') {
    // simulate heavy computation
    let sum = 0;
    for (let i = 0; i < 1e8; i++) sum += i;
    process.send({ result: sum });
  }
});
```

📌 Use case: Heavy CPU tasks without blocking main thread.

## ✅ 3. Load Balancer (Across Servers)
Run multiple Node.js instances on different machines or containers, and use:

- Nginx or HAProxy to route requests
- PM2, a Node process manager with built-in clustering and load balancing
- Docker + Kubernetes for container orchestration

