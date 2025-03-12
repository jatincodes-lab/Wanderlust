const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

module.exports.saveReview = async (req, res) => {
  const { id } = req.params;
  let listing = await Listing.findById(id);
  let newReview = await Review.insertOne(req.body.review);
  newReview.author = req.user._id;
  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();
  req.flash("success", "New Review Added Succesfully");
  res.redirect(`/listings/${id}`);
};

module.exports.deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  let delRev = await Review.findByIdAndDelete(reviewId);
  console.log(delRev);
  req.flash("success", "Review Deleted Succesfully");

  res.redirect(`/listings/${id}`);
};