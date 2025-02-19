import app from './app.js';
import { connectToDatabase } from './db/connection.js';

// Convert the PORT value to a number
const PORT: number = parseInt(process.env.PORT || '5000', 10);

connectToDatabase()
  .then(() => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
