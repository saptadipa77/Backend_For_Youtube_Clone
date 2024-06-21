import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {      //req is json data , multer has files ,sometimes file also comes in req,so that time  we use multer,cb is callback
      cb(null, "./public/temp") //the temp which has gitkeep will contain the file  so that we can get access easily
    },
    filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) //we can change filename according to our wish but here we are skipping this step.We are just keeping the names same as the users name their files
      cb(null, file.originalname);  //not a bad practice as users may have files of same names so files may have been overwritten
    }
  })
  //returns file's name
 export  const upload = multer({ 
    storage: storage 
})
//the above is a syntax and we are exporting it