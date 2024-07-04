const API = process.env.isTesting
  ? "http://localhost:4000"
  : "https://imposter-webapp.onrender.com";

export default API;