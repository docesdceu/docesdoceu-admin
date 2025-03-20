import { Server } from 'socket.io';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

const ioHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on('connection', (socket) => {
      console.log('Cliente conectado');

      socket.on('message', async (message) => {
        const session = await getServerSession(req, res, authOptions);
        
        if (session?.user?.role === 'admin') {
          io.emit('message', {
            ...message,
            sender: 'admin',
            timestamp: new Date(),
          });
        }
      });

      socket.on('disconnect', () => {
        console.log('Cliente desconectado');
      });
    });
  }

  res.end();
};

export default ioHandler; 