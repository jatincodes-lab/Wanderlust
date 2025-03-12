const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isAuthor, validateReview } = require("../views/middelware.js");
const reviewsController = require("../controllers/review.js");



//Save Review
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewsController.saveReview)
);

//Delete Review
router.delete(
  "/:reviewId",
  isLoggedIn,
  isAuthor,
  wrapAsync(reviewsController.deleteReview)
);


module.exports = router;