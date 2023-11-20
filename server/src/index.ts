import app from "./server"
import * as dotenv from "dotenv"

dotenv.configDotenv()

const port = process.env.PORT

app.listen(port, ()=> {
    console.log(`server run on : http://localhost:${port}`)
})