const fs = require("fs");
const discussions = JSON.parse(fs.readFileSync(`data/discussions.json`));

/*

Complete the middleware isOwner

which will move further only if the creator_id of the request discussion is same as request_by in req.body
API /api/v1/discussions/:id --> here id is id of discussion
req.body = {
    request_by : request_by
}

Response:

1. discussion with given id doesnot exist --> 

404 Status code 
json = {
    status: "Failed",
    message: "Discussion not found!",
}

2. requested discussion creator_id does not match with request_by in request body
403 Status code 
json = {
    status: "Failed",
    message: "Access Denied",
}

3. Success -> Next.

*/

function isOwner(req, res, next) {
    try {

        //Write your code here.    

    } catch (err) {
        return res.status(500).json({
            status: "Failed",
            message: "Unable to check access level"
        })
    }
}

module.exports = { isOwner };