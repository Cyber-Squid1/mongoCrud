const mongoose=require('mongoose')

MONGO_URL='mongodb+srv://NASA-api:admin@nasacluster.1mspydi.mongodb.net/?retryWrites=true&w=majority'

mongoose.connection.once('open',()=>{
    console.log("Mongo connection ready");
});

mongoose.connection.on('error',(err)=>{
    console.error(err);
});

async function mongoConnect(){
    await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect(){
    await mongoose.disconnect();
}

module.exports={
    mongoConnect,
    mongoDisconnect
}