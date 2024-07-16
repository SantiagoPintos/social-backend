import express from 'express';
import userRoutes from './routes/UserRoutes';
import publicationRoutes from './routes/PublicationRoutes';
import likeRoutes from './routes/LikeRoutes';
import timelineRoutes from './routes/TimelineRoutes'
import cors from 'cors';
import path from 'path';
import { checkDbConnection } from './utils/checkDbConnection';

const app = express();
const port = 4000;
const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200
};

if(process.env.JWT_SECRET === undefined || process.env.JWT_SECRET?.length === 0) throw new Error('Key not found in environment variables');

checkDbConnection();

app.use(express.json());
app.use(cors(corsOptions));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Register the user routes
app.use('/users', userRoutes);
app.use('/publications', publicationRoutes);
app.use('/like', likeRoutes);
app.use('/timeline', timelineRoutes);


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

