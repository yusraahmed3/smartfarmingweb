import express from "express";
import {
  approveRequest,
  deleteRequest,
  getRequest,
  getRequests,
  rejectRequest,
  sendRequest,
  upload,
} from "../controllers/requests.js";
import auth from "../middlewares/passport.js";

const router = express.Router();

router.get("/", auth, getRequests);

router.post("/", upload.single("photo"), sendRequest);

router.get("/:id", getRequest);

router.delete("/:id", auth, deleteRequest);

router.patch("/approve/:id", auth, approveRequest);

router.patch("/reject/:id", auth, rejectRequest);

export default router;
