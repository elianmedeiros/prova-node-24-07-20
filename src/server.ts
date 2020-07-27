import app from "./app";
import { PORT } from "./constants/value.constants";
var _ = require('lodash');

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));