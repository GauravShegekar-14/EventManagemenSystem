import { Server } from 'socket.io';
import { userModel } from './Model/user.Model.js';


let io;

/**
 * Initializes the Socket.IO server.
 * @param {Object} server - The HTTP server instance.
 */
function initializeSocket(server) {
    io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);

        // Handle user joining and update their socket ID
        socket.on('join', async (data) => {
            const { userId, userType } = data;

            console.log(`user ${userId} joined as ${userType}`);

            try {
                if (userType === 'User') {
                    await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
                } else if (userType === 'captain') {
                    await CaptainModel.findByIdAndUpdate(userId, { socketId: socket.id });
                }
            } catch (error) {
                console.error('Error updating socket ID:', error);
            }
        });

        // Handle location updates for captains
        socket.on('update-location-captain', async (data) => {
            const { userId, location } = data;

            if (!location || !location.ltd || !location.lng) {
                return socket.emit('error', { message: 'Invalid location data' });
            }

            try {
                await CaptainModel.findByIdAndUpdate(userId, {
                    location: {
                        ltd: location.ltd,
                        lng: location.lng
                    }
                });
                console.log(`Location updated for captain ${userId}`);
            } catch (error) {
                console.error('Error updating location:', error);
            }
        });

        // Handle client disconnection
        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
}

/**
 * Sends a message to a specific socket ID.
 * @param {string} socketId - The ID of the target socket.
 * @param {Object} messageObject - The message object containing event and data.
 */
const sendMessageToSocketId = (socketId, messageObject) => {
    // console.log(messageObject);

    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    } else {
        console.log('Socket.io not initialized.');
    }
};

export { initializeSocket, sendMessageToSocketId };