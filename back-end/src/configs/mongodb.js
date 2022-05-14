import { MongoClient } from 'mongodb'
import { env } from './environment'

const uri = env.MONGODB_URI

export const connectDB = async () => {
  const client = new MongoClient(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  try {
    // connect the clienrt to the server
    await client.connect()
    console.log('==> Connect successfully to server !!')
    // list databases
    await listDatabases(client)

  // } catch (err) {
  //   console.log(err)
  } finally {
    // Ensures that the client will close when finsh/ err
    await client.close()
  }
}

const listDatabases = async (client) => {
  const databaseList = await client.db().admin().listDatabases()
  console.log(databaseList)
  console.log('Your database')
  databaseList.databases.forEach(db => console.log(` - ${db.name}`))
}
