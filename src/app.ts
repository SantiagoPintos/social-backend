import express from 'express';
import { AppDataSource } from './orm/dataSource';
import  userRoutes from './routes/UserRoutes';

const app = express();
const port = 4000;

app.use(express.json());
// Create a new instance of the AppDataSource class
const dataSource = AppDataSource.initialize();

// Register the user routes
app.use('/users', userRoutes);


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


