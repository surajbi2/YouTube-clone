import videoFiles from "../models/videoFiles.js";
import User from "../models/auth.js";
import mongoose from "mongoose";

export const viewController = async (req, res) => {
  const { id: _id } = req.params;  // Extracting video ID from URL params
  const email = req.email;         // Assuming req.email comes from a valid middleware (e.g., JWT)

  console.log(`Video ID: ${_id}`);
  console.log(`User ID from request: ${email}`);

  // Check if video ID is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Video Unavailable.");
  }

  try {
    // Ensure the user exists and update their points
    console.log(`Finding user with email: ${email}`);
    
    // Make sure email is the unique field or switch to user _id if applicable
    const user = await User.findOne({ email });
    if (!user) {
      console.log(`User not found for email: ${email}`);
      return res.status(404).send("User not found.");
    }

    console.log(`Current points for user ${email}: ${user.points}`);

    // Increment the user's points by 5
    const updatedUser = await User.findByIdAndUpdate(
      user._id, 
      { $inc: { points: 5 } },  // Increment points field
      { new: true }
    );
    
    if (!updatedUser) {
      console.log(`Failed to update user points for user ID: ${email}`);
      return res.status(500).send("Failed to update user points.");
    }
    
    console.log(`Updated points for user ${email}: ${updatedUser.points}`);

    // Check if the video file exists
    console.log(`Finding video file with ID: ${_id}`);
    const file = await videoFiles.findById(_id);
    
    if (!file) {
      console.log(`Video not found for ID: ${_id}`);
      return res.status(404).send("Video not found.");
    }

    // Increment the video views by 1
    await videoFiles.findByIdAndUpdate(_id, { $inc: { Views: 1 } });

    // Successfully updated view count and user points
    res.status(200).json({ message: "View and points updated." });
  } catch (error) {
    console.error("Error updating points and views: ", error);
    res.status(500).json({ error: "An error occurred while updating points and views." });
  }
};
