import express from 'express';
import { AppDataSource } from './orm/dataSource';
import  userRoutes from './routes/UserRoutes';
import publicationRoutes from './routes/PublicationRoutes';
import likeRoutes from './routes/LikeRoutes';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = 4000;

app.use(express.json());
AppDataSource.initialize().then(() => {
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



