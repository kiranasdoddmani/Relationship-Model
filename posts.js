// One to Squillions
const mongoose = require('mongoose');

main().then(()=>{
 console.log("SuccessFully Connected");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

// Schema 
const UserSchema=new mongoose.Schema({
      Username:String,
      email:String
});

const PostsSchema=new mongoose.Schema({
     content:String,
     likes:Number,
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
      }
});

// Model
const User=mongoose.model("User",UserSchema);
const Post=mongoose.model("Post",PostsSchema);

// const adddata = async()=>{
  //  let User1=new User({
  //   Username:"karna Arjun",
  //   email:"KaranArjun@gmail.com"
  //  });

  //  let Post1 =new Post({
  //    content:"Hello World",
  //    likes:500,
  //  });

  //  Post1.user=User1;

  //  await User1.save();
  //  await Post1.save();

   
//   let user=await User.findOne({Username:"karna Arjun"});

//   let Post2=new Post({
//      content:"I am Java-Developer",
//      likes:600,
//    });
//      Post2.user=User._id;
//    await Post2.save();
// }

// adddata();


const getdata= async ()=>{
  let result=await Post.findOne({}).populate("user");
  console.log(result);
}

getdata();


//-----------------------------------------------------------------
/*

{
  _id: new ObjectId('6ad1056637c96af37004550c'),
  content: 'Hello World',
  likes: 500,
  user: {
    _id: new ObjectId('6ad1056637c96af37004550b'),
    Username: 'karna Arjun',
    email: 'KaranArjun@gmail.com',
    __v: 0
  },
  __v: 0
}


*/

// ---------------------------------------------------------------------------------------------------------------------------------

 