import express from 'express'
import fs from 'fs'
import path from 'path'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import {StaticRouter} from "react-router-dom";
import {App} from '../frontend/app'

const server = express();

server.set('view engine', 'ejs')
server.set('views', path.join(__dirname, 'views'))

server.use('/', express.static(path.join(__dirname, 'static')))

const manifest = fs.readFileSync(
    path.join(__dirname, 'static/manifest.json'),
    'utf-8'
)
const assets = JSON.parse(manifest)

server.use('/api/*', (req, res) => res.send("API is up"));

server.get('/*', (req, res) => {
    const FrontendApp = () => (
        <StaticRouter location={req.url}><App/></StaticRouter>
    )
    const component = ReactDOMServer.renderToString(React.createElement(FrontendApp))
    res.render('client', {assets, component})
})

server.listen(3000, () => {
    console.log(`Server running on http://localhost:3000`)
})