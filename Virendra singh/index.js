// section-7 Error Handling

// part-116 Express Error Handler 

// product-controller.js

// const {Product} = require("../models/product");
// const Joi = require("joi");
// const {UPLOAD_FOLDER} = process.env;

// async function getProducts(request, response, next) {

//     try {
//         const limit = Number.parseInt(request.query.pagesize) || 20;
//         const page = Number.parseInt(request.query.page) || 1;
//         const sort_by = request.query.sort;
//         const skip = limit * (page - 1);

//         const products = await Product.find().sort(sort_by).skip(skip).limit(limit);
//         const count = await Product.countDocuments();
//         response.json({products, count});

//     } catch (error) {
//            next(new Error("Something Went Wrong."))
//     }
// }


// // or

//   async function getProducts(request, response, next) {
//         const limit = Number.parseInt(request.query.pagesize) || 20;
//         const page = Number.parseInt(request.query.page) || 1;
//         const sort_by = request.query.sort;
//         const skip = limit * (page - 1);

//         throw new Error();    // yeh wali maine error create ki hai jise express-async-errors apne aap handle kr lega jab hum ise refresh krenge tab localhost page per 

//         const products = await Product.find().sort(sort_by).skip(skip).limit(limit);
//         const count = await Product.countDocuments();
//         response.json({products, count});
// }


// // localhost:3000/api/products  --> check it 
// // ab ismai hum sabhi ke ander try catch lgana padega jo ki sahi nhi hai isiliye hum ek package install krenge npm async errors install krenge npm i express-async-errors or 
// // https://www.npmjs.com/package/express-async-errors 

// async function getProduct(request, response) {
//   const _id = request.params.productId;
//   const product = await Product.findOne({_id});
//   response.json({product});
// }

// function validateProduct(data) {
//   // name , price , discount, productImage , category , active
//   const productSchema = Joi.object({
//     name: Joi.string().min(4).max(50).required(),
//     price: Joi.number().min(1).required(),
//     discount: Joi.number(),
//     category: Joi.string().required(),
//     active: Joi.boolean(),
//   });

//   const result = productSchema.validate(data);
//   return result;
// }

// async function createProduct(request, response, next) {
//   // create
//   console.log(request.file);

//   const productImage = UPLOAD_FOLDER + "/" + request.file.filename;

//   const validationResult = validateProduct(request.body);
//   if (validationResult.error) {
//     return next(new Error(validationResult.error.details[0].message));
//   }

//   let product = new Product({
//     ...validationResult.value,
//     productImage,
//   });

//   product = await product.save();
//   // console.log(request.bodyro);
//   response.json({product});
// }

// module.exports = {getProducts, createProduct, getProduct};


// // index.js 

// // ager ismai agr error aaye toh hume previous wala index.js use krna hai okay 

// const express = require("express");
// require("express-async-errors");



// // enviroment variables configuration
// require("dotenv").config();
// // const {UPLOAD_FOLDER} = process.env;

// // creating connection
// require("./database/connection")();
// const morgan = require("morgan");
// const {productRouter} = require("./router/product-router");
// const {orderRouter} = require("./router/order-router");
// const {categoryRouter} = require("./router/category-router");
// const handleErrors = require("./middlewares/error-handler");
// const {User} = require("./models/user");

// const application = express;

// application.use(express.json());
// application.use(morgan("dev"));

// application.get("/", (req, res) => {
//   res.json({messege: "Success"});
// });

// const APIRouter = express.Router();
// APIRouter.get("", (req, res) => res.json({message: "Api is working.."}));
// application.use("/api", APIRouter);


// APIRouter.get("/" + UPLOAD_FOLDER + "/*", (req, res, next) => {
//   const path = req.url;
//   const filePath = `${__dirname}${path}`;
//   res.sendFile(filePath, (err) => {
//     next();
//   });
// });

// application.use(handleErrors);
// module.exports = {application};

// // error-handler.js

