const PONTUACAO_MAXIMA = 100;
const CONFIGURACOES_BLOCOS = {
completo: {
id: "completo",
titulo: "Filosofia - Aulas 17 a 25",
aulas: [17, 18, 19, 20, 21, 22, 23, 24, 25],
totalQuestoes: 18,
totalRodadas: 3,
questoesPorRodada: 6
},
aulas17a20: {
id: "aulas17a20",
titulo: "Filosofia - Aulas 17 a 20",
aulas: [17, 18, 19, 20],
totalQuestoes: 8,
totalRodadas: 2,
questoesPorRodada: 4
},
aulas21a25: {
id: "aulas21a25",
titulo: "Filosofia - Aulas 21 a 25",
aulas: [21, 22, 23, 24, 25],
totalQuestoes: 10,
totalRodadas: 2,
questoesPorRodada: 5
}
};
let configuracaoAtiva = CONFIGURACOES_BLOCOS.completo;
let TOTAL_QUESTOES_BANCO = configuracaoAtiva.totalQuestoes;
let QUESTOES_POR_RODADA = configuracaoAtiva.questoesPorRodada;
let TOTAL_RODADAS = configuracaoAtiva.totalRodadas;
let PONTOS_POR_QUESTAO = PONTUACAO_MAXIMA / TOTAL_QUESTOES_BANCO;
const nomeJogadorInput = document.getElementById("nomeJogador");
const opcoesBloco = document.querySelectorAll(".opcao-bloco");
const textoConfiguracaoAtual = document.getElementById("textoConfiguracaoAtual");
const btnComecar = document.getElementById("btnComecar");
const btnConfirmar = document.getElementById("btnConfirmar");
const btnContinuar = document.getElementById("btnContinuar");
const btnProximaRodada = document.getElementById("btnProximaRodada");
const btnReiniciarJogo = document.getElementById("btnReiniciarJogo");
const btnHistorico = document.getElementById("btnHistorico");
const btnFecharHistorico = document.getElementById("btnFecharHistorico");
const btnLimparHistorico = document.getElementById("btnLimparHistorico");
const btnSair = document.getElementById("btnSair");
const btnBaixarNotas = document.getElementById("btnBaixarNotas");
const btnRetornarInicial = document.getElementById("btnRetornarInicial");
const telaInicial = document.getElementById("telaInicial");
const telaCarregamento = document.getElementById("telaCarregamento");
const telaQuiz = document.getElementById("telaQuiz");
const telaFinal = document.getElementById("telaFinal");
const historicoLateral = document.getElementById("historicoLateral");
const overlayHistorico = document.getElementById("overlayHistorico");
const listaHistorico = document.getElementById("listaHistorico");
const listaRanking = document.getElementById("listaRanking");
const rankingFinal = document.getElementById("rankingFinal");
const nomeArquivo = document.getElementById("nomeArquivo");
const tituloArquivo = document.getElementById("tituloArquivo");
const progresso = document.getElementById("progresso");
const statusTexto = document.getElementById("status");
const tituloFinal = document.getElementById("tituloFinal");
const perguntaTexto = document.getElementById("pergunta");
const alternativasBox = document.getElementById("alternativas");
const feedback = document.getElementById("feedback");
const anotacaoQuestao = document.getElementById("anotacaoQuestao");
const numeroRodada = document.getElementById("numeroRodada");
const numeroQuestao = document.getElementById("numeroQuestao");
const jogadorAtual = document.getElementById("jogadorAtual");
const resultadoFinal = document.getElementById("resultadoFinal");
const mensagemFinal = document.getElementById("mensagemFinal");
const mensagemRodada = document.getElementById("mensagemRodada");
const resumoRodada = document.getElementById("resumoRodada");
const resumoAcertosRodada = document.getElementById("resumoAcertosRodada");
const resumoPontosRodada = document.getElementById("resumoPontosRodada");
const resumoPontosTotal = document.getElementById("resumoPontosTotal");
const resumoStatus = document.getElementById("resumoStatus");
const listaRegistrosTela = document.getElementById("listaRegistrosTela");
let bancoAtivo = [];
let questoesDaRodada = [];
let rodadaAtual = 1;
let questaoAtual = 0;
let pontosRodada = 0;
let pontosTotal = 0;
let acertosRodada = 0;
let acertosTotal = 0;
let alternativaSelecionada = null;
let respostaAtual = null;
let respostaConfirmada = false;
let anotacoesJogo = [];
let nomeJogador = "";
let tituloJogoAtual = configuracaoAtiva.titulo;
let rankingRegistrado = false;
let historicoNomes = carregarJSON("historicoNomes", []);
let ranking = carregarJSON("rankingQuiz", []);
const bancoQuestoesAulas17a25 = [
{
aula: "Aula 17",
pergunta: `(Enem 2011) O brasileiro tem noção clara dos comportamentos éticos e morais adequados, mas vive sob o espectro da corrupção, revela pesquisa. Se o país fosse resultado dos padrões morais que as pessoas dizem aprovar, pareceria mais com a Escandinávia do que com Bruzundanga, corrompida nação fictícia de Lima Barreto.
O distanciamento entre “reconhecer” e “cumprir” efetivamente o que é moral constitui uma ambiguidade inerente ao humano, porque as normas morais são:`,
alternativas: [
"decorrentes da vontade divina e, por esse motivo, utópicas.",
"parâmetros idealizados, cujo cumprimento é destituído de obrigação.",
"amplas e vão além da capacidade de o indivíduo conseguir cumpri-las integralmente.",
"criadas pelo homem, que concede a si mesmo a lei à qual deve se submeter.",
"cumpridas por aqueles que se dedicam inteiramente a observar as normas jurídicas."
],
correta: 3,
feedback: "A alternativa correta é a D. O ser humano distingue entre o bem e o mal no contexto em que vive. Quem segue normas, valores e tradições de um local é considerado moral; quem desobedece é imoral."
},
{
aula: "Aula 17",
pergunta: `“As normas morais variam a depender da cultura e do período histórico. Também podem ser questionadas e destituídas”. Isso significa que:`,
alternativas: [
"Nós não podemos pensar sobre as normas morais impostas.",
"Nós temos que concordar com as normas morais porque são as normas da nossa cultura.",
"A moral é um conjunto de valores pelos quais as pessoas guiam seus comportamentos e, por isso, está sujeita às mudanças a depender do país e do momento histórico em que as pessoas estão inseridas.",
"Não agimos de forma “moral” se obedecermos às regras que a sociedade estabelece.",
"As normas morais só podem ser alteradas por meio de leis específicas aprovadas pela sociedade."
],
correta: 2,
feedback: "A alternativa C está correta. As normas morais variam conforme o período histórico e a cultura."
},
{
aula: "Aula 18",
pergunta: `Unespar 2015
Platão, em sua obra A República, fala de uma ética teleológica, isto é, uma ética cujo princípio não é o que realmente se faz, mas o que se deveria fazer. Esta postura de Platão está baseada naquilo que ficou conhecido como Teoria das Ideias, sobre a qual é correto afirmar que:`,
alternativas: [
"É a teoria em que Platão, através da imagem da expulsão dos poetas da República, define que devemos nos concentrar no mundo sensível, para conhecer corretamente a realidade.",
"É a teoria em que Platão separa o conhecimento em dois tipos: o estético e moral.",
"É a teoria em que Platão define o conhecimento como uma passagem a uma intuição intelectual totalmente diferente do conhecimento dado no mundo sensível.",
"É a teoria em que Platão define as Ideias como entidades imateriais inacessíveis ao intelecto humano.",
"É a teoria atribuída a Platão erroneamente, pela tradição cristã, na Idade Média, uma vez que Platão nunca pensou as ideias como entidades com existência real."
],
correta: 2,
feedback: "A alternativa C está correta. A Teoria das Ideias propõe que o conhecimento verdadeiro está nas ideias, e não apenas ao mundo sensível."
},
{
aula: "Aula 18",
pergunta: `(UEL) A ética de Aristóteles, enquanto ciência prática, está baseada no estudo e investigação do agir humano, isto é, dos atos e comportamentos dos indivíduos com vistas a atingir a eudaimonía (felicidade). Esse entendimento da ética está fundamentado em qual aspecto?`,
alternativas: [
"No estudo do conhecimento humano, a partir de uma intuição intelectual do mundo sensível.",
"Na busca pelo estudo teórico sobre a constituição do Universo.",
"Na investigação de obras poéticas para encontrar uma identificação do comportamento ético.",
"No aperfeiçoamento de ações virtuosas, em direção à excelência e à felicidade.",
"Na construção de uma ética universal, independente das particularidades humanas."
],
correta: 3,
feedback: "A alternativa D está correta. Para Aristóteles, o aperfeiçoamento de ações virtuosas é o caminho para a excelência e para a felicidade."
},
{
aula: "Aula 19",
pergunta: `Segundo a filosofia helenística, é correto afirmar que:`,
alternativas: [
"O epicurismo valoriza a ação virtuosa e a contemplação do belo como caminho para a felicidade.",
"O estoicismo preza apenas pelo prazer imediato e pela ausência de dores.",
"O epicurismo valoriza o domínio da vontade, e a virtude que melhor expressa isso é a temperança.",
"O estoicismo e o epicurismo concordam que a felicidade está no prazer sensual e na ausência de preocupações.",
"Prudência, caracterizada pelo correto uso da razão."
],
correta: 2,
feedback: "A alternativa C está correta. O epicurismo valoriza o domínio da vontade, e a virtude que melhor expressa isso é a temperança."
},
{
aula: "Aula 20",
pergunta: `(UEM) A ética de Kant é uma das mais importantes teorias morais da filosofia moderna, e sua centralidade está no conceito de dever e na busca pela autonomia moral. O filósofo alemão propõe uma fundamentação racional da moral, baseada em princípios universais e incondicionados, conhecidos como imperativos categóricos. Sobre a ética de Kant, assinale a(s) alternativa(s) correta(s):`,
alternativas: [
"I. O imperativo categórico é uma norma moral que deve ser seguida em todas as situações, independentemente das circunstâncias e dos desejos individuais.",
"II. Agir por dever significa realizar uma ação porque se acredita que é o correto a ser feito, independentemente dos desejos ou inclinações pessoais.",
"III. Agir por inclinação significa agir em conformidade com os próprios desejos e preferências.",
"IV. A ética de Kant é consequencialista, pois valoriza as consequências da ação para determinar sua moralidade.",
"Somente a afirmativa I está correta.",
"Somente a afirmativa II está correta.",
"Somente a afirmativa III está correta.",
"Somente a afirmativa IV está correta.",
"Somente as afirmativas I, II e III estão corretas.",
"Somente as afirmativas I, II e IV estão corretas."
],
correta: 8,
feedback: "A alternativa I está correta. O imperativo categórico é uma norma moral universal que deve ser seguida em todas as situações."
},
{
aula: "Aula 20",
pergunta: `Selecione a alternativa abaixo que explica corretamente a diferença entre agir por dever e por inclinação:`,
alternativas: [
"Agir por dever é uma ação que se faz pensando nas consequências ou nos resultados coletivos, enquanto agir por inclinação está mais relacionado ao resultado ou benefício pessoal que se espera alcançar.",
"Agir por dever é uma ação racional e consciente que visa o bem-estar coletivo, enquanto agir por inclinação é mais uma ação emocional e impulsiva que busca satisfazer um desejo pessoal.",
"Agir por dever implica em seguir uma lei ou princípio moral que se considera válido, enquanto agir por inclinação é agir contra essas leis ou princípios.",
"Agir por dever significa realizar uma ação porque se acredita que é o correto a ser feito, independentemente dos desejos ou inclinações pessoais. Agir por inclinação significa agir em conformidade com os próprios desejos e preferências."
],
correta: 3,
feedback: "A alternativa D está correta. Para Kant, o valor moral de uma ação está em agir por dever, e não por interesse, benefício ou inclinações pessoais."
},
{
aula: "Aula 21",
pergunta: `(UEM) Sobre a filosofia africana e a crítica decolonial, é correto afirmar que:`,
alternativas: [
"I. A crítica decolonial questiona a ideia de que o pensamento europeu é o único válido e universal.",
"II. A filosofia africana é entendida como um conjunto de saberes que inclui tradições orais, espirituais e comunitárias.",
"III. A filosofia africana se resume a uma crítica ao colonialismo, sem propor outras formas de pensamento.",
"IV. O pensamento filosófico surgiu apenas na Grécia antiga e não se desenvolveu em outras regiões.",
"Somente a afirmativa I está correta.",
"Somente a afirmativa II está correta.",
"Somente a afirmativa III está correta.",
"Somente a afirmativa IV está correta.",
"Somente as afirmativas I e II estão corretas.",
"Somente as afirmativas III e IV estão corretas."
],
correta: 8,
feedback: "A alternativa D está correta. A crítica decolonial questiona a ideia de que apenas o pensamento europeu seria válido ou universal, valorizando saberes africanos, indígenas e de outras culturas."
},
{
aula: "Aula 21",
pergunta: `(Enem 2021) A filosofia africana é caracterizada por sua diversidade e riqueza de tradições. Muitas correntes dessa filosofia enfatizam a relação comunitária e a solidariedade como elementos centrais da identidade humana. Sobre essa característica, é correto afirmar que:`,
alternativas: [
"A filosofia africana valoriza exclusivamente a razão individual e a competição como motor do desenvolvimento humano.",
"A filosofia africana enfatiza a identidade humana como construída nas relações comunitárias, com solidariedade e cooperação.",
"A filosofia africana rejeita qualquer forma de saber tradicional, valorizando apenas o conhecimento científico ocidental.",
"A filosofia africana considera que o indivíduo é plenamente autônomo e independente das relações sociais."
],
correta: 1,
feedback: "A alternativa B está correta. Muitas correntes da filosofia africana enfatizam que a identidade humana se constrói nas relações comunitárias, com solidariedade, cooperação e responsabilidade coletiva."
},
{
aula: "Aula 22",
pergunta: `(UEL) Sobre a relação entre filosofia e ciência, é correto afirmar que:`,
alternativas: [
"A filosofia e a ciência têm objetivos idênticos e métodos iguais para alcançar o conhecimento.",
"A filosofia busca compreender os fundamentos e os limites do conhecimento, enquanto a ciência se dedica a investigar fenômenos específicos através de métodos empíricos.",
"A filosofia não tem mais utilidade desde o surgimento da ciência moderna.",
"A ciência independe da filosofia para fundamentar seus métodos e resultados."
],
correta: 1,
feedback: "A alternativa B está correta. A filosofia investiga os fundamentos e limites do conhecimento, enquanto a ciência utiliza métodos empíricos para investigar fenômenos específicos."
},
{
aula: "Aula 23",
pergunta: `(UEL) Sobre a relação entre filosofia e tecnologia, é correto afirmar que:`,
alternativas: [
"A filosofia da tecnologia analisa apenas os aspectos técnicos das inovações, ignorando suas consequências sociais e éticas.",
"A filosofia da tecnologia é irrelevante para a compreensão dos impactos sociais da tecnologia.",
"A filosofia da tecnologia pode auxiliar na reflexão ética e social sobre os impactos da tecnologia na vida humana.",
"O uso de inteligência artificial na medicina torna desnecessário o diálogo entre ciência e sociedade."
],
correta: 2,
feedback: "A alternativa C está correta. A tecnologia pode auxiliar profissionais da saúde, mas não substitui a responsabilidade ética humana."
},
{
aula: "Aula 24",
pergunta: `(Enem 2018) A filosofia política investiga questões sobre o poder, a justiça e a organização social. Sobre a justiça, é correto afirmar que:`,
alternativas: [
"A justiça é um conceito exclusivamente legal, definido apenas pelas leis de um país.",
"A justiça pode ser compreendida como uma virtude que orienta as relações sociais e políticas, buscando o bem comum.",
"A justiça é um valor absoluto, imutável e igual em todas as culturas e épocas.",
"A justiça não tem relação com a ética, sendo apenas uma questão de organização burocrática."
],
correta: 1,
feedback: "A alternativa B está correta. A justiça é uma virtude que orienta as relações sociais e políticas, buscando o bem comum."
},
{
aula: "Aula 25",
pergunta: `(UEL) Sobre a relação entre ética e política, é correto afirmar que:`,
alternativas: [
"A ética e a política são campos completamente separados, sem nenhuma interseção.",
"A ética política busca orientar as ações do governante e as políticas públicas em direção ao bem comum.",
"A ética é irrelevante para a política, que deve ser guiada apenas pelo interesse individual.",
"A política não precisa de fundamentação ética, bastando que seja eficiente na gestão dos recursos."
],
correta: 1,
feedback: "A alternativa B está correta. A ética política busca orientar as ações do governante e as políticas públicas em direção ao bem comum."
},
{
aula: "Aula 25",
pergunta: `(Enem 2020) A ética ambiental é um campo da filosofia que investiga a relação entre os seres humanos e o meio ambiente. Sobre essa ética, é correto afirmar que:`,
alternativas: [
"A ética ambiental defende que apenas os seres humanos têm valor moral, e a natureza é apenas um recurso para ser explorado.",
"A ética ambiental considera que a natureza tem valor intrínseco, independente da utilidade humana.",
"A ética ambiental é irrelevante para as discussões sobre sustentabilidade.",
"A ética ambiental nega a importância da preservação dos ecossistemas."
],
correta: 1,
feedback: "A alternativa B está correta. A ética ambiental considera que a natureza tem valor intrínseco, independente da utilidade humana."
},
{
aula: "Aula 25",
pergunta: `(UEL) Sobre a filosofia política e a ética, é correto afirmar que:`,
alternativas: [
"A filosofia política é um campo exclusivamente teórico, sem aplicações práticas na sociedade.",
"A filosofia política pode auxiliar na reflexão sobre os fundamentos éticos das políticas públicas e da organização social.",
"A filosofia política não tem relação com a ética, sendo um campo independente.",
"A ética política é um conceito ultrapassado, sem relevância para os debates contemporâneos."
],
correta: 1,
feedback: "A alternativa B está correta. A filosofia política pode auxiliar na reflexão sobre os fundamentos éticos das políticas públicas e da organização social."
},
{
aula: "Aula 25",
pergunta: `(Enem 2019) A filosofia política investiga a organização da sociedade e o exercício do poder. Sobre o conceito de justiça social, é correto afirmar que:`,
alternativas: [
"A justiça social é um conceito exclusivamente econômico, limitado à distribuição de renda.",
"A justiça social envolve a distribuição equitativa de bens, oportunidades e direitos na sociedade.",
"A justiça social é um ideal utópico, sem aplicação prática na organização social.",
"A justiça social não tem relação com a ética, sendo apenas uma questão de organização burocrática."
],
correta: 1,
feedback: "A alternativa B está correta. A justiça social envolve a distribuição equitativa de bens, oportunidades e direitos na sociedade."
},
{
aula: "Aula 25",
pergunta: `(UEL) Sobre a relação entre ética e direitos humanos, é correto afirmar que:`,
alternativas: [
"Os direitos humanos são fundamentados em princípios éticos universais, como dignidade e respeito à pessoa humana.",
"Os direitos humanos são apenas normas jurídicas, sem qualquer fundamento ético.",
"A ética é irrelevante para a compreensão dos direitos humanos.",
"Os direitos humanos são relativos e variam conforme a cultura, não havendo princípios universais."
],
correta: 0,
feedback: "A alternativa A está correta. Os direitos humanos são fundamentados em princípios éticos universais, como dignidade e respeito à pessoa humana."
},
{
aula: "Aula 25",
pergunta: `(Enem 2020) A ética no ambiente de trabalho é um tema relevante na filosofia aplicada. Sobre essa ética, é correto afirmar que:`,
alternativas: [
"A ética no trabalho é irrelevante, pois o mercado se regula apenas pela lei da oferta e da procura.",
"A ética no trabalho envolve responsabilidade, respeito e justiça nas relações profissionais.",
"A ética no trabalho é um conceito exclusivamente religioso, sem aplicação nas relações profissionais.",
"A ética no trabalho não tem relação com a dignidade humana."
],
correta: 1,
feedback: "A alternativa B está correta. A ética no trabalho envolve responsabilidade, respeito e justiça nas relações profissionais."
}
];
function formatarPontos(valor) {
return Number(valor).toFixed(1).replace(".", ",");
}
function gerarIdUnico() {
return Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
}
function baixarNotas() {
if (anotacoesJogo.length === 0) {
alert("Nenhuma anotação para exportar.");
return;
}
const nomeArquivo = normalizarNomeArquivo(nomeJogador) + "_notas.txt";
const conteudo = anotacoesJogo.map(a => `[${a.questao}] ${a.texto}`).join("\n\n");
const blob = new Blob([conteudo], { type: "text/plain;charset=utf-8" });
const url = URL.createObjectURL(blob);
const a = document.createElement("a");
a.href = url;
a.download = nomeArquivo;
a.click();
URL.revokeObjectURL(url);
}
function registrarNome(nome) {
if (!nome || nome.trim().length < 3) return;
const nomeLimpo = nome.trim();
if (!nomeJaExiste(nomeLimpo)) {
historicoNomes.push(nomeLimpo);
salvarHistorico();
}
}
function registrarRanking(pontos, total, acertos) {
if (rankingRegistrado) return;
rankingRegistrado = true;
const entrada = {
id: gerarIdUnico(),
nome: nomeJogador,
pontos: formatarPontos(pontos),
pontosNumero: pontos,
totalPossivel: total,
acertos: acertos,
bloco: configuracaoAtiva.titulo,
data: new Date().toLocaleString("pt-BR")
};
ranking.push(entrada);
ranking.sort((a, b) => (b.pontosNumero || 0) - (a.pontosNumero || 0));
if (ranking.length > 50) ranking = ranking.slice(0, 50);
salvarRanking();
}
function inicializarBanco() {
bancoAtivo = bancoQuestoesAulas17a25.filter(q => configuracaoAtiva.aulas.includes(parseInt(q.aula.replace("Aula ", ""))));
TOTAL_QUESTOES_BANCO = bancoAtivo.length;
QUESTOES_POR_RODADA = configuracaoAtiva.questoesPorRodada;
TOTAL_RODADAS = configuracaoAtiva.totalRodadas;
PONTOS_POR_QUESTAO = PONTUACAO_MAXIMA / TOTAL_QUESTOES_BANCO;
}
function iniciarJogo() {
if (!nomeJogadorInput || !nomeJogadorInput.value || nomeJogadorInput.value.trim().length < 3) {
if (nomeJogadorInput) nomeJogadorInput.classList.add("erro");
return;
}
if (nomeJogadorInput) nomeJogadorInput.classList.remove("erro");
nomeJogador = nomeJogadorInput.value.trim();
registrarNome(nomeJogador);
if (jogadorAtual) jogadorAtual.textContent = nomeJogador;
if (tituloFinal) tituloFinal.textContent = configuracaoAtiva.titulo;
if (tituloArquivo) tituloArquivo.textContent = configuracaoAtiva.titulo;
inicializarBanco();
if (bancoAtivo.length === 0) {
alert("Nenhuma questão encontrada para esta configuração.");
return;
}
if (telaCarregamento) {
telaCarregamento.classList.add("ativa");
if (telaInicial) telaInicial.classList.remove("ativa");
setTimeout(() => {
if (telaCarregamento) telaCarregamento.classList.remove("ativa");
if (telaQuiz) telaQuiz.classList.add("ativa");
iniciarRodada();
}, 2000);
} else {
if (telaInicial) telaInicial.classList.remove("ativa");
if (telaQuiz) telaQuiz.classList.add("ativa");
iniciarRodada();
}
}
function iniciarRodada() {
questoesDaRodada = embaralhar(bancoAtivo).slice(0, QUESTOES_POR_RODADA);
rodadaAtual = 1;
questaoAtual = 0;
pontosRodada = 0;
pontosTotal = 0;
acertosRodada = 0;
acertosTotal = 0;
anotacoesJogo = [];
respostaConfirmada = false;
alternativaSelecionada = null;
if (numeroRodada) numeroRodada.textContent = rodadaAtual;
if (numeroQuestao) numeroQuestao.textContent = questaoAtual + 1;
if (resumoRodada) resumoRodada.classList.add("oculto");
if (resumoAcertosRodada) resumoAcertosRodada.textContent = "0";
if (resumoPontosRodada) resumoPontosRodada.textContent = "0,0";
if (resumoPontosTotal) resumoPontosTotal.textContent = "0,0";
if (resumoStatus) resumoStatus.textContent = "";
if (listaRegistrosTela) listaRegistrosTela.innerHTML = "";
carregarQuestao();
}
function carregarQuestao() {
if (questaoAtual >= questoesDaRodada.length) {
if (rodadaAtual < TOTAL_RODADAS) {
mostrarResumoRodada();
} else {
mostrarTelaFinal();
}
return;
}
const questao = questoesDaRodada[questaoAtual];
if (numeroQuestao) numeroQuestao.textContent = questaoAtual + 1;
if (perguntaTexto) perguntaTexto.innerHTML = `<strong>${questao.aula}</strong><br>${questao.pergunta}`;
if (alternativasBox) {
alternativasBox.innerHTML = "";
questao.alternativas.forEach((alt, index) => {
const btn = document.createElement("button");
btn.className = "alternativa";
btn.type = "button";
btn.dataset.index = index;
btn.innerHTML = `<span class="letra">${String.fromCharCode(65 + index)}</span> ${escaparHTML(alt)}`;
btn.addEventListener("click", () => selecionarAlternativa(index));
alternativasBox.appendChild(btn);
});
}
if (feedback) {
feedback.classList.add("oculto");
feedback.textContent = "";
}
if (anotacaoQuestao) {
anotacaoQuestao.value = "";
anotacaoQuestao.classList.add("oculto");
}
if (btnConfirmar) btnConfirmar.classList.remove("oculto");
if (btnContinuar) btnContinuar.classList.add("oculto");
if (btnProximaRodada) btnProximaRodada.classList.add("oculto");
respostaConfirmada = false;
alternativaSelecionada = null;
if (btnConfirmar) btnConfirmar.disabled = true;
}
function selecionarAlternativa(index) {
if (respostaConfirmada) return;
alternativaSelecionada = index;
if (alternativasBox) {
alternativasBox.querySelectorAll(".alternativa").forEach((btn, i) => {
btn.classList.toggle("selecionada", i === index);
});
}
if (btnConfirmar) btnConfirmar.disabled = false;
}
function confirmarResposta() {
if (alternativaSelecionada === null || respostaConfirmada) return;
respostaConfirmada = true;
const questao = questoesDaRodada[questaoAtual];
const acertou = alternativaSelecionada === questao.correta;
if (acertou) {
pontosRodada += PONTOS_POR_QUESTAO;
pontosTotal += PONTOS_POR_QUESTAO;
acertosRodada++;
acertosTotal++;
}
if (alternativasBox) {
alternativasBox.querySelectorAll(".alternativa").forEach((btn, i) => {
btn.classList.remove("selecionada");
if (i === questao.correta) btn.classList.add("correta");
else if (i === alternativaSelecionada) btn.classList.add("errada");
});
}
if (feedback) {
feedback.classList.remove("oculto");
feedback.innerHTML = acertou ? `<strong style="color:var(--cor-sucesso)">Correto!</strong> ${escaparHTML(questao.feedback)}` : `<strong style="color:var(--cor-erro)">Incorreto.</strong> ${escaparHTML(questao.feedback)}`;
}
if (anotacaoQuestao) {
anotacaoQuestao.classList.remove("oculto");
anotacaoQuestao.placeholder = "Anotações sobre esta questão...";
}
if (btnConfirmar) btnConfirmar.classList.add("oculto");
if (btnContinuar) btnContinuar.classList.remove("oculto");
}
function continuarJogo() {
if (anotacaoQuestao && anotacaoQuestao.value.trim()) {
anotacoesJogo.push({
questao: `${questoesDaRodada[questaoAtual].aula} - Questão ${questaoAtual + 1}`,
texto: anotacaoQuestao.value.trim()
});
}
questaoAtual++;
if (questaoAtual < questoesDaRodada.length) {
carregarQuestao();
} else if (rodadaAtual < TOTAL_RODADAS) {
mostrarResumoRodada();
} else {
mostrarTelaFinal();
}
}
function mostrarResumoRodada() {
if (resumoRodada) resumoRodada.classList.remove("oculto");
if (resumoAcertosRodada) resumoAcertosRodada.textContent = acertosRodada;
if (resumoPontosRodada) resumoPontosRodada.textContent = formatarPontos(pontosRodada);
if (resumoPontosTotal) resumoPontosTotal.textContent = formatarPontos(pontosTotal);
if (resumoStatus) {
const percentual = (acertosRodada / QUESTOES_POR_RODADA) * 100;
if (percentual >= 70) resumoStatus.textContent = "Excelente desempenho!";
else if (percentual >= 50) resumoStatus.textContent = "Bom desempenho!";
else resumoStatus.textContent = "Continue estudando!";
}
if (btnContinuar) btnContinuar.classList.add("oculto");
if (btnProximaRodada) {
btnProximaRodada.classList.remove("oculto");
btnProximaRodada.onclick = () => {
rodadaAtual++;
if (numeroRodada) numeroRodada.textContent = rodadaAtual;
questaoAtual = 0;
pontosRodada = 0;
acertosRodada = 0;
if (resumoRodada) resumoRodada.classList.add("oculto");
if (btnProximaRodada) btnProximaRodada.classList.add("oculto");
carregarQuestao();
};
}
}
function mostrarTelaFinal() {
if (telaQuiz) telaQuiz.classList.remove("ativa");
if (telaFinal) telaFinal.classList.add("ativa");
if (resultadoFinal) resultadoFinal.textContent = formatarPontos(pontosTotal);
if (mensagemFinal) {
const percentual = (acertosTotal / (TOTAL_RODADAS * QUESTOES_POR_RODADA)) * 100;
if (percentual >= 80) mensagemFinal.textContent = "Parabéns! Você domina o conteúdo!";
else if (percentual >= 60) mensagemFinal.textContent = "Muito bom! Continue revisando!";
else if (percentual >= 40) mensagemFinal.textContent = "Você está no caminho. Estude mais um pouco!";
else mensagemFinal.textContent = "Continue estudando! Você vai melhorar!";
}
if (listaRegistrosTela) {
if (anotacoesJogo.length > 0) {
listaRegistrosTela.innerHTML = anotacoesJogo.map(a => `<li><strong>${escaparHTML(a.questao)}</strong><br>${escaparHTML(a.texto)}</li>`).join("");
} else {
listaRegistrosTela.innerHTML = "<li>Nenhuma anotação registrada.</li>";
}
}
if (!rankingRegistrado) {
registrarRanking(pontosTotal, PONTUACAO_MAXIMA, acertosTotal);
}
if (rankingFinal) atualizarRankingTela();
}
function reiniciarJogo() {
if (telaFinal) telaFinal.classList.remove("ativa");
if (telaInicial) telaInicial.classList.add("ativa");
if (nomeJogadorInput) nomeJogadorInput.value = "";
if (btnProximaRodada) btnProximaRodada.classList.add("oculto");
if (resumoRodada) resumoRodada.classList.add("oculto");
rankingRegistrado = false;
}
function sairJogo() {
if (confirm("Deseja realmente sair? Seu progresso será perdido.")) {
reiniciarJogo();
}
}
function atualizarConfiguracao() {
const bloco = this.dataset.bloco;
if (CONFIGURACOES_BLOCOS[bloco]) {
configuracaoAtiva = CONFIGURACOES_BLOCOS[bloco];
if (textoConfiguracaoAtual) {
textoConfiguracaoAtual.textContent = `Selecionado: ${configuracaoAtiva.titulo} | ${configuracaoAtiva.totalRodadas} rodadas | ${configuracaoAtiva.totalQuestoes} questões | ${PONTUACAO_MAXIMA} pontos.`;
}
opcoesBloco.forEach(opcao => opcao.classList.remove("selecionada"));
this.classList.add("selecionada");
}
}
function abrirHistorico() {
if (historicoLateral) historicoLateral.classList.add("aberto");
if (overlayHistorico) overlayHistorico.classList.add("ativo");
}
function fecharHistorico() {
if (historicoLateral) historicoLateral.classList.remove("aberto");
if (overlayHistorico) overlayHistorico.classList.remove("ativo");
}
function limparHistorico() {
if (confirm("Deseja limpar todo o histórico e ranking?")) {
historicoNomes = [];
ranking = [];
localStorage.removeItem("historicoNomes");
localStorage.removeItem("rankingQuiz");
atualizarHistoricoTela();
atualizarRankingTela();
}
}
function atualizarHistoricoTela() {
if (!listaHistorico) return;
if (historicoNomes.length === 0) {
listaHistorico.innerHTML = "<li>Nenhuma entrada registrada.</li>";
return;
}
listaHistorico.innerHTML = historicoNomes.map(nome => `<li>${escaparHTML(nome)}</li>`).join("");
}
function atualizarRankingTela() {
const htmlRanking = ranking.length === 0 ? "<li>Nenhum resultado registrado.</li>" : ranking.map(item => ` <li> <strong>${escaparHTML(item.nome)}</strong> - ${escaparHTML(formatarPontos(Number(item.pontosNumero || item.pontos)))}/${escaparHTML(item.totalPossivel || PONTUACAO_MAXIMA)} <br> <small>${escaparHTML(item.bloco || "Bloco não identificado")}<br>${escaparHTML(item.data)}</small> </li> `).join("");
if (listaRanking) listaRanking.innerHTML = htmlRanking;
if (rankingFinal) rankingFinal.innerHTML = htmlRanking;
}
function salvarHistorico() {
localStorage.setItem("historicoNomes", JSON.stringify(historicoNomes));
atualizarHistoricoTela();
}
function salvarRanking() {
localStorage.setItem("rankingQuiz", JSON.stringify(ranking));
atualizarRankingTela();
}
function nomeJaExiste(nome) {
const nomeNormalizado = normalizarTermo(nome);
return historicoNomes.some(item => normalizarTermo(item) === nomeNormalizado);
}
function carregarJSON(chave, valorPadrao) {
try {
const valor = localStorage.getItem(chave);
if (!valor) return valorPadrao;
return JSON.parse(valor);
} catch (erro) {
return valorPadrao;
}
}
function trocarTela(telaAlvo) {
document.querySelectorAll(".tela").forEach(tela => {
tela.classList.remove("ativa");
});
telaAlvo.classList.add("ativa");
window.scrollTo({ top: 0, behavior: "smooth" });
}
function embaralhar(lista) {
const copia = [...lista];
for (let i = copia.length - 1; i > 0; i--) {
const j = Math.floor(Math.random() * (i + 1));
[copia[i], copia[j]] = [copia[j], copia[i]];
}
return copia;
}
function normalizarTermo(valor) {
return String(valor || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}
function capitalizarPalavra(palavra) {
const texto = String(palavra || "").trim();
if (!texto) return "";
return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}
function escaparHTML(valor) {
return String(valor ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
function normalizarNomeArquivo(nome) {
return normalizarTermo(nome).replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || "participante";
}
if (btnComecar) btnComecar.addEventListener("click", iniciarJogo);
if (btnConfirmar) btnConfirmar.addEventListener("click", confirmarResposta);
if (btnContinuar) btnContinuar.addEventListener("click", continuarJogo);
if (btnProximaRodada) btnProximaRodada.addEventListener("click", mostrarResumoRodada);
if (btnReiniciarJogo) btnReiniciarJogo.addEventListener("click", reiniciarJogo);
if (btnHistorico) btnHistorico.addEventListener("click", abrirHistorico);
if (btnFecharHistorico) btnFecharHistorico.addEventListener("click", fecharHistorico);
if (btnLimparHistorico) btnLimparHistorico.addEventListener("click", limparHistorico);
if (btnSair) btnSair.addEventListener("click", sairJogo);
if (btnBaixarNotas) btnBaixarNotas.addEventListener("click", baixarNotas);
if (btnRetornarInicial) btnRetornarInicial.addEventListener("click", reiniciarJogo);
if (overlayHistorico) overlayHistorico.addEventListener("click", fecharHistorico);
if (opcoesBloco) opcoesBloco.forEach(opcao => opcao.addEventListener("click", atualizarConfiguracao));
if (textoConfiguracaoAtual) {
textoConfiguracaoAtual.textContent = `Selecionado: ${configuracaoAtiva.titulo} | ${configuracaoAtiva.totalRodadas} rodadas | ${configuracaoAtiva.totalQuestoes} questões | ${PONTUACAO_MAXIMA} pontos.`;
}
if (listaHistorico) atualizarHistoricoTela();
if (listaRanking) atualizarRankingTela();
