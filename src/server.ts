import app from "./app";
import { PORT } from "./constants/value.constants";

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));