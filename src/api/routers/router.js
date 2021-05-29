const express = require("express");
const router = express.Router();

const content = `<style>
                  * {
                    margin:0;
                  }

                  body {
                    color: #fff;
                    background: #000 url("https://source.unsplash.com/random") no-repeat center center fixed;
                    background-size: cover;
                    font-family: sans-serif;
                    font-size: 5rem;
                  }

                  div {
                    background: #0000002a;
                    height: 100%;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                  }
                </style>

                <div>
                <h1>NESChat API</h1>
                <p>Server is up and Running.</p>
                </div>`;

router.get("/", (req, res) => {
  res.send(content);
});

module.exports = router;
