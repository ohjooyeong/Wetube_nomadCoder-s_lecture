import express from "express";
import routes from "../routes";
import passport from "passport";
import { home, search } from "../controllers/videoController";
import {
    getLogin,
    logout,
    getJoin,
    postJoin,
    postLogin,
    githubLogin,
    postGithubLogin,
    getMe,
    kakaoLogin,
    postKakaoLogin,
} from "../controllers/userController";
import { onlyPrivate, onlyPublic } from "../middleware";

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.logout, onlyPrivate, logout);

globalRouter.get(routes.github, onlyPublic, githubLogin);

globalRouter.get(
    routes.githubCallback,
    passport.authenticate("github", { failureRedirect: "/login" }),
    postGithubLogin
);

globalRouter.get(routes.kakao, onlyPublic, kakaoLogin);

globalRouter.get(
    routes.kakaoCallback,
    passport.authenticate("kakao", { failureRedirect: "/login" }),
    postKakaoLogin
);

globalRouter.get(routes.me, getMe);

export default globalRouter;
