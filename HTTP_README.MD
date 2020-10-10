#### HTTTP : Hyper Text Transfer Protocol

#### Communication between client and server

#### HTTP Requst / Responses

#### Includes header / body

**USING HTTP without Express:**

```
const http = require("http");

const todos = [
  { id: 1, text: "Todo One" },
  { id: 2, text: "Todo Two" },
  { id: 3, text: "Todo Three" },
];

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("X-Powered-By", "Node.js");

  // ! Important: JSON.stringify
  res.end(
    JSON.stringify({
      success: true,
      data: todos,
    })
  );
});

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

```

---

**[HTTP RESPONSE CODES:](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)**

**1.**
1xx : Informational -> Fires off before the info is processed.

**2.**
2xx : Successful
200 : Success
201 : Created
204 : No Content _(Use for DELETE Success)_

**3.**
3xx : Redirection
304 : Not Modified

**4.**
4xx : Client Error
400 : Bad Request
401 : Unauthorized
404 : Not found

**5.**
5xx : Server Error
500: Internal Server Error
