import Image from "next/image";
import { universes } from "@/universes";

// Foto do Sobre: public/sobre/mauro.jpg (null mostra o espaço reservado).
const ABOUT_PHOTO: string | null = "/sobre/mauro.jpg";

/**
 * Sobre: fica logo abaixo da hero, com foto e texto alinhados lado a lado.
 * Texto provisório escrito a partir do perfil público (@maurojr_tattoo): revisar com o Mauro (D-66).
 */
export function HubAbout() {
  return (
    <section id="sobre" className="band habout" aria-labelledby="sobre-titulo">
      <div className="band__in habout__in">
        <div className="habout__photo">
          {ABOUT_PHOTO ? (
            <Image src={ABOUT_PHOTO} alt="Mauro Junior no estúdio" fill sizes="(max-width: 900px) 90vw, 480px" className="habout__img" />
          ) : (
            <div className="habout__slot" role="img" aria-label="Espaço reservado para a foto do Mauro ou do estúdio">
              <span>Espaço para foto</span>
              <small>Mauro ou estúdio, formato 4:5</small>
            </div>
          )}
        </div>

        <div className="habout__text">
          <h2 id="sobre-titulo" className="band__title">
            <i className="band__sq" aria-hidden="true" />
            Cada tatuagem guarda uma história.
          </h2>
          <p>
            Mauro Junior é tatuador em Santa Isabel, SP. Pai de duas meninas, leva para o estúdio a mesma ideia que está na bio dele:
            eternizar momentos.
          </p>
          <p>O estilo muda de um trabalho para o outro, o cuidado não: ouvir a sua ideia, desenhar junto e acompanhar até a cicatrização.</p>

          <dl className="habout__facts">
            <div>
              <dt>Estúdio</dt>
              <dd>Mauro Jr Tattoo e Piercing</dd>
            </div>
            <div>
              <dt>Cidade</dt>
              <dd>Santa Isabel, SP</dd>
            </div>
            <div>
              <dt>Estilos</dt>
              <dd>{universes.map((u) => u.name).join(", ")}</dd>
            </div>
            <div>
              <dt>Reconhecimento</dt>
              <dd>Destaques – Melhores do Ano de Santa Isabel</dd>
            </div>
          </dl>
          <p className="habout__note">Texto provisório, a revisar com o Mauro.</p>
        </div>
      </div>
    </section>
  );
}
