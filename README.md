<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <h1>Steps to setup the project</h1>
    <ol>
        <li>Clone the repository</li>
        <li>Run <code>npm i</code></li>
        <li>Create an env file with these credentials:</li>
    </ol>
    <table>
        <tr><td>HOST=xxxx</td></tr>
        <tr><td>USER=xxxx</td></tr>
        <tr><td>PASSWORD=xxxx</td></tr>
        <tr><td>DATABASE=xxxx</td></tr>
        <tr><td>JWT_SECRET=xxxx</td></tr>
    </table>
    <ol start="4">
        <li>If docker is not installed click <a href="https://www.docker.com/" target="_blank">here</a></li>
        <li>Run <code>docker compose up --build</code></li>
        <li>Once the build is successfully created, run <code>docker compose up</code></li>
        <li>Project will run on <code>localhost:3000</code></li>
        <li>DB will run on <code>localhost:8080</code></li>
        <li>Swagger docs can be accessed on <code>localhost:3000/api-docs/</code></li>
    </ol>
</body>
</html>
