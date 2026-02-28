export default async function handler(req, res) {
  const target = "https://httpbin.org" + req.url.replace("/api/proxy", "");

  try {
    const response = await fetch(target, {
      method: req.method,
      headers: req.headers,
      body: req.method !== "GET" ? JSON.stringify(req.body) : undefined
    });

    const data = await response.text();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(response.status).send(data);

  } catch (err) {
    res.status(500).send("Proxy Error");
  }
}