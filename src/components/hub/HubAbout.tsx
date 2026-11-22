import Image from "next/image";

// Para usar uma foto: salve em public/sobre/mauro.jpg e troque ABOUT_PHOTO para "/sobre/mauro.jpg".
const ABOUT_PHOTO: string | null = null;

/**
 * Sobre: texto provisório escrito a partir do perfil público (@maurojr_tattoo): bio, cidade, estúdio e destaque.
 * Revisar com o Mauro (D-66). Espaço reservado para a foto dele ou do estúdio.
 */
export function HubAbout() {
  return (
    <section id="sobre" className="habout" aria-labelledby="sobre-titulo">
      <div className="habout__photo">
        {ABOUT_PHOTO ? (
          <Image src={ABOUT_PHOTO} alt="Mauro Junior no estúdio" fill sizes="(max-width: 900px) 90vw, 520px" className="habout__img" />
        ) : (
          <div className="habout__slot" role="img" aria-label="Espaço reservado para a foto do Mauro ou do estúdio">
            <span>Espaço para foto</span>
            <small>Mauro ou estúdio · 4:5</small>
          </div>
        )}
      </div>

      <div className="habout__text">
        <p className="habout__kicker">
          <span aria-hidden="true" />
          Sobre
        </p>
        <h2 id="sobre-titulo" className="habout__title">
          Eternizando <em>momentos.</em>
        </h2>
        <p>
          Mauro Junior é tatuador em Santa Isabel, SP, e atende no estúdio Mauro Jr Tattoo e Piercing. Pai de duas meninas, ele leva para o
          trabalho a mesma ideia que está na bio dele: cada tatuagem guarda uma história e merece ser eternizada.
        </p>
        <p>
          Do Fine Line delicado ao Realismo em preto e cinza, do Blackwork ao Anime, o estilo muda e o cuidado é o mesmo: ouvir a sua ideia,
          desenhar junto e acompanhar até a cicatrização.
        </p>
        <p>Reconhecido entre os Destaques – Melhores do Ano de Santa Isabel.</p>
        <p className="habout__note">Texto provisório, a revisar com o Mauro.</p>
      </div>
    </section>
  );
}
