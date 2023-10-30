const express = require("express");
const cors = require("cors");

const app = express();

// Cấu hình CORS
app.use(cors());

// Các tuyến định tuyến và xử lý yêu cầu khác...

app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});