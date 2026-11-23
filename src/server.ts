import app from "./app";
import config from "./config";
import { INITDB } from "./db";

const main = () => {
    try {
        
        INITDB()
        app.listen(config.port, () => {
        console.log(`Example app listening on port ${config.port}`)
    })
    } catch (error) {
      console.error(error)  
    }
}

main();