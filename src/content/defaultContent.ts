// ─── Default Content Store ───
// All editable text and images for the Moma Cookie Lab site.
// Admin overrides are deep-merged on top of these defaults.

import cookieChocolate from "@/assets/cookie-chocolate.jpg";
import cookieRedvelvet from "@/assets/cookie-redvelvet.jpg";
import cookieNutella from "@/assets/cookie-nutella.jpg";
import cookieMacadamia from "@/assets/cookie-macadamia.jpg";
import cookieCaramel from "@/assets/cookie-caramel.jpg";
import cookieBirthday from "@/assets/cookie-birthday.jpg";
import cookieHero from "@/assets/cookie-hero.jpg";
import momaBox from "@/assets/moma-box.jpg";


export interface FlavorItem {
    name: string;
    description: string;
    image: string;
    tag?: string | null;
}

export interface TestimonialItem {
    name: string;
    text: string;
    rating: number;
    location: string;
}

export interface CraftsmanshipItem {
    title: string;
    desc: string;
}



export interface ValueItem {
    title: string;
    desc: string;
}

export interface FaqItem {
    q: string;
    a: string;
}

export interface LojaFeatureItem {
    title: string;
    description: string;
    icon: string;
}

export interface SiteContent {
    global: {
        brandName: string;
        whatsappNumber: string;
        instagramHandle: string;
        instagramUrl: string;
        footerDescription: string;
    };
    home: {
        heroLabel: string;
        heroTitle: string;
        heroHighlight: string;
        heroTitleEnd: string;
        heroDescription: string;
        socialProofText: string;
        flavorsLabel: string;
        flavorsTitle: string;
        featuredFlavors: FlavorItem[];
        craftsmanshipLabel: string;
        craftsmanshipTitle: string;
        craftsmanship: CraftsmanshipItem[];
        testimonialsLabel: string;
        testimonialsTitle: string;
        testimonials: TestimonialItem[];
        ctaLabel: string;
        ctaTitle: string;
        ctaHighlight: string;
        ctaTitleEnd: string;
        ctaDescription: string;
        ctaButtonText: string;
    };
    sabores: {
        pageLabel: string;
        pageTitle: string;
        pageDescription: string;
        flavors: FlavorItem[];
        customCtaLabel: string;
        customCtaTitle: string;
        customCtaDescription: string;
        customCtaButton: string;
    };
    loja: {
        heroLabel: string;
        heroTitle: string;
        heroHighlight: string;
        heroDescription: string;
        videoUrl: string;
        videoLabel: string;
        videoTitle: string;
        videoDescription: string;
        features: LojaFeatureItem[];
        mapLabel: string;
        mapTitle: string;
        mapDescription: string;
        mapEmbedUrl: string;
        address: string;
        addressDetails: string;
        storeHours: string[];
    };
    sobre: {
        heroLabel: string;
        heroTitle: string;
        heroHighlight: string;
        heroParagraphs: string[];
        heroImage: string;
        foundedYear: string;
        foundedLocation: string;
        valuesLabel: string;
        valuesTitle: string;
        values: ValueItem[];
        philosophyLabel: string;
        philosophyQuote: string;
        philosophyDescription: string;
        philosophyImage: string;
    };
    contato: {
        pageLabel: string;
        pageTitle: string;
        pageDescription: string;
        whatsappDescription: string;
        instagramDescription: string;
        deliveryTitle: string;
        deliveryDescription: string;
        hoursTitle: string;
        hours: string[];
        faqs: FaqItem[];
        ctaTitle: string;
        ctaDescription: string;
        ctaButton: string;
    };
}