// function handleErrors(error, request, response, next) {
//   console.log(error);
//   try {
//     if (response.statusCode === 200) response.status(500);
//     response.json({error: error.message || "something went Wrong"});
//   } catch (error) {
//     console.log(error);
//     next();
//   }
// }

// module.exports = handleErrors;

// // jaise yeh sab set hua iske baad mai hum try and catch ko remove kr denge 


// part-117 Uncaught Exceptions 

// index.js 


// // ager ismai agr error aaye toh hume previous wala index.js use krna hai okay 

// const express = require("express");

//  process.on('uncaughtException' , (err)=> {
    //  console.log("uncaughtException");                // added it 
// })

// require("express-async-errors");

// // enviroment variables configuration
// require("dotenv").config();
// // const {UPLOAD_FOLDER} = process.env;

// // creating connection
// require("./database/connection")();
// const morgan = require("morgan");
// const {productRouter} = require("./router/product-router");
// const {orderRouter} = require("./router/order-router");
// const {categoryRouter} = require("./router/category-router");
// const handleErrors = require("./middlewares/error-handler");
// const {User} = require("./models/user");
// const {Promise} = require("mongoose");

// const application = express;

// application.use(express.json());
// application.use(morgan("dev"));

// application.get("/", (req, res) => {
//   res.json({messege: "Success"});
// });

// const APIRouter = express.Router();
// APIRouter.get("", (req, res) => res.json({message: "Api is working.."}));
// application.use("/api", APIRouter);


// APIRouter.get("/" + UPLOAD_FOLDER + "/*", (req, res, next) => {
//   const path = req.url;
//   const filePath = `${__dirname}${path}`;
//   res.sendFile(filePath, (err) => {
//     next();
//   });
// });

// application.use(handleErrors);
// module.exports = {application};



// module.exports = handleErrors;


// part-118 Unhandled Promise Rejections 

// index.js 


// // ager ismai agr error aaye toh hume previous wala index.js use krna hai okay 

// const express = require("express");

//  process.on('uncaughtException' , (err)=> {
//    console.log("uncaughtException");
// })

//  process.on('unhandledRejection' , (err)=> {
//    console.log("unhandledRejection");                  // added it
// })

// require("express-async-errors");

// // enviroment variables configuration
// require("dotenv").config();
// // const {UPLOAD_FOLDER} = process.env;

// // creating connection
// require("./database/connection")();
// const morgan = require("morgan");
// const {productRouter} = require("./router/product-router");
// const {orderRouter} = require("./router/order-router");
// const {categoryRouter} = require("./router/category-router");
// const handleErrors = require("./middlewares/error-handler");
// const {User} = require("./models/user");
// const {Promise} = require("mongoose");

// const application = express;


//  Promise.reject(new Error ("From Promise"))                     // added it 
// .then(r=> {}, err=> { console.log("Error From Promise")};)


// application.use(express.json());
// application.use(morgan("dev"));

// application.get("/", (req, res) => {
//   res.json({messege: "Success"});
// });

// const APIRouter = express.Router();
// APIRouter.get("", (req, res) => res.json({message: "Api is working.."}));
// application.use("/api", APIRouter);


// APIRouter.get("/" + UPLOAD_FOLDER + "/*", (req, res, next) => {
//   const path = req.url;
//   const filePath = `${__dirname}${path}`;
//   res.sendFile(filePath, (err) => {
//     next();
//   });
// });

// application.use(handleErrors);
// module.exports = {application};



// Section-8 Refactoring Code 

// part-119 Error Handlers in one file

// index.js 


// // ager ismai agr error aaye toh hume previous wala index.js use krna hai okay 

// const express = require("express");
// const handleErrors = require("./middlewares/error-handler");

// require("express-async-errors");

// // enviroment variables configuration
// require("dotenv").config();
// // const {UPLOAD_FOLDER} = process.env;

// // creating connection
// require("./database/connection")();
// const morgan = require("morgan");
// const {productRouter} = require("./router/product-router");
// const {orderRouter} = require("./router/order-router");
// const {categoryRouter} = require("./router/category-router");
// const {User} = require("./models/user");
// const {Promise} = require("mongoose");

