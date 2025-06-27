import Link from "next/link";
import clientPromise from "@/lib/mongodb";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const handle = (await params).handle;

  const client = await clientPromise;
  const db = client.db("linktree-clone");
  const collection = db.collection("links");

  const item = await collection.findOne({ handle: handle });
  if (!item) {
    return notFound();
  }
  const item2 = {
    _id: {
      $oid: "684d890db76883d7b43775ed",
    },
    links: [
      {
        link: "Facebook",
        linktext: "https://www.facebook.com/",
      },
      {
        link: "Linkedin",
        linktext: "www.linkedin.com/in/vishwa-dhanush-ch",
      },
      {
        link: "Twitter",
        linktext: "https://x.com/Vishwa2106",
      },
      {
        link: "GitHub",
        linktext: "https://github.com/vishwa2103",
      },
    ],
    handle: "dhanush",
    pic: "https://scontent.fhyd14-3.fna.fbcdn.net/v/t39.30808-1/448924355_1863002490876793_6676123899834973110_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=111&ccb=1-7&_nc_sid=e99d92&_nc_ohc=OrjQhHu8o84Q7kNvwHvlz_I&_nc_oc=Adng2zPc_WdwN7z1VsAqOxVOerg-BSu98jhgul3GvmsLAzfpQUJVC9ApBGgQspm6ZtiseHbfKxFMfot5UVpfqW5-&_nc_zt=24&_nc_ht=scontent.fhyd14-3.fna&_nc_gid=Hz8ao-Qvc-d_REYdCClwNw&oh=00_AfOKuDjEriAexh_TvnDwDZ9ZYtVqjTWj_-UHKJ4lyp195A&oe=685354E1",
    desc: "Computer Science graduate",
  };
  return (
    <div className="flex flex-col min-h-screen bg-purple-500 justify-start items-center py-10">
      {item && (
        <div className="photo flex justify-center flex-col items-center gap-4">
          <img
            className="rounded-full item2ect-contain"
            src={item2.pic}
            alt="profile picture"
          />
          <span className="font-bold text-2xl">@{item2.handle}</span>
          <span className="desc w-96 text-center gap-3">Description</span>
          <div className="links ">
            {item2.links.map((item, index) => {
              return (
                <Link href={item.linktext} key={index}>
                  <div className="p-4 min-w-96 shadow-2xl flex justify-center bg-white rounded-2xl my-6">
                    {item.link}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
