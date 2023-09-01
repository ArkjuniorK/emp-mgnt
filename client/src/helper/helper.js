import {redirect} from "next/navigation";

/**
 * Remove token and username from localStorage then
 * redirect to login page
 *
 */
function logout() {
   localStorage.removeItem("token");
   localStorage.removeItem("username");
   redirect("/login")
}

function verifyCode(statusCode) {
   switch (statusCode) {
      case 401:
         logout();
         break
   }
}

export async function apiTransport(method, path, body) {
   try {
      const uri = "http://localhost:8081/api/" + path

      const token = localStorage.getItem("token")
      const headers = {}
      headers["Content-Type"] = "application/json"
      headers["Authorization"] = token ? "Bearer "+token : ""

      const options = {
         method: method || "GET",
         body: body ? JSON.stringify(body) : null,
         headers: headers,
         mode: 'cors'
      }

      const response = await fetch(uri, options)
      if (!response.ok) {
         verifyCode(response.status)
         return [await response.json(), false]
      }

      return [await response.json(), true]
   }
   catch(err) {
      console.error("An error has occurred", err)
      return null
   }
}


export function checkToken(router) {
   const token = localStorage.getItem("token")
   if (!token) router.push("/login")
}
