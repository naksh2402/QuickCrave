const mongoose =require('mongoose');
const mongoUrl='mongodb+srv://nbbhatia55:24022003Mongosh@quickcrave.qm5bd.mongodb.net/QuickCrave?retryWrites=true&w=majority&appName=QuickCrave';
// const mongoUrl='mongodb+srv://nbbhatia55:24022003Mongosh@quickcrave.qm5bd.mongodb.net/';

const mongoDB=async()=>{
    try {
        await mongoose.connect(mongoUrl);
        console.log("Database Connected");
        let fetched_data=mongoose.connection.db.collection("food-data");
        let foodmenu=await fetched_data.find({}).toArray();
        let fetched_data2= mongoose.connection.db.collection("food-category");
        let foodCategory=await fetched_data2.find({}).toArray();
        
        if(foodmenu.length!=0){
            global.food_data=foodmenu;
            global.food_category=foodCategory;
        }
        else{
            console.log("Error in data fetching");
        }
    } catch (error) {
        console.log("Error:",error);
    }
};


module.exports=mongoDB;
