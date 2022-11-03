import { createServer, IncomingMessage, ServerResponse } from 'http'
import { parkingSlotRequest } from './api/parkingSlot';
import { parkingTransactionRequest } from './api/transaction';
import { vehicleTypeRequest } from './api/vehicleType';

const listener = async (req: IncomingMessage, res: ServerResponse) => {
    const headers = {//header to allow CORS
        "Access-control-allow-origin": "*",
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET, PUT, DELETE',
        "Access-Control-Max-Age": 2592000, // 30 days
        /** add other headers as per requirement */
        "Content-Type": "application/json"
      }

    if (req.method === "OPTIONS") {
    res.writeHead(204, headers);
    res.end();
    return;
    }
    
    try{
        //Check if what api will execute base on the request url
        let result: string | object = ''
        if((req.url as string).match('/parkingslot(.*?)')){
            result = await parkingSlotRequest(req) as string | object
        }else if((req.url as string).match('/vehicletype(.*?)')){
            result = await vehicleTypeRequest(req) as string | object
        }else if((req.url as string).match('/parkingtransaction(.*?)')){
            result = await parkingTransactionRequest(req) as string | object
        }
        //server response if successfull
        res.writeHead(200,headers)
        res.end(JSON.stringify(result))
    } catch (error) {
        //server response if unsuccessfull or their is an error
        res.writeHead(400,headers)
        res.end(JSON.stringify(error))
    }
}

//server listener
const server = createServer(listener)
server.listen(8080)