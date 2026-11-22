import { AboutCarousel, type AboutSlide } from "./AboutCarousel";

// Um texto por foto. Trocar a foto: substitua o arquivo em public/sobre/ (ou mude o caminho aqui).
const SLIDES: AboutSlide[] = [
  {
    src: "/sobre/mauro.jpg",
    alt: "Mauro Junior sorrindo, de blazer azul e óculos, em um evento",
    focus: "50% 22%",
    name: "Mauro Junior",
    role: "Tatuador em Santa Isabel, SP",
    quote:
      "Tudo começa ouvindo a sua ideia. Depois eu desenho junto com você, ajusto até fazer sentido e só então levo para a pele, com o mesmo cuidado do primeiro rascunho até a cicatrização.",
  },
  {
    src: "/sobre/premio.jpg",
    alt: "Cartaz Destaques Melhores do Ano, edição Santa Isabel SP, com a foto do Mauro Jr, tatuador",
    name: "Destaque do ano",
    role: "Melhores do Ano, edição Santa Isabel",
    quote:
      "Fui reconhecido entre os Destaques Melhores do Ano de Santa Isabel. Isso não muda a minha rotina: o cuidado que me levou até ali é o mesmo que eu levo para cada sessão.",
  },
  {
    src: "/sobre/familia.jpg",
    alt: "Retrato em preto e branco do Mauro com a esposa e as duas filhas, todos brincando para a câmera",
    focus: "50% 35%",
    name: "Sou pai de duas meninas",
    role: "Eternizar momentos",
    quote:
      "Eternizar momentos é o que eu escrevo na minha bio, e a vontade de guardar o que importa começa em casa. É dela que vem o cuidado com a história que cada cliente traz para o meu estúdio.",
  },
];

/**
 * Sobre: fica logo abaixo da hero. Título e carrossel (foto + texto).
 * Textos provisórios, escritos a partir do perfil público (@maurojr_tattoo) e das fotos enviadas: revisar com o Mauro (D-66).
 */
export function HubAbout() {
  return (
    <section id="sobre" className="band habout" aria-labelledby="sobre-titulo">
      <div className="band__in habout__in">
        <h2 id="sobre-titulo" className="band__title">
          <i className="band__sq" aria-hidden="true" />
          Mais sobre mim
        </h2>

        <AboutCarousel slides={SLIDES} />
      </div>
    </section>
  );
}
