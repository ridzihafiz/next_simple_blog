import styles from "../../styles/Home.module.css";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Details({ data }) {
  const router = useRouter();

  return (
    <main className={styles.main}>
      <h1> {data.title} </h1>
      <Image
        src={`https://picsum.photos/seed/${data.id}/900/500`}
        width={900}
        height={500}
        alt={data.title}
      />
      <p> {data.body} </p>

      <button
        onClick={() => {
          router.back();
        }}
      >
        Back
      </button>
    </main>
  );
}

export async function getServerSideProps(ctx) {
  const result = await fetch(
    "https://jsonplaceholder.typicode.com/posts/" + ctx.params.id
  );
  const data = await result.json();
  return {
    props: {
      data: data,
    },
  };
}
