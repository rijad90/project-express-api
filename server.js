import express from "express"
import cors from "cors"

import members from "./data/technigo-members.json"

const port = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(express.json())

// request = information that comes to the backend when we send a request
// response = what information in sent to the frontend when we use logic

app.get("/", (req, res) => {
  res.send("Hello Technigo!")
})

// first endpoint, GET request with URL /members
app.get("/members", (req, res) => {
  res.status(200).json({
    data: members,
    success: true,
  })
})

// second endpoint, added path parameter for more dynamic and to enable reuse just like reusable function
// find = finds the first element that meets the req (this is used with id which is UNIQ compared to a name like below example)
// filter = finds all elements that meet the req

// line 39 - 55 is called endpoint , the "url/uri" on line 39 is route
app.get("/members/name/:name", (req, res) => {
  const { name } = req.params

  const memberByName = members.find((member) => member.name === name)

  if (!memberByName) {
    res.status(404).json({
      data: "Not Found",
      success: false,
    })
  } else {
    res.status(200).json({
      data: memberByName,
      success: true,
    })
  }
})

app.get("/members/role/:role", (req, res) => {
  const { role } = req.params

  const membersByRole = members.filter(
    (member) => member.role.toLowerCase() === role.toLowerCase()
  )

  res.status(200).json({
    data: membersByRole,
    success: true,
  })
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