export const defaultContent: SiteContent = {
    global: {
        brandName: "Moma Cookie Lab",
        whatsappNumber: "5571999999999",
        instagramHandle: "@momacookielab",
        instagramUrl: "https://instagram.com/momacookielab",
        footerDescription:
            "Cookies artesanais feitos com ingredientes selecionados e muito amor. Cada unidade é uma experiência única.",
    },
    home: {
        heroLabel: "Artesanal · Salvador, BA",
        heroTitle: "Cookies artesanais.",
        heroHighlight: "Textura perfeita.",
        heroTitleEnd: "Recheio que derrete.",
        heroDescription:
            "Feitos com ingredientes selecionados e assados com cuidado. Cada cookie é uma experiência única de sabor.",
        socialProofText: "+200 pedidos entregues em Salvador",
        flavorsLabel: "Os queridinhos",
        flavorsTitle: "Sabores que conquistam",
        featuredFlavors: [
            {
                name: "Trufa de Chocolate",
                description: "Recheio intenso de trufa belga que derrete ao primeiro mordisco.",
                image: cookieChocolate,
            },
            {
                name: "Red Velvet",
                description: "Massa aveludada com recheio cremoso de cream cheese.",
                image: cookieRedvelvet,
            },
            {
                name: "Nutella Bomb",
                description: "Recheio generoso de avelã acompanhado de massa baunilhada.",
                image: cookieNutella,
            },
        ],
        craftsmanshipLabel: "Nosso processo",
        craftsmanshipTitle: "Feito com propósito",
        craftsmanship: [
            { title: "Assados no Ponto", desc: "Textura perfeita: crocante por fora, macio por dentro." },
            { title: "Recheio Generoso", desc: "Cada cookie esconde um recheio que surpreende." },
            { title: "Ingredientes Premium", desc: "Selecionados para garantir sabor e qualidade." },
            { title: "Embalagem Caprichada", desc: "Cada detalhe pensado para o cookie chegar perfeito até você." },

        ],

        testimonialsLabel: "Depoimentos",
        testimonialsTitle: "Quem prova, volta",
        testimonials: [
            {
                name: "Ana Carolina",
                text: "Presente mais lindo e gostoso que já ganhei. A caixa Moma chegou perfeita e os cookies derreteram na boca!",
                rating: 5,
                location: "Salvador, BA",
            },
            {
                name: "Rodrigo Menezes",
                text: "Pedi para o aniversário da minha esposa e ela amou! Cookie de trufa é outro nível. Super recomendo.",
                rating: 5,
                location: "Salvador, BA",
            },
            {
                name: "Juliana Reis",
                text: "Qualidade absurda. Já sou cliente fiel. O Red Velvet é inesquecível. Moma Cookie Lab tem meu coração.",
                rating: 5,
                location: "Lauro de Freitas, BA",
            },
        ],
        ctaLabel: "Pronto para provar?",
        ctaTitle: "O cookie mais desejado",
        ctaHighlight: "de Salvador",
        ctaTitleEnd: "espera por você.",
        ctaDescription: "Entregamos em Salvador e região. Peça agora pelo WhatsApp.",
        ctaButtonText: "Fazer Pedido Agora",
    },
    sabores: {
        pageLabel: "Nosso cardápio",
        pageTitle: "Todos os sabores",
        pageDescription:
            "Cada sabor é desenvolvido para ser uma experiência completa — da textura ao recheio, do aroma ao sabor.",
        flavors: [
            {
                name: "Trufa de Chocolate",
                description:
                    "Massa baunilhada recheada com trufa belga intensa. Para os amantes do chocolate puro.",
                tag: "Mais Pedido",
                image: cookieChocolate,
            },
            {
                name: "Red Velvet",
                description:
                    "Massa aveludada de cor marcante com recheio cremoso de cream cheese. Um clássico reinventado.",
                tag: "Exclusivo",
                image: cookieRedvelvet,
            },
            {
                name: "Nutella Bomb",
                description:
                    "Recheio generoso de Nutella original dentro de uma massa macia e aromática.",
                tag: "Favorito",
                image: cookieNutella,
            },
            {
                name: "White Macadamia",
                description:
                    "Chocolate branco com nozes de macadâmia crocantes. Leveza e sofisticação em cada pedaço.",
                tag: null,
                image: cookieMacadamia,
            },
            {
                name: "Caramelo com Flor de Sal",
                description:
                    "Caramelo artesanal com flor de sal sobre uma massa dourada. O equilíbrio perfeito entre doce e salgado.",
                tag: "Chef's Pick",
                image: cookieCaramel,
            },
            {
                name: "Birthday Cake",
                description:
                    "Massa festiva com confeitos coloridos e recheio creme. Ideal para celebrações especiais.",
                tag: null,
                image: cookieBirthday,
            },
        ],
        customCtaLabel: "Não encontrou o que procura?",
        customCtaTitle: "Posso criar o sabor perfeito para você",
        customCtaDescription:
            "Fazemos sabores personalizados para eventos, aniversários e presentes corporativos. Fale comigo!",
        customCtaButton: "Falar no WhatsApp",
    },
    loja: {
        heroLabel: "Nosso espaço",
        heroTitle: "Conheça a",
        heroHighlight: "Moma Cookie Lab",
        heroDescription:
            "Mais do que uma loja de cookies — um espaço pensado para proporcionar experiências únicas. Venha conhecer, degustar e se encantar.",
        videoUrl: "",
        videoLabel: "A experiência",
        videoTitle: "Um espaço feito para você",
        videoDescription:
            "Aqui cada detalhe foi pensado para transformar a visita em um momento especial. Cookies fresquinhos saindo do forno, cafés selecionados e um ambiente acolhedor para curtir com quem você ama.",
        features: [
            {
                title: "Cookies Artesanais",
                description: "Assados na hora, com recheios generosos e massa com textura perfeita. O melhor cookie de Salvador ao seu alcance.",
                icon: "cookie",
            },
            {
                title: "Cafés Selecionados",
                description: "Grãos especiais torrados artesanalmente, preparados com técnica e carinho para acompanhar seu cookie.",
                icon: "coffee",
            },
            {
                title: "Experiência Única",
                description: "Um espaço aconchegante e instagramável, perfeito para encontros, pausas e momentos de indulgência.",
                icon: "sparkles",
            },
        ],
        mapLabel: "Como chegar",
        mapTitle: "Visite nossa loja",
        mapDescription:
            "Estamos na Pituba, um dos bairros mais charmosos de Salvador. Venha nos visitar!",
        mapEmbedUrl:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9!2d-38.45!3d-12.98!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sRua+das+D%C3%A1lias%2C+516+-+Pituba%2C+Salvador+-+BA!5e0!3m2!1spt-BR!2sbr!4v1",
        address: "Rua das Dálias, 516 — Pituba",
        addressDetails: "Salvador, Bahia — CEP 41810-000",
        storeHours: [
            "Segunda a Sexta: 9h às 19h",
            "Sábado: 9h às 17h",
            "Domingo: 10h às 15h",
        ],
    },
    sobre: {
        heroLabel: "Nossa história",
        heroTitle: "Feito com amor,",
        heroHighlight: "entregue com alma",
        heroParagraphs: [
            "A Moma Cookie Lab nasceu de uma paixão genuína por confeitaria artesanal e da crença de que um cookie bem feito tem o poder de transformar qualquer momento comum em algo especial.",
            "Começamos com receitas testadas à exaustão na cozinha de casa, em busca do ponto ideal — aquela textura que ninguém esquece. Croccante por fora, macio por dentro, com recheio que surpreende.",
            "Hoje, cada cookie que sai daqui carrega a mesma dedicação do primeiro dia. Nada é industrializado. Tudo é feito com propósito.",
        ],
        heroImage: momaBox,
        foundedYear: "2022",
        foundedLocation: "Salvador, Bahia",
        valuesLabel: "O que nos move",
        valuesTitle: "Nossos valores",
        values: [
            { title: "Artesanal de verdade", desc: "Cada batch de cookies é produzido manualmente, em pequenas quantidades, com atenção a cada detalhe." },
            { title: "Ingredientes selecionados", desc: "Chocolate belga, manteiga de qualidade, farinhas selecionadas. Ingredientes que fazem diferença no resultado final." },
            { title: "Identidade autoral", desc: "A Moma tem personalidade própria — desde a receita até a embalagem, tudo foi pensado para ser único." },
        ],
        philosophyLabel: "Nossa filosofia",
        philosophyQuote:
            '"Um cookie perfeito não é coincidência — é resultado de escolhas cuidadosas feitas em cada etapa."',
        philosophyDescription:
            "Do ingrediente à embalagem, cada decisão é tomada com intenção. É isso que diferencia a Moma de qualquer outra cookie da cidade.",
        philosophyImage: cookieHero,
    },
    contato: {
        pageLabel: "Fale conosco",
        pageTitle: "Vamos conversar",
        pageDescription:
            "Pedidos, dúvidas ou apenas um olá — estamos aqui para você. O jeito mais rápido é pelo WhatsApp.",
        whatsappDescription:
            "Atendimento rápido para pedidos e dúvidas. Respondemos em até 1h em horário comercial.",
        instagramDescription:
            "Acompanhe novos sabores, bastidores e promoções exclusivas.",
        deliveryTitle: "Entrega",
        deliveryDescription:
            "Salvador e Região Metropolitana (Lauro de Freitas, Camaçari, Simões Filho).",
        hoursTitle: "Horários",
        hours: ["Segunda – Sexta: 9h às 18h", "Sábado: 9h às 14h", "Domingo: sob consulta"],
        faqs: [
            { q: "Quais bairros vocês entregam?", a: "Entregamos em toda Salvador e Região Metropolitana. Consulte taxas de entrega pelo WhatsApp." },
            { q: "Quanto tempo antes devo pedir?", a: "Recomendamos pedir com pelo menos 24h de antecedência. Para grandes quantidades, 48h." },
            { q: "Vocês fazem kits corporativos?", a: "Sim! Atendemos empresas com kits personalizados. Fale conosco para orçamento." },
            { q: "Os cookies têm validade de quantos dias?", a: "Até 5 dias em temperatura ambiente ou 10 dias refrigerado. Melhor consumir nos 2 primeiros dias." },
        ],
        ctaTitle: "Pronto para pedir?",
        ctaDescription: "O cookie perfeito está a uma mensagem de distância.",
        ctaButton: "Fazer Pedido Agora",
    },
};
