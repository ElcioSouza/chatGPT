import { cookies } from "next/headers"

async function ServerAction(data:FormData) {
    "use server";
    cookies().set("el","ok");
    console.log(cookies().get("el")?.value);
}

export default function Cookies() {

  return (
    <div>a</div>
  )
}
