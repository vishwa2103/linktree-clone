import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  const body = await request.json();

  const client = await clientPromise;
  const db = client.db("linktree-clone");
  const collection = db.collection("links");

  const doc = await collection.findOne({ handle: body.handle });

  if (doc) {
    return Response.json({
      sucess: false,
      error: true,
      message: "already exists",
      result: null,
    });
  }

  const result = await collection.insertOne(body);

  return Response.json({
    sucess: true,
    error: false,
    message: "Links has been generated",
    result: result,
  });
}
// import clientPromise from "@/lib/mongodb";

// export async function POST(request) {

//   try {
//     const client = await clientPromise;
//     const db = client.db("linktree-clone");
//     const collection = db.collection("links");

//      console.log("Mongo Connected:", !!client);
// console.log("DB:", db.databaseName);
// console.log("Body Received:", body);
//     const body = await request.json();
//     const result = await collection.insertOne(body);

//     return Response.json({
//       success: true,
//       message: "Added",
//       result,
//     });
//   } catch (error) {
//     console.error("API Error:", error);
//     return new Response(JSON.stringify({ success: false, message: "Internal Server Error" }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }
