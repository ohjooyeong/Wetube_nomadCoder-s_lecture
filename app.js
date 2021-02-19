import "core-js";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";
import { localsMiddleware } from "./middleware";

const app = express();

const PORT = 4000;

app.use(helmet({ contentSecurityPolicy: false }));
app.set("view engine", "pug");
// /uploads 주소로 간다면 express.static이 해당 directory에서 file을 보내줌.
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(localsMiddleware);

app.use(function (req, res, next) {
    res.setHeader("Content-Security-Policy", "script-src 'self' https://archive.org");
    return next();
});

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter); // use메서드는 어떤 사람이 ~~~/user url에 접근하면 userRouter로 이동시키겠다는 소리
app.use(routes.videos, videoRouter);

export default app;
