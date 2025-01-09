const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const port = 3000;
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
let db;

app.use(express.json());

(async function () {
  try {
    await client.connect();
    db = client.db("takehome");

    
    app.get("/users", async (req, res) => {
      const users = await db.collection("users").find({}).toArray();
      res.json(users);
    });

    app.get("/users/:userId", async (req, res) => {
      const user = await db.collection("users").findOne({ userId: req.params.userId });
      res.json(user);
    });
    
    app.post("/users", async (req, res) => {
      const result = await db.collection("users").insertOne(req.body);
      res.json(result);
    });

    app.patch("/users/:userId", async (req, res) => {
      const result = await db.collection("users").updateOne(
        { userId: req.params.userId },
        { $set: req.body }
      );
      res.json(result);
    });

    app.delete("/users/:userId", async (req, res) => {
      const result = await db.collection("users").deleteOne({ userId: req.params.userId });
      res.json(result);
    });

    
    app.get("/videos", async (req, res) => {
      const videos = await db.collection("videos").find({}).toArray();
      res.json(videos);
    });

    app.get("/videos/:videoId", async (req, res) => {
      const video = await db.collection("videos").findOne({ videoId: req.params.videoId });
      res.json(video);
    });

    app.post("/videos", async (req, res) => {
      const result = await db.collection("videos").insertOne(req.body);
      res.json(result);
    });

    app.patch("/videos/:videoId/likes", async (req, res) => {
      const result = await db.collection("videos").updateOne(
        { videoId: req.params.videoId },
        { $inc: { likes: 1 } }
      );
      res.json(result);
    });

    app.delete("/videos/:videoId", async (req, res) => {
      const result = await db.collection("videos").deleteOne({ videoId: req.params.videoId });
      res.json(result);
    });

   
    app.get("/videos/:videoId/comments", async (req, res) => {
      const comments = await db.collection("comments").find({ videoId: req.params.videoId }).toArray();
      res.json(comments);
    });

    app.post("/comments", async (req, res) => {
      const result = await db.collection("comments").insertOne(req.body);
      res.json(result);
    });

    app.patch("/comments/:commentId/likes", async (req, res) => {
      const result = await db.collection("comments").updateOne(
        { commentId: req.params.commentId },
        { $inc: { likes: 1 } }
      );
      res.json(result);
    });

    app.delete("/comments/:commentId", async (req, res) => {
      const result = await db.collection("comments").deleteOne({ commentId: req.params.commentId });
      res.json(result);
    });

    
    app.get("/playlists/:userId", async (req, res) => {
      const playlists = await db.collection("playlists").find({ userId: req.params.userId }).toArray();
      res.json(playlists);
    });

    app.post("/playlists", async (req, res) => {
      const result = await db.collection("playlists").insertOne(req.body);
      res.json(result);
    });

    app.put("/playlists/:playlistId/videos", async (req, res) => {
      const result = await db.collection("playlists").updateOne(
        { playlistId: req.params.playlistId },
        { $push: { videos: req.body.videoId } }
      );
      res.json(result);
    });

    app.delete("/playlists/:playlistId", async (req, res) => {
      const result = await db.collection("playlists").deleteOne({ playlistId: req.params.playlistId });
      res.json(result);
    });

   
    app.get("/subscriptions/:userId", async (req, res) => {
      const subscriptions = await db.collection("subscriptions").find({ subscriber: req.params.userId }).toArray();
      res.json(subscriptions);
    });

    app.post("/subscriptions", async (req, res) => {
      const result = await db.collection("subscriptions").insertOne(req.body);
      res.json(result);
    });

    app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
  } catch (err) {
    console.error(err);
  }
})();