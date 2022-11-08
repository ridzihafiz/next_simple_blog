import styles from "../styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home({ data, page }) {
  const router = useRouter();

  // function untuk pagination
  const nextPage = () => {
    router.push(`/?page=${page + 1}`);
  };
  const prevPage = () => {
    if (page == 1) {
      return;
    }
    router.push(`/?page=${page - 1}`);
  };

  return (
    <main className={styles.main}>
      <h1>My Blog Page {page} </h1>

      <div className={styles.cardWrapper}>
        {data.map((e) => (
          <div key={e.id} className={styles.blogCard}>
            <Image
              src={`https://picsum.photos/seed/${e.id}/200/200`}
              width={200}
              height={200}
              alt={e.title}
            />

            <div>
              <h3>
                {e.id} . {e.title}
              </h3>
              <p> {e.body} </p>

              <Link href={`/details/${e.id}`}>Detail</Link>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.btnPagination}>
        <button onClick={prevPage}>Prev</button>
        <button onClick={nextPage}>Next</button>
      </div>
    </main>
  );
}

export async function getServerSideProps(ctx) {
  console.log(ctx);
  const result = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_page=" + ctx.query.page
  );
  const data = await result.json();

  return {
    props: {
      data: data,
      page: parseInt(ctx.query.page) || 1,
    },
  };
}
