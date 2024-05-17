import { Sequelize } from "sequelize";
import express from "express";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import {
  UserModel,
  ListingModel,
  FeatureToListingModel,
  ListingFeatureModel,
} from "./models/models.js";
import { setupPassport } from "./auth/googleAuth.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import listingRoutes from "./routes/listing.js";
import userlistingRoutes from "./routes/userlisting.js";

import * as dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize("sql6705724", "sql6705724", "anblkgUHbj", {
  dialect: "mysql",
  host: "sql6.freesqldatabase.com",
  port: "3306",
});

try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
  console.log("Tables Done!");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(express.json({ limit: "25mb" }));
app.use(cors(corsOptions));
app.use(
  session({
    secret: "lols",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1800000 },
  })
);

app.use(passport.initialize());
app.use(passport.session());

setupPassport();

app.use("/auth/google", authRoutes);
app.use("/", userRoutes, listingRoutes);
app.use("/listing", listingRoutes);
app.use("/user", userlistingRoutes);

app.listen(5000, () => {
  console.log("listening in 5000");
});
