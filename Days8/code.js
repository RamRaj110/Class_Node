const {MongoClient} = require("mongodb");

const url = 'mongodb://localhost:27017/'
const client  = new MongoClient(url)


const dbName = "Test"

async function main() {

    await client.connect()
    console.log("connected Succesffuly to server.");

    const db = client.db(dbName)

    const collection = db.collection('test1')
    const result =await collection.insertOne({name:"Pawan",Pro:"Software"})
    //console.log(result);

    const findResult = await collection.find({}).toArray()
    console.log(findResult)

    const updateResult = await collection.updateOne({name:"Pawan"},{$set:{name:"Raj"}})
    console.log(updateResult)
    
    const remove = await collection.deleteMany({name:"Pawan"})
    console.log(remove)
    return "Done."
    
    
}
main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());