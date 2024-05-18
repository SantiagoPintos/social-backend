import express from 'express';
import { AppDataSource } from './orm/dataSource';
import  userRoutes from './routes/UserRoutes';
import publicationRoutes from './routes/PublicationRoutes';
import likeRoutes from './routes/LikeRoutes';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

dotenv.config();
const app = express();
const port = 4000;
const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200
};

app.use(express.json());
app.use(cors(corsOptions));

AppDataSource.initialize().then(() => {
    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
    
    // Register the user routes
    app.use('/users', userRoutes);
    app.use('/publications', publicationRoutes);
    app.use('/like', likeRoutes);
    
    
    // Start the server
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch((error) => {
    console.log('Error initializing the database', error);
    process.exit();
});



