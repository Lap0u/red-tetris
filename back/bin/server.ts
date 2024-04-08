/*
|--------------------------------------------------------------------------
| HTTP server entrypoint
|--------------------------------------------------------------------------
|
| The "server.ts" file is the entrypoint for starting the AdonisJS HTTP
| server. Either you can run this file directly or use the "serve"
| command to run this file and monitor file changes
|
*/

import 'reflect-metadata'
import { Ignitor, prettyPrintError } from '@adonisjs/core'
import { Server } from 'socket.io'
import {
  handleGameSpeed,
  handleGameStart,
  handleGetOwners,
  handleInformGameCreated,
  handlePlayerReady,
  handlePreGameLeave,
  handleRoomJoin,
  handleRoomLeave,
} from '#controllers/sockets_controller'

export const io = new Server({
  cors: {
    origin: '*',
  },
})

io.listen(3334)
io.on('connection', (socket) => {
  let userId: number | null = null

  socket.on('registerUser', (data) => {
    userId = data.userId
    // Here you can associate the userId with the socket.id
    // For example, using a Map or an object to keep track
  })

  socket.on('askSetGameSpeed', (data) => {
    handleGameSpeed(socket, data)
  })

  socket.on('playerReady', (data) => {
    handlePlayerReady(socket, data)
  })
  socket.on('leaveGame', (data) => {
    handlePreGameLeave(socket, data)
  })
  socket.on('disconnect', () => {
    // Now you can use the userId that was associated with this socket
    if (userId) {
      console.log(`User ${userId} disconnected`)
      handleRoomLeave(socket, userId)
    } else {
      console.log('Unknown user disconnected')
    }
  })
  socket.on('joinRoom', (data) => {
    userId = data.userId
    handleRoomJoin(socket, data.room, data.userId)
  })
  socket.on('askGameStart', (data) => {
    handleGameStart(socket, data)
  })
  socket.on('askGetOwners', () => {
    handleGetOwners(socket)
  })
  socket.on('informGameCreated', () => {
    handleInformGameCreated(socket)
  })
})

/**
 * URL to the application root. AdonisJS need it to resolve
 * paths to file and directories for scaffolding commands
 */
const APP_ROOT = new URL('../', import.meta.url)

/**
 * The importer is used to import files in context of the
 * application.
 */
const IMPORTER = (filePath: string) => {
  if (filePath.startsWith('./') || filePath.startsWith('../')) {
    return import(new URL(filePath, APP_ROOT).href)
  }
  room: string
  return import(filePath)
}

new Ignitor(APP_ROOT, { importer: IMPORTER })
  .tap((app) => {
    app.booting(async () => {
      await import('#start/env')
    })
    app.listen('SIGTERM', () => app.terminate())
    app.listenIf(app.managedByPm2, 'SIGINT', () => app.terminate())
  })
  .httpServer()
  .start()
  .catch((error) => {
    process.exitCode = 1
    prettyPrintError(error)
  })
