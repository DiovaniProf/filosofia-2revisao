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
const resumoAcertosRodada = document.getElementById("resumoAcertosRodada"); const resumoPontosRodada = document.getElementById("resumoPontosRodada"); const resumoPontosTotal = document.getElementById("resumoPontosTotal");
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
feedback: "A alternativa C está correta. As normas morais variam conforme o período
histórico e a cultura."
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
feedback: "A alternativa C está correta. Para Platão, a orientação ética está ligada ao mundo
das ideias, e não apenas ao mundo sensível."
},
{
aula: "Aula 18",
pergunta: `ENEM 2024
TEXTO I
Aristóteles entendia que a felicidade era diretamente ligada ao respeito pela própria natureza e a uma vida que tivesse na natureza de si mesma uma referência. Isso lhe permitiu formular o conceito de excelência como tirar de si mesmo, em forma de conduta e comportamento, o que a natureza permitiria de melhor.
TEXTO II
A noção de eudaimonia é central para a ética aristotélica. Ela é uma atividade da alma com base na virtude moral, ligada à deliberação e à prudência.
Os textos indicam que a prática de ações virtuosas, sempre efetivada na pólis, ocorre por meio do(a):`,
alternativas: [
"teoria das formas essenciais.",
"identificação dos princípios racionais.",
"desenvolvimento das técnicas retóricas.",
"aperfeiçoamento das condutas humanas.",
"conhecimento das epistemes verdadeiras."
],
correta: 3,
feedback: "A alternativa D está correta. Para Aristóteles, o aperfeiçoamento de ações virtuosas é o caminho para a excelência e para a felicidade."
},
{
aula: "Aula 19",
pergunta: `(Enem 2018)
“A quem não basta pouco, nada basta.”
EPICURO. Os pensadores. São Paulo: Abril Cultural, 1985.
Remanescente do período helenístico, a máxima apresentada valoriza a seguinte virtude:`,
alternativas: [
"Esperança, tida como confiança no porvir.",
"Justiça, interpretada como retidão de caráter.",
"Temperança, marcada pelo domínio da vontade.",
"Coragem, definida como fortitude na dificuldade.",
"Prudência, caracterizada pelo correto uso da razão."
],
correta: 2,
feedback: "A alternativa C está correta. O epicurismo valoriza o domínio da vontade, e a virtude que melhor expressa isso é a temperança."
},
{
aula: "Aula 19",
pergunta: `(UNISC 2012)
Nas suas Meditações, o filósofo estoico Marco Aurélio escreveu sobre a brevidade da vida, a instabilidade do corpo, a inquietude da alma e a necessidade de aceitar a morte com calma, pois ela faz parte da transformação dos elementos da natureza.
Considere as afirmativas:
I. Marco Aurélio nos diz que a morte é um grande mal.
II. Segundo Marco Aurélio, devemos buscar a fama, a riqueza e o prazer.
III. Segundo Marco Aurélio, conseguindo fama, podemos transcender a finitude da vida humana.
IV. Para Marco Aurélio, a filosofia é valiosa porque nos permite compreender que a morte é parte de um processo da natureza e assim evita que nos angustiemos por ela.
V. Para Marco Aurélio, só a fé em Deus e em Cristo pode libertar o homem do temor da morte. VI. Para Marco Aurélio, o homem participa de uma realidade divina.
Assinale a alternativa correta:`,
alternativas: [
"Somente as afirmativas I e V estão corretas.",
"Somente as afirmativas I, II e III estão corretas.",
"Somente as afirmativas IV e VI estão corretas.",
"Todas as afirmativas estão corretas.",
"Somente a afirmativa IV está correta."
],
correta: 2,
feedback: "A alternativa C está correta. O estoicismo defende o controle das reações diante do que nos afeta, como a morte, e Marco Aurélio relaciona a existência a uma ordem divina."   },
{
aula: "Aula 20",
pergunta: `Selecione a alternativa abaixo que explica corretamente a diferença entre agir por dever e por inclinação:`,
alternativas: [
"Agir por dever é uma ação que se faz pensando nas consequências ou nos resultados coletivos, enquanto agir por inclinação está mais relacionado ao resultado ou benefício pessoal
que se espera alcançar.",
"Agir por dever é uma ação racional e consciente que visa o bem-estar coletivo, enquanto agir por inclinação é mais uma ação emocional e impulsiva que busca satisfazer um desejo pessoal.",
"Agir por dever implica em seguir uma lei ou princípio moral que se considera válido, enquanto agir por inclinação é agir contra essas leis ou princípios.",
"Agir por dever significa realizar uma ação porque se acredita que é o correto a ser feito, independentemente dos desejos ou inclinações pessoais. Agir por inclinação significa agir em conformidade com os próprios desejos e preferências."
],
correta: 3,
feedback: "A alternativa D está correta. Para Kant, o valor moral de uma ação está em agir por dever, e não por interesse, benefício ou inclinações pessoais."
},
{
aula: "Aula 20",
pergunta: `“Duas coisas me enchem a alma de crescente admiração e respeito, quanto mais intensa e frequentemente o pensamento delas se ocupa: o céu estrelado acima de mim e a lei moral dentro de mim.” (Kant, Immanuel. A metafísica dos costumes)
Qual das alternativas abaixo explica de forma correta o que Kant está dizendo?`,
alternativas: [
"Fruto da razão prática, a lei moral da qual fala Kant nessa passagem é o imperativo categórico, uma norma moral universal.",
"As leis morais são relativas a cada sujeito, já que estão dentro de cada um de nós.",
"A lei moral da qual Kant fala nessa passagem é o nosso bom senso da moral coletiva.",
"A lei moral da qual fala Kant são as leis de determinada cultura, que dentro daquele país devem ser aplicadas sem distinção de classe, gênero ou raça.",
"A lei moral é o imperativo hipotético, onde cada pessoa busca um agir relativo às suas
próprias vontades."
],
correta: 0,
feedback: "A alternativa A está correta. A lei moral kantiana está ligada ao imperativo
categórico, uma norma moral universal fundamentada na razão prática."
},
{
aula: "Aula 21",
pergunta: `A crítica decolonial analisa a forma como a produção de conhecimento ao longo da história foi influenciada por relações de poder estabelecidas durante a colonização. Segundo essa perspectiva, muitos saberes produzidos por povos africanos, indígenas e outras culturas foram ignorados ou considerados inferiores.
Considerando essa reflexão, qual alternativa expressa corretamente uma das críticas centrais
do pensamento decolonial?`,
alternativas: [
"O conhecimento científico deve ser produzido apenas em universidades europeias.",
"A filosofia é uma atividade exclusiva da cultura ocidental.",
"Apenas o conhecimento escrito pode ser considerado filosófico.",
"Diferentes culturas produzem conhecimentos válidos e devem ser reconhecidas na história do pensamento.",
"O pensamento filosófico surgiu apenas na Grécia antiga e não se desenvolveu em outras regiões."
],
correta: 3,
feedback: "A alternativa D está correta. A crítica decolonial questiona a ideia de que apenas o pensamento europeu seria válido ou universal, valorizando saberes africanos, indígenas e de outras culturas."
},
{
aula: "Aula 21",
pergunta: `A filosofia africana apresenta concepções éticas que valorizam a relação entre indivíduo, comunidade e natureza. Muitas dessas perspectivas destacam que a identidade humana não se constrói de forma isolada, mas dentro das relações sociais e culturais de cada comunidade.
Com base nessa ideia, qual alternativa expressa corretamente uma característica importante dessas perspectivas filosóficas?`,
alternativas: [
"A vida em sociedade é secundária em relação ao desenvolvimento individual.",
"O indivíduo se constrói em relação com a comunidade e com os outros membros da sociedade.",
"As decisões morais devem considerar apenas interesses pessoais.",
"O conhecimento filosófico depende exclusivamente de tradições europeias.",
"As tradições culturais não influenciam a forma como as sociedades compreendem a ética."     ],
correta: 1,
feedback: "A alternativa B está correta. Muitas correntes da filosofia africana enfatizam que a identidade humana se constrói nas relações comunitárias, com solidariedade, cooperação e responsabilidade coletiva."
},
{
aula: "Aula 22",
pergunta: `A bioética surgiu como um campo de reflexão para analisar dilemas morais relacionados à vida, à saúde e às intervenções científicas. No contexto do uso de inteligência artificial na medicina, a bioética busca orientar decisões que envolvem tecnologias capazes de influenciar diagnósticos e tratamentos médicos.
Considerando essa perspectiva, qual alternativa expressa corretamente um dos desafios éticos do uso da inteligência artificial na medicina?`,
alternativas: [
"A inteligência artificial deve substituir completamente os médicos, pois é capaz de tomar decisões mais rápidas e precisas.",
"O uso da inteligência artificial elimina a necessidade de reflexão ética nas decisões
médicas.",
"A inteligência artificial pode auxiliar diagnósticos, mas as decisões devem considerar também responsabilidade humana e princípios éticos.",
"As decisões médicas devem ser tomadas apenas com base nos dados fornecidos pelos sistemas tecnológicos.",
"O uso de inteligência artificial na medicina torna desnecessário o diálogo entre ciência e sociedade."
],
correta: 2,
feedback: "A alternativa C está correta. A tecnologia pode auxiliar profissionais da saúde, mas não substitui a responsabilidade ética humana."
},
{
aula: "Aula 22",
pergunta: `A bioética utiliza alguns princípios fundamentais para orientar decisões relacionadas à saúde e às intervenções científicas. Esses princípios ajudam a analisar
situações complexas, como o uso de tecnologias digitais e sistemas de inteligência artificial na medicina.
Qual princípio da bioética está diretamente relacionado ao direito do paciente de participar das decisões sobre seu próprio tratamento?`,
alternativas: [
"Justiça.",
"Autonomia.",
"Beneficência.",
"Não maleficência.",
"Responsabilidade científica."
],
correta: 1,
feedback: "A alternativa B está correta. O princípio da autonomia reconhece o direito das pessoas de participar das decisões sobre sua própria vida e saúde."
},
{
aula: "Aula 23",
pergunta: `Gilberto Cotrim, ao tratar da pós-modernidade e das ideias de Michel Foucault, afirma que as sociedades modernas apresentam uma organização do poder em que ele não se
concentra apenas no Estado, mas se dissemina por vários âmbitos da vida social. Assim, micropoderes se espalham pelas instituições e relações sociais.
Pelo exposto por Cotrim sobre Foucault, a principal função dos micropoderes no corpo social é interiorizar e fazer cumprir:`,
alternativas: [
"o ideal de igualdade entre os homens.",
"o total direito político de acordo com as etnias.",
"as normas estabelecidas pela disciplina social.",
"a repressão exercida pelos menos instruídos.",
"o ideal de liberdade individual."
],
correta: 2,
feedback: "A alternativa C está correta. Para Foucault, o poder não está apenas nas grandes instituições; ele circula nas relações sociais e reproduz normas de disciplina social."
},
{
aula: "Aula 23",
pergunta: `(Enem 2025)
A cidade justa é governada pelos filósofos, administrada pelos cientistas, protegida pelos guerreiros e mantida pelos produtores. Cada classe cumpre sua função para o bem da pólis, racionalmente dirigida pelos filósofos. Em contrapartida, a cidade injusta é aquela onde o governo está nas mãos dos proprietários, que lutam por interesses econômicos particulares.
O texto apresenta a estrutura de governo da cidade ideal pensada por Platão, que postula uma indissociabilidade entre:`,
alternativas: [
"cognoscência e relação intersubjetiva.",
"mitologia e teorias cosmogônicas.",
"cidadania e primazia da retórica.",
"moralidade e virtudes cardeais.",
"ética e exercício do poder."
],
correta: 4,
feedback: "A alternativa E está correta. Em Platão, verdade, justiça e bem comum estão ligados ao exercício do poder na cidade ideal."
},
{
aula: "Aula 24",
pergunta: `Maquiavel construiu dois conceitos sobre qualidades dos governantes em O
Príncipe. São eles:`,
alternativas: [
"Ética e Moral.",
"Coragem e Tirania.",
"Virtù e Fortuna.",
"Razão e Fortuna.",
"Estado civil e estado da natureza."
],
correta: 2,
feedback: "A alternativa C está correta. Para Maquiavel, o príncipe precisa de virtù, isto é,
força, coragem e capacidade de agir, além de saber aproveitar a fortuna, entendida como oportunidade."
},
{
aula: "Aula 24",
pergunta: `(Enem)
Para Maquiavel, quando um homem decide dizer a verdade pondo em risco a própria integridade física, essa resolução diz respeito apenas a sua pessoa. Mas se esse homem é chefe de Estado, os critérios pessoais não são mais adequados para decidir sobre ações cujas consequências são amplas. Nesse caso, conforme as circunstâncias e os fins, pode-se decidir que o melhor para o bem comum seja mentir.
O texto aponta uma inovação na teoria política moderna expressa na distinção entre:`,
alternativas: [
"idealidade e efetividade da moral.",
"nulidade e preservabilidade da liberdade.",
"ilegalidade e legitimidade do governante.",
"verificabilidade e possibilidade da verdade.",
"objetividade e subjetividade do conhecimento."
],
correta: 0,
feedback: "A alternativa A está correta. Em Maquiavel, a ação política deve considerar a efetividade das decisões e os efeitos para o governo e para o bem comum."
},
{
aula: "Aula 25",
pergunta: `(Enem 2021)
“Antes que a arte polisse nossas maneiras e ensinasse nossas paixões a falarem a linguagem apurada, nossos costumes eram rústicos. Não era melhor, mas os homens encontravam sua segurança na facilidade para se reconhecerem reciprocamente, e essa vantagem poupava-lhes muitos vícios.”
No presente excerto, Jean-Jacques Rousseau exalta uma condição que teria sido vivenciada
pelo homem em qual situação?`,
alternativas: [
"No sistema monástico, pela valorização da religião.",
"Na existência em comunidade, pela comunhão de valores.",
"No modelo de autogestão, pela emancipação do sujeito.",
"No estado de natureza, pelo exercício da liberdade.",
"Na vida em sociedade, pela abundância de bens."
],
correta: 3,
feedback: "A alternativa D está correta. Para Rousseau, a natureza humana é boa, e o estado de natureza permitia o reconhecimento do outro como semelhante."
},
{
aula: "Aula 25",
pergunta: `A principal obra de Thomas Hobbes foi Leviatã ou Matéria, Forma e Poder de um Governo Eclesiástico e Civil. Nesta obra, Hobbes afirma:`,
alternativas: [
"O homem é lobo do homem e vive numa guerra de todos contra todos.",
"O homem é naturalmente bom, a sociedade é que o perverte.",
"O homem é um animal político, e por isso vive em sociedade.",
"O homem está condenado a ser livre, mas é responsável por suas escolhas.",
"O homem é naturalmente tirano e a tirania é a forma de governo ideal."
],
correta: 0,
feedback: "A alternativa A está correta. Para Hobbes, sem um Estado que imponha leis, o ser humano vive em conflito permanente, numa guerra de todos contra todos."
}
];
function obterDescritorHabilidade(aula) {
const numeroAula = obterNumeroAula(aula);
const mapaDescritores = {
17: {
descritor: "Hd14",
habilidade: "Reconhecer elementos da ética filosófica."
},
18: {
descritor: "Hd14",
habilidade: "Reconhecer elementos da ética filosófica."
},
19: {
descritor: "Hd14",
habilidade: "Reconhecer elementos da ética filosófica."
},
20: {
descritor: "Hd14",
habilidade: "Reconhecer elementos da ética filosófica."
},
21: {
descritor: "Hd12 e Hd13",
habilidade: "Compreender aspectos do pensamento dos povos originários, africanos e afro-brasileiros; analisar as críticas da decolonialidade."
},
22: {
descritor: "Hd14",
habilidade: "Reconhecer elementos da ética filosófica."
},
23: {
descritor: "Hd10",
habilidade: "Reconhecer a importância da política e sua relação com o exercício do poder."     },
24: {
descritor: "Hd10",
habilidade: "Reconhecer a importância da política e sua relação com o exercício do poder."     },
25: {
descritor: "Hd11",
habilidade: "Identificar características do contratualismo e suas diversas perspectivas."
}
};
return mapaDescritores[numeroAula] || {
descritor: "não identificado",
habilidade: "Habilidade não identificada para esta questão."
};
}
function mensagemDescritorQuandoCorreta(aula) {
const dados = obterDescritorHabilidade(aula);
return `Parabéns! Você se apropriou do descritor ${dados.descritor}, que corresponde à habilidade: ${dados.habilidade}`;
}
function letraAlternativa(indice) {
return ["a", "b", "c", "d", "e"][indice] || String(indice + 1);
}
function alternativaComLetra(texto, indice) {
return `${letraAlternativa(indice)}) ${texto}`;
}
function limparLetraAntigaDoFeedback(texto) {
return String(texto || "")
.replace(/A alternativa correta é a letra [A-E].?s*/gi, "")
.replace(/A alternativa [A-E] está correta.?s*/gi, "")
.replace(/A resposta correta é a letra [A-E].?s*/gi, "")
.replace(/Justificativa:s*/gi, "")
.trim();
}
function feedbackFormatadoDaQuestao(questao) {
const letraCorreta = letraAlternativa(questao.correta);
const alternativaCorreta = questao.alternativas[questao.correta];
const justificativa = limparLetraAntigaDoFeedback(questao.feedback);
if (justificativa) {
return `Alternativa correta: ${letraCorreta}) ${alternativaCorreta}. Feedback: ${justificativa}`;   }
return `Alternativa correta: ${letraCorreta}) ${alternativaCorreta}.`;
}
function aplicarConfiguracao(idBloco) {
const novaConfiguracao = CONFIGURACOES_BLOCOS[idBloco] ||
CONFIGURACOES_BLOCOS.completo;
configuracaoAtiva = novaConfiguracao;
TOTAL_QUESTOES_BANCO = novaConfiguracao.totalQuestoes;
QUESTOES_POR_RODADA = novaConfiguracao.questoesPorRodada;
TOTAL_RODADAS = novaConfiguracao.totalRodadas;
PONTOS_POR_QUESTAO = PONTUACAO_MAXIMA / TOTAL_QUESTOES_BANCO;
tituloJogoAtual = novaConfiguracao.titulo;
opcoesBloco.forEach(botao => {
botao.classList.toggle("selecionada", botao.dataset.bloco === novaConfiguracao.id);
});
if (textoConfiguracaoAtual) {
textoConfiguracaoAtual.textContent =
`Selecionado: ${novaConfiguracao.titulo} | ${novaConfiguracao.totalRodadas} rodadas | ${novaConfiguracao.totalQuestoes} questões | 100 pontos.`;
}
numeroRodada.textContent = `1/${TOTAL_RODADAS}`;
numeroQuestao.textContent = `1/${QUESTOES_POR_RODADA}`;
resumoRodada.textContent = `1/${TOTAL_RODADAS}`;
resumoAcertosRodada.textContent = `0/${QUESTOES_POR_RODADA}`;
resumoPontosRodada.textContent = `0/${formatarPontos((QUESTOES_POR_RODADA / TOTAL_QUESTOES_BANCO) * PONTUACAO_MAXIMA)}`;
resumoPontosTotal.textContent = `0/${PONTUACAO_MAXIMA}`;
}
opcoesBloco.forEach(botao => {
botao.addEventListener("click", () => {
aplicarConfiguracao(botao.dataset.bloco);
});
});
aplicarConfiguracao("completo");
atualizarHistoricoTela();
atualizarRankingTela();
btnHistorico.addEventListener("click", event => {
event.stopPropagation();
abrirHistorico();
});
btnFecharHistorico.addEventListener("click", fecharHistorico);
overlayHistorico.addEventListener("click", fecharHistorico);
document.addEventListener("keydown", event => {
if (event.key === "Escape") {
fecharHistorico();
}
});
btnLimparHistorico.addEventListener("click", () => {
if (!confirm("Deseja limpar histórico e ranking?")) return;
historicoNomes = [];
ranking = [];
localStorage.removeItem("historicoNomes");
localStorage.removeItem("rankingQuiz");
atualizarHistoricoTela();
atualizarRankingTela();
});
btnComecar.addEventListener("click", () => {
nomeJogador = nomeJogadorInput.value.trim();
if (nomeJogador.length < 3) {
alert("Digite um nome com 3 caracteres ou mais.");
nomeJogadorInput.focus();
return;
}
if (nomeJaExiste(nomeJogador)) {
alert("Este nome já foi usado. Digite outro nome ou limpe o histórico.");
nomeJogadorInput.focus();
return;
}
historicoNomes.push(nomeJogador);
salvarHistorico();
bancoAtivo = gerarBancoPadrao();
iniciarJogo(configuracaoAtiva.titulo);
});
btnSair.addEventListener("click", () => {
const confirmarSaida = confirm("Deseja sair do Quiz e voltar para a tela inicial?");   if (!confirmarSaida) return;
reiniciarEstadoDoJogo();
trocarTela(telaInicial);
});
btnConfirmar.addEventListener("click", () => {
if (alternativaSelecionada === null) {
alert("Escolha uma alternativa.");
return;
}
registrarRespostaSemMostrarCorrecao();
});
btnContinuar.addEventListener("click", () => {
salvarAnotacaoQuestaoAtual();
questaoAtual++;
if (questaoAtual < questoesDaRodada.length) {
mostrarQuestao();
} else {
finalizarRodada();
}
});
btnProximaRodada.addEventListener("click", () => {   rodadaAtual++;
iniciarRodada();
});
btnReiniciarJogo.addEventListener("click", () => {   reiniciarEstadoDoJogo();
nomeJogadorInput.value = "";
trocarTela(telaInicial);
});
btnRetornarInicial.addEventListener("click", () => {   reiniciarEstadoDoJogo();
nomeJogadorInput.value = "";
trocarTela(telaInicial);
});
btnBaixarNotas.addEventListener("click", () => {
baixarRelatorioDoc();
});
function abrirHistorico() {
historicoLateral.classList.add("ativo");
overlayHistorico.classList.add("ativo");
}
function fecharHistorico() {
historicoLateral.classList.remove("ativo");
overlayHistorico.classList.remove("ativo");
}
function iniciarJogo(titulo) {
tituloJogoAtual = titulo;
rodadaAtual = 1;
pontosRodada = 0;
pontosTotal = 0;
acertosRodada = 0;
acertosTotal = 0;
anotacoesJogo = [];
rankingRegistrado = false;
iniciarRodada();
}
function iniciarRodada() {
questaoAtual = 0;
pontosRodada = 0;
acertosRodada = 0;
alternativaSelecionada = null;
respostaAtual = null;
respostaConfirmada = false;
const inicio = (rodadaAtual - 1) * QUESTOES_POR_RODADA;   const fim = inicio + QUESTOES_POR_RODADA;
questoesDaRodada = bancoAtivo.slice(inicio, fim);
tituloArquivo.textContent = tituloJogoAtual;
jogadorAtual.textContent = `Participante: ${nomeJogador}`;
trocarTela(telaQuiz);
mostrarQuestao();
}
function mostrarQuestao() {
alternativaSelecionada = null;
respostaAtual = null;
respostaConfirmada = false;
feedback.textContent = "";
feedback.style.color = "#bfdbfe";
btnConfirmar.disabled = false;
btnConfirmar.classList.remove("oculto");
btnContinuar.classList.add("oculto");
anotacaoQuestao.disabled = false;
anotacaoQuestao.value = "";
anotacaoQuestao.placeholder = "Digite aqui suas anotações antes ou depois de marcar a alternativa...";
const questao = questoesDaRodada[questaoAtual];
numeroRodada.textContent = `${rodadaAtual}/${TOTAL_RODADAS}`;
numeroQuestao.textContent = `${questaoAtual + 1}/${QUESTOES_POR_RODADA}`;
perguntaTexto.textContent = questao.aula ? `${questao.aula}nn${questao.pergunta}` : questao.pergunta;
alternativasBox.innerHTML = "";
questao.alternativas.forEach((texto, index) => {
const botao = document.createElement("button");
botao.classList.add("alternativa");
botao.type = "button";
botao.textContent = alternativaComLetra(texto, index);
botao.addEventListener("click", () => {
if (respostaConfirmada) return;
document.querySelectorAll(".alternativa").forEach(alt => {
alt.classList.remove("selecionada");
});
botao.classList.add("selecionada");
alternativaSelecionada = index;
});
alternativasBox.appendChild(botao);
});
}
function registrarRespostaSemMostrarCorrecao() {
const questao = questoesDaRodada[questaoAtual];
const alternativas = document.querySelectorAll(".alternativa");
respostaConfirmada = true;
btnConfirmar.disabled = true;
btnConfirmar.classList.add("oculto");
alternativas.forEach(alt => {
alt.classList.add("bloqueada");
});
const acertou = alternativaSelecionada === questao.correta;
if (acertou) {
acertosRodada++;
acertosTotal++;
}
pontosRodada = calcularPontos(acertosRodada);
pontosTotal = calcularPontos(acertosTotal);
respostaAtual = {
rodada: rodadaAtual,
aula: questao.aula || "Arquivo enviado",
numeroNaRodada: questaoAtual + 1,
numeroGeral: ((rodadaAtual - 1) * QUESTOES_POR_RODADA) + questaoAtual + 1,     pergunta: questao.pergunta,
respostaMarcada: alternativaComLetra(questao.alternativas[alternativaSelecionada], alternativaSelecionada),
respostaCorreta: alternativaComLetra(questao.alternativas[questao.correta], questao.correta),
acertou: acertou ? "Correta" : "Incorreta",
pontosDaQuestao: acertou ? PONTOS_POR_QUESTAO : 0,
feedback: feedbackFormatadoDaQuestao(questao),
mensagemDescritor: acertou ? mensagemDescritorQuandoCorreta(questao.aula) : ""   };
feedback.textContent = "Resposta registrada. A correção, o feedback e a pontuação aparecerão somente ao final da rodada.";
feedback.style.color = "#facc15";
anotacaoQuestao.disabled = false;
anotacaoQuestao.placeholder = "Você ainda pode editar seu bloco de notas antes de continuar...";
anotacaoQuestao.focus();
btnContinuar.classList.remove("oculto");
}
function salvarAnotacaoQuestaoAtual() {
if (!respostaAtual) return;
const textoDigitado = anotacaoQuestao.value.trim();
anotacoesJogo.push({
...respostaAtual,
anotacao: textoDigitado ? textoDigitado : "Nenhum rascunho registrado."
});
}
function finalizarRodada() {
trocarTela(telaFinal);
const maximoRodada = (QUESTOES_POR_RODADA / TOTAL_QUESTOES_BANCO) * PONTUACAO_MAXIMA;
const percentualRodada = Math.round((acertosRodada / QUESTOES_POR_RODADA) * 100);   const nivelRodada = obterNivelAprendizagem(percentualRodada);
pontosRodada = calcularPontos(acertosRodada);
pontosTotal = calcularPontos(acertosTotal);
tituloFinal.textContent = rodadaAtual < TOTAL_RODADAS ? "Rodada concluída" : "Jogo concluído";
resultadoFinal.textContent = `Resultado da rodada ${rodadaAtual}`;
resumoRodada.textContent = `${rodadaAtual}/${TOTAL_RODADAS}`;
resumoAcertosRodada.textContent = `${acertosRodada}/${QUESTOES_POR_RODADA}`;
resumoPontosRodada.textContent =
`${formatarPontos(pontosRodada)}/${formatarPontos(maximoRodada)}`;
resumoPontosTotal.textContent =
`${formatarPontos(pontosTotal)}/${PONTUACAO_MAXIMA}`;
resumoStatus.textContent = nivelRodada;
mensagemFinal.textContent =
`${nomeJogador}, você fez ${formatarPontos(pontosRodada)} pontos nesta rodada. Nível da rodada: ${nivelRodada}.`;
if (rodadaAtual < TOTAL_RODADAS) {
const restantes = TOTAL_RODADAS - rodadaAtual;
mensagemRodada.textContent =
`Ainda ${restantes === 1 ? "resta" : "restam"} ${restantes} ${restantes === 1 ? "rodada" : "rodadas"} para concluir o jogo.`;
btnProximaRodada.classList.remove("oculto");
btnReiniciarJogo.classList.add("oculto");
} else {
const percentualFinal = Math.round((acertosTotal / TOTAL_QUESTOES_BANCO) * 100);
const nivelFinal = obterNivelAprendizagem(percentualFinal);
resumoStatus.textContent = nivelFinal;
mensagemRodada.textContent =
`Você concluiu as ${TOTAL_RODADAS} rodadas. Aproveitamento final: ${percentualFinal}%. Nível final: ${nivelFinal}`;
btnProximaRodada.classList.add("oculto");
btnReiniciarJogo.classList.remove("oculto");
if (!rankingRegistrado) {
registrarRankingFinal();
rankingRegistrado = true;
}
}
btnBaixarNotas.disabled = anotacoesJogo.length === 0;
atualizarRegistrosNaTela();
atualizarRankingTela();
}
function atualizarRegistrosNaTela() {
if (anotacoesJogo.length === 0) {
listaRegistrosTela.innerHTML = "<p>Nenhum registro feito ainda.</p>";
return;
}
const inicioRodadaAtual = (rodadaAtual - 1) * QUESTOES_POR_RODADA + 1;
const fimRodadaAtual = rodadaAtual * QUESTOES_POR_RODADA;
const registrosDaRodadaAtual = anotacoesJogo.filter(item => {
return item.numeroGeral >= inicioRodadaAtual && item.numeroGeral <= fimRodadaAtual;
});
listaRegistrosTela.innerHTML = registrosDaRodadaAtual.map(item => {
const classeResultado = item.acertou === "Correta" ? "tag-correto" : "tag-incorreto";
return `
<div class="registro-card">
<div class="registro-cabecalho">
<strong>
${escaparHTML(item.aula)} |
Rodada ${escaparHTML(item.rodada)} |
Questão ${escaparHTML(item.numeroNaRodada)} |
Geral ${escaparHTML(item.numeroGeral)} de ${TOTAL_QUESTOES_BANCO}
</strong>
<span class="${classeResultado}">${escaparHTML(item.acertou)}</span>
</div>
<div class="registro-grid">
<p><strong>Pergunta:</strong> ${escaparHTML(item.pergunta)}</p>
<p><strong>Alternativa marcada:</strong> ${escaparHTML(item.respostaMarcada)}</p>           <p><strong>Resposta correta:</strong> ${escaparHTML(item.respostaCorreta)}</p>
<p><strong>Pontos da questão:</strong> ${formatarPontos(item.pontosDaQuestao)}</p>           <p class="caixa-feedback-rodada"><strong>Feedback:</strong>
${escaparHTML(item.feedback || "Sem feedback registrado.")}</p>
${item.mensagemDescritor ? `<p
class="mensagem-descritor"><strong>${escaparHTML(item.mensagemDescritor)}</strong></p >` : ""}
</div>
<div class="registro-nota">
<strong>Rascunho:</strong><br>
${escaparHTML(item.anotacao).replace(/n/g, "<br>")}
</div>
</div>
`;
}).join("");
}
function baixarRelatorioDoc() {
const agora = new Date();
const dataAtual = agora.toLocaleDateString("pt-BR");
const horarioAtual = agora.toLocaleTimeString("pt-BR", {
hour: "2-digit",
minute: "2-digit"
});
const totalRespondidas = anotacoesJogo.length;
const percentualAtual = Math.round((pontosTotal / PONTUACAO_MAXIMA) * 100);
const nivel = obterNivelAprendizagem(percentualAtual);
pontosTotal = calcularPontos(acertosTotal);
const totalPontosFormatado = `${formatarPontos(pontosTotal)}/${PONTUACAO_MAXIMA}`;   const totalAcertosFormatado = `${acertosTotal}/${TOTAL_QUESTOES_BANCO}`;
const conteudoQuestoes = anotacoesJogo.map(item => `
<div class="questao">
<h2>${escaparHTML(item.aula)} - Rodada ${escaparHTML(item.rodada)} - Questão ${escaparHTML(item.numeroNaRodada)}</h2>
<p><strong>Pergunta:</strong> ${escaparHTML(item.pergunta)}</p>
<p><strong>Alternativa marcada:</strong> ${escaparHTML(item.respostaMarcada)}</p>
<p><strong>Resposta correta:</strong> ${escaparHTML(item.respostaCorreta)}</p>
<p><strong>Situação:</strong> ${escaparHTML(item.acertou)}</p>
<p class="caixa-feedback-rodada"><strong>Feedback:</strong>
${escaparHTML(item.feedback || "Sem feedback registrado.")}</p>
${item.mensagemDescritor ? `<p
class="mensagem-descritor"><strong>${escaparHTML(item.mensagemDescritor)}</strong></p >` : ""}
<p><strong>Rascunho:</strong><br>
${escaparHTML(item.anotacao).replace(/n/g, "<br>")}</p>
</div>
`).join("");
const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Relatório de respostas</title>
<style>
body {
font-family: Arial, Helvetica, sans-serif;           color: #111827;
line-height: 1.45;
margin: 32px;
}
h1 {
text-align: center;
font-size: 26px;
margin-bottom: 6px;
color: #111827;
}
.subtitulo {
text-align: center;
font-size: 18px;
font-weight: bold;
margin-bottom: 24px;
color: #111827;
}
.dados-participante {
margin-bottom: 18px;
font-size: 14px;
}
.dados-participante p {
margin: 6px 0;
}
.tabela-resumo {
width: 100%;
border-collapse: collapse;
margin: 18px 0 28px;
}
.tabela-resumo th,
.tabela-resumo td {
border: 1px solid #111827;
padding: 10px;
text-align: center;
vertical-align: middle;
}
.tabela-resumo th {
font-weight: bold;
background: #e5e7eb;
}
.tabela-resumo td {
font-size: 15px;
}
.anexo-titulo {
margin-top: 26px;
margin-bottom: 18px;
font-size: 20px;
color: #111827;
}
.questao {
page-break-inside: avoid;
margin-bottom: 22px;
padding-bottom: 14px;
border-bottom: 1px solid #d1d5db;         }
.questao h2 {
font-size: 17px;
color: #111827;
margin-bottom: 10px;
}
.questao p {
margin: 7px 0;
font-size: 14px;
}
.caixa-feedback-rodada {
padding: 12px;
border-radius: 10px;
border: 1px solid #d1d5db;
background: #ffffff;
color: #000000;
font-weight: bold;
}
.caixa-feedback-rodada strong {
color: #000000;
}
.mensagem-descritor {
padding: 12px;
border-radius: 10px;
border-left: 4px solid #f97316;
background: linear-gradient(135deg, #f5e6c8, #f6c0a8, #fa8072);           color: #000000;
font-weight: bold;
}
.mensagem-descritor strong {
color: #000000;
}
strong {
color: #111827;
}
</style>
</head>
<body>
<h1>Relatório de respostas</h1>
<div class="subtitulo">
Quiz - ${escaparHTML(tituloJogoAtual)}
</div>
<div class="dados-participante">
<p><strong>Participante:</strong> ${escaparHTML(nomeJogador)}</p>
<p><strong>Data:</strong> ${escaparHTML(dataAtual)}  <strong>Horário:</strong> ${escaparHTML(horarioAtual)}</p>
</div>
<table class="tabela-resumo">
<thead>
<tr>
<th>Total de pontos</th>
<th>Total de acertos</th>
<th>Nível de aprendizagem</th>
</tr>
</thead>
<tbody>
<tr>
<td>${escaparHTML(totalPontosFormatado)}</td>
<td>${escaparHTML(totalAcertosFormatado)}</td>
<td>${escaparHTML(nivel)}</td>
</tr>
</tbody>
</table>
<h2 class="anexo-titulo">Anexo - Rascunhos do participante</h2>
${conteudoQuestoes || "<p>Nenhum rascunho registrado.</p>"}
</body>
</html>
`;
const blob = new Blob(["ufeff", html], {
type: "application/msword"
});
const link = document.createElement("a");
const nomeArquivoLimpo = normalizarNomeArquivo(nomeJogador);
link.href = URL.createObjectURL(blob);
link.download = `relatorio_de_respostas_${nomeArquivoLimpo}.doc`;
link.click();
URL.revokeObjectURL(link.href);
}
function calcularPontos(acertos) {
return (acertos / TOTAL_QUESTOES_BANCO) * PONTUACAO_MAXIMA;
}
function formatarPontos(valor) {
const arredondado = Math.round((Number(valor) + Number.EPSILON) * 100) / 100;
if (Number.isInteger(arredondado)) {
return String(arredondado);
}
return arredondado.toLocaleString("pt-BR", {
minimumFractionDigits: 2,
maximumFractionDigits: 2
});
}
function obterNivelAprendizagem(percentual) {
if (percentual <= 39) return "Precisa reforçar os estudos [Insuficiente]";
if (percentual <= 59) return "Aprendizagem em desenvolvimento [Abaixo do básico]";
if (percentual <= 79) return "Aprendizagem Satisfatória [Você pode evoluir]";
return "Excelente aprendizagem";
}
function registrarRankingFinal() {
ranking.push({
nome: nomeJogador,
pontos: formatarPontos(pontosTotal),
pontosNumero: pontosTotal,
totalPossivel: PONTUACAO_MAXIMA,
acertos: acertosTotal,
totalQuestoes: TOTAL_QUESTOES_BANCO,
bloco: configuracaoAtiva.titulo,
data: new Date().toLocaleString("pt-BR")
});
ranking.sort((a, b) => Number(b.pontosNumero || b.pontos) - Number(a.pontosNumero || a.pontos));
ranking = ranking.slice(0, 5);
salvarRanking();
}
function reiniciarEstadoDoJogo() {
bancoAtivo = [];
questoesDaRodada = [];
rodadaAtual = 1;
questaoAtual = 0;
pontosRodada = 0;
pontosTotal = 0;
acertosRodada = 0;
acertosTotal = 0;
alternativaSelecionada = null;
respostaAtual = null;
respostaConfirmada = false;
anotacoesJogo = [];
tituloJogoAtual = configuracaoAtiva.titulo;
rankingRegistrado = false;
numeroRodada.textContent = `1/${TOTAL_RODADAS}`;
numeroQuestao.textContent = `1/${QUESTOES_POR_RODADA}`;   feedback.textContent = "";
anotacaoQuestao.value = "";
anotacaoQuestao.disabled = false;
btnContinuar.classList.add("oculto");
btnConfirmar.classList.remove("oculto");
if (listaRegistrosTela) {
listaRegistrosTela.innerHTML = "";
}
}
function gerarBancoPadrao() {
const aulasPermitidas = new Set(configuracaoAtiva.aulas);
const bancoFiltrado = bancoQuestoesAulas17a25.filter(questao => {     return aulasPermitidas.has(obterNumeroAula(questao.aula));
});
return embaralhar(bancoFiltrado.map(prepararQuestao)).slice(0,
TOTAL_QUESTOES_BANCO);
}
function obterNumeroAula(aula) {
const encontrado = String(aula || "").match(/d+/);
return encontrado ? Number(encontrado[0]) : 0;
}
function prepararQuestao(questaoOriginal) {
const respostaOriginal = questaoOriginal.alternativas[questaoOriginal.correta];
const alternativasEmbaralhadas = embaralhar([...questaoOriginal.alternativas]);
return {
aula: questaoOriginal.aula,
pergunta: questaoOriginal.pergunta,
alternativas: alternativasEmbaralhadas,
correta: alternativasEmbaralhadas.indexOf(respostaOriginal),
feedback: questaoOriginal.feedback
};
}
function completarBancoPadrao(bancoGerado) {
const bancoComplementar = gerarBancoPadrao();
const perguntasExistentes = new Set(bancoGerado.map(q => normalizarTermo(q.pergunta)));
bancoComplementar.forEach(questao => {
if (bancoGerado.length >= TOTAL_QUESTOES_BANCO) return;
const chave = normalizarTermo(questao.pergunta);
if (!perguntasExistentes.has(chave)) {
bancoGerado.push(questao);
perguntasExistentes.add(chave);
}
});
return bancoGerado.slice(0, TOTAL_QUESTOES_BANCO);
}
function gerarBancoDoTextoObjetivo(texto, quantidadeMaxima) {
const textoLimpo = limparTexto(texto);
const frases = removerFrasesRepetidas(extrairFrasesValidas(textoLimpo));
if (frases.length < 8) {
return [];
}
const frasesMisturadas = embaralhar([...frases]);
const perguntas = [];
const chavesUsadas = new Set();
for (const frase of frasesMisturadas) {
if (perguntas.length >= quantidadeMaxima) break;
const tema = identificarTema(frase);
const pergunta = criarEnunciadoObjetivo(tema, perguntas.length);
const respostaCorreta = transformarFraseEmAlternativa(frase);
if (respostaCorreta.length < 25 || respostaCorreta.length > 230) {
continue;
}
const alternativasErradas = gerarDistratoresObjetivos(frase, tema, frasesMisturadas);
const alternativasUnicas = removerAlternativasRepetidas([
respostaCorreta,
...alternativasErradas
]).slice(0, 4);
if (alternativasUnicas.length < 4) {
continue;
}
const alternativas = embaralhar(alternativasUnicas);
const indiceCorreto = alternativas.indexOf(respostaCorreta);
if (indiceCorreto < 0) {
continue;
}
const chave = normalizarTermo(pergunta + respostaCorreta.slice(0, 80));
if (chavesUsadas.has(chave)) {
continue;
}
perguntas.push({
aula: "Arquivo enviado",
pergunta,
alternativas,
correta: indiceCorreto,
feedback: "Questão gerada automaticamente com base no arquivo enviado."
});
chavesUsadas.add(chave);
}
return perguntas.slice(0, quantidadeMaxima);
}
function criarEnunciadoObjetivo(tema, indice) {
const assunto = tema ? tema : "o conteúdo enviado";
const modelos = [
`De acordo com o conteúdo enviado, qual afirmação está correta sobre ${assunto}?`,
`Com base no arquivo enviado, o que o texto apresenta sobre ${assunto}?`,
`Segundo o material enviado, qual alternativa resume corretamente uma ideia relacionada a ${assunto}?`,
`No contexto do arquivo enviado, qual opção explica corretamente ${assunto}?`
];
return modelos[indice % modelos.length];
}
function gerarDistratoresObjetivos(fraseCorreta, tema, frases) {
const corretaNormalizada = normalizarTermo(fraseCorreta);
const distratores = [];
for (const frase of frases) {
if (distratores.length >= 6) break;
const fraseNormalizada = normalizarTermo(frase);
if (fraseNormalizada === corretaNormalizada) continue;
if (tema && temaPresenteNaFrase(tema, frase)) {
continue;
}
const alternativa = transformarFraseEmAlternativa(frase);
if (alternativa.length < 25 || alternativa.length > 230) {
continue;
}
if (!distratores.some(item => normalizarTermo(item) === normalizarTermo(alternativa))) {       distratores.push(alternativa);
}
}
return distratores;
}
function temaPresenteNaFrase(tema, frase) {
const palavrasTema = normalizarTermo(tema)
.split(/s+/)
.filter(palavra => palavra.length > 4);
const fraseNormalizada = normalizarTermo(frase);
return palavrasTema.some(palavra => fraseNormalizada.includes(palavra));
}
function identificarTema(frase) {
const termos = extrairTermosImportantes(frase);
if (termos.length === 0) {
return "";
}
const escolhidos = termos.slice(0, 2).map(capitalizarPalavra);
return escolhidos.join(" ");
}
function extrairTermosImportantes(texto) {
const ignoradas = palavrasIgnoradas();
const palavras = texto
.replace(/[.,;:!?()"“”‘’[]{}]/g, " ")
.split(/s+/)
.map(palavra => palavra.trim())
.filter(palavra =>
palavra.length > 4 &&
!/^d+$/.test(palavra) &&
!ignoradas.includes(normalizarTermo(palavra))
);
const unicas = [];
palavras.forEach(palavra => {
const normalizada = normalizarTermo(palavra);
if (!unicas.some(item => normalizarTermo(item) === normalizada)) {       unicas.push(palavra);
}
});
return unicas;
}
async function extrairTextoDoArquivo(arquivo) {
const nome = arquivo.name.toLowerCase();
if (nome.endsWith(".txt")) return await lerTXT(arquivo);
if (nome.endsWith(".pdf")) return await lerPDF(arquivo);
if (nome.endsWith(".docx")) return await lerDOCX(arquivo);
throw new Error("Formato não suportado.");
}
function lerTXT(arquivo) {
return new Promise((resolve, reject) => {
const leitor = new FileReader();
leitor.onload = () => resolve(leitor.result);
leitor.onerror = () => reject("Erro ao ler TXT");
leitor.readAsText(arquivo, "UTF-8");
});
}
async function lerPDF(arquivo) {
if (typeof pdfjsLib === "undefined") {
throw new Error("Biblioteca PDF.js não carregada.");
}
const arrayBuffer = await arquivo.arrayBuffer();
pdfjsLib.GlobalWorkerOptions.workerSrc =
"https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";   const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;   let textoFinal = "";
for (let pagina = 1; pagina <= pdf.numPages; pagina++) {
const page = await pdf.getPage(pagina);
const content = await page.getTextContent();
textoFinal += content.items.map(item => item.str).join(" ") + " ";
}
return textoFinal;
}
async function lerDOCX(arquivo) {
if (typeof mammoth === "undefined") {
throw new Error("Biblioteca Mammoth não carregada.");
}
const arrayBuffer = await arquivo.arrayBuffer();
const resultado = await mammoth.extractRawText({ arrayBuffer });
return resultado.value;
}
function limparTexto(texto) {
return String(texto || "")
.replace(/[•●▪]/g, " ")
.replace(/[(.*?)]/g, " ")
.replace(/s+/g, " ")
.trim();
}
function extrairFrasesValidas(texto) {
const encontradas = texto.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [];
let frases = encontradas
.map(frase => frase.trim())
.filter(frase =>
frase.length >= 50 &&
frase.length <= 280 &&
frase.split(/s+/).length >= 8 &&
!frase.toLowerCase().includes("http")
);
if (frases.length < 12) {
frases = frases.concat(criarTrechosPorPalavras(texto, 28));   }
return frases;
}
function criarTrechosPorPalavras(texto, tamanho) {
const palavras = texto.split(/s+/).filter(Boolean);
const trechos = [];
for (let i = 0; i < palavras.length; i += tamanho) {
const trecho = palavras.slice(i, i + tamanho).join(" ");
if (
trecho.length >= 60 &&
trecho.length <= 280 &&
trecho.split(/s+/).length >= 8
) {
trechos.push(trecho);
}
}
return trechos;
}
function removerFrasesRepetidas(frases) {
const vistas = new Set();
const resultado = [];
frases.forEach(frase => {
const chave = normalizarTermo(frase).slice(0, 120);
if (!vistas.has(chave)) {
vistas.add(chave);
resultado.push(frase);
}
});
return resultado;
}
function transformarFraseEmAlternativa(frase) {
let texto = String(frase || "")
.replace(/^[-–—•●▪d.)s]+/, "")
.replace(/s+/g, " ")
.trim();
texto = cortarNoLimite(texto, 220);
texto = texto.charAt(0).toUpperCase() + texto.slice(1);
if (!/[.!?]$/.test(texto)) {
texto += ".";
}
return texto;
}
function cortarNoLimite(texto, limite) {
if (texto.length <= limite) return texto;
const cortado = texto.slice(0, limite);
const ultimoEspaco = cortado.lastIndexOf(" ");
if (ultimoEspaco > 80) {
return cortado.slice(0, ultimoEspaco).trim() + "...";
}
return cortado.trim() + "...";
}
function removerAlternativasRepetidas(alternativas) {   const vistas = new Set();
const resultado = [];
alternativas.forEach(alternativa => {
const chave = normalizarTermo(alternativa);
if (!vistas.has(chave)) {
vistas.add(chave);
resultado.push(alternativa);
}
});
return resultado;
}
function palavrasIgnoradas() {
return [
"para", "como", "com", "uma", "umas", "uns", "das", "dos", "que",
"não", "são", "por", "mais", "seu", "sua", "seus", "suas", "foi",
"ser", "ter", "tem", "nas", "nos", "pela", "pelo", "entre", "sobre",
"também", "muito", "quando", "onde", "porque", "isso", "esta",
"esse", "essa", "este", "aquele", "aquela", "deve", "podem", "pode",     "cada", "qual", "quais", "toda", "todo", "todos", "todas", "mesmo",
"dele", "dela", "nossa", "nosso", "outros", "outra", "outras", "outro",     "sendo", "tendo", "forma", "maneira", "segundo", "assim", "portanto",     "conteúdo", "arquivo", "texto", "material", "questão", "questões",
"atividade", "exemplo", "conceito", "principal", "processo"
];
}
function atualizarHistoricoTela() {
if (!listaHistorico) return;
if (historicoNomes.length === 0) {
listaHistorico.innerHTML = "<li>Nenhuma entrada registrada.</li>";     return;
}
listaHistorico.innerHTML = historicoNomes
.map(nome => `<li>${escaparHTML(nome)}</li>`)
.join("");
}
function atualizarRankingTela() {
const htmlRanking = ranking.length === 0
? "<li>Nenhum resultado registrado.</li>"
: ranking.map(item => `
<li>
<strong>${escaparHTML(item.nome)}</strong> -
${escaparHTML(formatarPontos(Number(item.pontosNumero ||
item.pontos)))}/${escaparHTML(item.totalPossivel || PONTUACAO_MAXIMA)}
<br>
<small>${escaparHTML(item.bloco || "Bloco não
identificado")}<br>${escaparHTML(item.data)}</small>
</li>
`).join("");
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
return historicoNomes.some(item => normalizarTermo(item) === nomeNormalizado); }
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
window.scrollTo({
top: 0,
behavior: "smooth"
});
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
return String(valor || "")
.normalize("NFD")
.replace(/[u0300-u036f]/g, "")
.toLowerCase()
.trim();
}
function capitalizarPalavra(palavra) {
const texto = String(palavra || "").trim();
if (!texto) return "";
return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase(); }
function escaparHTML(valor) {
return String(valor ?? "")
.replace(/&/g, "&amp;")
.replace(/</g, "&lt;")
.replace(/>/g, "&gt;")
.replace(/"/g, "&quot;")
.replace(/'/g, "&#039;");
}
function normalizarNomeArquivo(nome) {   return normalizarTermo(nome)
.replace(/[^a-z0-9]+/g, "_")
.replace(/^_+|_+$/g, "") || "participante"; }