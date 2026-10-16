const mongoose = require('mongoose');

main().then(()=>{
 console.log("SuccessFully Connected");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

// Schema
const UserSchema = new mongoose.Schema({     // _id:false Means it Create ID for Each Location and Create a One-More ID for Whole Location To Prevent That We Use it
     username:String,
     address:[{
        _id:false,  
        location:String,
        city:String
     }]
});


// Model
const User = mongoose.model('User', UserSchema);

// Approach-01   (one to many)

const addusers=async ()=>{
    let user1=new User({
        username:"RobertTony",
        address:[{
            location:"221B Barker Street",
            city:"landon"
        }]
    })
    user1.address.push({
        location:"2231B Cheeker Street",
        city:"Paris"
    });
   let result= await user1.save();
   console.log(result);
}

addusers();

/*
o/p:-

If _id:false;

{
  username: 'RobertTony',
  address: [
    { location: '221B Barker Street', city: 'landon' },
    { location: '2231B Cheeker Street', city: 'Paris' }
  ],
  _id: new ObjectId('6ace6dd9ad4cb702cbd050f9'),
  __v: 0
}

--------------------

If _id:true
[
  {
    _id: ObjectId('6ace6bf1cccbad7925698c03'),
    username: 'RobertTony',
    address: [
      {
        location: '221B Barker Street',
        city: 'landon',
        _id: ObjectId('6ace6bf1cccbad7925698c04')
      },
      {
        location: '2231B Cheeker Street',
        city: 'Paris',
        _id: ObjectId('6ace6bf1cccbad7925698c05')
      }
    ],
    __v: 0
  }
]

*/
