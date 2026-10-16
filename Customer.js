const mongoose = require('mongoose');

main().then(()=>{
 console.log("SuccessFully Connected");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}


// Approach:- 02 (One to Many)  i.e Orders and Customer Like Primary and Foreign Key In SQL We Create Anthor Extra Colunm So WE USE [ MONGOOSE ]

// Schema

// OrderSchema
const OrderSchema=new mongoose.Schema({
   item:String,
   price:Number
});

// CustomerSchema
const CustomerSchema=new mongoose.Schema({
    name:String,
    orders:[{
         type: mongoose.Schema.Types.ObjectId,      // These is Populate-Concept
         ref: 'Order'
    }]
});

// Model
const Order=mongoose.model('Order',OrderSchema);
const Customer=mongoose.model('Customer',CustomerSchema);

// Handling a Deletion
/*
  Handling a Deletion Means 
    if we Delete User-Name then Their Post Will be Deleted That can Be Achived Here
    By Using an [ Mongoose-MiddleWare ] Concept's

    findByIdAndDelete is = findOneAndDelete 
    When We Call findOneAndDelete it Automatically Trigger The findByIdAndDelete


*/

// Important

CustomerSchema.post("findOneAndDelete", async (customer) => {
    if (customer.orders.length) {
        let res = await Order.deleteMany({ _id: { $in: customer.orders }  });
        console.log(res);
    }
});



 const addcust= async()=>{

      let newCust=new Customer({
        name:"Karna Arjuna"
      }) ;

      let newOrder=new Order({
        item:"Pizza",
        price:500
      });


       newCust.orders.push(newOrder);

       await newCust.save();
       await newOrder.save();

       console.log("Adding new Order");
  }

    addcust();

//--------------------------------------------------------------------------------------------------

// const addCustomer=async()=>{

//     const cust1=new Customer({
//         name:"BrueBanner"        
//              });

//          let order1= await Order.findOne({item:"Laptop"});
//          let order2= await Order.findOne({item:"Mobile"});

//          cust1.orders.push(order1);
//          cust1.orders.push(order2);
       
//          let result=await cust1.save();
//          console.log(result);
// };
 
//   addCustomer();

  /*
  O/P:-

  name: 'BrueBanner',
  orders: [
    {
      item: 'Laptop',
      price: 55000,
      _id: new ObjectId('6ace72178aa16afd912d4d26'),
      __v: 0
    },
    {
      item: 'Mobile',
      price: 25000,
      _id: new ObjectId('6ace72178aa16afd912d4d27'),
      __v: 0
    }
  ],
  _id: new ObjectId('6ace766f2c38e0c021995335'),
  __v: 0
}
  -------------------------------------------------------------------------
  O/P:-
  [
  {
    _id: ObjectId('6ace766f2c38e0c021995335'),
    name: 'BrueBanner',
    orders: [
      ObjectId('6ace72178aa16afd912d4d26'),
      ObjectId('6ace72178aa16afd912d4d27')
    ],
    __v: 0
  }
]

  */
// -------------------------------------------------------------------------------------------------------
// const addOrders=async()=>{
//    let res =await Order.insertMany([
//         { item: "Laptop", price: 55000 },
//         { item: "Mobile", price: 25000 },
//         { item: "Headphones", price: 2000 },
//         { item: "Keyboard", price: 1500 },
//         { item: "Mouse", price: 800 }
//     ]);
//     console.log(res);
// };

// addOrders();
