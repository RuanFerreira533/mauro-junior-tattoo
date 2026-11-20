import Link from "next/link";

export default function NotFound() {
  return (
    <main id="conteudo" className="hub" tabIndex={-1}>
      <h1 className="hub__title">Universo não encontrado</h1>
      <p className="hub__line">Esse portal não existe (ainda).</p>
      <p>
        <Link className="btn" href="/">
          Voltar aos universos
        </Link>
      </p>
    </main>
  );
}