// const application = express;


//  Promise.reject(new Error ("From Promise"))                     // added it aur ise hum ab hide kr denge 
//  throw new Error("New Error....... ") 


// application.use(express.json());
// application.use(morgan("dev"));

// application.get("/", (req, res) => {
//   res.json({messege: "Success"});
// });

// const APIRouter = express.Router();
// APIRouter.get("", (req, res) => res.json({message: "Api is working.."}));
// application.use("/api", APIRouter);


// APIRouter.get("/" + UPLOAD_FOLDER + "/*", (req, res, next) => {
//   const path = req.url;
//   const filePath = `${__dirname}${path}`;
//   res.sendFile(filePath, (err) => {
//     next();
//   });
// });

// application.use(handleErrors);
// module.exports = {application};


// error-handlers.js 


//  process.on('uncaughtException' , (err)=> {
//    console.log("uncaughtException");
// })

//  process.on('unhandledRejection' , (err)=> {
//    console.log("unhandledRejection");                  // added it
// })


// function handleErrors(error, request, response, next) {
//   console.log(error);
//   try {
//     if (response.statusCode === 200) response.status(500);
//     response.json({error: error.message || "something went Wrong"});
//   } catch (error) {
//     console.log(error);
//     next();
//   }
// }

// module.exports = handleErrors;




// part-120 All Routers in one file 


// routers.js 

// const {categoryRouter} = require("./category-router");
// const {orderRouter} = require("./order-router");
// const {productRouter} = require("./product-router");
// const {userRouter} = require("./user-router");

// module.exports = {categoryRouter, userRouter, productRouter, orderRouter};




// index.js 


// // ager ismai agr error aaye toh hume previous wala index.js use krna hai okay 

// const express = require("express");
// const handleErrors = require("./middlewares/error-handler");

// require("express-async-errors");

// // enviroment variables configuration
// require("dotenv").config();
// // const {UPLOAD_FOLDER} = process.env;

// // creating connection
// require("./database/connection")();
// const morgan = require("morgan");
// const {userRouter} = require("./router/user-router");
// const {productRouter} = require("./router/product-router");
// const {orderRouter} = require("./router/order-router");
// const {categoryRouter} = require("./router/category-router");
// const {User} = require("./models/user");
// const {Promise} = require("mongoose");

// const application = express;


//  Promise.reject(new Error ("From Promise"))                     // added it aur ise hum ab hide kr denge 
//  throw new Error("New Error....... ") 


// application.use(express.json());
// application.use(morgan("dev"));

// application.get("/", (req, res) => {
//   res.json({messege: "Success"});
// });

// const APIRouter = express.Router();
// APIRouter.get("", (req, res) => res.json({message: "Api is working.."}));
// application.use("/api", APIRouter);


// APIRouter.use("/users", routers.userRouter);      // added it 
// APIRouter.use("/products", routers.productRouter);
// APIRouter.use("/orders", routers.orderRouter);
// APIRouter.use("/categories", routers.categoryRouter);  




// APIRouter.get("/" + UPLOAD_FOLDER + "/*", (req, res, next) => {
//   const path = req.url;
//   const filePath = `${__dirname}${path}`;
//   res.sendFile(filePath, (err) => {
//     next();
//   });
// });

// application.use(handleErrors);
// module.exports = {application};




// part-121 Server.js 

// server.js 

// const express = require("express");
// require("express-async-errors");
// const handleErrors = require("./middlwares/error-handler");
// const helmet = require("helmet");
// const cors = require("cors");

// // enviroment variables configuration

// const {UPLOAD_FOLDER} = process.env;

// // creating connection
// require("./database/connection")();
// const morgan = require("morgan");
// const routers = require("./router/routers");

// //creating Application
// const application = express();

// // application.use(helmet());
// var corsOptions = {
//   origin: "localhost:4200",
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };
// // application.use(cors(corsOptions));
// application.use(cors());

// application.use(express.json());
// application.use(morgan("dev"));

