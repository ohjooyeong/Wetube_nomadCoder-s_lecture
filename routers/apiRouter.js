import express from "express";
import routes from "../routes";
import {
    postAddcomment,
    postDeleteComment,
    postRegisterView,
} from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegisterView);
apiRouter.post(routes.addComment, postAddcomment);
apiRouter.post(routes.deleteComment, postDeleteComment);

export default apiRouter;