// application.get("/", (req, res) => {
//   res.json({messege: "Success"});
// });

// const APIRouter = express.Router();
// APIRouter.get("", (req, res) => res.json({message: "Api is working.."}));
// application.use("/api", APIRouter);

// APIRouter.use("/users", routers.userRouter);
// APIRouter.use("/products", routers.productRouter);
// APIRouter.use("/orders", routers.orderRouter);
// APIRouter.use("/categories", routers.categoryRouter);

// APIRouter.get("/" + UPLOAD_FOLDER + "/*", (req, res, next) => {
//   const path = req.url;
//   const filePath = `${__dirname}${path}`;
//   res.sendFile(filePath, (err) => {
//     next();
//   });
// });

// application.use(handleErrors);
// module.exports = {application};


// // index.js 

// require("dotenv").config();
// const {application} = require("./server");

// application.listen(process.env.PORT || 3000, () => {
//   console.log(`listening On Port ${process.env.PORT || 3000}`);
// });


// // user-router.js 

// const express = require("express");
// const {
//   getUsers,
//   saveUser,
//   loginUser,
//   updateUser,
//   updateUserById,
// } = require("../controller/user-controller");
// const {getOrderByUser} = require("../controller/order-controller");

// const {
//   userAuthMiddleware,
//   adminAuthMiddleware,
// } = require("../middlwares/user-auth-middleware");

// const userRouter = express.Router();

// // /api/users/
// userRouter.get("/", adminAuthMiddleware, getUsers);         // added it 

// // /api/users/123/orders
// userRouter.get("/:userId/orders", userAuthMiddleware, getOrderByUser);
// userRouter.post("/", saveUser);

// userRouter.put("/", userAuthMiddleware, updateUser);

// //api/user/123
// userRouter.put("/:user_id", adminAuthMiddleware, updateUserById);

// userRouter.post("/login", loginUser);

// module.exports = {userRouter};




// section-9 Logging

// part-122 Error logging in file

// npm install winston   isse install krenge   // https://www.npmjs.com/package/winston

// https://github.com/winstonjs/winston/tree/2.x       // ismai hum latest wala use krenge 
// https://github.com/winstonjs/winston/blob/master/UPGRADE-3.0.md

// logger.js 

// var winston = require("winston");
// const {DB_URL} = process.env;

// logger = new winston.createLogger({
//   transports: [
//     new winston.transports.Console(),
//     new winston.transports.File({filename: "logfile.log"}),
//   ],
// });

// module.exports = {logger};

// index.js 

// require("dotenv").config();
// const {application} = require("./server");


// application.listen(process.env.PORT || 3000, () => {
//   console.log(`listening On Port ${process.env.PORT || 3000}`);
// });


// error-handler.js 

// const {logger} = require("../logger/logger");

// process.on("uncaughtException", (err) => {
//   logger.error(err.message, err);
// });

// process.on("unhandledRejection", (err) => {
//   logger.error(err.message, err);
// });

// function handleErrors(error, request, response, next) {
//   console.log(error);
//   try {
//     if (response.statusCode === 200) {
//       logger.error(error.message, error);
//       response.status(500);
//     }
//     response.json({error: error.message || "something went Wrong"});
//   } catch (error) {
//     console.log(error);
//     next();
//   }
// }

// module.exports = handleErrors;




// part-123 Error Logging In MongoDb

// npm i winston-mongodb   --> install it
// https://www.npmjs.com/package/winston-mongodb


// logger.js 

// var winston = require("winston");
// const {DB_URL} = process.env;

// logger = new winston.createLogger({
//   transports: [
//     // new winston.transports.Console(),
//     new winston.transports.File({filename: "logfile.log"}),
//     new winston.transports.MongoDB({db: DB_URL}),
//   ],
// });

// module.exports = {logger};



// index.js 

// require("dotenv").config();
// const {application} = require("./server");


// application.listen(process.env.PORT || 3000, () => {
//   console.log(`listening On Port ${process.env.PORT || 3000}`);
// });

//  throw new Error("Generated By Me!!");


// ab isse hum mongoDb mai jakr ke check krenge 

// .env 

// use it this files 



// Section-10 Ready For Productions 

// part-124 Helmet 

// install --> npm i helmet 

// https://www.npmjs.com/package/helmet



// server.js    // iss pahle wali sari files mai cors htaa dena hai 

// const express = require("express");
// require("express-async-errors");
// const handleErrors = require("./middlwares/error-handler");
// const helmet = require("helmet");
// const cors = require("cors");

// // enviroment variables configuration

// const {UPLOAD_FOLDER} = process.env;

// // creating connection
// require("./database/connection")();
// const morgan = require("morgan");
// const routers = require("./router/routers");

// //creating Application
// const application = express();

// // application.use(helmet());
// var corsOptions = {
//   origin: "localhost:4200",
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };
// // application.use(cors(corsOptions));
// application.use(cors());

// application.use(express.json());
// application.use(morgan("dev"));

// application.get("/", (req, res) => {
//   res.json({messege: "Success"});
// });

// const APIRouter = express.Router();
// APIRouter.get("", (req, res) => res.json({message: "Api is working.."}));
// application.use("/api", APIRouter);

// APIRouter.use("/users", routers.userRouter);
// APIRouter.use("/products", routers.productRouter);
// APIRouter.use("/orders", routers.orderRouter);
// APIRouter.use("/categories", routers.categoryRouter);

// APIRouter.get("/" + UPLOAD_FOLDER + "/*", (req, res, next) => {
//   const path = req.url;
//   const filePath = `${__dirname}${path}`;
//   res.sendFile(filePath, (err) => {
//     next();
//   });
// });

// application.use(handleErrors);
// module.exports = {application};



// part-125 Cors 

// install --> npm i cors 
// https://www.npmjs.com/package/cors

// server.js                               // ab jakr ke cors use hua hai 

// const express = require("express");
// require("express-async-errors");
// const handleErrors = require("./middlwares/error-handler");
// const helmet = require("helmet");
// const cors = require("cors");

// // enviroment variables configuration

// const {UPLOAD_FOLDER} = process.env;

// // creating connection
// require("./database/connection")();
// const morgan = require("morgan");
// const routers = require("./router/routers");

// //creating Application
// const application = express();

// // application.use(helmet());
// var corsOptions = {                                 // yeh wala code use kiya 
//   origin: "localhost:4200",               // yeh hum development mode mai change kr sakte hai
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };
// // application.use(cors(corsOptions));              
// application.use(cors());

// application.use(express.json());
// application.use(morgan("dev"));

// application.get("/", (req, res) => {
//   res.json({messege: "Success"});
// });

// const APIRouter = express.Router();
// APIRouter.get("", (req, res) => res.json({message: "Api is working.."}));
// application.use("/api", APIRouter);

// APIRouter.use("/users", routers.userRouter);
// APIRouter.use("/products", routers.productRouter);
// APIRouter.use("/orders", routers.orderRouter);
// APIRouter.use("/categories", routers.categoryRouter);

// APIRouter.get("/" + UPLOAD_FOLDER + "/*", (req, res, next) => {
//   const path = req.url;
//   const filePath = `${__dirname}${path}`;
//   res.sendFile(filePath, (err) => {
//     next();
//   });
// });

// application.use(handleErrors);
// module.exports = {application};

//  ab hume google console mai yaa webpage mai jakr ke 
// fetch(''http://localhost:3000/api)   --> enter yeh hume error dega 
//Promise{<pending>}   --> aisa kuch likha hua aayega 


// fetch(''http://localhost:3000/api).then(r=>console.log(r.json()))  --> enter 

// ab mujhe kisi particular site mai hi pass krna hai sab jagah nhi to h hum cors ki docs mai jake corsOption wala code add kreenge 




// section-11 Hosting 

// part-126 Aws LightSail Instances 

// using --> AWS https://aws.amazon.com/

// username --> sunilsen786 
// pass --> Sunil@#0906

// after login --> search lightsail --> 